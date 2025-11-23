# Guía Rápida - Sistema de Autenticación

## 🚀 Setup en 5 Minutos

### 1. Variables de Entorno (2 min)

```bash
# En Vercel Dashboard o .env.local

# ✅ Ya configuradas automáticamente (Neon):
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
# ... otras POSTGRES_*

# ⚠️ DEBES CONFIGURAR:
JWT_SECRET=<genera con comando abajo>

# 📧 Opcional (para alertas por email):
RESEND_API_KEY=re_...
ADMIN_EMAIL=admin@tudominio.com

# 🔒 Opcional (para cron jobs):
CRON_SECRET=<token aleatorio>
```

**Generar JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Crear Primer Admin (1 min)

```bash
# Opción A: Registro manual + SQL
# 1. Ve a https://tudominio.com/login
# 2. Registra tu cuenta
# 3. Ejecuta en la BD:
psql $POSTGRES_URL -c "UPDATE users SET role = 'admin' WHERE email = 'tu-email@example.com';"

# Opción B: Desde Vercel Dashboard
# Storage → Postgres → Query → Ejecuta:
UPDATE users SET role = 'admin' WHERE email = 'tu-email@example.com';
```

### 3. Acceder al Admin Panel (30 seg)

```bash
# URL: https://tudominio.com/admin
# Login con el email que promoviste a admin
```

---

## 📋 Checklist de Verificación

- [ ] `JWT_SECRET` configurado en Vercel
- [ ] Base de datos conectada (POSTGRES_URL funciona)
- [ ] Migraciones aplicadas (tablas: users, system_alerts, etc.)
- [ ] Usuario admin creado
- [ ] Puedes hacer login en `/login`
- [ ] Puedes acceder a `/admin`

---

## 🎯 Flujo Típico de Usuario

### Registro
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Usuario" # opcional
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Ver Perfil
```bash
GET /api/auth/me
# Requiere cookie auth-token (se establece automáticamente)
```

### Logout
```bash
POST /api/auth/logout
```

---

## 🔧 Comandos Útiles

```bash
# Ver todos los usuarios
psql $POSTGRES_URL -c "SELECT id, email, role, account_type FROM users;"

# Ver admins
psql $POSTGRES_URL -c "SELECT email, role FROM users WHERE role = 'admin';"

# Promover usuario a admin
psql $POSTGRES_URL -c "UPDATE users SET role = 'admin' WHERE email = 'EMAIL_AQUI';"

# Ver alertas activas
psql $POSTGRES_URL -c "SELECT * FROM system_alerts WHERE status = 'active';"

# Ver tablas
psql $POSTGRES_URL -c "\dt"
```

---

## 🎨 Frontend - Ejemplos Rápidos

### Usar AuthContext

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div>
      <h1>Hola {user.name}!</h1>
      {isAdmin && <Link to="/admin">Panel Admin</Link>}
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

### Proteger Rutas

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

---

## 🚨 Troubleshooting Rápido

| Error | Solución |
|-------|----------|
| "JWT_SECRET no configurado" | `vercel env add JWT_SECRET` |
| "No autenticado" (401) | Incluye `credentials: 'include'` en fetch |
| "Too many requests" (429) | Espera 15 minutos o configura Redis |
| Los cambios de rol no aplican | Logout + Login de nuevo |

---

## 📚 Documentación Completa

Ver [AUTH-SYSTEM.md](./AUTH-SYSTEM.md) para:
- Arquitectura detallada
- Todos los endpoints API
- Panel de administración
- Ejemplos avanzados
- Seguridad y mejores prácticas

---

## 🎓 Recursos

- **Annalogica (referencia)**: https://annalogica.eu/admin
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **JWT**: https://jwt.io
- **Upstash Redis**: https://upstash.com

---

**¿Problemas?** Revisa [AUTH-SYSTEM.md](./AUTH-SYSTEM.md) sección Troubleshooting
