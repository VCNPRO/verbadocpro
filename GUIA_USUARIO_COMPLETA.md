# 📘 Guía Completa de Usuario - verbadoc pro europa

**Extracción Inteligente de Datos con Inteligencia Artificial 100% Europea**

---

## 📖 Índice

1. [¿Qué es verbadoc pro europa?](#qué-es-verbadoc-enterprises)
2. [Primeros Pasos](#primeros-pasos)
3. [Cómo Usar verbadoc pro europa - Paso a Paso](#cómo-usar-verbadoc-enterprises---paso-a-paso)
4. [El Asistente de IA - Funcionalidades Explicadas](#el-asistente-de-ia---funcionalidades-explicadas)
5. [Modelos de IA Disponibles](#modelos-de-ia-disponibles)
6. [Gestión de Archivos y Plantillas](#gestión-de-archivos-y-plantillas)
7. [Descargar y Exportar Resultados](#descargar-y-exportar-resultados)
8. [Procesamiento en Lote](#procesamiento-en-lote)
9. [Problemas Comunes](#problemas-comunes)
10. [Preguntas Frecuentes](#preguntas-frecuentes)
11. [Soporte](#soporte)

---

## 🎯 ¿Qué es verbadoc pro europa?

**verbadoc pro europa** es una herramienta web profesional que convierte automáticamente documentos no estructurados (PDFs, imágenes, facturas, contratos, etc.) en **datos estructurados** que puedes usar directamente en Excel, bases de datos o sistemas empresariales.

### ¿Qué hace verbadoc pro europa?

Imagina que tienes 100 facturas en PDF. En lugar de teclear manualmente todos los datos, subes los archivos a verbadoc pro europa y en pocos minutos obtienes:
- ✅ Una tabla Excel con todos los datos extraídos (cliente, fecha, productos, total)
- ✅ Archivos JSON o CSV para integrar en tu sistema
- ✅ Validación automática de que los datos son correctos
- ✅ Clasificación inteligente del tipo de documento

### ¿Para quién es verbadoc pro europa?

- 💼 **Contabilidad**: Extraer datos de facturas, recibos, albaranes
- 👔 **RRHH**: Procesar nóminas, contratos laborales, CVs
- ⚖️ **Legal**: Analizar contratos, escrituras, certificados
- 💰 **Finanzas**: Extraer datos de estados financieros, reportes bancarios
- 📊 **Marketing**: Procesar presupuestos, análisis de campañas
- 🏥 **Salud**: Recetas médicas, informes clínicos, análisis

### ¿Qué hace diferente a verbadoc pro europa?

✅ **100% Procesamiento en Europa** - Tus datos nunca salen de la UE
✅ **Cumplimiento total con GDPR** - Certificaciones ISO 27001, SOC 2
✅ **Asistente de IA integrado** - Clasifica y configura automáticamente
✅ **Multi-documento inteligente** - Detecta varios documentos en un mismo PDF
✅ **Aprende de tus correcciones** - Se vuelve más preciso con el uso
✅ **Sin almacenamiento persistente** - No guardamos tus documentos en servidores

### ¿Qué NO hace verbadoc pro europa?

❌ No es un OCR simple (es mucho más inteligente)
❌ No almacena tus documentos (procesamiento temporal)
❌ No edita documentos originales
❌ No funciona con audio o vídeo (solo documentos)

---

## 🚀 Primeros Pasos

### Paso 1: Acceder a verbadoc pro europa

1. Abre tu navegador (Chrome, Firefox, Edge recomendados)
2. Ve a: **https://www.verbadocpro.eu**
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

### Paso 3: Planes y Volúmenes

verbadoc pro europa ofrece diferentes **grupos de contratación según volumen**:

- **Volumen Inicial**: Hasta 500 documentos/mes
- **Volumen Medio**: Entre 500 y 5,000 documentos/mes
- **Volumen Alto**: Más de 5,000 documentos/mes
- **Volumen Empresarial**: Personalizado según necesidades

Contacta con el equipo comercial para conocer el plan que mejor se adapta a tu organización.

---

## 📝 Cómo Usar verbadoc pro europa - Paso a Paso

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

**Tipos de datos disponibles:**

- **STRING**: Texto (nombres, direcciones, códigos)
- **NUMBER**: Números (precios, cantidades, porcentajes)
- **BOOLEAN**: Verdadero/falso (sí/no, activo/inactivo)
- **ARRAY**: Lista simple (ej: ["producto1", "producto2"])
- **OBJECT**: Objeto anidado (ej: dirección con calle, ciudad, CP)
- **ARRAY_OF_OBJECTS**: Lista de objetos complejos (ej: productos con nombre, precio, cantidad)

#### PASO 3: Seleccionar Modelo de IA

En la parte superior, verás 3 modelos:

**Genérico** (rápido y eficiente)
- Documentos simples y formularios estándar
- Ideal para alto volumen

**Recomendado** ⭐ (equilibrado)
- Facturas, contratos, informes
- **Seleccionado por defecto**

**Avanzado** (máxima precisión)
- Documentos complejos con múltiples tablas
- Para documentos críticos

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
• Subtotal e IVA visibles
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
   Razón: El cálculo no coincide (Subtotal + IVA ≠ Total extraído)
   Sugerencia: Revisar cálculo

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

##### **Validación Básica (Instantánea)**
- Verifica campos vacíos
- Valida formatos (fechas, números, emails, CIF/NIF españoles)
- Detecta valores fuera de rango
- **Tiempo:** < 100 milisegundos

##### **Validación Avanzada con IA**
- Todo lo anterior +
- Coherencia matemática (cálculos, porcentajes)
- Comparación visual con el documento original
- Detección de valores sospechosos
- Sugerencias de corrección
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

**Mejora de precisión esperada:**

- Mes 1: 85-87%
- Mes 3: 91-94%
- Mes 6: 94-97%
- Mes 12: 97-99%

---

## 🤖 El Asistente de IA - Funcionalidades Explicadas

El **Asistente de IA** es el corazón de verbadoc pro europa. Aquí explicamos en detalle cada una de sus funcionalidades.

### 1. 🔍 Clasificación Automática de Documentos

#### ¿Qué hace exactamente?

Analiza tu documento visualmente (usando visión por computadora avanzada) e identifica:
- **Tipo de documento** (factura, DNI, contrato, etc.)
- **Nivel de confianza** (0-100%)
- **Razones** por las que lo clasificó así
- **Indicadores clave** encontrados

#### ¿Cómo funciona técnicamente?

1. Convierte tu documento a imagen
2. Lo envía al motor de IA avanzado
3. La IA analiza:
   - Layout y estructura
   - Logos y membretados
   - Campos típicos (número de factura, DNI, etc.)
   - Tablas y formato
4. Compara con una base de conocimiento de 15+ tipos de documentos
5. Devuelve el tipo más probable + confianza

#### ¿Qué tarda?

⏱️ **2-5 segundos** (depende del tamaño del archivo)

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

---

### 2. 🔍 Validación Inteligente de Datos

#### ¿Qué hace exactamente?

Después de extraer datos, los **revisa** para detectar errores o inconsistencias.

#### Tipos de validación:

##### **A) Validación Básica (Sin IA, instantánea)**

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
  ```

- ✅ **Comparación visual con documento**:
  ```
  ¿El total extraído se ve en el PDF?
  ¿La fecha coincide con lo escrito?
  ```

- ✅ **Detección de OCR mal interpretado**:
  ```
  "18" que debería ser "15" (confusión común)
  "O" (letra) que debería ser "0" (cero)
  "l" (L minúscula) que debería ser "1"
  ```

**Tiempo:** 2-3 segundos

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

#### ¿Cómo funciona técnicamente?

1. Analiza **visualmente** cada página del PDF
2. Detecta cambios de:
   - Logo/membretado de empresa
   - Estructura y diseño
   - Tipo de documento
3. **NO separa** páginas consecutivas del mismo documento
4. Agrupa páginas que pertenecen al mismo documento
5. Devuelve lista de segmentos detectados

#### ¿Qué tarda?

⏱️ **8-12 segundos** (independiente del número de páginas)

- PDF de 5 páginas: ~8 segundos
- PDF de 50 páginas: ~12 segundos
- PDF de 100 páginas: ~15 segundos

#### ¿Qué precisión tiene?

- Documentos claramente diferentes (factura + DNI + contrato): **85-95%**
- Documentos similares (3 facturas del mismo proveedor): **70-80%**
- Falsos positivos (separar páginas del mismo doc): **< 5%**

#### ¿Cómo usarlo?

**PASO 1:** Sube el PDF multi-documento

**PASO 2:** En el Asistente IA verás:
```
📄 PDF detectado: 10 páginas
¿Contiene múltiples documentos?
```

**PASO 3:** Haz clic en **"🔍 Buscar Documentos"**

**PASO 4:** Espera 8-12 segundos

**PASO 5:** Verás la lista de documentos detectados con opciones para procesarlos

---

### 4. 🧠 Generación Automática de Schema desde Prompt

#### ¿Qué hace exactamente?

Si solo quieres escribir el **prompt** (en lenguaje natural) y que la IA genere el **schema** automáticamente.

#### ¿Qué tarda?

⏱️ **3-5 segundos**

---

## 🎯 Modelos de IA Disponibles

verbadoc pro europa ofrece **3 modelos de IA** seleccionables según tus necesidades:

### Comparativa Rápida

| Característica | Genérico | Recomendado ⭐ | Avanzado |
|----------------|----------|---------------|----------|
| **Velocidad** | 2-5 seg | 3-8 seg | 5-15 seg |
| **Precisión** | 85-90% | 92-95% | 96-98% |
| **Uso ideal** | Simple | Estándar | Complejo |

### 1. Genérico (Rápido)

**Características:**
- ⚡ **Muy rápido**: 2-5 segundos
- 📊 **Precisión**: 85-90%

**¿Cuándo usarlo?**

✅ Documentos **simples y estandarizados**:
- Formularios con campos fijos
- Recetas médicas estándar
- Albaranes simples
- DNI/Pasaportes

✅ **Alto volumen**:
- Procesar muchos documentos similares

❌ **NO usar para**:
- Documentos complejos con múltiples tablas
- Facturas con productos variados
- Contratos largos

---

### 2. Recomendado ⭐ (PREDETERMINADO)

**Características:**
- ⚡ **Rápido**: 3-8 segundos
- 📊 **Precisión**: 92-95%
- 🎯 **Mejor relación calidad-velocidad**

**¿Cuándo usarlo?**

✅ **Uso general** (seleccionado por defecto):
- Facturas comerciales estándar
- Contratos de 2-5 páginas
- Informes clínicos
- Nóminas
- Documentos corporativos

✅ **El 90% de los casos**

---

### 3. Avanzado (Máxima Precisión)

**Características:**
- 🐢 **Más lento**: 5-15 segundos
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
- Contratos importantes
- Documentación legal importante
- Auditorías financieras

✅ Documentos **escaneados de baja calidad**:
- PDFs antiguos
- Fotocopias deterioradas

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

3️⃣ **Mezcla modelos según tipo**:
```
Recetas médicas → Genérico
Facturas → Recomendado
Contratos importantes → Avanzado
```

---

### Ubicación geográfica y GDPR

**Todos los modelos procesan en:**
- 🇪🇺 **Región**: Europa (Bélgica)
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

---

### Sistema de Plantillas

Las **plantillas** son configuraciones guardadas (prompt + schema) que puedes reutilizar.

#### Tipos de Plantillas

##### **1. Plantillas Predefinidas** (Incluidas)

verbadoc pro europa incluye **15+ plantillas** listas para usar:

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

Puedes crear tus propias plantillas para reutilizarlas en el futuro.

---

## 📥 Descargar y Exportar Resultados

verbadoc pro europa permite exportar los datos extraídos en **4 formatos**:

### 1. 📄 JSON

**¿Para qué sirve?**
- Integración con APIs
- Programación (JavaScript, Python, etc.)
- Sistemas empresariales

### 2. 📊 Excel (.xlsx)

**¿Para qué sirve?**
- Análisis de datos
- Reportes
- Contabilidad

**Características:**
- Columnas auto-ajustadas
- Formato de celdas correcto (números, fechas)
- Si hay arrays (productos), crea múltiples hojas

### 3. 📋 CSV

**¿Para qué sirve?**
- Importar a Google Sheets
- Bases de datos
- Sistemas legacy

### 4. 📄 PDF

**¿Para qué sirve?**
- Imprimir
- Archivar
- Enviar a clientes

---

## 🔄 Procesamiento en Lote

El **procesamiento en lote** te permite extraer datos de **múltiples documentos automáticamente** con una sola configuración.

### ¿Cuándo usarlo?

✅ Tienes **10+ documentos** del mismo tipo
✅ Quieres **ahorrar tiempo**
✅ Todos los documentos tienen **estructura similar**

### Cómo Funcionar

#### PASO 1: Subir Todos los Archivos

Selecciona y sube todos los documentos (ej: 50 facturas).

#### PASO 2: Configurar con el Primer Documento

1. Selecciona el **primer documento** de la lista
2. Usa el Asistente IA para clasificarlo
3. Verifica que el prompt y schema sean correctos
4. Prueba la extracción con este documento

#### PASO 3: Procesar Todos

1. Haz clic en **"Procesar Todos"** (panel izquierdo)
2. Configura las opciones:
   - Auto-clasificar cada documento
   - Auto-validar datos extraídos
   - Segmentar PDFs multi-documento
   - Continuar si hay errores
3. Haz clic en **"Iniciar Procesamiento"**

#### PASO 4: Monitorizar Progreso

Verás una barra de progreso en tiempo real con información sobre documentos procesados exitosamente y errores.

### Capacidad y Velocidad

- **Procesamiento secuencial**: ~600 documentos/hora
- **Procesamiento paralelo** (3 simultáneos): ~1,080 documentos/hora

**Ahorro de tiempo típico:**

```
100 facturas manuales → 8 horas de trabajo
100 facturas con verbadoc pro europa → 10 minutos
Ahorro: ~95% del tiempo
```

---

## 🔧 Problemas Comunes

### Problema 1: El archivo no se sube

**Soluciones:**

1. **Verifica el formato**: Solo PDF, JPG, PNG, TIFF
2. **Comprueba el tamaño**: Máximo 10 MB
3. **Prueba tu conexión**: Verifica velocidad de subida
4. **Usa otro navegador**: Chrome, Firefox o Edge (recomendados)

---

### Problema 2: La extracción tiene muchos errores

**Soluciones:**

1. **Mejora la calidad del documento original**:
   - Escanea a 300 DPI mínimo (mejor 600 DPI)

2. **Mejora el prompt**: Sé más específico

3. **Usa un modelo más potente**: Genérico → Recomendado → Avanzado

4. **Usa la clasificación automática**: Deja que la IA configure todo

5. **Valida los datos**: Usa el botón "Validar Datos"

---

### Problema 3: El procesamiento en lote se detiene

**Soluciones:**

1. **Verifica tu conexión a internet**
2. **Refresca la página** (F5)
3. **Activa "Continuar si hay errores"**
4. **Procesa en lotes más pequeños**

---

## ❓ Preguntas Frecuentes

### ¿Qué idiomas soporta?

verbadoc pro europa soporta **múltiples idiomas**, incluyendo:

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

**NO**. verbadoc pro europa tiene una política de **no almacenamiento**:

- ✅ **Archivos originales**: Se eliminan automáticamente tras procesamiento
- ✅ **Datos extraídos**: Se guardan en tu navegador (localStorage) durante 30 días
- ✅ **Sin servidores persistentes**: No guardamos tus documentos en la nube

**Privacidad total**: Tus datos nunca se almacenan de forma permanente.

---

### ¿Mis datos están seguros?

**Sí**. verbadoc pro europa cumple con **GDPR** (protección de datos europea):

- 🔒 **Cifrado de extremo a extremo**: TLS 1.3
- 🇪🇺 **100% procesamiento en Europa**: Región de Bélgica
- 🚫 **0% transferencias fuera de la UE**: Datos nunca salen del Espacio Económico Europeo
- ✅ **Certificaciones**: ISO 27001, SOC 2, GDPR-compliant
- 🗑️ **No almacenamiento**: Archivos eliminados tras procesamiento

---

### ¿Puedo procesar documentos escaneados?

**Sí**, verbadoc pro europa incluye **OCR integrado** (Reconocimiento Óptico de Caracteres).

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

**Sí**, verbadoc pro europa soporta:
- ✅ PDFs multi-página (hasta 100+ páginas)
- ✅ Documentos que contienen múltiples documentos independientes

**Funcionalidad de segmentación**:
- Detecta automáticamente si un PDF contiene varios documentos
- Los separa y procesa individualmente

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

---

### 💼 Ventas y Planes Empresariales

**Email**: ventas@verbadoc.eu

**Para:**
- Planes personalizados
- Volúmenes altos
- API empresarial
- Integraciones personalizadas
- Contratos anuales

---

### 🌐 Recursos Útiles

- **Aplicación**: https://www.verbadocpro.eu
- **Documentación Técnica**: Disponible en la aplicación
- **Código Fuente**: Repositorio privado

---

### 💬 Chat de Ayuda (Laia)

Dentro de la aplicación, tienes acceso a **Laia**, nuestro asistente virtual inteligente:

**¿Qué puede hacer Laia?**
- 💡 Explicar todas las funcionalidades de verbadoc pro europa
- 🚀 Guiarte paso a paso en el inicio rápido
- 🤖 Explicar la clasificación automática y validación de datos
- 📄 Ayudarte con tipos de documentos soportados
- 🔧 Enseñarte a crear plantillas personalizadas
- 📊 Explicar modelos de IA disponibles (Genérico, Recomendado, Avanzado)
- 📥 Ayudarte con exportación de resultados
- 🔒 Responder sobre seguridad y cumplimiento GDPR
- 🛠️ Solucionar problemas comunes
- 💡 Darte consejos y mejores prácticas

**Cómo usar Laia:**
1. Haz clic en el ícono de chat 💬 en la esquina inferior derecha
2. Escribe tu pregunta en lenguaje natural
3. Laia responde instantáneamente con información contextual

**Ejemplos de preguntas:**
- "¿Qué es verbadoc pro europa?"
- "¿Cómo empiezo?"
- "¿Qué tipos de documentos puedo procesar?"
- "¿Cómo crear una plantilla?"
- "¿Qué modelo de IA debo usar?"

Laia está disponible 24/7 y aprende continuamente para ayudarte mejor.

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

### Modelos y Velocidad

| Modelo | Velocidad | Usar para |
|--------|-----------|-----------|
| Genérico | 2-5 seg | Docs simples |
| Recomendado ⭐ | 3-8 seg | Uso general |
| Avanzado | 5-15 seg | Docs complejos |

---

### Formatos de Exportación

| Formato | Extensión | Usar para |
|---------|-----------|-----------|
| JSON | .json | APIs, programación |
| Excel | .xlsx | Análisis, reportes |
| CSV | .csv | Google Sheets, imports |
| PDF | .pdf | Imprimir, archivar |

---

## ✅ Consejos de Experto

### Para Obtener Mejores Resultados

1. **Usa siempre el Asistente IA** - Ahorra tiempo y mejora precisión

2. **Escribe prompts específicos**

3. **Valida documentos críticos** - Usa "🔍 Validar Datos" antes de importar a sistemas

4. **Corrige errores** - El sistema aprende de tus correcciones

5. **Prueba con 1 documento primero** - Antes de procesar un lote de 100

---

### Para Empresas

1. **Crea plantillas personalizadas** - Para tus tipos de documentos frecuentes

2. **Usa procesamiento en lote** - Para ahorrar tiempo con múltiples docs

3. **Exporta historial mensual** - Para reportes y análisis

4. **Estandariza formatos** - Configura schemas una vez, reutiliza siempre

---

### Para Optimización

1. **Usa el modelo adecuado**:
   ```
   Recetas médicas → Genérico
   Facturas → Recomendado
   Contratos complejos → Avanzado
   ```

2. **Procesa en lotes** - Más eficiente que documentos individuales

3. **Revisa antes de validar** - Validación básica es instantánea

---

## 🎯 Casos de Uso Reales

### Caso 1: Departamento de Contabilidad

**Situación**: Procesar 50 facturas recibidas cada semana

**Proceso:**
1. Escanea las 50 facturas (o pide PDFs a proveedores)
2. Sube todas a verbadoc pro europa
3. Usa plantilla "Factura de Proveedor" (predefinida)
4. Click en "Procesar Todos"
5. Espera ~8 minutos
6. Exporta a Excel
7. Importa Excel a tu software de contabilidad

**Ahorro de tiempo**: ~95% (de 4 horas a 10 minutos)

---

### Caso 2: Departamento de RRHH

**Situación**: Alta de nuevo empleado con documentación completa

**Documentos**: Contrato (4 páginas) + DNI (2 caras) + Título universitario (1 página) = 1 PDF de 7 páginas

**Proceso:**
1. Sube el PDF multi-documento
2. Click en "🔍 Buscar Documentos"
3. verbadoc pro europa detecta 3 documentos
4. Click en "Procesar Todos"
5. Cada documento se clasifica y extrae automáticamente
6. Exporta todo a Excel

**Ahorro de tiempo**: ~90% (de 1 hora a 6 minutos)

---

### Caso 3: Despacho de Abogados

**Situación**: Extraer datos de 20 contratos de arrendamiento para análisis

**Proceso:**
1. Sube los 20 PDFs
2. Usa plantilla "Contrato de Arrendamiento"
3. Procesa en lote
4. Exporta a Excel con datos estructurados
5. Analiza en Excel

**Ahorro de tiempo**: ~93% (de 6 horas a 25 minutos)

---

### Caso 4: Clínica Médica

**Situación**: Digitalizar 100 recetas médicas escaneadas

**Proceso:**
1. Escanea las 100 recetas
2. Sube todas a verbadoc pro europa
3. Usa plantilla "Receta Médica" (predefinida)
4. Procesa con modelo "Genérico" (son formularios simples)
5. Exporta a Excel
6. Importa a tu sistema de gestión clínica

**Ahorro de tiempo**: ~94% (de 8 horas a 30 minutos)

---

## 📚 Glosario de Términos

**Extracción de datos**: Proceso de convertir documentos no estructurados en datos estructurados

**Schema**: Estructura de datos que define qué campos extraer y qué tipo tienen

**Prompt**: Instrucciones en lenguaje natural que explican a la IA qué datos extraer

**Clasificación**: Proceso de identificar automáticamente el tipo de documento

**Validación**: Proceso de verificar que los datos extraídos son correctos

**Segmentación**: Proceso de separar un PDF multi-documento en documentos individuales

**OCR**: Optical Character Recognition (Reconocimiento Óptico de Caracteres)

**GDPR**: Reglamento General de Protección de Datos (normativa europea)

**API**: Interfaz de Programación de Aplicaciones (para integración automática)

**localStorage**: Almacenamiento local del navegador (datos guardados en tu ordenador)

**Procesamiento en lote**: Procesar múltiples documentos automáticamente

**Plantilla**: Configuración guardada (prompt + schema) reutilizable

**DPA**: Data Processing Agreement (Acuerdo de Procesamiento de Datos)

---

**© 2025 verbadoc pro europa - Extracción Inteligente de Datos con IA 100% Europea**

**Web**: https://www.verbadocpro.eu
**Soporte**: soporte@verbadoc.eu
**Ventas**: ventas@verbadoc.eu

**Certificaciones**: GDPR-Compliant | ISO 27001 | SOC 2

---

*Guía de Usuario Completa - Versión 2.0 - Enero 2025*
