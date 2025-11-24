import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDB } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = await UserDB.findByEmail(email);
    if (!user) {
      console.log('Failed login attempt - user not found', { email });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Failed login attempt - invalid password', { email, userId: user.id });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET no configurado');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '7d' }
    );

    console.log('Successful login', { userId: user.id, email: user.email, role: user.role });

    // Set httpOnly cookie
    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}; Path=/`);

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
