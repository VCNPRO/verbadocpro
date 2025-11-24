import { NextRequest, NextResponse } from 'next/server';
import { verifyRequestAuth } from '@/lib/auth';
import { UserDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authPayload = verifyRequestAuth(request);
    if (!authPayload) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Get fresh user data from database
    const user = await UserDB.findById(authPayload.userId);
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    });

  } catch (error: any) {
    console.error('Error in me endpoint', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
