// DÓNDE: app/page.tsx
// MISIÓN: Dashboard principal - Requiere autenticación

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  // Verificar autenticación
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token');

  if (!authToken) {
    redirect('/login'); // Redirigir a login si no hay token
  }

  // Verificar validez del token
  const payload = verifyToken(authToken.value);
  if (!payload) {
    redirect('/login'); // Redirigir si el token es inválido
  }

  // Usuario autenticado - mostrar dashboard
  return <DashboardClient user={payload} />;
}
