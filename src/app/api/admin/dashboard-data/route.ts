// DÓNDE: app/api/admin/dashboard-data/route.ts
// MISIÓN: Endpoint para obtener datos del dashboard de administración

import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  // Verificar autenticación y permisos de admin
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    // Obtener datos del dashboard
    const { rows } = await sql`
      SELECT
        COUNT(*) FILTER (WHERE role = 'admin') as admin_count,
        COUNT(*) FILTER (WHERE role = 'user') as user_count,
        COUNT(*) as total_users
      FROM users
    `;

    const data = rows[0] || { admin_count: 0, user_count: 0, total_users: 0 };

    return NextResponse.json({
      stats: {
        totalUsers: parseInt(data.total_users),
        adminUsers: parseInt(data.admin_count),
        regularUsers: parseInt(data.user_count)
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

