# Sistema de Autenticación - Guía Completa

## Índice
1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Configuración Inicial](#configuración-inicial)
4. [API Endpoints](#api-endpoints)
5. [Creación de Usuarios Admin](#creación-de-usuarios-admin)
6. [Panel de Administración](#panel-de-administración)
7. [Ejemplos de Uso](#ejemplos-de-uso)
8. [Seguridad](#seguridad)
9. [Troubleshooting](#troubleshooting)

---

## Introducción

Este sistema de autenticación proporciona:
- ✅ Autenticación JWT con httpOnly cookies
- ✅ Gestión de usuarios con roles (user/admin)
- ✅ Rate limiting para prevenir abusos
- ✅ Panel de administración completo
- ✅ Sistema de alertas automáticas
- ✅ Tracking de costes y uso
- ✅ Auditoría completa de acciones

### Proyectos que usan este sistema:
- **Verbadoc Enterprise**: https://verbadoceuropapro.vercel.app
- **Annalysis Media**: https://annalysis-video-ia-dashboard-solammedia-9886s-projects.vercel.app
- **Mets**: https://mets-silk.vercel.app

---

## Arquitectura del Sistema

```
┌─────────────────┐
│   Frontend      │
│  (React/Next)   │
└────────┬────────┘
         │
         │ HTTP Requests
         │ (cookies incluidas)
         ↓
┌─────────────────────────────────────┐
│         API Routes                  │
│                                     │
│  /api/auth/login                   │
│  /api/auth/register                │
│  /api/auth/logout                  │
│  /api/auth/me                      │
│  /api/admin/*                      │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│      Auth Middleware                │
│   - Verificar JWT                   │
│   - Rate limiting                   │
│   - Validar permisos                │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│    PostgreSQL (Neon)                │
│  - users                            │
│  - transcriptions                   │
│  - usage_logs                       │
│  - system_alerts                    │
│  - alert_config                     │
└─────────────────────────────────────┘
```

### Componentes Principales

1. **lib/auth.ts**: Verificación de JWT y gestión de tokens
2. **lib/db.ts**: Acceso a base de datos (usuarios)
3. **lib/rate-limit.ts**: Rate limiting con Upstash Redis
4. **lib/admin-users.ts**: Gestión de usuarios (admin)
5. **lib/admin-alerts.ts**: Sistema de alertas automáticas

---

## Configuración Inicial

### 1. Variables de Entorno

Configura estas variables en Vercel Dashboard o `.env.local`:

```bash
# Base de Datos (auto-configuradas por Neon)
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=neondb_owner
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=neondb

# Autenticación (CRÍTICO)
JWT_SECRET=tu_jwt_secret_aqui_64_caracteres_hex

# Rate Limiting (opcional pero recomendado)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Notificaciones Email (opcional)
RESEND_API_KEY=re_...
ADMIN_EMAIL=admin@tudominio.com

# Protección de Cron Jobs
CRON_SECRET=un_token_aleatorio_seguro
```

### 2. Generar JWT_SECRET

```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O en terminal con openssl
openssl rand -hex 32
```

### 3. Aplicar Migraciones de Base de Datos

Las migraciones ya están aplicadas si seguiste el proceso de instalación. Para verificar:

```bash
# Conectar a la base de datos
psql $POSTGRES_URL

# Verificar tablas
\dt

# Deberías ver:
# - users
# - transcriptions
# - usage_logs
# - system_alerts
# - alert_config
```

---

## API Endpoints

### Autenticación Básica

#### POST /api/auth/register
Registra un nuevo usuario.

**Request:**
```json
{
  "email": "usuario@example.com",
  "password": "contraseña_segura_8+_chars",
  "name": "Nombre Completo" // opcional
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registro exitoso",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "Nombre Completo",
    "role": "user",
    "createdAt": "2025-11-23T..."
  }
}
```

**Cookies establecidas:**
- `auth-token`: JWT token (httpOnly, Secure, SameSite=Lax, 7 días)

**Rate Limit:** 5 registros por IP cada 15 minutos

---

#### POST /api/auth/login
Inicia sesión con credenciales existentes.

**Request:**
```json
{
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "Nombre Completo",
    "role": "user",
    "createdAt": "2025-11-23T..."
  }
}
```

**Cookies establecidas:**
- `auth-token`: JWT token (httpOnly, Secure, SameSite=Lax, 7 días)

**Rate Limit:** 10 intentos por IP cada 15 minutos

---

#### POST /api/auth/logout
Cierra la sesión del usuario actual.

**Request:** (vacío)

**Response (200):**
```json
{
  "success": true,
  "message": "Logout exitoso"
}
```

**Cookies eliminadas:**
- `auth-token`

---

#### GET /api/auth/me
Obtiene información del usuario autenticado actual.

**Headers requeridos:**
- Cookie con `auth-token`

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "Nombre Completo",
    "role": "user",
    "createdAt": "2025-11-23T..."
  }
}
```

---

### Endpoints de Administración

Todos requieren rol `admin`.

#### GET /api/admin/stats
Obtiene estadísticas generales de la plataforma.

**Response:**
```json
{
  "totalUsers": 150,
  "activeUsers": 120,
  "totalCosts": 1250.50,
  "monthlyActiveUsers": 95,
  "usersByType": {
    "production": 100,
    "demo": 30,
    "test": 15,
    "trial": 5
  },
  "recentActivity": [...]
}
```

---

#### GET /api/admin/users
Lista todos los usuarios con métricas detalladas.

**Query params:**
- `type`: Filtrar por tipo (production, demo, test, trial)
- `status`: Filtrar por estado (active, inactive, suspended)

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "Usuario",
      "role": "user",
      "accountType": "production",
      "accountStatus": "active",
      "totalCostUsd": 45.20,
      "monthlyBudgetUsd": 100.00,
      "tags": ["vip", "high-volume"],
      "lastActivityAt": "2025-11-23T...",
      "metrics": {
        "totalTranscriptions": 25,
        "totalFiles": 50,
        "avgDailyUsage": 2.5
      }
    }
  ]
}
```

---

#### PATCH /api/admin/users
Actualiza información de un usuario.

**Request:**
```json
{
  "userId": "uuid",
  "updates": {
    "accountType": "demo",
    "accountStatus": "active",
    "monthlyBudgetUsd": 50.00,
    "tags": ["beta", "partner"],
    "internalNotes": "Cliente VIP - soporte prioritario"
  }
}
```

**Response:**
```json
{
  "success": true,
  "user": {...}
}
```

---

#### GET /api/admin/alerts
Obtiene alertas activas del sistema.

**Query params:**
- `severity`: Filtrar por severidad (low, medium, high, critical)
- `status`: Filtrar por estado (active, acknowledged, resolved)

**Response:**
```json
{
  "alerts": [
    {
      "id": "uuid",
      "type": "high_cost",
      "severity": "high",
      "status": "active",
      "userId": "uuid",
      "metadata": {
        "currentCost": 150.00,
        "threshold": 100.00
      },
      "createdAt": "2025-11-23T..."
    }
  ]
}
```

---

#### PATCH /api/admin/alerts
Resuelve o reconoce una alerta.

**Request:**
```json
{
  "alertId": "uuid",
  "status": "resolved",
  "notes": "Contactado con el cliente"
}
```

---

#### POST /api/admin/alerts
Ejecuta verificación manual de alertas.

**Response:**
```json
{
  "success": true,
  "newAlerts": 3,
  "emailsSent": 2
}
```

---

## Creación de Usuarios Admin

### Método 1: Desde la Base de Datos (Recomendado)

```bash
# 1. Primero, registra un usuario normal desde la web
# Usa /api/auth/register con tu email

# 2. Conéctate a la base de datos
psql $POSTGRES_URL

# 3. Actualiza el rol a admin
UPDATE users
SET role = 'admin'
WHERE email = 'tu-email@example.com';

# 4. Verifica
SELECT id, email, role FROM users WHERE role = 'admin';
```

### Método 2: Desde Vercel Dashboard

1. Ve a tu proyecto en Vercel
2. Storage → Postgres → Query
3. Ejecuta:
```sql
UPDATE users
SET role = 'admin'
WHERE email = 'tu-email@example.com';
```

### Método 3: Script Automático

```javascript
// scripts/create-admin.js
import { UserDB } from '../lib/db.js';

async function createAdmin(email) {
  const user = await UserDB.findByEmail(email);
  if (!user) {
    console.error('Usuario no encontrado');
    return;
  }

  await UserDB.update(user.id, { role: 'admin' });
  console.log('✅ Usuario promovido a admin:', email);
}

createAdmin('tu-email@example.com');
```

---

## Panel de Administración

### Acceso

URL: `https://tudominio.com/admin`

Solo accesible para usuarios con rol `admin`.

### Funcionalidades

#### 1. Dashboard Principal
- Estadísticas generales
- Gráficos de tendencias de costes
- Distribución de usuarios por tipo
- Alertas activas

#### 2. Gestión de Usuarios
- Listar todos los usuarios
- Filtrar por tipo/estado
- Categorizar usuarios:
  - **Production**: Usuarios en producción (facturables)
  - **Demo**: Cuentas de demostración
  - **Test**: Cuentas de prueba internas
  - **Trial**: Usuarios en periodo de prueba
- Asignar presupuestos mensuales
- Agregar tags personalizados
- Ver métricas de uso
- Añadir notas internas

#### 3. Sistema de Alertas
- **Alertas Automáticas:**
  - Coste alto (>$100/mes)
  - Cuota excedida (>80% del presupuesto)
  - Uso inusual
  - Errores de transcripción

- **Gestión:**
  - Ver todas las alertas
  - Filtrar por severidad
  - Resolver/Reconocer alertas
  - Ver historial

#### 4. Gráficos y Métricas
- Tendencia de costes (30 días)
- Distribución por tipo de cuenta
- Uso diario/semanal/mensual
- Alertas por severidad
- Top usuarios por coste

#### 5. Auditoría
- Registro de todas las acciones admin
- Historial de cambios por usuario
- Logs de acceso

---

## Ejemplos de Uso

### Frontend - React Context

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

  // Login
  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      console.log('Logged in!');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  // Verificar autenticación
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Verificar si es admin
  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <UserDashboard user={user} />;
}
```

### Proteger Rutas

```typescript
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Ruta protegida - solo usuarios autenticados */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Ruta admin - solo administradores */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

### Llamadas API desde Frontend

```typescript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // IMPORTANTE: incluir cookies
  body: JSON.stringify({ email, password })
});

// Obtener usuario actual
const response = await fetch('/api/auth/me', {
  credentials: 'include' // IMPORTANTE
});

// Actualizar usuario (admin)
const response = await fetch('/api/admin/users', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    userId: 'uuid',
    updates: { accountType: 'demo' }
  })
});
```

---

## Seguridad

### Medidas Implementadas

1. **JWT con httpOnly Cookies**
   - Token no accesible desde JavaScript
   - Protección contra XSS
   - Secure flag en producción
   - SameSite=Lax (protección CSRF)

2. **Rate Limiting**
   - Login: 10 intentos / 15 min
   - Register: 5 intentos / 15 min
   - Basado en IP del cliente
   - Powered by Upstash Redis

3. **Validación de Entrada**
   - Email: formato válido
   - Password: mínimo 8 caracteres
   - Sanitización de datos

4. **Hashing de Contraseñas**
   - bcrypt con 12 salt rounds
   - No se almacenan contraseñas en texto plano

5. **Verificación de Roles**
   - Middleware verifica permisos
   - Endpoints admin protegidos
   - Auditoría de acciones

### Buenas Prácticas

```typescript
// ❌ MAL - No hagas esto
localStorage.setItem('token', jwt); // Vulnerable a XSS

// ✅ BIEN - Usa httpOnly cookies
res.setHeader('Set-Cookie', `auth-token=${jwt}; HttpOnly; Secure`);

// ❌ MAL - No expongas información sensible
console.log('Password:', password);

// ✅ BIEN - Logs seguros
console.log('Login attempt:', { email, userId });

// ❌ MAL - No confíes en el cliente
const isAdmin = req.body.isAdmin; // Cliente puede mentir

// ✅ BIEN - Verifica en el servidor
const authPayload = verifyRequestAuth(req);
const isAdmin = authPayload?.role === 'admin';
```

---

## Troubleshooting

### Error: "JWT_SECRET no configurado"

**Causa:** Falta la variable de entorno JWT_SECRET

**Solución:**
```bash
# Generar secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Agregar a Vercel
vercel env add JWT_SECRET
# Pegar el valor generado

# O en .env.local
echo "JWT_SECRET=tu_secret_aqui" >> .env.local
```

---

### Error: "No autenticado" / 401

**Causa:** Cookie no se envía o JWT inválido

**Solución:**
```typescript
// Asegúrate de incluir credentials
fetch('/api/auth/me', {
  credentials: 'include' // ← CRÍTICO
});

// Verifica que la cookie existe
console.log(document.cookie); // Busca 'auth-token'
```

---

### Error: "Too many requests" / 429

**Causa:** Rate limit excedido

**Solución:**
- Espera 15 minutos
- Verifica que no hay bucles infinitos
- Configura Upstash Redis para límites personalizados

---

### Error: "Method not allowed" / 405

**Causa:** Método HTTP incorrecto

**Solución:**
```typescript
// ❌ MAL
fetch('/api/auth/login', { method: 'GET' });

// ✅ BIEN
fetch('/api/auth/login', { method: 'POST' });
```

---

### Los cambios de rol no se reflejan

**Causa:** Token JWT antiguo en cache

**Solución:**
```typescript
// 1. Hacer logout
await fetch('/api/auth/logout', { method: 'POST' });

// 2. Limpiar cookies
document.cookie = 'auth-token=; Max-Age=0';

// 3. Hacer login de nuevo
await fetch('/api/auth/login', { method: 'POST', ... });
```

---

### Error de conexión a base de datos

**Causa:** Variables POSTGRES_* no configuradas

**Solución:**
```bash
# Verifica que existen
vercel env ls

# Deberías ver:
# POSTGRES_URL
# POSTGRES_PRISMA_URL
# etc.

# Si faltan, vincúlalas desde Vercel Dashboard:
# Storage → Postgres → Connect → .env.local
```

---

## Próximos Pasos

1. **Configurar Email Notifications**
   - Registrarse en [Resend](https://resend.com)
   - Agregar `RESEND_API_KEY`
   - Verificar dominio para emails

2. **Personalizar Alertas**
   - Editar `lib/admin-alerts.ts`
   - Ajustar umbrales de coste
   - Agregar nuevos tipos de alertas

3. **Exportar Datos**
   - Implementar export de usuarios a CSV
   - Backup automático de base de datos
   - Reportes mensuales

4. **Integraciones**
   - Conectar con Stripe para pagos
   - Integrar con CRM
   - Webhooks para eventos importantes

---

## Soporte

Para problemas o preguntas:
- GitHub Issues: [Tu repositorio]
- Email: admin@tudominio.com
- Documentación completa: `/docs`

---

**Última actualización:** 2025-11-23
**Versión:** 1.0.0
