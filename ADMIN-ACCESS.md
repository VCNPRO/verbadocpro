# Admin Dashboard - Verbadoc Enterprise

## 🚀 Acceso Rápido

### URL de Acceso
```
http://localhost:3000/admin        (desarrollo)
https://verbadoc-enterprise.vercel.app/admin  (producción)
```

### Requisitos
1. Estar logueado con un usuario
2. Tener rol de `admin` en la base de datos

## 📝 Instalación y Configuración

### 1. Aplicar Migración de Base de Datos

```bash
# Opción 1: Script automático
npm run migrate:admin

# Opción 2: SQL directo
psql $POSTGRES_URL -f migrations/db-migration-admin-management.sql
```

### 2. Crear Usuario Admin

```bash
# Método 1: Script Node.js
node scripts/make-admin.js tu-email@verbadoc.com

# Método 2: SQL directo
psql $POSTGRES_URL -c "UPDATE users SET role = 'admin' WHERE email = 'tu-email@verbadoc.com';"
```

### 3. Configurar Variables de Entorno

Añade en `.env.local` o Vercel Dashboard:

```bash
# Para enviar notificaciones por email (opcional)
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=admin@verbadoc.com
```

## ✨ Características del Admin Dashboard

- ✅ **Gestión de Usuarios**: Ver, editar, categorizar usuarios
- ✅ **Monitoreo de Costes**: Tracking automático de gastos
- ✅ **Sistema de Alertas**: Notificaciones automáticas
- ✅ **Métricas y Gráficos**: Visualización de datos con Recharts
- ✅ **Auditoría**: Logs de todas las acciones admin
- ✅ **Exportación**: Descarga de datos en CSV/JSON

## 🔐 Seguridad

El acceso al admin está protegido con:
- Verificación de autenticación JWT
- Validación de rol admin en BD
- Redirección automática si no autorizado

## 📚 Estructura

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Página protegida
│   └── api/admin/
│       ├── users/                # Gestión usuarios
│       ├── stats/                # Estadísticas
│       ├── alerts/               # Alertas
│       └── ...                   # Más endpoints
├── components/admin/
│   ├── AdminDashboard.tsx        # Dashboard principal
│   ├── ErrorMonitoringPanel.tsx # Panel de errores
│   └── ...                       # Más componentes
└── lib/
    ├── admin-users.ts            # Lógica de usuarios
    ├── admin-alerts.ts           # Sistema de alertas
    └── admin-logs.ts             # Auditoría

scripts/
├── make-admin.js                 # Crear admin
└── apply-admin-migration.js      # Migración BD
```

## 🚀 Uso Rápido

```bash
# 1. Instalar dependencias (si es necesario)
npm install

# 2. Aplicar migración
npm run migrate:admin

# 3. Crear admin
node scripts/make-admin.js tu-email@verbadoc.com

# 4. Iniciar servidor
npm run dev

# 5. Acceder
# http://localhost:3000/admin
```

## 📊 APIs Disponibles

```typescript
GET  /api/admin/stats              // Estadísticas plataforma
GET  /api/admin/users              // Lista usuarios
PATCH /api/admin/users             // Actualizar usuario
GET  /api/admin/alerts             // Alertas activas
POST /api/admin/alerts             // Verificar alertas
```

## ❓ Troubleshooting

### No puedo acceder al admin
1. Verifica que estés logueado
2. Confirma que tu usuario tiene `role = 'admin'` en BD
3. Revisa las variables de entorno

### Error de migración
```bash
# Verificar tablas existentes
psql $POSTGRES_URL -c "\dt"

# Re-aplicar migración si es necesario
psql $POSTGRES_URL -f migrations/db-migration-admin-management.sql
```

### No recibo alertas por email
1. Verifica `RESEND_API_KEY` en variables de entorno
2. Confirma `ADMIN_EMAIL` está configurado
3. Revisa logs de Vercel/consola

## 📖 Documentación Completa

Para más detalles, consulta:
- `ADMIN-DASHBOARD.md` - Guía completa del sistema
- `QUICKSTART-ADMIN.md` - Inicio rápido
