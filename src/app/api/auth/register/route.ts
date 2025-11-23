import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDB } from '@/lib/db';
import { registerRateLimit, getClientIdentifier, checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimitResult = await checkRateLimit(registerRateLimit, identifier, 'registros');
    if (rateLimitResult) {
      return NextResponse.json({ error: rateLimitResult.error }, { status: 429 });
    }

    const body = await request.json();
    const { email, password, name } = body;

    // Validaciones
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Formato de email inválido' }, { status: 400 });
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const existingUser = await UserDB.findByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await UserDB.create(email, hashedPassword, name, 'user');

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

    console.log('New user registered', { userId: user.id, email: user.email });

    // Crear response con usuario
    const response = NextResponse.json({
      success: true,
      message: 'Registro exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    }, { status: 201 });

    // Establecer cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;

  } catch (error: any) {
    console.error('Error in register endpoint', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
