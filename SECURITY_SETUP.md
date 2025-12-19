# 🔒 Guía de Configuración de Seguridad - VerbadocPro Enterprise

## ⚠️ IMPORTANTE: Configuración Obligatoria Antes del Despliegue

Esta aplicación ahora usa **autenticación segura con bcrypt y JWT**. Antes de desplegar a producción, debes configurar las siguientes variables de entorno en Vercel.

---

## 📋 Variables de Entorno Requeridas en Vercel

### 1. **JWT_SECRET** (🔴 CRÍTICO)

Esta clave secreta se usa para firmar los tokens JWT de autenticación.

**Cómo generarla:**

```bash
# Opción 1: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Opción 2: OpenSSL
openssl rand -hex 64

# Opción 3: Online (menos seguro)
# https://www.uuidgenerator.net/guid (generar varios y concatenar)
```

**Cómo configurarla en Vercel:**

1. Ve a tu proyecto en Vercel: https://vercel.com/solammedia-9886s-projects/verbadoc_enterprise
2. Click en "Settings" → "Environment Variables"
3. Añade una nueva variable:
   - **Name:** `JWT_SECRET`
   - **Value:** [Tu clave generada, mínimo 64 caracteres]
   - **Environment:** Production, Preview, Development (seleccionar todas)
4. Click en "Save"

**⚠️ NUNCA compartas este valor ni lo commitees a git**

---

### 2. **GOOGLE_APPLICATION_CREDENTIALS** (🔴 CRÍTICO)

Credenciales de Google Cloud Service Account para Vertex AI.

**Formato en Vercel:**

En Vercel, debes pegar el **contenido completo del archivo JSON** como una sola línea:

```json
{"type":"service_account","project_id":"tu-proyecto","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

**Cómo configurarla:**

1. Descarga tu Service Account Key de Google Cloud Console
2. Abre el archivo JSON en un editor de texto
3. Copia TODO el contenido (debe ser un JSON válido en una sola línea)
4. En Vercel → Settings → Environment Variables:
   - **Name:** `GOOGLE_APPLICATION_CREDENTIALS`
   - **Value:** [Pegar el JSON completo]
   - **Environment:** Production, Preview, Development
5. Save

---

### 3. **POSTGRES_URL** (🟡 Configurado automáticamente)

Esta variable la configura Vercel automáticamente cuando añades una base de datos Postgres.

**Si aún no tienes base de datos:**

1. En tu proyecto Vercel → "Storage" → "Create Database"
2. Selecciona "Postgres"
3. Sigue el asistente
4. Vercel configurará automáticamente `POSTGRES_URL`

---

### 4. Variables Públicas (Frontend)

Estas SÍ pueden ser públicas:

```bash
VITE_GEMINI_PROJECT_ID=tu-proyecto-id
VITE_GEMINI_LOCATION=europe-west1
```

**Configuración:**
- **Name:** `VITE_GEMINI_PROJECT_ID`
- **Value:** Tu Google Cloud Project ID
- **Environment:** Todas

---

## 🚀 Pasos para Primer Despliegue Seguro

### 1. Configurar Variables de Entorno

Sigue las instrucciones anteriores para configurar todas las variables en Vercel.

### 2. Desplegar la Aplicación

```bash
cd verbadoc_europa_pro
vercel --prod
```

### 3. Inicializar Base de Datos

Si es la primera vez, ejecuta el script de inicialización:

```bash
# Conectarte a la BD desde tu máquina local
vercel env pull .env.local
node scripts/init-db.cjs
```

### 4. Crear Usuario Administrador

```bash
# Opción 1: Script automatizado
node scripts/create-admin.cjs admin@verbadocpro.eu tu-contraseña-segura

# Opción 2: Manualmente desde psql
# Conéctate a tu base de datos y ejecuta:
# UPDATE users SET role = 'admin' WHERE email = 'tu-email@ejemplo.com';
```

### 5. Verificar Seguridad

✅ **Checklist de seguridad:**

- [ ] JWT_SECRET configurado (mínimo 64 caracteres)
- [ ] CORS restrictivo activado (solo tu dominio)
- [ ] Headers de seguridad configurados (vercel.json)
- [ ] Usuario admin creado con contraseña fuerte
- [ ] No hay credenciales en .env.local (no debe estar en git)
- [ ] HTTPS forzado (automático en Vercel)
- [ ] Procesamiento 100% en Europa (europe-west1)

---

## 🔐 Cambios de Seguridad Implementados

### ✅ Lo que se arregló:

1. **Autenticación real con bcrypt:**
   - Contraseñas hasheadas con 12 salt rounds
   - Nunca se almacenan en texto plano
   - Tokens JWT con expiración de 7 días

2. **HttpOnly Cookies:**
   - JWT guardado en cookie httpOnly
   - No accesible desde JavaScript
   - Protección contra XSS

3. **CORS Restrictivo:**
   - Solo dominios autorizados:
     - https://www.verbadocpro.eu
     - https://verbadoc-europa-pro.vercel.app
   - Localhost solo en desarrollo

4. **Headers de Seguridad:**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block
   - Strict-Transport-Security (HSTS)
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy (sin acceso a cámara/micrófono)

5. **Eliminadas vulnerabilidades:**
   - ❌ VITE_ADMIN_USERNAME (expuesto al cliente)
   - ❌ VITE_ADMIN_PASSWORD (expuesto al cliente)
   - ❌ Contraseñas en localStorage
   - ❌ CORS abierto (*)

---

## 📞 Soporte

Si tienes problemas con la configuración:

1. Verifica que todas las variables estén configuradas en Vercel
2. Comprueba los logs en Vercel Dashboard → Functions
3. Revisa que JWT_SECRET tenga al menos 32 caracteres
4. Asegúrate de que el JSON de Google Cloud sea válido

**Logs útiles:**

```bash
# Ver logs de producción
vercel logs

# Ver logs de una función específica
vercel logs --follow api/extract

# Ver logs de auth
vercel logs --follow api/auth
```

---

## 🔄 Actualizar JWT_SECRET (Rotación de Claves)

Si necesitas cambiar el JWT_SECRET por seguridad:

1. Genera una nueva clave
2. Actualiza en Vercel Environment Variables
3. Redeploy: `vercel --prod`
4. ⚠️ **Importante:** Todos los usuarios tendrán que volver a iniciar sesión

---

## 📚 Documentación Adicional

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Última actualización:** 2025-12-19
**Versión de seguridad:** 2.0 (FASE 1 completada)
