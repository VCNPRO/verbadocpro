# 📘 Guía Completa de Usuario - verbadoc enterprises

**Extracción Inteligente de Datos con Inteligencia Artificial 100% Europea**

---

## 📖 Índice

1. [¿Qué es verbadoc enterprises?](#qué-es-verbadoc-enterprises)
2. [Primeros Pasos](#primeros-pasos)
3. [Cómo Usar verbadoc enterprises - Paso a Paso](#cómo-usar-verbadoc---paso-a-paso)
4. [El Asistente de IA - Funcionalidades Explicadas](#el-asistente-de-ia---funcionalidades-explicadas)
5. [Modelos de IA Disponibles](#modelos-de-ia-disponibles)
6. [Gestión de Archivos y Plantillas](#gestión-de-archivos-y-plantillas)
7. [Descargar y Exportar Resultados](#descargar-y-exportar-resultados)
8. [Procesamiento en Lote](#procesamiento-en-lote)
9. [Problemas Comunes](#problemas-comunes)
10. [Preguntas Frecuentes](#preguntas-frecuentes)
11. [Soporte](#soporte)

---

## 🎯 ¿Qué es verbadoc enterprises?

**verbadoc enterprises** es una herramienta web profesional que convierte automáticamente documentos no estructurados (PDFs, imágenes, facturas, contratos, etc.) en **datos estructurados** que puedes usar directamente en Excel, bases de datos o sistemas empresariales.

### ¿Qué hace verbadoc enterprises?

Imagina que tienes 100 facturas en PDF. En lugar de teclear manualmente todos los datos, subes los archivos a verbadoc enterprises y en pocos minutos obtienes:
- ✅ Una tabla Excel con todos los datos extraídos (cliente, fecha, productos, total)
- ✅ Archivos JSON o CSV para integrar en tu sistema
- ✅ Validación automática de que los datos son correctos
- ✅ Clasificación inteligente del tipo de documento

### ¿Para quién es verbadoc enterprises?

- 💼 **Contabilidad**: Extraer datos de facturas, recibos, albaranes
- 👔 **RRHH**: Procesar nóminas, contratos laborales, CVs
- ⚖️ **Legal**: Analizar contratos, escrituras, certificados
- 💰 **Finanzas**: Extraer datos de estados financieros, reportes bancarios
- 📊 **Marketing**: Procesar presupuestos, análisis de campañas
- 🏥 **Salud**: Recetas médicas, informes clínicos, análisis

### ¿Qué hace diferente a verbadoc enterprises?

✅ **100% Procesamiento en Europa** - Tus datos nunca salen de la UE (región de Bélgica)
✅ **Cumplimiento total con GDPR** - Certificaciones ISO 27001, SOC 2
✅ **Asistente de IA integrado** - Clasifica y configura automáticamente
✅ **Multi-documento inteligente** - Detecta varios documentos en un mismo PDF
✅ **Aprende de tus correcciones** - Se vuelve más preciso con el uso
✅ **Sin almacenamiento persistente** - No guardamos tus documentos en servidores

### ¿Qué NO hace verbadoc enterprises?

❌ No es un OCR simple (es mucho más inteligente)
❌ No almacena tus documentos (procesamiento temporal)
❌ No edita documentos originales
❌ No funciona con audio o vídeo (solo documentos)

---

## 🚀 Primeros Pasos

### Paso 1: Acceder a verbadoc enterprises

1. Abre tu navegador (Chrome, Firefox, Edge recomendados)
2. Ve a: **https://verbadoc-enterprises.vercel.app**
3. Si es tu primera vez, haz clic en **"Registrarse"**
4. Introduce tu email corporativo y crea una contraseña
5. Verifica tu email
6. Inicia sesión

### Paso 2: Conocer la Interfaz

Cuando entras, ves **3 zonas principales**:

#### **Zona Izquierda: Panel de Control**
- Subir documentos
- Configurar extracción (prompt y schema)
- Ejecutar extracción
- Ver historial
- Procesar en lote

#### **Zona Central: Visualización**
- Vista previa del documento seleccionado
- Editor de resultados (JSON)
- Tabla de archivos cargados

#### **Zona Derecha: Asistente IA y Plantillas**
- **Panel del Asistente IA** (⭐ MUY IMPORTANTE)
  - Clasificar Documento
  - Validar Datos
  - Buscar Documentos (PDFs multi-doc)
- **Panel de Plantillas**
  - Plantillas predefinidas por sector
  - Tus plantillas personalizadas

#### **Zona Superior**
- Selector de modelo de IA
- Botones de exportación (JSON, Excel, CSV, PDF)
- Configuración y ayuda
- Chat con Laia (asistente virtual)

### Paso 3: Plan y Costes

verbadoc enterprises usa un modelo de **pago por uso**:

- **Sin cuota mensual fija** - Solo pagas por lo que procesas
- **Coste típico**: €0.0026 por documento (con clasificación y validación)
- **Ejemplos**:
  - 100 documentos/mes → ~€0.26
  - 1,000 documentos/mes → ~€2.60
  - 10,000 documentos/mes → ~€26.00

**Prueba gratuita**: 50 documentos gratis para probar todas las funcionalidades.

---

## 📝 Cómo Usar verbadoc enterprises - Paso a Paso

### MODO BÁSICO: Sin Asistente de IA

Este modo requiere que configures manualmente qué datos quieres extraer.

#### PASO 1: Subir tu Documento

**Opción A - Arrastrar y Soltar:**
1. Busca tu archivo (PDF o imagen) en tu ordenador
2. Arrástralo con el ratón a la zona central
3. Suéltalo cuando veas "Suelta para cargar"

**Opción B - Hacer Clic:**
1. Haz clic en **"📄 Subir archivo"** (panel izquierdo)
2. Selecciona tu archivo
3. Haz clic en "Abrir"

**Formatos compatibles:**
- PDF (.pdf)
- Imágenes: JPG, PNG, TIFF
- Documentos JSON (para importar)

**Tamaño máximo:** 10 MB por archivo

**¿Qué pasa ahora?**
- El archivo aparece en la tabla central
- Estado: "Pendiente ⏳"
- Puedes ver una vista previa haciendo clic en el ícono 👁️

#### PASO 2: Configurar la Extracción Manualmente

Si no usas el Asistente IA, debes configurar dos cosas:

##### **A) El Prompt (Instrucciones en lenguaje natural)**

En el panel izquierdo, sección "Prompt", escribe qué datos quieres extraer:

**Ejemplo para una factura:**
```
Extrae de esta factura comercial los siguientes datos:
- Número de factura
- Nombre completo del cliente
- Fecha de emisión (formato DD/MM/YYYY)
- Lista de todos los productos con descripción y precio unitario
- Subtotal, IVA (21%) y total

Si algún dato no está visible, devuelve null.
```

**Consejos para un buen prompt:**
- ✅ Sé específico: "Fecha de emisión" es mejor que "fecha"
- ✅ Indica formato deseado: "DD/MM/YYYY", "con 2 decimales"
- ✅ Menciona qué hacer si falta un dato: "devuelve null" o "devuelve 0"
- ✅ Si hay listas, dilo: "lista de todos los productos"

##### **B) El Schema (Estructura de datos esperada)**

Haz clic en **"+ Agregar Campo"** para cada dato que quieres extraer.

**Ejemplo para la misma factura:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| numero_factura | STRING | Número de factura |
| cliente_nombre | STRING | Nombre del cliente |
| fecha_emision | STRING | Fecha (DD/MM/YYYY) |
| productos | ARRAY_OF_OBJECTS | Lista de productos |
| - descripcion | STRING | Nombre del producto |
| - precio_unitario | NUMBER | Precio por unidad |
| subtotal | NUMBER | Subtotal sin IVA |
| iva | NUMBER | IVA (21%) |
| total | NUMBER | Total con IVA |

**Tipos de datos disponibles:**

- **STRING**: Texto (nombres, direcciones, códigos)
- **NUMBER**: Números (precios, cantidades, porcentajes)
- **BOOLEAN**: Verdadero/falso (sí/no, activo/inactivo)
- **ARRAY**: Lista simple (ej: ["producto1", "producto2"])
- **OBJECT**: Objeto anidado (ej: dirección con calle, ciudad, CP)
- **ARRAY_OF_OBJECTS**: Lista de objetos complejos (ej: productos con nombre, precio, cantidad)

**Campos anidados (ARRAY_OF_OBJECTS):**

Si tienes una tabla de productos, crea el campo `productos` como ARRAY_OF_OBJECTS, luego agrega campos hijos:
- `descripcion` (STRING)
- `cantidad` (NUMBER)
- `precio_unitario` (NUMBER)
- `total_linea` (NUMBER)

#### PASO 3: Seleccionar Modelo de IA

En la parte superior, verás 3 modelos:

**Genérico** (más barato, más rápido)
- Documentos simples y formularios estándar
- ~€0.0005 por documento

**Recomendado** ⭐ (equilibrado)
- Facturas, contratos, informes
- ~€0.0016 por documento
- **Seleccionado por defecto**

**Avanzado** (más preciso, más lento)
- Documentos complejos con múltiples tablas
- ~€0.008 por documento

Para empezar, usa **"Recomendado"**.

#### PASO 4: Ejecutar Extracción

1. Verifica que has:
   - ✅ Subido el archivo
   - ✅ Escrito el prompt
   - ✅ Definido el schema
   - ✅ Seleccionado el modelo

2. Haz clic en **"🚀 Ejecutar Extracción"** (botón azul grande)

**¿Qué pasa ahora?**
- Estado cambia a "Procesando... 🔄"
- Progreso en tiempo real
- Tiempo estimado: 5-10 segundos

#### PASO 5: Ver Resultados

Cuando termine (estado "Completado ✅"):

- En la zona central verás el **JSON con los datos extraídos**
- Puedes editar manualmente cualquier campo si hay errores
- Los datos se guardan automáticamente en el historial

**Ejemplo de resultado:**

```json
{
  "numero_factura": "FAC-2025-001414",
  "cliente_nombre": "Empresa ABC S.L.",
  "fecha_emision": "15/01/2025",
  "productos": [
    {
      "descripcion": "Servicio de consultoría",
      "precio_unitario": 1000.00
    },
    {
      "descripcion": "Soporte técnico",
      "precio_unitario": 250.50
    }
  ],
  "subtotal": 1250.50,
  "iva": 262.61,
  "total": 1513.11
}
```

---

### MODO AVANZADO: Con Asistente de IA ⭐ (RECOMENDADO)

Este modo usa inteligencia artificial para configurar automáticamente el prompt y schema.

#### PASO 1-2: Subir Documento (igual que antes)

Sube tu archivo PDF o imagen.

#### PASO 3: El Asistente IA Aparece Automáticamente

En el panel derecho verás **"🤖 Asistente IA"** con varios botones:

#### PASO 4: Clasificar Documento Automáticamente

1. Haz clic en **"🔍 Clasificar Documento"**
2. Espera **3-5 segundos**
3. La IA analiza visualmente tu documento

**¿Qué pasa ahora?**

El Asistente muestra:

```
✅ FACTURA COMERCIAL
Confianza: 95%

Razón: Documento con logo de empresa, tabla de productos,
desglose de IVA y número de factura visible.

Indicadores clave detectados:
• Logo de empresa en esquina superior
• Número de factura: FAC-001414
• Tabla con productos y precios
• Subtotal: 1,250.50€
• IVA (21%): 262.61€
• Total: 1,513.11€
```

**Y AUTOMÁTICAMENTE:**
- ✅ El **prompt** se llena con instrucciones óptimas
- ✅ El **schema** se configura con los campos correctos
- ✅ Ya está listo para extraer

**Tipos de documentos que detecta (15+):**

| Tipo | Descripción |
|------|-------------|
| factura_comercial | Facturas de venta |
| factura_proveedor | Facturas recibidas |
| albaran_entrega | Albaranes de mercancía |
| contrato_laboral | Contratos de trabajo |
| contrato_arrendamiento | Contratos de alquiler |
| dni_frontal | DNI/NIE (cara frontal) |
| dni_completo | DNI (ambas caras) |
| pasaporte | Pasaportes |
| receta_medica | Recetas médicas |
| informe_medico | Informes clínicos |
| analisis_clinico | Resultados de análisis |
| nomina | Nóminas laborales |
| certificado_empresa | Certificados empresariales |
| certificado_academico | Títulos, diplomas |
| escritura_publica | Documentos notariales |

**Precisión de clasificación:**
- Facturas: 95-98%
- DNI/Pasaportes: 90-95%
- Contratos: 85-90%
- Recetas médicas: 88-92%
- Documentos genéricos: 70-80%

**Coste:** €0.0005 por clasificación (se ejecuta una sola vez)

#### PASO 5: Revisar y Ajustar (Opcional)

Aunque la IA configura todo automáticamente, puedes:
- Editar el prompt para añadir instrucciones específicas
- Agregar campos adicionales al schema
- Eliminar campos que no necesites

#### PASO 6: Ejecutar Extracción

Haz clic en **"🚀 Ejecutar Extracción"**

Tiempo típico: **5-8 segundos**

#### PASO 7: Validar Datos Automáticamente

Una vez extraídos los datos, puedes validarlos:

1. Haz clic en **"🔍 Validar Datos"** (en el Asistente IA)
2. Espera **2-3 segundos**
3. La IA revisa los datos extraídos

**¿Qué valida?**

✅ **Campos completos**: Todos los datos obligatorios están presentes
✅ **Formatos correctos**: Fechas (DD/MM/YYYY), números, emails, CIF/NIF
✅ **Coherencia matemática**: Total = Subtotal + IVA
✅ **Valores razonables**: No hay fechas futuras, precios negativos, etc.
✅ **Coincidencia con documento**: Los datos se ven en el PDF original

**Resultado de ejemplo:**

```
Score de Calidad: 87/100

Problemas detectados:

❌ ERROR - Campo "total"
   Valor extraído: 1,240.50€
   Valor esperado: 1,513.11€
   Razón: El cálculo no coincide (Subtotal 1,250.50 + IVA 262.61 = 1,513.11)
   Sugerencia: Cambiar a 1,513.11

⚠️ ADVERTENCIA - Campo "fecha_emision"
   Valor: "15 de Enero 2025"
   Razón: Formato no estándar. Se esperaba DD/MM/YYYY
   Sugerencia: Cambiar a "15/01/2025"

ℹ️ INFO - Campo "cliente_email"
   Razón: Campo vacío (no visible en el documento)
```

**Niveles de severidad:**

- ❌ **ERROR**: Problema crítico que debe corregirse
- ⚠️ **ADVERTENCIA**: Inconsistencia menor, revisar
- ℹ️ **INFO**: Información adicional, no crítico

**Dos modos de validación:**

##### **Validación Básica (Gratis, instantánea)**
- Verifica campos vacíos
- Valida formatos (fechas, números, emails, CIF/NIF españoles)
- Detecta valores fuera de rango
- **Coste:** €0 (se ejecuta localmente)
- **Tiempo:** < 100 milisegundos

##### **Validación Avanzada con IA (€0.0005)**
- Todo lo anterior +
- Coherencia matemática (cálculos, porcentajes)
- Comparación visual con el documento original
- Detección de valores sospechosos
- Sugerencias de corrección
- **Coste:** €0.0005 por validación
- **Tiempo:** 2-3 segundos

#### PASO 8: Corregir Errores (Si es necesario)

Si la validación detectó errores:

1. Edita los campos directamente en el JSON
2. Haz clic en "Guardar Cambios"
3. El sistema **aprende** de tus correcciones

**Sistema de Aprendizaje Continuo:**

Cada vez que corriges un error:
- El sistema guarda tu corrección
- Detecta patrones de error
- Aplica correcciones automáticamente en el futuro

**Ejemplo:**

```
Corrección 1: Fecha "18/01/2025" → "15/01/2025"
Corrección 2: Fecha "18/02/2025" → "15/02/2025"
Corrección 3: Fecha "18/03/2025" → "15/03/2025"

→ Patrón detectado: OCR confunde "15" con "18"
→ Próximas extracciones: Aplica corrección automáticamente
```

**Mejora de precisión esperada:**

- Mes 1: 85-87%
- Mes 3: 91-94%
- Mes 6: 94-97%
- Mes 12: 97-99%

---

## 🤖 El Asistente de IA - Funcionalidades Explicadas

El **Asistente de IA** es el corazón de verbadoc enterprises. Aquí explicamos en detalle cada una de sus funcionalidades.

### 1. 🔍 Clasificación Automática de Documentos

#### ¿Qué hace exactamente?

Analiza tu documento visualmente (usando visión por computadora) e identifica:
- **Tipo de documento** (factura, DNI, contrato, etc.)
- **Nivel de confianza** (0-100%)
- **Razones** por las que lo clasificó así
- **Indicadores clave** encontrados

#### ¿Cómo funciona técnicamente?

1. Convierte tu documento a imagen
2. Lo envía al modelo **Gemini 2.5 Flash-Lite** (Google)
3. La IA analiza:
   - Layout y estructura
   - Logos y membretados
   - Campos típicos (número de factura, DNI, etc.)
   - Tablas y formato
4. Compara con una base de conocimiento de 15+ tipos de documentos
5. Devuelve el tipo más probable + confianza

#### ¿Qué tarda?

⏱️ **2-5 segundos** (depende del tamaño del archivo)

#### ¿Cuánto cuesta?

💰 **€0.0005 por documento** (medio céntimo)

#### ¿Qué precisión tiene?

- Facturas comerciales: **95-98%**
- DNI/Pasaportes: **90-95%**
- Contratos: **85-90%**
- Recetas médicas: **88-92%**
- Documentos desconocidos: **70-80%**

#### ¿Cuándo usarlo?

✅ **Siempre que no sepas qué tipo de documento es**
✅ **Cuando proceses muchos documentos mixtos**
✅ **Para ahorrar tiempo configurando el schema**

❌ **No es necesario** si siempre procesas el mismo tipo de documento (ej: siempre facturas)

#### Ejemplo visual:

**Antes de clasificar:**
```
Documento: factura_empresa_abc.pdf
Prompt: (vacío)
Schema: (vacío)
```

**Después de clasificar:**
```
Tipo detectado: FACTURA COMERCIAL (95%)

Prompt (generado automáticamente):
"Extrae de esta factura comercial:
- Número de factura
- Cliente (nombre completo)
- Fecha de emisión (DD/MM/YYYY)
- Productos (descripción, cantidad, precio)
- Subtotal, IVA, Total"

Schema (generado automáticamente):
• numero_factura (STRING)
• cliente_nombre (STRING)
• fecha_emision (STRING)
• productos (ARRAY_OF_OBJECTS)
  - descripcion (STRING)
  - cantidad (NUMBER)
  - precio_unitario (NUMBER)
• subtotal (NUMBER)
• iva (NUMBER)
• total (NUMBER)
```

---

### 2. 🔍 Validación Inteligente de Datos

#### ¿Qué hace exactamente?

Después de extraer datos, los **revisa** para detectar errores o inconsistencias.

#### Tipos de validación:

##### **A) Validación Básica (Sin IA, gratis)**

Verifica:
- ✅ Campos vacíos o nulos
- ✅ Tipos de datos incorrectos (texto donde debería haber número)
- ✅ Formatos inválidos:
  - Fechas que no son DD/MM/YYYY
  - Emails sin @
  - CIF/NIF españoles incorrectos (verifica dígito de control)
  - Números con formato erróneo
- ✅ Valores fuera de rango:
  - Fechas futuras (cuando no tiene sentido)
  - Precios negativos
  - Porcentajes > 100%

**Tiempo:** < 100 milisegundos (instantáneo)
**Coste:** €0 (gratis)

##### **B) Validación Avanzada con IA**

Todo lo anterior **más**:

- ✅ **Coherencia matemática**:
  ```
  ¿Subtotal + IVA = Total?
  ¿Precio × Cantidad = Total línea?
  ¿Base imponible × % IVA = Importe IVA?
  ```

- ✅ **Coherencia lógica**:
  ```
  ¿La fecha de vencimiento es posterior a la de emisión?
  ¿El porcentaje de IVA es 0%, 4%, 10% o 21% (España)?
  ¿El CIF corresponde con el tipo de empresa?
  ```

- ✅ **Comparación visual con documento**:
  ```
  ¿El total extraído (1,250.50€) se ve en el PDF?
  ¿La fecha 15/01/2025 coincide con lo escrito?
  ```

- ✅ **Detección de OCR mal interpretado**:
  ```
  "18" que debería ser "15" (confusión común)
  "O" (letra) que debería ser "0" (cero)
  "l" (L minúscula) que debería ser "1"
  ```

**Tiempo:** 2-3 segundos
**Coste:** €0.0005 por validación

#### ¿Cómo funciona técnicamente?

1. **Validación básica** se ejecuta siempre (local, en tu navegador)
2. Si haces clic en "🔍 Validar Datos", ejecuta **validación avanzada**:
   - Envía los datos extraídos + imagen del documento a Gemini
   - La IA compara datos con documento original
   - Detecta inconsistencias
   - Sugiere correcciones

#### Resultado de ejemplo:

```json
{
  "isValid": false,
  "confidence": 0.87,
  "score": 78,
  "issues": [
    {
      "field": "total",
      "severity": "error",
      "message": "El total calculado (1,513.11€) no coincide con el extraído (1,240.50€)",
      "originalValue": 1240.50,
      "suggestedFix": 1513.11,
      "reasoning": "Subtotal (1,250.50) + IVA 21% (262.61) = 1,513.11"
    },
    {
      "field": "fecha_emision",
      "severity": "warning",
      "message": "Formato no estándar",
      "originalValue": "15 de Enero 2025",
      "suggestedFix": "15/01/2025"
    },
    {
      "field": "cliente_email",
      "severity": "info",
      "message": "Campo vacío (no visible en documento)"
    }
  ],
  "suggestions": [
    "Verifica el cálculo del total manualmente",
    "Estandariza el formato de fechas en tu schema"
  ]
}
```

#### ¿Cuándo usarlo?

✅ **Documentos críticos** (facturas, contratos importantes)
✅ **Cuando detectes errores frecuentes** en tus extracciones
✅ **Procesamiento de documentos escaneados** (más propensos a errores de OCR)
✅ **Antes de importar datos a sistemas empresariales**

❌ **No necesario** si solo necesitas extracción rápida y revisarás manualmente

---

### 3. 🔍 Segmentación de PDFs Multi-Documento

#### ¿Qué hace exactamente?

Detecta si un PDF contiene **múltiples documentos independientes** y los separa automáticamente.

#### Casos de uso:

**Ejemplo 1: Contabilidad**
```
Archivo: facturas_enero_2025.pdf (15 páginas)
┌─────────────────────────────────────────┐
│ Página 1-2:  Factura de Proveedor A     │
│ Página 3:    Factura de Proveedor B     │
│ Página 4-6:  Factura de Proveedor C     │
│ Página 7:    Albarán de entrega         │
│ Página 8-15: Contrato de servicios      │
└─────────────────────────────────────────┘

Resultado:
✅ 5 documentos detectados:
  1. Factura (pág. 1-2)
  2. Factura (pág. 3)
  3. Factura (pág. 4-6)
  4. Albarán (pág. 7)
  5. Contrato (pág. 8-15)
```

**Ejemplo 2: RRHH**
```
Archivo: documentacion_nuevo_empleado.pdf (10 páginas)
┌─────────────────────────────────────────┐
│ Página 1-4:  Contrato laboral           │
│ Página 5:    DNI frontal                │
│ Página 6:    DNI reverso                │
│ Página 7-8:  Título universitario       │
│ Página 9-10: Certificado de antecedentes│
└─────────────────────────────────────────┘

Resultado:
✅ 4 documentos detectados:
  1. Contrato laboral (pág. 1-4)
  2. DNI completo (pág. 5-6)
  3. Título (pág. 7-8)
  4. Certificado (pág. 9-10)
```

#### ¿Cómo funciona técnicamente?

1. Analiza **visualmente** cada página del PDF
2. Detecta cambios de:
   - Logo/membretado de empresa
   - Estructura y diseño
   - Tipo de documento
3. **NO separa** páginas consecutivas del mismo documento:
   ```
   ❌ MAL: Separar página 2 y 3 de un contrato de 5 páginas
   ✅ BIEN: Reconocer que las 5 páginas son un solo contrato
   ```
4. Agrupa páginas que pertenecen al mismo documento
5. Devuelve lista de segmentos con:
   - Páginas que incluye
   - Tipo de documento
   - Confianza

#### ¿Qué tarda?

⏱️ **8-12 segundos** (independiente del número de páginas)

- PDF de 5 páginas: ~8 segundos
- PDF de 50 páginas: ~12 segundos
- PDF de 100 páginas: ~15 segundos

#### ¿Cuánto cuesta?

💰 **€0.0016 por PDF completo** (no importa cuántos documentos contenga)

#### ¿Qué precisión tiene?

- Documentos claramente diferentes (factura + DNI + contrato): **85-95%**
- Documentos similares (3 facturas del mismo proveedor): **70-80%**
- Falsos positivos (separar páginas del mismo doc): **< 5%**

#### Resultado de ejemplo:

```json
{
  "originalFileName": "documentos_varios.pdf",
  "totalPages": 10,
  "segmentsFound": 3,
  "processingTime": 8500,
  "segments": [
    {
      "id": "seg_001",
      "pageNumbers": [1, 2, 3],
      "documentType": "factura_comercial",
      "confidence": 0.95,
      "reasoning": "Factura con logo de Empresa ABC, tabla de productos y totales"
    },
    {
      "id": "seg_002",
      "pageNumbers": [4],
      "documentType": "dni_frontal",
      "confidence": 0.98,
      "reasoning": "DNI español con fotografía y datos personales"
    },
    {
      "id": "seg_003",
      "pageNumbers": [5, 6, 7, 8, 9, 10],
      "documentType": "contrato_arrendamiento",
      "confidence": 0.92,
      "reasoning": "Contrato de alquiler de 6 páginas con cláusulas y firmas"
    }
  ]
}
```

#### ¿Cómo usarlo?

**PASO 1:** Sube el PDF multi-documento

**PASO 2:** En el Asistente IA verás:
```
📄 PDF detectado: 10 páginas
¿Contiene múltiples documentos?
```

**PASO 3:** Haz clic en **"🔍 Buscar Documentos"**

**PASO 4:** Espera 8-12 segundos

**PASO 5:** Verás la lista de documentos detectados:
```
✅ 3 documento(s) detectado(s)

┌─────────────────────────────────────────┐
│ Documento 1: Factura Comercial          │
│ Páginas: 1, 2, 3                        │
│ Confianza: 95%                          │
│ [Ver] [Extraer]                         │
├─────────────────────────────────────────┤
│ Documento 2: DNI Frontal                │
│ Páginas: 4                              │
│ Confianza: 98%                          │
│ [Ver] [Extraer]                         │
├─────────────────────────────────────────┤
│ Documento 3: Contrato Arrendamiento     │
│ Páginas: 5, 6, 7, 8, 9, 10             │
│ Confianza: 92%                          │
│ [Ver] [Extraer]                         │
└─────────────────────────────────────────┘

[🚀 Procesar Todos los Documentos]
```

**PASO 6:** Opciones:

- **Ver**: Muestra solo las páginas de ese documento
- **Extraer**: Extrae datos solo de ese documento
- **Procesar Todos**: Extrae datos de todos automáticamente

**PASO 7:** Si haces clic en "Procesar Todos":
- Cada documento se clasifica automáticamente
- Se genera schema específico para cada tipo
- Se extraen datos de todos
- Obtienes un Excel con todos los resultados

#### ¿Cuándo usarlo?

✅ **Recibes PDFs con múltiples facturas escaneadas juntas**
✅ **Documentación de empleados (contrato + DNI + títulos)**
✅ **Expedientes legales (escrituras + contratos + certificados)**
✅ **Archivos contables mensuales**

❌ **No necesario** si cada PDF contiene solo un documento

---

### 4. 🧠 Generación Automática de Schema desde Prompt

#### ¿Qué hace exactamente?

Si solo quieres escribir el **prompt** (en lenguaje natural) y que la IA genere el **schema** automáticamente.

#### Ejemplo:

**Tú escribes solo esto:**
```
Extrae de esta factura:
- Nombre del cliente
- Número de factura
- Fecha de emisión
- Todos los productos con descripción y precio
- Subtotal, IVA y total
```

**La IA genera esto automáticamente:**
```javascript
[
  { name: 'nombre_cliente', type: 'STRING' },
  { name: 'numero_factura', type: 'STRING' },
  { name: 'fecha_emision', type: 'STRING' },
  {
    name: 'productos',
    type: 'ARRAY_OF_OBJECTS',
    children: [
      { name: 'descripcion', type: 'STRING' },
      { name: 'precio', type: 'NUMBER' }
    ]
  },
  { name: 'subtotal', type: 'NUMBER' },
  { name: 'iva', type: 'NUMBER' },
  { name: 'total', type: 'NUMBER' }
]
```

#### ¿Cómo usarlo?

1. Escribe el prompt en lenguaje natural
2. **NO** definas el schema manualmente
3. Haz clic en **"Generar Schema desde Prompt"**
4. Espera 3-5 segundos
5. El schema aparece automáticamente
6. Puedes editarlo si quieres ajustar algo

#### ¿Qué tarda?

⏱️ **3-5 segundos**

#### ¿Cuánto cuesta?

💰 **€0.0005 por generación**

---

### 5. 🔎 Búsqueda de Imágenes en Documentos

#### ¿Qué hace exactamente?

Busca si un documento contiene una **imagen específica** (logo, firma, sello, etc.).

#### Casos de uso:

**1. Verificación de autenticidad**
```
Tengo el logo oficial de mi empresa.
Quiero verificar que esta factura es auténtica.
```

**2. Detección de firmas**
```
Tengo la firma digitalizada del director.
Quiero verificar si firmó este contrato.
```

**3. Búsqueda de sellos**
```
Tengo el sello oficial del organismo.
Quiero verificar si está en este certificado.
```

#### ¿Cómo usarlo?

1. Tienes un documento (PDF o imagen)
2. Tienes una imagen de referencia (logo, firma, sello)
3. Haces clic en **"Buscar Imagen"**
4. Subes la imagen de referencia
5. La IA busca esa imagen en el documento

#### Resultado:

```json
{
  "found": true,
  "description": "Se encontró el logo de Empresa ABC en la esquina superior izquierda",
  "location": "Página 1, esquina superior izquierda",
  "confidence": "alta",
  "matchPercentage": 92
}
```

#### ¿Qué tarda?

⏱️ **4-7 segundos**

#### ¿Cuánto cuesta?

💰 **€0.0005 por búsqueda**

---

## 🎯 Modelos de IA Disponibles

verbadoc enterprises usa **Google Gemini** (región Europa - Bélgica 🇪🇺) con 3 modelos seleccionables:

### Comparativa Rápida

| Característica | Genérico | Recomendado ⭐ | Avanzado |
|----------------|----------|---------------|----------|
| **Modelo** | Flash-Lite | Flash | Pro |
| **Coste/doc** | ~€0.0005 | ~€0.0016 | ~€0.008 |
| **Velocidad** | 2-5 seg | 3-8 seg | 5-15 seg |
| **Precisión** | 85-90% | 92-95% | 96-98% |
| **Uso ideal** | Simple | Estándar | Complejo |

### 1. Genérico (Flash-Lite) 💡

**ID del modelo:** `gemini-2.5-flash-lite`

**Características:**
- ⚡ **Muy rápido**: 2-5 segundos
- 💰 **Más económico**: ~€0.0005 por documento (~3x más barato)
- 📊 **Precisión**: 85-90%

**¿Cuándo usarlo?**

✅ Documentos **simples y estandarizados**:
- Formularios con campos fijos
- Recetas médicas estándar
- Albaranes simples
- DNI/Pasaportes

✅ **Alto volumen** con presupuesto ajustado:
- Procesar 10,000+ documentos/mes
- Coste: ~€5 (vs €16 con Recomendado)

❌ **NO usar para**:
- Documentos complejos con múltiples tablas
- Facturas con productos variados
- Contratos largos
- Documentos escaneados de baja calidad

**Ejemplo de coste:**

```
1,000 documentos/mes × €0.0005 = €0.50
10,000 documentos/mes × €0.0005 = €5.00
```

---

### 2. Recomendado (Flash) ⭐ (PREDETERMINADO)

**ID del modelo:** `gemini-2.5-flash`

**Características:**
- ⚡ **Rápido**: 3-8 segundos
- 💰 **Equilibrado**: ~€0.0016 por documento
- 📊 **Precisión**: 92-95%
- 🎯 **Mejor relación calidad-precio**

**¿Cuándo usarlo?**

✅ **Uso general** (seleccionado por defecto):
- Facturas comerciales estándar
- Contratos de 2-5 páginas
- Informes clínicos
- Nóminas
- Documentos corporativos

✅ **El 90% de los casos**

❌ **NO usar para**:
- Documentos extremadamente complejos (facturas de construcción con 50 líneas)
- Documentos escaneados muy deteriorados

**Ejemplo de coste:**

```
1,000 documentos/mes × €0.0016 = €1.60
10,000 documentos/mes × €0.0016 = €16.00
```

---

### 3. Avanzado (Pro) 🚀

**ID del modelo:** `gemini-2.5-pro`

**Características:**
- 🐢 **Más lento**: 5-15 segundos
- 💰 **Más caro**: ~€0.008 por documento (~5x más que Genérico)
- 📊 **Máxima precisión**: 96-98%
- 🧠 **Más inteligente**: Mejor razonamiento lógico

**¿Cuándo usarlo?**

✅ Documentos **muy complejos**:
- Facturas de construcción con 50+ líneas de productos
- Contratos de 20+ páginas con cláusulas complejas
- Estados financieros consolidados
- Escrituras públicas
- Documentos técnicos

✅ Documentos **críticos** donde un error cuesta caro:
- Contratos millonarios
- Documentación legal importante
- Auditorías financieras

✅ Documentos **escaneados de baja calidad**:
- PDFs antiguos de los años 90
- Fotocopias de fotocopias
- Documentos deteriorados

❌ **NO usar para**:
- Documentos simples (desperdicio de dinero)
- Alto volumen de documentos estándar

**Ejemplo de coste:**

```
1,000 documentos/mes × €0.008 = €8.00
10,000 documentos/mes × €0.008 = €80.00
```

---

### ¿Cómo elegir el modelo correcto?

**Diagrama de decisión:**

```
¿Es un documento simple (formulario, DNI, receta estándar)?
  └─ SÍ → Genérico

¿Es un documento estándar (factura, contrato típico)?
  └─ SÍ → Recomendado ⭐

¿Es extremadamente complejo o crítico?
  └─ SÍ → Avanzado

¿No estás seguro?
  └─ Usa Recomendado ⭐ (cubre el 90% de casos)
```

**Consejos de experto:**

1️⃣ **Empieza con Recomendado** - Cubre la mayoría de casos

2️⃣ **Prueba con un documento primero** - Extrae 1 documento con cada modelo y compara resultados

3️⃣ **Considera el volumen**:
- < 1,000 docs/mes → Usa Avanzado si necesitas máxima precisión
- 1,000-10,000 docs/mes → Usa Recomendado
- > 10,000 docs/mes → Usa Genérico si son documentos simples

4️⃣ **Mezcla modelos según tipo**:
```
Recetas médicas → Genérico (€0.0005)
Facturas → Recomendado (€0.0016)
Contratos importantes → Avanzado (€0.008)
```

---

### Ubicación geográfica y GDPR

**Todos los modelos procesan en:**
- 🇪🇺 **Región**: europe-west1 (Bélgica)
- 🔒 **Cumplimiento**: 100% GDPR
- 🚫 **Transferencias**: 0% fuera del Espacio Económico Europeo
- ✅ **Certificaciones**: ISO 27001, SOC 2, GDPR-compliant

---

## 📁 Gestión de Archivos y Plantillas

### Gestión de Archivos

#### Subir Múltiples Archivos

Puedes subir **hasta 50 archivos simultáneamente**:

1. Selecciona todos los archivos (Ctrl+Click o Cmd+Click)
2. Arrástralos a la zona de carga
3. Todos aparecen en la tabla

#### Estados de Archivos

| Estado | Descripción |
|--------|-------------|
| ⏳ Pendiente | Archivo cargado, esperando procesamiento |
| 🔄 Procesando | Extracción en curso |
| ✅ Completado | Datos extraídos correctamente |
| ❌ Error | Error en la extracción |

#### Ver Vista Previa

Haz clic en el ícono 👁️ junto al nombre del archivo para ver el documento completo.

---

### Sistema de Plantillas

Las **plantillas** son configuraciones guardadas (prompt + schema) que puedes reutilizar.

#### Tipos de Plantillas

##### **1. Plantillas Predefinidas** (Incluidas)

verbadoc enterprises incluye **15+ plantillas** listas para usar:

**Contabilidad:**
- Factura Comercial
- Factura de Proveedor
- Albarán de Entrega
- Recibo

**RRHH:**
- Nómina
- Contrato Laboral
- CV/Currículum

**Legal:**
- Contrato de Arrendamiento
- Contrato de Compraventa
- Escritura Pública

**Identificación:**
- DNI Frontal
- DNI Completo (ambas caras)
- Pasaporte

**Salud:**
- Receta Médica
- Informe Médico
- Análisis Clínico

**General:**
- Formulario de Contacto
- Documento Corporativo
- Certificado

##### **2. Plantillas Personalizadas** (Las que creas tú)

Puedes crear tus propias plantillas:

**PASO 1:** Configura una extracción (prompt + schema)

**PASO 2:** Haz clic en **"Guardar como Plantilla"**

**PASO 3:** Rellena:
- **Nombre**: "Factura de mi empresa"
- **Descripción**: "Factura estándar con productos y servicios"
- **Departamento**: Contabilidad
- **Tipo**: Factura

**PASO 4:** Haz clic en "Guardar"

**Resultado:**
- Aparece en "Mis Modelos" (panel derecho)
- Puedes usarla en futuros documentos
- Se guarda en tu navegador (localStorage)

#### Cómo Usar una Plantilla

**Método 1: Antes de subir archivo**
1. Haz clic en una plantilla (panel derecho)
2. Sube el archivo
3. Ejecuta extracción (ya configurada)

**Método 2: Después de subir archivo**
1. Sube el archivo
2. Haz clic en una plantilla
3. El prompt y schema se llenan automáticamente
4. Ejecuta extracción

#### Gestionar Plantillas

**Editar:**
1. Haz clic en el ícono ✏️ junto a la plantilla
2. Modifica prompt o schema
3. Guarda cambios

**Eliminar:**
1. Haz clic en el ícono 🗑️
2. Confirma eliminación

**Exportar:**
1. Haz clic en **"Exportar Plantillas"**
2. Se descarga un archivo JSON
3. Puedes compartirlo con tu equipo

**Importar:**
1. Haz clic en **"Importar Plantillas"**
2. Selecciona el archivo JSON
3. Las plantillas se añaden a tu lista

---

### Departamentos

Las plantillas se organizan por departamento:

- **General**: Plantillas genéricas
- **Contabilidad**: Facturas, recibos, albaranes
- **Finanzas**: Estados financieros, reportes bancarios
- **Marketing**: Presupuestos, análisis de campañas
- **Legal**: Contratos, escrituras, certificados
- **Recursos Humanos**: Nóminas, contratos laborales, CVs
- **Salud**: Recetas, informes clínicos, análisis

Filtra por departamento para encontrar plantillas más rápido.

---

## 📥 Descargar y Exportar Resultados

verbadoc enterprises permite exportar los datos extraídos en **4 formatos**:

### 1. 📄 JSON

**¿Qué es?**
Formato de datos estructurados legible por máquinas.

**¿Para qué sirve?**
- Integración con APIs
- Programación (JavaScript, Python, etc.)
- Sistemas empresariales

**Cómo descargar:**
1. Haz clic en **"JSON"** (botón azul)
2. Se descarga `resultado.json`

**Ejemplo:**
```json
{
  "numero_factura": "FAC-2025-001414",
  "cliente_nombre": "Empresa ABC S.L.",
  "total": 1513.11
}
```

---

### 2. 📊 Excel (.xlsx)

**¿Qué es?**
Archivo de Microsoft Excel.

**¿Para qué sirve?**
- Análisis de datos
- Reportes
- Contabilidad

**Cómo descargar:**
1. Haz clic en **"Excel"** (botón verde)
2. Se descarga `resultado.xlsx`

**Características:**
- Columnas auto-ajustadas
- Formato de celdas correcto (números, fechas)
- Si hay arrays (productos), crea múltiples hojas

**Ejemplo:**

**Hoja 1: Datos Principales**
| numero_factura | cliente_nombre | fecha_emision | total |
|----------------|----------------|---------------|-------|
| FAC-2025-001414 | Empresa ABC S.L. | 15/01/2025 | 1513.11 |

**Hoja 2: Productos**
| descripcion | cantidad | precio_unitario | total_linea |
|-------------|----------|-----------------|-------------|
| Servicio de consultoría | 1 | 1000.00 | 1000.00 |
| Soporte técnico | 1 | 250.50 | 250.50 |

---

### 3. 📋 CSV

**¿Qué es?**
Archivo de valores separados por comas.

**¿Para qué sirve?**
- Importar a Google Sheets
- Bases de datos
- Sistemas legacy

**Cómo descargar:**
1. Haz clic en **"CSV"** (botón verde claro)
2. Se descarga `resultado.csv`

**Encoding:** UTF-8 con BOM (compatible con Excel en español)

**Ejemplo:**
```csv
numero_factura,cliente_nombre,fecha_emision,total
FAC-2025-001414,Empresa ABC S.L.,15/01/2025,1513.11
```

---

### 4. 📄 PDF

**¿Qué es?**
Documento PDF formateado profesionalmente.

**¿Para qué sirve?**
- Imprimir
- Archivar
- Enviar a clientes

**Cómo descargar:**
1. Haz clic en **"PDF"** (botón rojo)
2. Se descarga `resultado.pdf`

**Dos formatos:**

##### **A) Formato Vertical (Campo: Valor)**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATOS EXTRAÍDOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Número de Factura: FAC-2025-001414
Cliente: Empresa ABC S.L.
Fecha de Emisión: 15/01/2025
Total: 1,513.11€

PRODUCTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Producto 1:
  Descripción: Servicio de consultoría
  Precio: 1,000.00€

Producto 2:
  Descripción: Soporte técnico
  Precio: 250.50€
```

##### **B) Formato Horizontal (Tabla)**
```
┌──────────────┬────────────────┬──────────────┬─────────┐
│ Nº Factura   │ Cliente        │ Fecha        │ Total   │
├──────────────┼────────────────┼──────────────┼─────────┤
│FAC-2025-00141│Empresa ABC S.L.│ 15/01/2025   │1,513.11€│
└──────────────┴────────────────┴──────────────┴─────────┘
```

---

### Exportar Historial Completo

Puedes exportar **todos** los documentos procesados de una vez:

**PASO 1:** Haz clic en **"⏱️ Historial"** (panel izquierdo)

**PASO 2:** Verás todos tus trabajos anteriores

**PASO 3:** Haz clic en **"Exportar Historial"**

**PASO 4:** Elige formato:
- **Excel Horizontal**: Todos los documentos en una sola tabla
- **Excel Pivotado**: Cada documento en una hoja separada
- **JSON**: Array con todos los resultados
- **CSV**: Tabla plana

**Ejemplo de Excel Horizontal:**

| archivo | numero_factura | cliente | total | fecha_procesamiento |
|---------|----------------|---------|-------|---------------------|
| factura1.pdf | FAC-001 | Cliente A | 1000.00 | 2025-01-15 10:30:00 |
| factura2.pdf | FAC-002 | Cliente B | 2500.50 | 2025-01-15 10:31:15 |
| factura3.pdf | FAC-003 | Cliente C | 750.00 | 2025-01-15 10:32:30 |

Perfecto para análisis en Excel, reportes mensuales, o importar a sistemas de contabilidad.

---

## 🔄 Procesamiento en Lote

El **procesamiento en lote** te permite extraer datos de **múltiples documentos automáticamente** con una sola configuración.

### ¿Cuándo usarlo?

✅ Tienes **10+ documentos** del mismo tipo (ej: facturas del mes)
✅ Quieres **ahorrar tiempo** (no hacer clic 100 veces)
✅ Todos los documentos tienen **estructura similar**
✅ Necesitas **exportar todo a Excel** al final

### Cómo Funcionar

#### PASO 1: Subir Todos los Archivos

Selecciona y sube todos los documentos (ej: 50 facturas).

#### PASO 2: Configurar con el Primer Documento

1. Selecciona el **primer documento** de la lista
2. Usa el Asistente IA para clasificarlo
3. Verifica que el prompt y schema sean correctos
4. Prueba la extracción con este documento
5. Ajusta si es necesario

#### PASO 3: Procesar Todos

1. Haz clic en **"Procesar Todos"** (panel izquierdo)

2. Configura las opciones:

```
┌─────────────────────────────────────────┐
│ CONFIGURACIÓN DE LOTE                   │
├─────────────────────────────────────────┤
│ ☑ Auto-clasificar cada documento        │
│ ☑ Auto-validar datos extraídos          │
│ ☑ Segmentar PDFs multi-documento        │
│ ☑ Continuar si hay errores              │
│                                         │
│ Modelo: Recomendado ⭐                  │
│                                         │
│ Documentos: 50                          │
│ Tiempo estimado: ~6 minutos             │
│ Coste estimado: €0.13                   │
│                                         │
│ [Cancelar] [Iniciar Procesamiento]     │
└─────────────────────────────────────────┘
```

**Opciones explicadas:**

- **Auto-clasificar**: Clasifica automáticamente cada documento (útil si son tipos mixtos)
- **Auto-validar**: Valida cada extracción automáticamente
- **Segmentar PDFs**: Si hay PDFs con múltiples documentos, los separa
- **Continuar si hay errores**: No se detiene si falla un documento

3. Haz clic en **"Iniciar Procesamiento"**

#### PASO 4: Monitorizar Progreso

Verás una barra de progreso en tiempo real:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Procesando lote de 50 documentos...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Progreso: 15/50 (30%)
███████░░░░░░░░░░░░░░░░░░░░░░░░░░░

Exitosos: 14
Errores: 1
Tiempo transcurrido: 2 min 15 seg
Tiempo estimado restante: 5 min 10 seg

Último procesado: factura_015.pdf ✅
Procesando ahora: factura_016.pdf 🔄
```

**Puedes:**
- ⏸️ Pausar el procesamiento
- ⏹️ Detener completamente
- 🔍 Ver detalles de cada documento

#### PASO 5: Revisar Resultados

Cuando termine:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lote completado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total: 50 documentos
Exitosos: 48 ✅
Errores: 2 ❌

Tiempo total: 7 min 30 seg
Coste total: €0.13

[Ver Errores] [Exportar Todo] [Cerrar]
```

**Ver Errores:**
Muestra qué documentos fallaron y por qué:
```
factura_023.pdf ❌
  Error: Archivo corrupto

factura_041.pdf ❌
  Error: Formato no soportado (DOCX)
```

**Exportar Todo:**
Descarga un Excel con los 48 documentos exitosos.

---

### Capacidad y Velocidad

#### Procesamiento Secuencial (uno por uno)

- **Velocidad**: ~6 segundos por documento
- **Capacidad**: 600 documentos/hora
- **Máximo recomendado**: 1,000 documentos por lote

#### Procesamiento Paralelo (3 simultáneos)

verbadoc enterprises puede procesar **hasta 3 documentos en paralelo**:

- **Velocidad**: ~18 documentos/minuto
- **Capacidad**: 1,080 documentos/hora
- **Máximo recomendado**: 5,000 documentos por lote

**Costes de ejemplo:**

```
100 facturas/mes:
  Tiempo: 10 minutos
  Coste: €0.26

1,000 facturas/mes:
  Tiempo: 1 hora 40 minutos
  Coste: €2.60

10,000 facturas/mes:
  Tiempo: 16 horas (dividir en 2 días)
  Coste: €26.00
```

---

### Consejos para Procesamiento en Lote

1️⃣ **Prueba con 10 primero** - Procesa un lote pequeño y verifica que todo funcione

2️⃣ **Separa tipos de documentos** - No mezcles facturas con contratos (o activa auto-clasificar)

3️⃣ **Usa el modelo adecuado**:
- Documentos simples → Genérico
- Documentos estándar → Recomendado
- Documentos complejos → Avanzado

4️⃣ **Activa "Continuar si hay errores"** - Así no se detiene todo el lote por un archivo corrupto

5️⃣ **Procesa en horario no laboral** - Si son muchos documentos, déjalo procesando por la noche

---

## 🔧 Problemas Comunes

### Problema 1: El archivo no se sube

**Síntomas:**
- Error al arrastrar archivo
- Botón de subida no responde
- Archivo desaparece después de subirlo

**Causas posibles:**
- ❌ Formato no compatible
- ❌ Archivo muy grande (>10 MB)
- ❌ Conexión a internet inestable
- ❌ Navegador con extensiones que interfieren

**Soluciones:**

1. **Verifica el formato**: Solo PDF, JPG, PNG, TIFF
   ```
   ✅ factura.pdf
   ✅ imagen.jpg
   ❌ documento.docx (NO soportado)
   ❌ archivo.xlsx (NO soportado)
   ```

2. **Comprueba el tamaño**: Máximo 10 MB
   ```
   Windows: Click derecho > Propiedades
   Mac: Click derecho > Obtener información
   ```

3. **Prueba tu conexión**: Abre speedtest.net y verifica velocidad de subida

4. **Usa otro navegador**: Chrome, Firefox o Edge (recomendados)

5. **Desactiva extensiones**: Adblockers pueden interferir
   ```
   Chrome: chrome://extensions
   Firefox: about:addons
   ```

---

### Problema 2: La extracción tiene muchos errores

**Síntomas:**
- Datos extraídos incorrectos (fechas mal, números erróneos)
- Campos vacíos cuando deberían tener datos
- Precisión < 80%

**Causas posibles:**
- ❌ Documento de mala calidad (escaneado borroso)
- ❌ Prompt poco específico
- ❌ Schema mal definido
- ❌ Modelo inadecuado (Genérico para doc complejo)

**Soluciones:**

1. **Mejora la calidad del documento original**:
   - Escanea a 300 DPI mínimo (mejor 600 DPI)
   - Asegúrate de que el texto sea legible
   - Evita sombras y pliegues

2. **Mejora el prompt**:

   ❌ **Mal prompt:**
   ```
   Extrae los datos
   ```

   ✅ **Buen prompt:**
   ```
   Extrae de esta factura comercial:
   - Número de factura (formato: FAC-YYYY-NNNN)
   - Cliente (nombre completo de la empresa)
   - Fecha de emisión (formato DD/MM/YYYY)
   - Total (número con 2 decimales, símbolo €)

   Si algún dato no está visible, devuelve null.
   ```

3. **Verifica el schema**:

   ❌ **Mal schema:**
   ```
   fecha: STRING
   ```

   ✅ **Buen schema:**
   ```
   fecha_emision: STRING (descripción: "Fecha en formato DD/MM/YYYY")
   ```

4. **Usa un modelo más potente**:
   ```
   Genérico (85-90%) → Recomendado (92-95%) → Avanzado (96-98%)
   ```

5. **Usa la clasificación automática**:
   - Haz clic en "🔍 Clasificar Documento"
   - Deja que la IA configure todo automáticamente

6. **Valida los datos**:
   - Haz clic en "🔍 Validar Datos"
   - Corrige los errores detectados
   - El sistema aprenderá de tus correcciones

---

### Problema 3: Error "Credenciales inválidas" o "Error de autenticación"

**Síntomas:**
- Error al ejecutar extracción
- Mensaje: "Error de autenticación con Google Cloud"

**Causas:**
- ❌ Configuración incorrecta de variables de entorno
- ❌ Credenciales de Google Cloud expiradas
- ❌ Permisos insuficientes

**Soluciones:**

1. **Contacta al administrador** - Este error requiere configuración en el backend

2. **Si eres administrador**:
   - Verifica que `GOOGLE_APPLICATION_CREDENTIALS` esté configurado
   - Verifica que el Service Account tenga rol "Vertex AI User"
   - Verifica que Vertex AI API esté habilitada en Google Cloud

---

### Problema 4: Error "Cuota excedida"

**Síntomas:**
- Mensaje: "Límite de uso excedido"
- No puedes procesar más documentos

**Causas:**
- ❌ Has alcanzado el límite de cuota de Google Cloud (300 peticiones/minuto por defecto)

**Soluciones:**

1. **Espera unos minutos** - La cuota se renueva automáticamente

2. **Procesa en lotes más pequeños**:
   ```
   En lugar de: 1,000 documentos de golpe
   Haz: 10 lotes de 100 documentos
   ```

3. **Contacta al administrador** para aumentar la cuota en Google Cloud

---

### Problema 5: El procesamiento en lote se detiene

**Síntomas:**
- Progreso se queda atascado en X%
- No avanza durante >5 minutos

**Causas:**
- ❌ Archivo corrupto bloqueó el proceso
- ❌ Timeout del navegador
- ❌ Conexión a internet perdida

**Soluciones:**

1. **Verifica tu conexión a internet**

2. **Refresca la página** (F5) - El progreso se guarda automáticamente

3. **Activa "Continuar si hay errores"**:
   - Si un archivo falla, el lote continúa

4. **Procesa en lotes más pequeños**:
   ```
   500 documentos → 5 lotes de 100
   ```

---

### Problema 6: Los datos no se exportan correctamente a Excel

**Síntomas:**
- Excel muestra caracteres raros (ñ → Ã±)
- Números se muestran como texto
- Fechas en formato incorrecto

**Causas:**
- ❌ Encoding incorrecto
- ❌ Excel no detecta el formato correcto
- ❌ Configuración regional de Excel

**Soluciones:**

1. **Asegúrate de descargar como XLSX**, no CSV
   - CSV puede tener problemas de encoding
   - XLSX siempre funciona correctamente

2. **Si usas CSV**:
   - Abre Excel
   - Datos > Obtener datos > Desde archivo > Desde texto/CSV
   - Selecciona el archivo
   - Origen: UTF-8
   - Importar

3. **Verifica la configuración regional de Excel**:
   - Archivo > Opciones > Avanzadas
   - Separador decimal: coma (,)
   - Separador de miles: punto (.)

---

### Problema 7: La segmentación de PDFs no detecta todos los documentos

**Síntomas:**
- PDF con 5 documentos, solo detecta 3
- Separa páginas del mismo documento

**Causas:**
- ❌ Documentos muy similares visualmente
- ❌ Páginas consecutivas del mismo documento mal interpretadas
- ❌ Calidad de escaneo baja

**Soluciones:**

1. **Revisa los segmentos manualmente**:
   - Haz clic en "Ver" para cada segmento
   - Verifica que sean correctos

2. **Si falta un documento**:
   - Extrae el PDF completo manualmente
   - O segmenta el PDF en tu ordenador antes de subir

3. **Si separa páginas del mismo documento**:
   - Combina los segmentos manualmente
   - O procesa el documento completo sin segmentar

4. **Mejora la calidad del PDF**:
   - Escanea con mejor resolución
   - Asegúrate de que los logos y membretados sean visibles

---

## ❓ Preguntas Frecuentes

### ¿Cuánto cuesta verbadoc enterprises?

verbadoc enterprises usa un modelo de **pago por uso**:

**Coste típico por documento** (con clasificación + extracción + validación):
- ~€0.0026 por documento

**Ejemplos:**
- 100 documentos/mes → €0.26
- 1,000 documentos/mes → €2.60
- 10,000 documentos/mes → €26.00

**No hay cuota mensual fija**. Solo pagas por los documentos que procesas.

**Prueba gratuita**: 50 documentos gratis.

---

### ¿Qué idiomas soporta?

verbadoc enterprises soporta **múltiples idiomas**, incluyendo:

- Español (ES) 🇪🇸
- Català (CA) 🇪🇸
- Euskera (EU) 🇪🇸
- Galego (GL) 🇪🇸
- Português (PT) 🇵🇹
- English (EN) 🇬🇧🇺🇸
- Français (FR) 🇫🇷
- Deutsch (DE) 🇩🇪
- Italiano (IT) 🇮🇹

No necesitas seleccionar idioma manualmente - la IA lo detecta automáticamente.

---

### ¿Puedo editar los datos extraídos?

**Sí**, puedes editar los datos directamente:

1. Haz clic en el JSON de resultados
2. Edita cualquier campo
3. Los cambios se guardan automáticamente
4. El sistema aprende de tus correcciones

---

### ¿Se guardan mis documentos en servidores?

**NO**. verbadoc enterprises tiene una política de **no almacenamiento**:

- ✅ **Archivos originales**: Se eliminan automáticamente tras procesamiento
- ✅ **Datos extraídos**: Se guardan en tu navegador (localStorage) durante 30 días
- ✅ **Sin servidores persistentes**: No guardamos tus documentos en la nube

**Privacidad total**: Tus datos nunca se almacenan de forma permanente.

---

### ¿Mis datos están seguros?

**Sí**. verbadoc enterprises cumple con **GDPR** (protección de datos europea):

- 🔒 **Cifrado de extremo a extremo**: TLS 1.3
- 🇪🇺 **100% procesamiento en Europa**: Región de Bélgica (europe-west1)
- 🚫 **0% transferencias fuera de la UE**: Datos nunca salen del Espacio Económico Europeo
- ✅ **Certificaciones**: ISO 27001, SOC 2, GDPR-compliant
- 🗑️ **No almacenamiento**: Archivos eliminados tras procesamiento

**DPA (Data Processing Agreement)** con Google Cloud incluye:
- Cláusulas Contractuales Tipo de la Comisión Europea
- Garantías de protección de datos
- Derecho a auditoría

---

### ¿Puedo procesar documentos escaneados?

**Sí**, verbadoc enterprises incluye **OCR integrado** (Reconocimiento Óptico de Caracteres).

Procesa:
- ✅ PDFs escaneados (sin texto seleccionable)
- ✅ Imágenes de documentos (fotos de facturas, DNI, etc.)
- ✅ Fotocopias
- ✅ Documentos antiguos

**Recomendaciones para mejor precisión:**
- Escanea a **300 DPI mínimo** (mejor 600 DPI)
- Asegúrate de que el texto sea **legible**
- Evita **sombras y pliegues**
- Usa **buena iluminación** si es foto con móvil

---

### ¿Puedo procesar documentos de varias páginas?

**Sí**, verbadoc enterprises soporta:
- ✅ PDFs multi-página (hasta 100+ páginas)
- ✅ Documentos que contienen múltiples documentos independientes

**Funcionalidad de segmentación**:
- Detecta automáticamente si un PDF contiene varios documentos
- Los separa y procesa individualmente
- Ejemplo: PDF con 3 facturas → Detecta y procesa 3 documentos

---

### ¿Qué formatos de archivo soporta?

**Soportados:**
- ✅ PDF (.pdf)
- ✅ Imágenes: JPG, PNG, TIFF, WEBP, HEIC, HEIF

**NO soportados:**
- ❌ Word (.docx, .doc)
- ❌ Excel (.xlsx, .xls)
- ❌ PowerPoint (.pptx)
- ❌ Audio o vídeo

**Tamaño máximo**: 10 MB por archivo

---

### ¿Puedo usar verbadoc enterprises con mi propio modelo de IA?

Actualmente, verbadoc enterprises solo usa **Google Gemini** (región Europa).

Para planes empresariales, contacta a nuestro equipo para opciones personalizadas.

---

### ¿Ofrecen API?

**Actualmente no**, pero está en desarrollo.

Si necesitas integración automática con tus sistemas, contacta a nuestro equipo de ventas.

---

### ¿Cómo cancelo mi suscripción?

verbadoc enterprises **no tiene suscripciones** - es pago por uso.

Solo pagas por los documentos que procesas. No hay compromisos ni cancelaciones.

---

### ¿Emiten facturas?

**Sí**, cada mes se genera una factura automática con:
- Datos fiscales completos
- Desglose de consumo (documentos procesados)
- Descargable en PDF desde tu panel de usuario

---

### ¿Puedo importar datos desde Excel?

**Sí**, puedes importar schemas desde Excel para no tener que crearlos manualmente.

**Funcionalidad en desarrollo** para importar datos de validación desde Excel.

---

### ¿Qué precisión tiene la extracción?

Depende del **modelo** y **calidad del documento**:

| Modelo | Precisión | Tipo de documento |
|--------|-----------|-------------------|
| **Genérico** | 85-90% | Simple, estándar |
| **Recomendado** | 92-95% | Típico |
| **Avanzado** | 96-98% | Complejo |

**Factores que afectan la precisión:**
- Calidad del escaneo
- Complejidad del documento
- Claridad del prompt y schema

**Mejora continua:**
- Mes 1: 85-87%
- Mes 6: 94-97%
- Mes 12: 97-99%

---

## 📞 Soporte y Contacto

### 📧 Soporte Técnico

**Email**: soporte@verbadoc.eu

**Tiempo de respuesta**: 24-48 horas

**Qué incluir en tu mensaje:**

1. Tu email de registro
2. Descripción detallada del problema
3. Capturas de pantalla (muy útil)
4. Archivo de ejemplo (si es posible)
5. Navegador y sistema operativo

**Ejemplo de mensaje efectivo:**

```
Asunto: Error al extraer datos de factura

Hola,

Mi email de registro es: juan@empresa.com

Problema: Al intentar extraer datos de una factura, obtengo
el error "Error de autenticación".

He intentado:
- Refrescar la página
- Usar otro navegador (Chrome y Firefox)

Navegador: Chrome 120
Sistema: Windows 11

Adjunto captura de pantalla del error.

Gracias,
Juan
```

---

### 💼 Ventas y Planes Empresariales

**Email**: ventas@verbadoc.eu

**Para:**
- Planes personalizados
- Volúmenes altos (>10,000 docs/mes)
- API empresarial
- Integraciones personalizadas
- Contratos anuales
- Descuentos por volumen

---

### 🌐 Recursos Útiles

- **Aplicación**: https://verbadoc-enterprises.vercel.app
- **Documentación Técnica**: Ver carpeta de documentación en el proyecto
- **Código Fuente**: https://github.com/VCNPRO/verbadoc_europa_pro

---

### 💬 Chat de Ayuda (Laia)

Dentro de la aplicación, tienes acceso a **Laia**, nuestro asistente virtual:

- Responde preguntas básicas
- Ayuda con configuración
- Explica funcionalidades
- Disponible 24/7

Haz clic en el ícono de chat 💬 en la esquina inferior derecha.

---

## 📋 Resumen Rápido (Cheat Sheet)

### Flujo Básico de Trabajo

```
1. 📤 SUBIR DOCUMENTO
   └─ Arrastra PDF/imagen o haz clic en "Subir archivo"

2. 🤖 CLASIFICAR (Asistente IA)
   └─ Click en "🔍 Clasificar Documento" (3-5 seg)

3. ✅ REVISAR
   └─ Verifica que prompt y schema sean correctos

4. 🚀 EXTRAER
   └─ Click en "🚀 Ejecutar Extracción" (5-8 seg)

5. 🔍 VALIDAR (Opcional)
   └─ Click en "🔍 Validar Datos" (2-3 seg)

6. ✏️ CORREGIR (Si es necesario)
   └─ Edita campos en JSON

7. ⬇️ EXPORTAR
   └─ Click en "Excel", "CSV", "JSON" o "PDF"
```

---

### Acciones Rápidas

| Quiero... | Qué hacer |
|-----------|-----------|
| Extraer datos de 1 factura | Subir → Clasificar → Extraer → Exportar |
| Procesar 100 facturas | Subir todas → Configurar primera → Procesar Todos |
| Solo texto de un PDF | Subir → Escribir prompt "Extrae todo el texto" → Extraer |
| Separar PDF multi-documento | Subir → Click en "Buscar Documentos" → Procesar Todos |
| Validar datos críticos | Después de extraer → Click en "Validar Datos" |
| Reutilizar configuración | Guardar como Plantilla → Usar en futuros docs |

---

### Modelos y Costes

| Modelo | Velocidad | Coste/doc | Usar para |
|--------|-----------|-----------|-----------|
| Genérico | 2-5 seg | €0.0005 | Docs simples |
| Recomendado ⭐ | 3-8 seg | €0.0016 | Uso general |
| Avanzado | 5-15 seg | €0.008 | Docs complejos |

**Coste típico completo** (clasificar + extraer + validar):
- ~€0.0026 por documento

---

### Formatos de Exportación

| Formato | Extensión | Usar para |
|---------|-----------|-----------|
| JSON | .json | APIs, programación |
| Excel | .xlsx | Análisis, reportes |
| CSV | .csv | Google Sheets, imports |
| PDF | .pdf | Imprimir, archivar |

---

### Atajos de Teclado

| Acción | Atajo |
|--------|-------|
| Subir archivo | Ctrl+U |
| Ejecutar extracción | Ctrl+Enter |
| Exportar JSON | Ctrl+J |
| Exportar Excel | Ctrl+E |
| Abrir ayuda | F1 |
| Abrir chat Laia | Ctrl+H |

---

## ✅ Consejos de Experto

### Para Obtener Mejores Resultados

1. **Usa siempre el Asistente IA** - Ahorra tiempo y mejora precisión

2. **Escribe prompts específicos**:
   ```
   ❌ "Extrae los datos"
   ✅ "Extrae número de factura (formato FAC-YYYY-NNNN),
       cliente (nombre completo), fecha (DD/MM/YYYY) y
       total (con 2 decimales)"
   ```

3. **Valida documentos críticos** - Usa "🔍 Validar Datos" antes de importar a sistemas

4. **Corrige errores** - El sistema aprende de tus correcciones

5. **Prueba con 1 documento primero** - Antes de procesar un lote de 100

---

### Para Empresas

1. **Crea plantillas personalizadas** - Para tus tipos de documentos frecuentes

2. **Usa procesamiento en lote** - Para ahorrar tiempo con múltiples docs

3. **Exporta historial mensual** - Para reportes y análisis

4. **Estandariza formatos** - Configura schemas una vez, reutiliza siempre

5. **Contacta para API** - Si necesitas integración automática

---

### Para Ahorro de Costes

1. **Usa el modelo adecuado**:
   ```
   Recetas médicas → Genérico (€0.0005)
   Facturas → Recomendado (€0.0016)
   Contratos complejos → Avanzado (€0.008)
   ```

2. **Desactiva validación IA** para documentos no críticos (usa validación básica gratis)

3. **Procesa en lotes** - Más eficiente que documentos individuales

4. **Revisa antes de validar** - Validación básica es gratis, usa IA solo si lo necesitas

---

## 🎯 Casos de Uso Reales

### Caso 1: Departamento de Contabilidad

**Situación**: Procesar 50 facturas recibidas cada semana

**Proceso:**
1. Escanea las 50 facturas (o pide PDFs a proveedores)
2. Sube todas a verbadoc enterprises
3. Usa plantilla "Factura de Proveedor" (predefinida)
4. Click en "Procesar Todos"
5. Espera 8 minutos
6. Exporta a Excel
7. Importa Excel a tu software de contabilidad

**Tiempo ahorrado**: ~4 horas de teclear manualmente

**Coste**: €0.13 por semana (50 facturas × €0.0026)

---

### Caso 2: Departamento de RRHH

**Situación**: Alta de nuevo empleado con documentación completa

**Documentos**: Contrato (4 páginas) + DNI (2 caras) + Título universitario (1 página) + Certificado de antecedentes (2 páginas) = 1 PDF de 9 páginas

**Proceso:**
1. Sube el PDF multi-documento
2. Click en "🔍 Buscar Documentos"
3. verbadoc enterprises detecta 4 documentos
4. Click en "Procesar Todos"
5. Cada documento se clasifica y extrae automáticamente
6. Revisa los datos extraídos
7. Exporta todo a Excel
8. Importa a tu sistema de RRHH

**Tiempo ahorrado**: ~1 hora de tecleo manual

**Coste**: €0.01 por empleado

---

### Caso 3: Despacho de Abogados

**Situación**: Extraer datos de 20 contratos de arrendamiento para análisis

**Proceso:**
1. Sube los 20 PDFs
2. Usa plantilla "Contrato de Arrendamiento"
3. Ajusta schema para campos específicos que necesitas
4. Procesa en lote
5. Exporta a Excel con:
   - Arrendador, arrendatario
   - Dirección del inmueble
   - Renta mensual
   - Duración del contrato
   - Fecha de inicio
6. Analiza en Excel (ej: rentas promedio por zona)

**Tiempo ahorrado**: ~6 horas de lectura manual

**Coste**: €0.05 por análisis

---

### Caso 4: Clínica Médica

**Situación**: Digitalizar 100 recetas médicas escaneadas

**Proceso:**
1. Escanea las 100 recetas
2. Sube todas a verbadoc enterprises
3. Usa plantilla "Receta Médica" (predefinida)
4. Procesa con modelo "Genérico" (son formularios simples)
5. Exporta a Excel con:
   - Nombre del paciente
   - Medicamento prescrito
   - Dosis
   - Duración del tratamiento
   - Fecha de prescripción
6. Importa a tu sistema de gestión clínica

**Tiempo ahorrado**: ~8 horas de tecleo

**Coste**: €0.05 (100 recetas × €0.0005 con modelo Genérico)

---

## 📚 Glosario de Términos

**Extracción de datos**: Proceso de convertir documentos no estructurados en datos estructurados

**Schema**: Estructura de datos que define qué campos extraer y qué tipo tienen

**Prompt**: Instrucciones en lenguaje natural que explican a la IA qué datos extraer

**Clasificación**: Proceso de identificar automáticamente el tipo de documento

**Validación**: Proceso de verificar que los datos extraídos son correctos

**Segmentación**: Proceso de separar un PDF multi-documento en documentos individuales

**OCR**: Optical Character Recognition (Reconocimiento Óptico de Caracteres)

**Gemini**: Modelo de inteligencia artificial de Google usado por verbadoc enterprises

**GDPR**: Reglamento General de Protección de Datos (normativa europea)

**API**: Interfaz de Programación de Aplicaciones (para integración automática)

**Vertex AI**: Plataforma de inteligencia artificial de Google Cloud

**localStorage**: Almacenamiento local del navegador (datos guardados en tu ordenador)

**Procesamiento en lote**: Procesar múltiples documentos automáticamente

**Plantilla**: Configuración guardada (prompt + schema) reutilizable

**DPA**: Data Processing Agreement (Acuerdo de Procesamiento de Datos)

---

**© 2025 verbadoc enterprises - Extracción Inteligente de Datos con IA 100% Europea**

**Web**: https://verbadoc-enterprises.vercel.app
**Soporte**: soporte@verbadoc.eu
**Ventas**: ventas@verbadoc.eu

**Powered by**: Google Gemini (Vertex AI) - Región Europa (Bélgica)

**Certificaciones**: GDPR-Compliant | ISO 27001 | SOC 2

---

*Guía de Usuario Completa - Versión 1.0 - Enero 2025*
