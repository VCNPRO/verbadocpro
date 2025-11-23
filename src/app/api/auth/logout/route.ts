import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logout exitoso'
    });

    // Delete cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error: any) {
    console.error('Error in logout endpoint', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
