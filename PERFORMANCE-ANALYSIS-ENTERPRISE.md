# Análisis de Rendimiento y Capacidad - VerbadocPro Enterprise

**Fecha:** 2025-11-29
**Versión:** 2.0
**Para:** Administraciones Públicas (Ayuntamientos, Diputaciones, Instituciones)
**Entorno:** Producción en Vercel + Google Cloud Vertex AI (europa-west1)

---

## 📊 Resumen Ejecutivo

VerbadocPro está diseñado para **extracción masiva de datos de documentos institucionales** con los siguientes límites operacionales **ACTUALES**:

### ⚠️ Límites Actuales (ANTES de optimizaciones)
| Métrica | Valor Actual | Estado | Capacidad Real |
|---------|--------------|--------|----------------|
| **Timeout de función** | 60s (Vercel Pro) | ⚠️ BAJO | Solo docs <30 páginas |
| **Concurrencia** | No configurada | ❌ CRÍTICO | 1 documento a la vez |
| **Tamaño máximo documento** | ~10 MB | ⚠️ BAJO | ~50 páginas PDF |
| **Procesamiento paralelo** | No disponible | ❌ CRÍTICO | Sin cola |
| **Rate limiting** | No configurado | ⚠️ RIESGO | Puede saturar APIs |

### ✅ Límites Optimizados (DESPUÉS de aplicar mejoras)
| Métrica | Valor Optimizado | Mejora | Capacidad Real |
|---------|------------------|--------|----------------|
| **Timeout de función** | 900s (15 min) | +1400% | Docs hasta 500 páginas |
| **Concurrencia** | 20-50 docs paralelos | ∞ | Procesamiento masivo |
| **Tamaño máximo documento** | 100 MB | +900% | ~500 páginas PDF |
| **Procesamiento paralelo** | Queue ilimitada | ✅ | Miles de docs/día |
| **Rate limiting** | 100 docs/min | ✅ | Protección automática |

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### 1. Sin Configuración de Timeout ❌

**Problema:**
```json
// vercel.json actual
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "devCommand": "vite --port $PORT"
}
```

**NO hay configuración de `maxDuration`**, lo que significa:
- Vercel Hobby: 10 segundos máximo
- Vercel Pro: 60 segundos máximo (por defecto)
- **Máximo disponible**: 900 segundos (15 min)

**Impacto:**
```
Documento de 50 páginas:
- Tiempo procesamiento: ~90 segundos
- Resultado: ❌ TIMEOUT ERROR (excede 60s)
- Pérdida: 100% de documentos grandes

Documento de 200 páginas (sesión ayuntamiento):
- Tiempo estimado: ~360 segundos
- Resultado: ❌ IMPOSIBLE de procesar
```

**Solución Inmediata:**
```json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 900
    }
  },
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

### 2. Sin Sistema de Cola ni Concurrencia ❌

**Problema:**
- Procesamiento 100% síncrono
- Un documento a la vez
- Usuario espera respuesta en el navegador
- Sin sistema de jobs en segundo plano

**Impacto:**
```
Escenario: Ayuntamiento carga 100 expedientes

Con arquitectura actual:
- Procesamiento: Secuencial (1 por 1)
- Tiempo: 100 docs × 60s = 6,000s (100 minutos)
- Experiencia: Usuario esperando 100 minutos ❌
- Resultado: INVIABLE

Con arquitectura optimizada (Inngest/Queue):
- Procesamiento: 20 docs en paralelo
- Tiempo: 100 docs ÷ 20 = 5 tandas × 60s = 300s (5 minutos)
- Experiencia: Notificación cuando termina ✅
- Resultado: VIABLE
```

**Solución Requerida:**
- Implementar sistema de jobs (Inngest, BullMQ, o similar)
- Cola de procesamiento con prioridades
- Notificaciones de completado

---

### 3. Sin Límites de Tamaño ni Validación ⚠️

**Problema:**
```typescript
// api/extract.ts - No hay validación de tamaño
const { model, contents, config } = req.body;
// Acepta cualquier tamaño de documento
```

**Impacto:**
- Documentos >20 MB pueden fallar silenciosamente
- Sin feedback al usuario
- Costes innecesarios de API calls fallidas

**Solución:**
```typescript
// Validar tamaño ANTES de procesar
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_PAGES = 500; // 500 páginas

if (fileSize > MAX_FILE_SIZE) {
  return res.status(413).json({
    error: 'Documento demasiado grande',
    message: `El documento excede el límite de 100 MB. Por favor, divida el documento.`
  });
}
```

---

## 🏗️ Infraestructura Actual

### 1. Vercel (Plan Pro Requerido)

**Configuración Actual:**
```
Plan: Pro (asumido)
Timeout configurado: ❌ NO (usa default de 60s)
Timeout disponible: 900s (15 min)
Concurrencia: Ilimitada (escalado automático)
```

**Límites de Plan Pro:**
| Recurso | Límite | Notas |
|---------|--------|-------|
| **Function Duration** | 900s (15 min) | Solo configurando en vercel.json |
| **Function Executions** | 1M/mes | Suficiente para 30K docs/día |
| **Bandwidth** | Ilimitado | Sin cargos extras |
| **Concurrent Builds** | 12 | No afecta a producción |

**Coste Estimado:**
```
Plan Pro: $20/mes

Procesamiento (30K docs/mes):
- Invocaciones: 30,000 (bien dentro de 1M)
- Duración promedio: 60s/doc × 30,000 = 500 horas
- Límite: Sin límite de compute en Plan Pro
- Coste: $20/mes (fijo)
```

---

### 2. Google Cloud Vertex AI (Gemini 2.5)

**Modelos Disponibles:**

| Modelo | Precisión | Velocidad | Coste/Doc | Recomendado Para |
|--------|-----------|-----------|-----------|------------------|
| **gemini-2.5-flash-lite** | 92-94% | Muy rápido (~20s) | €0.0005 | Formularios simples |
| **gemini-2.5-flash** | 95-97% | Rápido (~45s) | €0.0016 | Docs estándar (facturas, contratos) |
| **gemini-2.5-pro** | 98-99% | Lento (~120s) | €0.008 | Docs complejos (actas, sentencias) |

**Límites de API (europe-west1):**
```
Requests por minuto: 60 (default tier)
Requests por día: 1,500 (default tier)
Tokens por minuto: 4M (input + output)

PROBLEMA: Con 30K docs/día necesitas ~1,250 req/hora = 21 req/min
SOLUCIÓN: Solicitar aumento de cuota a Google (gratis)
```

**Estrategia Óptima por Tipo de Documento:**
```
Administraciones Públicas (mix típico):
├─ 60% documentos estándar → Flash (€0.0016)
├─ 30% documentos simples → Flash-Lite (€0.0005)
└─ 10% documentos complejos → Pro (€0.008)

Coste promedio ponderado:
(0.60 × €0.0016) + (0.30 × €0.0005) + (0.10 × €0.008)
= €0.00096 + €0.00015 + €0.0008
= €0.00191 por documento

30,000 docs/mes: €57.30/mes en IA
100,000 docs/mes: €191/mes en IA
```

**Tiempos de Procesamiento:**

| Páginas | Flash-Lite | Flash | Pro |
|---------|------------|-------|-----|
| 1-5 | 10s | 15s | 30s |
| 10-20 | 20s | 30s | 60s |
| 30-50 | 35s | 60s | 120s |
| 100 | 70s | 120s | 240s |
| 200 | 140s | 240s | 480s |
| 500 | 350s | 600s | 1200s |

---

### 3. Procesamiento PDF (pdfjs-dist)

**Biblioteca:** pdfjs-dist v3.11.174

**Capacidad:**
```
Tamaño máximo: Limitado por memoria de función (1 GB en Vercel Pro)
Páginas máximas: ~1,000 páginas (depende de complejidad)
Tiempo extracción: ~0.5-1s por página

Ejemplo:
├─ 10 páginas: ~5-10s extracción
├─ 50 páginas: ~25-50s extracción
├─ 200 páginas: ~100-200s extracción
└─ 500 páginas: ~250-500s extracción (requiere timeout de 900s)
```

**Limitaciones:**
- PDFs escaneados (imágenes): Requieren OCR adicional
- PDFs corruptos: Pueden fallar silenciosamente
- PDFs con seguridad: Pueden requerir contraseña

---

## 📈 Capacidad del Sistema

### Escenario Actual (Sin Optimizaciones)

```
┌─────────────────────────────────────────────────────────────┐
│ CAPACIDAD ACTUAL - CRÍTICA                                   │
├─────────────────────────────────────────────────────────────┤
│ Timeout: 60s                                                 │
│ Concurrencia: 1 (sin cola)                                   │
│ Tamaño máximo doc: ~30 páginas                               │
│                                                              │
│ Máxima capacidad diaria: ~500 documentos/día                 │
│ (Asumiendo 8 horas de carga continua, 60s/doc)             │
│                                                              │
│ INVIABLE para administraciones públicas                     │
└─────────────────────────────────────────────────────────────┘
```

---

### Escenario Optimizado (Con Mejoras Propuestas)

#### **Optimización Nivel 1: Básica (Solo timeout)**

```json
// vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 900
    }
  }
}
```

**Resultado:**
```
✅ Timeout: 900s (15 min)
❌ Concurrencia: 1 (sin cola)
✅ Tamaño máximo doc: ~500 páginas

Capacidad diaria: ~500 documentos/día
- Pero ahora soporta docs grandes (actas, sentencias)
- Mejora: Calidad, no cantidad
```

---

#### **Optimización Nivel 2: Intermedia (Timeout + Queue básica)**

**Arquitectura:**
```
Frontend → API Upload → Vercel KV Queue → API Process → Vertex AI
                             ↓
                     Background Worker
                     (procesa 1 por 1)
```

**Implementación:**
```typescript
// Usar @vercel/kv para cola simple
import { kv } from '@vercel/kv';

// Encolar documento
await kv.rpush('documents_queue', JSON.stringify({
  id: docId,
  file: fileBase64,
  schema: schema,
  model: 'gemini-2.5-flash'
}));

// Worker procesa cola
setInterval(async () => {
  const doc = await kv.lpop('documents_queue');
  if (doc) {
    await processDocument(JSON.parse(doc));
  }
}, 1000);
```

**Resultado:**
```
✅ Timeout: 900s
✅ Queue: Sí (básica)
✅ Concurrencia: ~5 (limitada)
✅ Feedback: Usuario puede cerrar página

Capacidad diaria: ~2,500 documentos/día
- 5 workers × 96 docs/día/worker (15 min/doc en promedio)
- Mejora: 5x más capacidad
```

---

#### **Optimización Nivel 3: Avanzada (Inngest + Alta Concurrencia)**

**Arquitectura:**
```
Frontend → API Upload → Inngest Queue → 20 Workers Paralelos → Vertex AI
                             ↓
                     Job Status API
                             ↓
                     WebSocket/Polling Updates
```

**Implementación:**
```bash
npm install inngest
```

```typescript
// lib/inngest/client.ts
import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'verbadoc-enterprise',
  name: 'VerbaDoc Enterprise'
});

// lib/inngest/functions.ts
export const processDocument = inngest.createFunction(
  {
    id: 'process-document-vertex-ai',
    name: 'Process Document (Vertex AI)',
    retries: 3,
    concurrency: { limit: 50 }  // 50 documentos en paralelo
  },
  { event: 'document/process' },
  async ({ event, step }) => {
    const { documentId, fileUrl, schema, model } = event.data;

    // STEP 1: Download document
    const fileData = await step.run('download-document', async () => {
      return await fetch(fileUrl).then(r => r.arrayBuffer());
    });

    // STEP 2: Extract text with PDF.js
    const extractedText = await step.run('extract-pdf-text', async () => {
      return await extractPDFText(fileData);
    });

    // STEP 3: Call Vertex AI
    const result = await step.run('extract-data-vertexai', async () => {
      return await callVertexAI(model, extractedText, schema);
    });

    // STEP 4: Save results
    await step.run('save-results', async () => {
      await kv.set(`doc:${documentId}:result`, JSON.stringify(result));
      await kv.set(`doc:${documentId}:status`, 'completed');
    });

    return { status: 'completed', documentId };
  }
);
```

**Resultado:**
```
✅ Timeout: 900s
✅ Queue: Inngest (enterprise-grade)
✅ Concurrencia: 50 documentos paralelos
✅ Retries: 3 intentos automáticos
✅ Monitoring: Dashboard de jobs
✅ Notifications: WebSocket updates

Capacidad diaria: ~50,000+ documentos/día
- 50 workers × 1,000 docs/día/worker (90s promedio/doc)
- Escalable a cientos de miles de docs/día
- Mejora: 100x más capacidad
```

**Costes Optimización Nivel 3:**
```
Infraestructura adicional:
├─ Inngest Cloud (Free tier): 50K events/mes gratis
│   - Upgrade a $50/mes para 500K events/mes
├─ Vercel Pro: $20/mes (ya incluido)
├─ Vercel KV: $0.30/100K comandos (storage de resultados)
└─ TOTAL: $70-90/mes infraestructura

IA (30,000 docs/mes):
├─ Vertex AI: €57.30/mes (mix de modelos)
└─ TOTAL: ~€57 ($62)

TOTAL OPTIMIZACIÓN NIVEL 3: ~$150/mes
```

---

## 💰 Análisis de Costes por Escenario

### Administración Pequeña (1,000 docs/día = 30K/mes)

```
┌────────────────────────────────────────────────────────┐
│ ESCENARIO: Ayuntamiento Pequeño                        │
├────────────────────────────────────────────────────────┤
│ INFRAESTRUCTURA:                                        │
│ ├─ Vercel Pro: $20/mes                                 │
│ ├─ Inngest: $0/mes (free tier cubre)                   │
│ ├─ Vercel KV: $5/mes                                   │
│ └─ SUBTOTAL: $25/mes                                   │
│                                                         │
│ IA (30,000 docs, mix modelos):                         │
│ ├─ Vertex AI: €57/mes (~$62)                           │
│ └─ SUBTOTAL: $62/mes                                   │
│                                                         │
│ MANTENIMIENTO:                                          │
│ ├─ Soporte part-time: $500/mes                         │
│ └─ SUBTOTAL: $500/mes                                  │
├────────────────────────────────────────────────────────┤
│ TOTAL MENSUAL: ~$590/mes                                │
│ Costo por documento: $0.020 (2 céntimos)               │
└────────────────────────────────────────────────────────┘

vs Procesamiento Manual:
├─ 2 administrativos × $2,500 = $5,000/mes
├─ Tiempo: 5 min/doc × 30K = 2,500 horas
└─ AHORRO: $4,410/mes (88% ahorro)
```

---

### Administración Mediana (5,000 docs/día = 150K/mes)

```
┌────────────────────────────────────────────────────────┐
│ ESCENARIO: Diputación Provincial                       │
├────────────────────────────────────────────────────────┤
│ INFRAESTRUCTURA:                                        │
│ ├─ Vercel Pro: $20/mes                                 │
│ ├─ Inngest Pro: $50/mes (500K events)                  │
│ ├─ Vercel KV: $25/mes                                  │
│ └─ SUBTOTAL: $95/mes                                   │
│                                                         │
│ IA (150,000 docs, mix modelos):                        │
│ ├─ Vertex AI: €286/mes (~$310)                         │
│ └─ SUBTOTAL: $310/mes                                  │
│                                                         │
│ MANTENIMIENTO:                                          │
│ ├─ Soporte part-time: $1,000/mes                       │
│ └─ SUBTOTAL: $1,000/mes                                │
├────────────────────────────────────────────────────────┤
│ TOTAL MENSUAL: ~$1,405/mes                              │
│ Costo por documento: $0.0094 (~1 céntimo)              │
└────────────────────────────────────────────────────────┘

vs Procesamiento Manual:
├─ 10 administrativos × $2,500 = $25,000/mes
└─ AHORRO: $23,595/mes (94% ahorro)
```

---

### Administración Grande (20,000 docs/día = 600K/mes)

```
┌────────────────────────────────────────────────────────┐
│ ESCENARIO: Comunidad Autónoma / Ministerio             │
├────────────────────────────────────────────────────────┤
│ INFRAESTRUCTURA:                                        │
│ ├─ Vercel Pro: $20/mes                                 │
│ ├─ Inngest Pro: $200/mes (2M events)                   │
│ ├─ Vercel KV: $100/mes                                 │
│ ├─ Google Cloud Quota Increase: $0 (gratuito)          │
│ └─ SUBTOTAL: $320/mes                                  │
│                                                         │
│ IA (600,000 docs, mix modelos):                        │
│ ├─ Vertex AI: €1,146/mes (~$1,240)                     │
│ └─ SUBTOTAL: $1,240/mes                                │
│                                                         │
│ MANTENIMIENTO:                                          │
│ ├─ Ingeniero DevOps: $3,000/mes                        │
│ ├─ Soporte técnico: $2,000/mes                         │
│ └─ SUBTOTAL: $5,000/mes                                │
├────────────────────────────────────────────────────────┤
│ TOTAL MENSUAL: ~$6,560/mes                              │
│ Costo por documento: $0.011 (~1 céntimo)               │
└────────────────────────────────────────────────────────┘

vs Procesamiento Manual:
├─ 40 administrativos × $2,500 = $100,000/mes
└─ AHORRO: $93,440/mes (93% ahorro)
```

---

## 🧪 Plan de Pruebas Recomendado

### Fase 1: Validación Funcional (Documentos Típicos)

| Tipo Documento | Páginas | Complejidad | Modelo Recomendado | Tiempo Esperado |
|----------------|---------|-------------|-------------------|-----------------|
| **Factura** | 1-2 | Baja | Flash-Lite | 10-15s |
| **Contrato** | 5-20 | Media | Flash | 30-60s |
| **Acta Pleno** | 30-100 | Alta | Pro | 120-300s |
| **Expediente** | 50-200 | Alta | Flash/Pro mix | 180-480s |
| **Sentencia** | 20-80 | Muy Alta | Pro | 60-240s |
| **Plan Urbanístico** | 100-500 | Muy Alta | Pro | 300-900s |

### Fase 2: Pruebas de Concurrencia

#### Test 1: Carga Baja (10 documentos simultáneos)
```
Documentos: 10 facturas (1-2 pág cada una)
Esperado: Todos procesados en paralelo
Tiempo: ~15s (todos completan casi simultáneamente)
Estado: ✅ Dentro de límites con Optimización Nivel 3
```

#### Test 2: Carga Media (50 documentos simultáneos)
```
Documentos: 50 contratos (5-20 pág cada uno)
Esperado: Procesados en 1 tanda (concurrency: 50)
Tiempo: ~60s (todos completan en la misma tanda)
Estado: ✅ Dentro de límites con Optimización Nivel 3
```

#### Test 3: Carga Alta (200 documentos simultáneos)
```
Documentos: 200 docs mixtos
Esperado: 4 tandas de 50 docs
Tiempo: ~240s (4 tandas × 60s promedio)
Estado: ✅ Dentro de límites con Optimización Nivel 3
```

#### Test 4: Carga Extrema (1,000 documentos simultáneos)
```
Documentos: 1,000 docs mixtos (caso Diputación)
Esperado: 20 tandas de 50 docs
Tiempo: ~20 min (20 tandas × 60s promedio)
Estado: ✅ Factible con Optimización Nivel 3
```

### Fase 3: Pruebas de Estrés (Documentos Grandes)

| Test | Documento | Páginas | Modelo | Tiempo Esperado | Estado |
|------|-----------|---------|--------|-----------------|--------|
| E1 | Acta Pleno | 100 | Pro | 300s | ⚠️ Requiere timeout 900s |
| E2 | Expediente Completo | 200 | Flash | 480s | ⚠️ Requiere timeout 900s |
| E3 | Plan General | 500 | Pro | 900s | ⚠️ Límite absoluto |
| E4 | Ordenanza Municipal | 300 | Flash | 720s | ⚠️ Requiere timeout 900s |

---

## ⚡ Optimizaciones Críticas Inmediatas

### 1. Aumentar Timeout a 900s (URGENTE)

**Impacto:** Permite procesar documentos grandes (hasta 500 páginas)

**Implementación:**
```json
// vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 900
    }
  },
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Esfuerzo:** 2 minutos
**Coste:** $0
**Mejora:** De ~30 páginas a ~500 páginas (+1,567%)

---

### 2. Implementar Sistema de Cola (HIGH PRIORITY)

**Opción A: Vercel KV (Rápida)**
```bash
npm install @vercel/kv
```

```typescript
// api/queue-document.ts
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { documentId, file, schema, model } = req.body;

  // Encolar documento
  await kv.rpush('documents_queue', JSON.stringify({
    id: documentId,
    file,
    schema,
    model,
    timestamp: Date.now()
  }));

  return res.json({
    status: 'queued',
    message: 'Documento en cola de procesamiento',
    documentId
  });
}

// api/process-queue.ts (llamado por Vercel Cron cada minuto)
export default async function handler(req, res) {
  const batchSize = 5; // Procesar 5 docs en paralelo

  const docs = [];
  for (let i = 0; i < batchSize; i++) {
    const doc = await kv.lpop('documents_queue');
    if (doc) docs.push(JSON.parse(doc));
  }

  await Promise.all(docs.map(doc => processDocument(doc)));

  return res.json({ processed: docs.length });
}
```

**Vercel Cron:**
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/process-queue",
      "schedule": "* * * * *"  // Cada minuto
    }
  ]
}
```

**Esfuerzo:** 1-2 horas
**Coste:** $5-10/mes (Vercel KV)
**Mejora:** De 1 doc a la vez → 5 docs/min (+300%)

---

**Opción B: Inngest (Recomendada para Alto Volumen)**
```bash
npm install inngest
```

```typescript
// lib/inngest/client.ts
import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'verbadoc-enterprise',
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY
});

// lib/inngest/functions.ts
export const processDocument = inngest.createFunction(
  {
    id: 'process-document',
    name: 'Process Document with Vertex AI',
    retries: 3,
    concurrency: { limit: 50 }
  },
  { event: 'document/process' },
  async ({ event, step }) => {
    // Implementación paso a paso con retries
    // Ver ejemplo completo arriba
  }
);
```

**Esfuerzo:** 3-4 horas
**Coste:** $0-50/mes (según volumen)
**Mejora:** De 1 doc a la vez → 50 docs en paralelo (+5,000%)

---

### 3. Validación de Tamaño de Archivo (IMPORTANTE)

```typescript
// api/upload-document.ts o components/FileUploader.tsx
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_PAGES_ESTIMATE = 500;

const validateDocument = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `El documento (${(file.size / 1024 / 1024).toFixed(2)} MB) excede el límite de 100 MB.\\n\\n` +
      `Por favor, divida el documento en partes más pequeñas.`
    );
  }

  // Estimación: 1 MB ≈ 5 páginas de PDF con texto
  const estimatedPages = Math.ceil(file.size / 204800); // 200 KB/pág
  if (estimatedPages > MAX_PAGES_ESTIMATE) {
    console.warn(`Documento grande estimado: ~${estimatedPages} páginas`);
  }

  return true;
};
```

**Esfuerzo:** 30 minutos
**Coste:** $0
**Mejora:** Previene errores y reduce costes de API calls fallidas

---

### 4. Rate Limiting (PROTECCIÓN)

```typescript
// middleware/rateLimit.ts (usando Upstash Redis)
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests por minuto
  analytics: true,
});

// Usar en API
const identifier = req.headers.get('x-forwarded-for') || 'anonymous';
const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

if (!success) {
  return res.status(429).json({
    error: 'Límite de tasa excedido',
    message: `Has alcanzado el límite de 100 documentos por minuto. Intenta en ${Math.ceil((reset - Date.now()) / 1000)}s.`,
    limit,
    remaining,
    reset
  });
}
```

**Esfuerzo:** 1 hora
**Coste:** $0-10/mes (Upstash free tier)
**Mejora:** Protege contra sobrecarga y abusos

---

## 📊 Comparativa Antes/Después

| Métrica | ANTES (Actual) | DESPUÉS (Optimizado) | Mejora |
|---------|----------------|---------------------|--------|
| **Timeout máximo** | 60s | 900s | +1,400% |
| **Documentos simultáneos** | 1 | 50 | +4,900% |
| **Páginas máximas/doc** | ~30 | ~500 | +1,567% |
| **Tamaño máximo** | ~10 MB | 100 MB | +900% |
| **Capacidad diaria** | 500 docs | 50,000+ docs | +9,900% |
| **Tiempo 100 docs** | 100 min (secuencial) | 2-3 min (paralelo) | -97% |
| **Retries automáticos** | ❌ No | ✅ Sí (3 intentos) | N/A |
| **Monitoreo** | ❌ No | ✅ Dashboard completo | N/A |
| **Rate limiting** | ❌ No | ✅ 100 req/min | N/A |
| **Validación errores** | ⚠️ Parcial | ✅ Completa | N/A |

---

## 🚀 Roadmap de Implementación

### Semana 1 (Crítico)
- ✅ Aumentar timeout a 900s en vercel.json
- ✅ Añadir validación de tamaño de archivo
- ✅ Implementar cola básica con Vercel KV
- ✅ Configurar Vercel Cron para procesamiento

**Resultado:** Capacidad de 2,500 docs/día

---

### Semana 2-3 (Alta Prioridad)
- ✅ Migrar a Inngest para concurrencia avanzada
- ✅ Implementar sistema de notificaciones (WebSocket o polling)
- ✅ Añadir dashboard de progreso para usuarios
- ✅ Implementar rate limiting con Upstash
- ✅ Solicitar aumento de cuota a Google Vertex AI

**Resultado:** Capacidad de 50,000+ docs/día

---

### Mes 2 (Mejoras)
- ⚙️ Implementar caché inteligente para documentos similares
- ⚙️ Sistema de prioridades (urgente/normal/baja)
- ⚙️ Modo batch nocturno (procesamiento masivo con descuento)
- ⚙️ Integración con almacenamiento externo (Google Cloud Storage)
- ⚙️ Analytics y reportes de uso

**Resultado:** Reducción de costes del 30-40%

---

## 🎯 Recomendaciones Finales

### Para Administraciones Pequeñas (<5,000 docs/mes)
```
✅ Aplicar Optimización Nivel 2 (Vercel KV)
✅ Costo: ~$100/mes (infraestructura + IA)
✅ Capacidad: 2,500 docs/día
✅ ROI: 88% ahorro vs manual
```

### Para Administraciones Medianas (5,000-50,000 docs/mes)
```
✅ Aplicar Optimización Nivel 3 (Inngest)
✅ Costo: ~$1,400/mes (infraestructura + IA)
✅ Capacidad: 50,000+ docs/día
✅ ROI: 94% ahorro vs manual
```

### Para Administraciones Grandes (>50,000 docs/mes)
```
✅ Optimización Nivel 3 + Mejoras Avanzadas
✅ Costo: ~$6,500/mes (infraestructura + IA + soporte)
✅ Capacidad: 100,000+ docs/día
✅ ROI: 93% ahorro vs manual
✅ Considerar: Google Cloud Enterprise Support
```

---

## ✅ Checklist de Preparación

### Pre-Lanzamiento (Crítico)
- [ ] ⏳ Aumentar maxDuration a 900s en vercel.json
- [ ] ⏳ Implementar validación de tamaño de archivo
- [ ] ⏳ Implementar sistema de cola (KV o Inngest)
- [ ] ⏳ Configurar rate limiting
- [ ] ⏳ Solicitar aumento de cuota Google Vertex AI
- [ ] ⏳ Configurar monitoreo y alertas

### Post-Lanzamiento (Importante)
- [ ] ⏳ Implementar sistema de notificaciones
- [ ] ⏳ Dashboard de progreso para usuarios
- [ ] ⏳ Documentación de usuario actualizada
- [ ] ⏳ Pruebas de carga con documentos reales
- [ ] ⏳ Plan de contingencia (fallback a procesamiento manual)

---

**🇪🇺 100% PROCESAMIENTO EN EUROPA - GDPR COMPLIANT**

**Última actualización:** 2025-11-29
**Próxima revisión:** 2025-12-29
**Responsable:** Equipo DevOps / Admin
