import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password, displayName } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    if (password.length < 6) return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });

    // Check if user exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()} LIMIT 1`;
    if (existing.rows[0]) return res.status(400).json({ error: 'Este email ya está registrado' });

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await sql`INSERT INTO users (email, password, name, role) VALUES (${email.toLowerCase()}, ${hashedPassword}, ${displayName || null}, 'user') RETURNING id, email, password, name, role, client_id, created_at, updated_at`;
    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    const maxAge = 7 * 24 * 60 * 60;
    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}; Path=/`);

    return res.status(201).json({
      success: true,
      user: {
        uid: user.id,
        email: user.email,
        displayName: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
