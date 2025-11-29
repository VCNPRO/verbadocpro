# VerbadocPro Europa
## Solución de Extracción Inteligente de Datos para Administraciones Públicas

**Documento Técnico-Comercial**
**Versión 1.0 - Noviembre 2024**

---

## 📋 Resumen Ejecutivo

**VerbadocPro Europa** es una plataforma europea de extracción inteligente de datos documentales diseñada específicamente para el sector público. Procesa documentos administrativos (licencias, permisos, facturas, padrones, contratos, actas, etc.) extrayendo datos estructurados de forma automática, cumpliendo 100% con GDPR y procesando toda la información dentro de la Unión Europea.

### 🎯 Beneficios Clave para Administraciones Públicas

| Beneficio | Descripción |
|-----------|-------------|
| **⚡ Ahorro de Tiempo** | Reduce de 5-10 minutos/documento a 1-2 minutos (80-90% más rápido) |
| **💰 Reducción de Costes** | Elimina hasta 70% de trabajo manual repetitivo |
| **🔒 100% GDPR Compliant** | Procesamiento exclusivo en servidores europeos (Bélgica - europe-west1) |
| **📊 Alta Precisión** | 95-98% de precisión en extracción de datos con IA Gemini 2.5 |
| **🚀 Alta Capacidad** | Hasta 2,400 documentos/día (jornada laboral 8h) o 7,200/día (24/7) |
| **☁️ Sin Infraestructura** | Cloud 100%, sin necesidad de servidores propios |

---

## 🏛️ Casos de Uso - Administraciones Públicas

### 1. **Ayuntamientos**

#### Urbanismo y Licencias
- **Licencias de obra**: Extracción automática de datos de solicitante, ubicación, tipo de obra, presupuesto, plazos
- **Licencias de actividad**: Clasificación y extracción de datos (actividad, superficie, aforo, horarios)
- **Declaraciones responsables**: Validación automática de campos obligatorios

**Caso real estimado:**
- Municipio de 50,000 habitantes: ~200 licencias/mes
- Tiempo actual: 8 min/licencia = 26 horas/mes
- Con VerbadocPro: 1.5 min/licencia = 5 horas/mes
- **Ahorro: 21 horas/mes por técnico**

#### Gestión Tributaria
- **Declaraciones fiscales**: IBI, ICIO, IAE, tasas
- **Facturas y justificantes**: Extracción de importes, conceptos, fechas, proveedores
- **Autoliquidaciones**: Validación automática de cálculos

#### Padrón Municipal
- **Altas/bajas padrón**: Extracción de datos personales, DNI, domicilio
- **Certificados de empadronamiento**: Generación automatizada

#### Registro General
- **Clasificación automática** de documentos entrantes por tipo
- **Extracción de metadatos**: Fecha, asunto, interesado, tipo de trámite
- **Indexación** para búsqueda rápida

### 2. **Diputaciones Provinciales**

#### Asistencia a Municipios
- **Procesamiento centralizado** para municipios pequeños sin recursos
- **Informes provinciales** agregados de múltiples ayuntamientos
- **Subvenciones municipales**: Validación de documentación justificativa

#### Gestión de Subvenciones
- **Solicitudes de ayudas**: Extracción y validación de requisitos
- **Memorias justificativas**: Verificación de contenidos obligatorios
- **Facturas y justificantes**: Comprobación de elegibilidad de gastos

### 3. **Otras Administraciones**

#### Comunidades Autónomas
- **Ayudas y subvenciones**: Procesamiento masivo de solicitudes
- **Inspecciones**: Digitalización y estructuración de actas
- **Contratación pública**: Extracción de datos de contratos

#### Servicios Públicos de Empleo
- **CVs y solicitudes de empleo**: Estructuración de datos
- **Certificados de formación**: Validación y registro
- **Informes de vida laboral**: Extracción de períodos y cotizaciones

---

## 🔐 Cumplimiento Normativo y Seguridad

### GDPR - Reglamento General de Protección de Datos

✅ **100% Cumplimiento GDPR:**

| Requisito GDPR | Cumplimiento VerbadocPro |
|----------------|--------------------------|
| **Procesamiento en UE** | ✅ Servidores en Bélgica (Google Cloud europe-west1) |
| **Minimización de datos** | ✅ Solo se procesa lo estrictamente necesario |
| **Derecho al olvido** | ✅ Eliminación automática de documentos procesados (24 horas) |
| **Cifrado** | ✅ HTTPS/TLS 1.3 en tránsito, cifrado en reposo |
| **Trazabilidad** | ✅ Logs completos de procesamiento |
| **DPO disponible** | ✅ Bajo demanda para clientes institucionales |

### Esquema Nacional de Seguridad (ENS)

Compatible con categorías **BÁSICA y MEDIA** del ENS:

- ✅ **Autenticación**: JWT + Google Cloud IAM
- ✅ **Cifrado**: TLS 1.3, AES-256
- ✅ **Trazabilidad**: Registro completo de operaciones
- ✅ **Disponibilidad**: SLA 99.9% (Vercel Pro + Google Cloud)
- ✅ **Segregación**: Datos de cada cliente aislados
- ✅ **Backup**: Automático (Google Cloud)

### Certificaciones del Proveedor

**Google Cloud Platform** (infraestructura subyacente):
- ISO/IEC 27001 (Seguridad de la Información)
- ISO/IEC 27017 (Seguridad Cloud)
- ISO/IEC 27018 (Protección de datos personales)
- SOC 2/SOC 3
- Certificación ENS Alto (disponible)

**Vercel** (plataforma de hosting):
- SOC 2 Type II
- GDPR Compliant
- ISO 27001

---

## ⚙️ Arquitectura Técnica

### Infraestructura Cloud Europea

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│                  Hosting: Vercel Edge Network                │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/TLS 1.3
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND APIs (Serverless Functions)             │
│                    Hosting: Vercel (EU)                      │
│                                                              │
│  • /api/queue-document    → Encola documentos               │
│  • /api/document-status   → Consulta estado                 │
│  • /api/process-queue     → Worker (Cron cada minuto)       │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                                 │
        ▼                                 ▼
┌──────────────────┐           ┌────────────────────────┐
│  Vercel KV       │           │  Google Cloud Vertex AI│
│  (Redis - EU)    │           │  Gemini 2.5 Flash/Pro  │
│                  │           │  Region: europe-west1  │
│  • Cola docs     │           │  (Bélgica)             │
│  • Estados       │           │                        │
│  • Resultados    │           │  • Extracción datos    │
│  • TTL: 24h      │           │  • OCR documentos      │
└──────────────────┘           │  • Validación schemas  │
                               └────────────────────────┘
```

### Tecnologías Utilizadas

| Componente | Tecnología | Ubicación |
|------------|------------|-----------|
| **IA Generativa** | Google Gemini 2.5 Flash/Pro | Bélgica (europe-west1) |
| **Base de datos cola** | Vercel KV (Upstash Redis) | Europa |
| **Serverless Functions** | Vercel Edge Functions | Europa |
| **Storage temporal** | Vercel Blob Storage | Europa |
| **CDN** | Vercel Edge Network | Global con nodos EU |

---

## 📊 Capacidad y Rendimiento

### Sistema de Cola Implementado

**VerbadocPro Europa** utiliza un sistema de cola avanzado que permite:

- ✅ **Procesamiento en background**: El usuario puede cerrar el navegador
- ✅ **Alta concurrencia**: 5 documentos en paralelo cada minuto
- ✅ **Consulta de estado**: API REST para verificar progreso
- ✅ **Timeouts extendidos**: Hasta 900 segundos (15 minutos) por documento
- ✅ **Retry automático**: Reintentos en caso de errores transitorios

### Capacidad de Procesamiento

| Métrica | Capacidad |
|---------|-----------|
| **Documentos simultáneos** | 5 en paralelo |
| **Throughput** | 5 documentos/minuto |
| **Capacidad horaria** | 300 documentos/hora |
| **Capacidad diaria (8h)** | 2,400 documentos/día |
| **Capacidad diaria (24h)** | 7,200 documentos/día |
| **Tiempo procesamiento** | 30-120 seg/documento (según complejidad) |
| **Tamaño máximo documento** | 100 MB |
| **Páginas máximas** | 500 páginas/documento |

### Escalabilidad

Para volúmenes superiores, el sistema puede escalar fácilmente:

| Nivel | Concurrencia | Capacidad Diaria (8h) | Casos de Uso |
|-------|--------------|----------------------|--------------|
| **Básico** | 5 docs/min | 2,400 docs/día | Ayuntamientos <20k hab |
| **Medio** | 10 docs/min | 4,800 docs/día | Ayuntamientos 20-100k hab |
| **Alto** | 20 docs/min | 9,600 docs/día | Capitales provinciales, Diputaciones |
| **Enterprise** | 50+ docs/min | 24,000+ docs/día | Comunidades Autónomas |

**Cambio de nivel:** Sin tiempo de inactividad, configuración en <5 minutos

---

## 💰 Modelo de Precios

### Opción 1: Pago por Uso (Recomendado para pilotos)

| Concepto | Precio |
|----------|--------|
| **Coste por documento** | 0.03€ - 0.08€/doc* |
| **Sin mínimo** | Paga solo lo que uses |
| **Sin permanencia** | Cancela cuando quieras |

*Depende del modelo IA:
- Gemini 2.5 Flash: ~0.03€/doc (documentos sencillos, <10 páginas)
- Gemini 2.5 Pro: ~0.08€/doc (documentos complejos, >10 páginas)

**Ejemplo:**
- Ayuntamiento procesa 500 documentos/mes con Flash
- Coste: 500 × 0.03€ = **15€/mes**

### Opción 2: Tarifa Plana Mensual (Administraciones medianas/grandes)

| Plan | Documentos Incluidos | Precio/Mes | Excedente |
|------|---------------------|------------|-----------|
| **Básico** | 1,000 docs/mes | 25€/mes | 0.025€/doc |
| **Estándar** | 5,000 docs/mes | 100€/mes | 0.020€/doc |
| **Premium** | 15,000 docs/mes | 250€/mes | 0.015€/doc |
| **Enterprise** | 50,000+ docs/mes | A consultar | A consultar |

**Incluye:**
- ✅ Soporte técnico por email
- ✅ SLA 99.9% de disponibilidad
- ✅ Backups automáticos
- ✅ Actualizaciones del sistema
- ✅ Schemas personalizados (hasta 10 tipos de documento)

### Opción 3: Licencia Anual (Máximo ahorro)

- **15% descuento** sobre tarifa plana mensual
- **20% descuento** para contratos plurianuales (2-4 años)
- **Facturación compatible** con ciclo presupuestario público

### Servicios Adicionales (Opcionales)

| Servicio | Precio |
|----------|--------|
| **Configuración inicial** | 200€ (una vez) |
| **Schema personalizado** (por tipo documento) | 50€ (una vez) |
| **Formación usuarios** (2 horas online) | 150€ |
| **Integración con sistema existente** | Desde 500€ |
| **Soporte premium** (respuesta <4h) | +50€/mes |
| **Consultoría DPO/GDPR** | 100€/hora |

---

## 🎯 Comparativa: Manual vs VerbadocPro

### Escenario: Ayuntamiento 30,000 habitantes

**Volumen estimado:** 150 documentos/mes (licencias + facturas + registros)

#### Proceso Manual Actual

| Concepto | Cálculo | Coste/Tiempo |
|----------|---------|--------------|
| **Tiempo por documento** | 8 minutos | - |
| **Tiempo total mes** | 150 × 8 min = 1,200 min | **20 horas/mes** |
| **Coste administrativo** | 20h × 25€/h | **500€/mes** |
| **Errores humanos** | ~5% documentos | Reprocesos |

#### Con VerbadocPro

| Concepto | Cálculo | Coste/Tiempo |
|----------|---------|--------------|
| **Tiempo procesamiento automático** | 150 × 1.5 min = 225 min | **3.75 horas/mes** |
| **Tiempo revisión** | 150 × 0.5 min = 75 min | **1.25 horas/mes** |
| **Total tiempo técnico** | | **5 horas/mes** |
| **Coste plataforma** (Plan Estándar) | 150 docs incluidos en 100€ | **100€/mes** |
| **Coste administrativo** | 5h × 25€/h | **125€/mes** |
| **Total** | | **225€/mes** |

### 💡 ROI (Retorno de Inversión)

- **Ahorro tiempo:** 15 horas/mes (75% reducción)
- **Ahorro coste:** 275€/mes (55% reducción)
- **Ahorro anual:** 3,300€/año
- **ROI:** **1,465%** sobre inversión inicial (configuración 200€)

---

## 🚀 Prueba Piloto - Sin Compromiso

Ofrecemos un **programa piloto de 30 días** para administraciones públicas:

### ✅ Incluye:

- **500 documentos gratis** para pruebas
- **Configuración de 3 tipos de documento** sin coste
- **Formación inicial** (1 hora online)
- **Soporte técnico prioritario** durante el piloto
- **Informe de resultados** (precisión, tiempos, ahorro estimado)

### 📋 Proceso del Piloto:

1. **Semana 1:** Reunión inicial + identificación tipos de documento
2. **Semana 2:** Configuración schemas + primeras pruebas
3. **Semana 3-4:** Procesamiento real de documentos
4. **Semana 4:** Informe de resultados + presentación a decisores

**Sin compromiso de contratación** - Evalúa primero, decide después

---

## 📞 Próximos Pasos

### 1. Solicitar Demo Personalizada

Agenda una demo de 30 minutos donde:
- Mostraremos el sistema en funcionamiento
- Procesaremos documentos reales de tu administración
- Resolveremos dudas técnicas y de cumplimiento normativo

**Contacto:**
📧 Email: [comercial@verbadocpro.eu](mailto:comercial@verbadocpro.eu)
🌐 Web: [https://www.verbadocpro.eu](https://www.verbadocpro.eu)
📱 Teléfono: +34 XXX XXX XXX

### 2. Iniciar Piloto de 30 Días

Sin coste inicial, sin compromiso. Comprueba el valor real en tu entorno.

### 3. Despliegue Completo

Una vez validado el piloto, despliegue completo en 1-2 semanas.

---

## ❓ Preguntas Frecuentes

### ¿Los datos salen de Europa?

**No.** Todo el procesamiento se realiza en servidores de Google Cloud ubicados en Bélgica (region europe-west1). Cumplimiento 100% GDPR.

### ¿Cómo se garantiza la confidencialidad?

- Cifrado TLS 1.3 en tránsito
- Cifrado AES-256 en reposo
- Eliminación automática de documentos tras 24 horas
- Logs de acceso y auditoría completos
- Posibilidad de Data Processing Agreement (DPA)

### ¿Qué formatos de documento soporta?

PDF, TIFF, JPEG, PNG, Word (DOCX), Excel (XLSX). El sistema incluye OCR para documentos escaneados.

### ¿Funciona con documentos escaneados de baja calidad?

Sí, Gemini 2.5 incluye OCR avanzado que funciona incluso con documentos escaneados de calidad media-baja. En documentos muy deteriorados, la precisión puede bajar del 95% al 80-85%.

### ¿Se puede integrar con nuestro sistema de gestión actual?

Sí. VerbadocPro expone APIs REST documentadas que permiten integración con cualquier sistema (Gestiona, GEISER, SICAL,ISIS, etc.). La integración puede realizarse como servicio adicional.

### ¿Qué pasa si el sistema falla?

- SLA 99.9% de disponibilidad
- Backup automático de documentos procesados
- Retry automático en errores transitorios
- Soporte técnico por email (<24h) o premium (<4h)

### ¿Podemos procesar datos especialmente sensibles (salud, menores)?

Sí, siempre que se cumpla la normativa de protección de datos. Para datos sensibles recomendamos:
- Firma de DPA específico
- Configuración de retención 0 horas (eliminación inmediata post-procesamiento)
- Logs de auditoría extendidos

### ¿Cuánto tiempo lleva implementarlo?

- **Piloto**: 1 semana
- **Producción básica** (3 tipos documento): 2 semanas
- **Producción completa** (10+ tipos documento + integraciones): 4-6 semanas

---

## 📄 Anexos Técnicos

### A. Esquemas de Datos Soportados

El sistema puede extraer cualquier estructura de datos definida en JSON Schema. Ejemplos:

**Licencia de Obra:**
```json
{
  "solicitante": { "nombre": "...", "dni": "...", "domicilio": "..." },
  "obra": { "tipo": "...", "direccion": "...", "presupuesto": "..." },
  "fechas": { "solicitud": "...", "concesion": "..." }
}
```

**Factura:**
```json
{
  "proveedor": { "nombre": "...", "cif": "...", "direccion": "..." },
  "factura": { "numero": "...", "fecha": "...", "base": "...", "iva": "...", "total": "..." },
  "conceptos": [{ "descripcion": "...", "cantidad": "...", "precio": "..." }]
}
```

### B. Requisitos Técnicos Usuario Final

**Navegador web moderno:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Conexión a internet:** 2 Mbps mínimo recomendado

**No requiere instalación** de software local

### C. SLA - Acuerdo de Nivel de Servicio

| Métrica | Objetivo | Plan Básico | Plan Premium |
|---------|----------|-------------|--------------|
| **Disponibilidad** | Uptime | 99.5% | 99.9% |
| **Tiempo respuesta API** | p95 | <2s | <1s |
| **Tiempo procesamiento** | Medio | <90s/doc | <60s/doc |
| **Soporte email** | Respuesta | <24h | <4h |

---

**VerbadocPro Europa** - Extracción Inteligente de Datos para el Sector Público
*Desarrollado en Europa, para Europa*

---

*Documento válido hasta: 31/12/2024*
*Precios sujetos a revisión anual según IPC*
*Todos los precios son sin IVA*
