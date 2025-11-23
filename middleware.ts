// DÓNDE: middleware.ts (raíz del proyecto)
// MISIÓN: Middleware de autenticación para proteger rutas

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/api/auth/login', '/api/auth/register'];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Verificar si hay token de autenticación
  const authToken = request.cookies.get('auth-token');

  // Si no hay token y no es una ruta pública, redirigir a login
  if (!authToken && !pathname.startsWith('/api/')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verificar rutas de admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Aquí podrías hacer validación adicional del token si es necesario
    // Por ahora solo verificamos que exista el token
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configurar qué rutas procesa el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
