import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client (will use UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars)
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;

// Rate limiters for different endpoints
export const loginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '5 m'), // 5 attempts per 5 minutes
      analytics: true,
      prefix: '@annalysis/login',
    })
  : null;

export const registerRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 registrations per hour per IP
      analytics: true,
      prefix: '@annalysis/register',
    })
  : null;

export const uploadRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 uploads per hour
      analytics: true,
      prefix: '@annalysis/upload',
    })
  : null;

export const processRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 transcriptions per hour
      analytics: true,
      prefix: '@annalysis/process',
    })
  : null;

export const downloadRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '1 h'), // 30 downloads per hour
      analytics: true,
      prefix: '@annalysis/download',
    })
  : null;

/**
 * Get client identifier from request (user ID or IP)
 */
export function getClientIdentifier(request: Request | any, userId?: string): string {
  if (userId) return `user:${userId}`;

  // Try to get IP from headers (Vercel provides this)
  let ip = 'anonymous';

  if ('headers' in request && typeof request.headers.get === 'function') {
    // Standard Request (Next.js)
    ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
         request.headers.get('x-real-ip') ||
         'anonymous';
  } else if ('headers' in request && typeof request.headers === 'object') {
    // VercelRequest
    const forwardedFor = request.headers['x-forwarded-for'] || request.headers['X-Forwarded-For'];
    const realIp = request.headers['x-real-ip'] || request.headers['X-Real-IP'];
    ip = (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0] : null) ||
         realIp ||
         'anonymous';
  }

  return `ip:${ip}`;
}

/**
 * Check rate limit and return error object if exceeded
 */
export async function checkRateLimit(
  rateLimit: Ratelimit | null,
  identifier: string,
  limitName: string = 'requests'
): Promise<{ error: string; retryAfter?: number } | null> {
  if (!rateLimit) {
    // If Redis is not configured (local dev), skip rate limiting
    return null;
  }

  const { success, limit, reset, remaining } = await rateLimit.limit(identifier);

  if (!success) {
    const resetInMinutes = Math.ceil((reset - Date.now()) / 1000 / 60);

    return {
      error: `Demasiados ${limitName}. Intenta de nuevo en ${resetInMinutes} minutos.`,
      retryAfter: reset
    };
  }

  // Add rate limit headers to successful responses
  return null;
}

/**
 * Add rate limit headers to a response
 */
export function addRateLimitHeaders(
  response: Response,
  limit: number,
  remaining: number,
  reset: number
): Response {
  const headers = new Headers(response.headers);
  headers.set('X-RateLimit-Limit', limit.toString());
  headers.set('X-RateLimit-Remaining', remaining.toString());
  headers.set('X-RateLimit-Reset', reset.toString());

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
