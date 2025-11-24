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
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son requeridos' });

    // Find user by email
    const result = await sql`SELECT id, email, password, name, role, client_id, created_at, updated_at FROM users WHERE email = ${email.toLowerCase()} LIMIT 1`;
    const user = result.rows[0];

    if (!user) {
      console.log('Failed login - user not found', { email });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Failed login - invalid password', { email, userId: user.id });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    const maxAge = 7 * 24 * 60 * 60;

    console.log('Successful login', { userId: user.id, email: user.email, role: user.role });

    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}; Path=/`);
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        uid: user.id,
        id: user.id,
        email: user.email,
        displayName: user.name,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (error: any) {
    console.error('Error in login endpoint', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
