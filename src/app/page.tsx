// DÓNDE: app/page.tsx
// MISIÓN: Dashboard principal - Protegido por middleware

import DashboardClient from './dashboard-client';

export default function DashboardPage() {
  // El middleware ya verifica la autenticación
  // Si el usuario llega aquí, está autenticado
  return <DashboardClient />;
}
