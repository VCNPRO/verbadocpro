# 🚀 Sistema de Cola - Guía de Configuración

**Sistema implementado:** Cola de procesamiento en background con Vercel KV

---

## ✅ Componentes Implementados

### 1. **API de Encolado** (`api/queue-document.ts`)
- Recibe documentos del frontend
- Los añade a la cola de Vercel KV
- Retorna estado inmediato al usuario

### 2. **Worker de Procesamiento** (`api/process-queue.ts`)
- Se ejecuta cada minuto (Vercel Cron)
- Procesa 5 documentos en paralelo
- Guarda resultados en Vercel KV

### 3. **API de Estado** (`api/document-status.ts`)
- Consulta el estado de un documento
- Retorna: queued, processing, completed, error
- Incluye resultados cuando están listos

### 4. **Vercel Cron** (configurado en `vercel.json`)
- Se ejecuta cada minuto: `* * * * *`
- Llama automáticamente a `/api/process-queue`

---

## 📋 Configuración Requerida

### Paso 1: Configurar Vercel KV

**IMPORTANTE:** Vercel ahora gestiona KV a través del **Marketplace**. Puedes usar una base de datos existente o crear una nueva.

1. **Ir a Storage del proyecto:**
   ```
   https://vercel.com/solammedia-9886s-projects/verbadoc_enterprise/stores
   ```

2. **Conectar base de datos KV:**

   **Opción A - Usar base de datos existente:**
   - Si ves una base de datos KV existente (ej: `upstash-kv-cyan-lamp`)
   - Haz clic en ella
   - Busca el botón **"Connect to Project"** o **"Link Project"**
   - Selecciona el proyecto: `verbadoc_enterprise`
   - **MUY IMPORTANTE:** Marca todos los environments:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Haz clic en "Connect"

   **Opción B - Crear nueva desde Marketplace:**
   - Verás un aviso: "KV and Postgres are now available through the Marketplace"
   - Haz clic en **"Browse Marketplace"** o **"Create Database"**
   - Busca **"Upstash Redis"** o **"KV"**
   - Haz clic en **"Add Integration"**
   - Configuración:
     - Project: `verbadoc_enterprise`
     - Database Name: `verbadoc-queue`
     - Region: **Europe** (EU-WEST-1 Dublin o EU-CENTRAL-1 Frankfurt)
     - Environments: **Production**, **Preview**, **Development**
   - Haz clic en "Create"

3. **Verificar variables de entorno añadidas:**

   Ejecuta en terminal:
   ```bash
   cd verbadoc_europa_pro
   vercel env ls | grep KV
   ```

   Deberías ver **4 variables**:
   ```
   KV_URL                        Encrypted    Production, Preview, Development
   KV_REST_API_URL              Encrypted    Production, Preview, Development
   KV_REST_API_TOKEN            Encrypted    Production, Preview, Development
   KV_REST_API_READ_ONLY_TOKEN  Encrypted    Production, Preview, Development
   ```

4. **¡Variables añadidas automáticamente!** ✅
   (Vercel las añade automáticamente al conectar/crear el KV)

### Paso 2: Configurar CRON_SECRET

**Opción A - Usando Vercel CLI (Recomendado):**

1. **Generar un secret aleatorio:**
   ```bash
   openssl rand -hex 32
   ```

2. **Añadir a Vercel via CLI:**
   ```bash
   cd verbadoc_europa_pro
   vercel env add CRON_SECRET production
   ```
   - Pega el secret generado cuando te lo pida
   - Repite para `preview` y `development` si lo necesitas

3. **Verificar que se añadió:**
   ```bash
   vercel env ls | grep CRON_SECRET
   ```

**Opción B - Usando Dashboard:**
   - Vercel Dashboard → Settings → Environment Variables
   - Nombre: `CRON_SECRET`
   - Valor: (el generado arriba)
   - Environments: Production, Preview, Development
   - Clic en "Save"

### Paso 3: Re-deploy

Después de configurar las variables:
```bash
git push origin main
```

O desde Vercel Dashboard:
- Deployments → ... → Redeploy

---

## 🧪 Probar el Sistema

### Probar Encolado (Local o Producción)

```bash
curl -X POST https://verbadocpro.eu/api/queue-document \
  -H "Content-Type: application/json" \
  -d '{
    "documentId": "test-123",
    "fileData": "base64data...",
    "fileName": "test.pdf",
    "fileSize": 1024,
    "schema": {...},
    "model": "gemini-2.5-flash"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "documentId": "test-123",
  "status": "queued",
  "message": "Documento en cola de procesamiento",
  "queuePosition": 1,
  "estimatedWaitTime": "1 minutos"
}
```

### Consultar Estado

```bash
curl https://verbadocpro.eu/api/document-status?documentId=test-123
```

**Respuesta esperada (en cola):**
```json
{
  "documentId": "test-123",
  "status": "queued",
  "progress": 0,
  "estimatedTimeRemaining": "60s",
  ...
}
```

**Respuesta esperada (completado):**
```json
{
  "documentId": "test-123",
  "status": "completed",
  "progress": 100,
  "result": {
    "text": "...",
    "model": "gemini-2.5-flash"
  },
  "timestamps": {
    "queued": 1732896000000,
    "started": 1732896060000,
    "completed": 1732896120000,
    "processingTime": "60000ms"
  }
}
```

---

## 📊 Capacidad del Sistema

### Con Cola Implementada:

```
✅ Procesamiento: 5 docs/minuto en paralelo
✅ Capacidad horaria: 300 docs/hora
✅ Capacidad diaria: 7,200 docs/día (24/7)
✅ Capacidad real (8h/día): 2,400 docs/día

Mejora vs antes: 5x más capacidad
Usuario puede cerrar navegador: ✅ SÍ
Procesamiento en background: ✅ SÍ
```

### Escalar más (opcional):

Para aumentar a 10-20 docs/minuto, cambiar en `api/process-queue.ts`:
```typescript
const BATCH_SIZE = 10; // De 5 a 10 o 20
```

---

## 🔍 Monitoreo

### Ver Cola en Tiempo Real

Vercel Dashboard → Storage → verbadoc-queue → Browser

### Ver Logs del Cron

Vercel Dashboard → Deployments → [último deployment] → Functions → process-queue

### Verificar Cron Está Activo

Vercel Dashboard → Settings → Crons
- Deberías ver: `/api/process-queue` - `* * * * *` - Active ✅

---

## 🐛 Troubleshooting

### Problema: "Unauthorized" en process-queue

**Causa:** `CRON_SECRET` no está configurado o es incorrecto

**Solución:**
1. Generar nuevo secret: `openssl rand -hex 32`
2. Añadir a Vercel Environment Variables
3. Re-deploy

### Problema: Documentos quedan en "queued" forever

**Causa:** Cron no se está ejecutando

**Solución:**
1. Verificar que tienes Vercel Pro (crons no disponibles en Hobby)
2. Verificar en Vercel Dashboard → Settings → Crons
3. Verificar logs: Deployments → Functions → process-queue

### Problema: "KV is not defined"

**Causa:** Vercel KV no está configurado

**Solución:**
1. Crear database KV desde Vercel Dashboard
2. Variables se añaden automáticamente
3. Re-deploy

---

## 📈 Próximos Pasos Opcionales

### 1. Aumentar Concurrencia (10-20 docs/min)

Cambiar `BATCH_SIZE` en `api/process-queue.ts` a 10 o 20.

### 2. Implementar WebSocket para Updates en Tiempo Real

En lugar de polling, usar WebSocket para notificar al frontend cuando un documento está listo.

### 3. Prioridad de Cola

Implementar colas separadas:
- `documents_queue_high` (prioritarios)
- `documents_queue_normal`
- `documents_queue_low`

### 4. Estadísticas y Analytics

Guardar métricas:
- Tiempo promedio de procesamiento
- Tasa de éxito/error
- Documentos procesados por día

---

## ✅ Checklist de Activación

- [x] ✅ APIs creadas (queue-document, process-queue, document-status)
- [x] ✅ Vercel Cron configurado en vercel.json
- [x] ✅ Vercel KV database conectada (upstash-kv-cyan-lamp)
- [x] ✅ CRON_SECRET generado y añadido (via CLI)
- [x] ✅ Re-deploy realizado
- [ ] ⏳ Frontend actualizado para usar cola (opcional)
- [ ] ⏳ Pruebas realizadas

---

**Sistema listo para procesamiento masivo en background! 🎉**
