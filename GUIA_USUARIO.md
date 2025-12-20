# 📚 Guía de Usuario - VerbadocPro Enterprise

## 🎯 ¿Qué es VerbadocPro?

**VerbadocPro Enterprise** es una plataforma de inteligencia artificial avanzada diseñada para **extraer, clasificar y estructurar información** de documentos empresariales de forma automática. Utiliza los modelos de IA más avanzados de **Google Vertex AI** (Gemini 2.0 y 2.5) procesados íntegramente en **Europa** para cumplir con GDPR.

### 🏆 Características Principales

- ✅ **Extracción inteligente de datos** de PDFs, imágenes y documentos escaneados
- ✅ **Procesamiento 100% en Europa** (Bélgica) - Cumplimiento GDPR
- ✅ **Plantillas predefinidas** por sector (Salud, Legal, Finanzas, RRHH, etc.)
- ✅ **Clasificación automática** de documentos con IA
- ✅ **Procesamiento por lotes** de múltiples documentos
- ✅ **Sistema de aprendizaje** que mejora con el uso
- ✅ **Exportación** a Excel, PDF, CSV y JSON
- ✅ **Transcripción de documentos** escritos a mano (HTR)
- ✅ **Asistente virtual Laia** para ayuda contextual
- ✅ **Historial completo** de extracciones

---

## 🚀 Primeros Pasos

### 1. Inicio de Sesión

Al acceder a VerbadocPro, verás la pantalla de autenticación:

1. **Registrarse:**
   - Email empresarial
   - Contraseña segura (mínimo 8 caracteres)
   - Nombre completo
   - Departamento

2. **Iniciar Sesión:**
   - Email
   - Contraseña

🔐 **Seguridad:** Todas las contraseñas están cifradas con bcrypt (12 rounds) y las sesiones utilizan JWT con cookies httpOnly.

### 2. Interfaz Principal

Una vez dentro, la interfaz se divide en:

```
┌─────────────────────────────────────────────────────┐
│  [Departamento] [Usuario]           [Modo] [Admin] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │  Subir       │  │  Plantillas  │  │ Historial│ │
│  │  Archivos    │  │              │  │          │ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  Editor de Extracción                       │   │
│  │  - Prompt personalizado                     │   │
│  │  - Schema JSON                              │   │
│  │  - Modelo de IA                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  Resultados                                  │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
│  [Laia - Asistente Virtual] 💬                     │
└─────────────────────────────────────────────────────┘
```

---

## 📂 Departamentos Disponibles

VerbadocPro se adapta a diferentes sectores empresariales:

### 🏢 General
- **Descripción:** Plantillas de uso general para cualquier tipo de documento
- **Modelo recomendado:** Gemini 2.0 Flash Exp (más rápido y económico)
- **Casos de uso:** Documentos variados, informes generales

### 🧾 Contabilidad
- **Descripción:** Facturas, recibos, notas de crédito, extractos bancarios
- **Modelo recomendado:** Gemini 2.0 Flash Exp (rápido y económico)
- **Plantillas:**
  - Factura estándar (NIF, CIF, importes, IVA, líneas de detalle)
  - Recibo de pago
  - Nota de crédito
  - Extracto bancario

### 💰 Finanzas
- **Descripción:** Informes financieros, balances, análisis de mercado
- **Modelo recomendado:** Gemini 2.5 Pro (análisis profundo)
- **Plantillas:**
  - Balance de situación
  - Cuenta de resultados
  - Informe de flujo de caja
  - Análisis de inversión

### 📈 Marketing
- **Descripción:** Informes de campañas, análisis de redes sociales, métricas
- **Modelo recomendado:** Gemini 2.0 Flash Exp (análisis rápido)
- **Plantillas:**
  - Informe de campaña publicitaria
  - Análisis de redes sociales (KPIs, engagement)
  - Métricas de conversión

### ⚖️ Legal
- **Descripción:** Contratos, acuerdos, poderes, escrituras
- **Modelo recomendado:** Gemini 2.5 Pro (análisis detallado)
- **Plantillas:**
  - Contrato laboral
  - Acuerdo de confidencialidad (NDA)
  - Poder notarial
  - Términos y condiciones

### 👥 Recursos Humanos
- **Descripción:** Currículums, cartas de oferta, nóminas
- **Modelo recomendado:** Gemini 2.0 Flash Exp (extracción rápida de CVs)
- **Plantillas:**
  - Currículum vitae (extracción estructurada)
  - Carta de oferta de empleo
  - Nómina mensual
  - Evaluación de desempeño

---

## 🤖 Modelos de IA Disponibles

VerbadocPro ofrece 4 modelos de Google Gemini, todos procesados en **🇪🇺 Europa (Bélgica)**:

### 1. Gemini 2.0 Flash Experimental - Último Modelo 🚀 🇪🇺 ⭐ (PREDETERMINADO)
- **Velocidad:** ⚡⚡⚡ Ultrarrápido (< 2 segundos)
- **Coste:** ~$0.0008/documento (**50% más barato que 2.5 Flash**)
- **Estado:** Experimental pero estable
- **Mejor para:**
  - **Uso general recomendado** (el más rápido y económico)
  - Todo tipo de documentos empresariales
  - Facturas, contratos, informes
  - Documentos con imágenes y texto mixto
  - Capacidades multimodales avanzadas
  - Máxima velocidad de procesamiento

**🎯 Ventajas:**
- Modelo más reciente de Google (Diciembre 2024)
- 2× más rápido que modelos anteriores
- 50% más económico que Gemini 2.5 Flash
- Mejor comprensión de contexto
- Razonamiento mejorado

### 2. Gemini 2.5 Flash-Lite - Económico 🇪🇺
- **Velocidad:** ⚡⚡⚡ Muy rápido (< 2 segundos)
- **Coste:** ~$0.0005/documento (el más barato)
- **Mejor para:**
  - Documentos muy simples (1-2 páginas)
  - Formularios con campos claros
  - Recetas médicas básicas
  - Facturas estándar sin complejidad
  - Cuando el coste es prioritario

### 3. Gemini 2.5 Flash - Estable 🇪🇺
- **Velocidad:** ⚡⚡ Rápido (2-5 segundos)
- **Coste:** ~$0.0016/documento
- **Estado:** Completamente estable y probado
- **Mejor para:**
  - Si prefieres estabilidad sobre velocidad
  - Documentos médicos estándar
  - Informes clínicos
  - Contratos de 5-10 páginas
  - Documentos con tablas simples

### 4. Gemini 2.5 Pro - Avanzado 🇪🇺
- **Velocidad:** ⚡ Moderado (5-15 segundos)
- **Coste:** ~$0.008/documento
- **Mejor para:**
  - Documentos complejos (>10 páginas)
  - Múltiples tablas interrelacionadas
  - Análisis profundo de contratos legales
  - Documentos médicos complejos (historias clínicas completas)
  - Documentos con escritura a mano difícil (HTR)
  - Análisis legal detallado
  - Cuando la máxima precisión es crítica

**💡 Consejo:**
- **Uso general:** Usa **Gemini 2.0 Flash Exp** (ya configurado por defecto) ⭐
- **Máxima estabilidad:** Usa **Gemini 2.5 Flash**
- **Documentos complejos:** Usa **Gemini 2.5 Pro**
- **Ahorro máximo:** Usa **Gemini 2.5 Flash-Lite**

---

## 📄 Proceso de Extracción de Datos

### Paso 1: Subir Documentos

1. **Click en "Subir Archivo"** o arrastra archivos a la zona de carga
2. **Formatos soportados:**
   - 📄 PDF (recomendado)
   - 🖼️ Imágenes: PNG, JPG, JPEG, WEBP
   - 📊 Excel (XLSX) para análisis de datos tabulares

3. **Límites:**
   - Tamaño máximo: 10 MB por archivo
   - Hasta 100 páginas por documento

### Paso 2: Seleccionar Plantilla o Crear Schema Personalizado

#### Opción A: Usar Plantilla Predefinida

1. Click en **"Plantillas"** en el panel lateral
2. Selecciona tu departamento
3. Elige una plantilla:
   - **Salud:** Historia clínica, receta médica, informe de alta
   - **Legal:** Contrato, NDA, poder notarial
   - **Contabilidad:** Factura, recibo, extracto
   - **RRHH:** CV, nómina, oferta laboral

4. Click en **"Usar Plantilla"**
   - Los campos se cargan automáticamente en el schema

#### Opción B: Schema Personalizado

1. En el **Editor de Extracción**, define los campos manualmente:
   - **Nombre del campo:** Identificador único (ej: `nombre_paciente`)
   - **Tipo de dato:**
     - `STRING` - Texto (ej: nombre, dirección)
     - `NUMBER` - Número (ej: edad, importe)
     - `BOOLEAN` - Verdadero/Falso (ej: firma_digital)
     - `ARRAY_OF_STRINGS` - Lista de textos (ej: diagnósticos)
     - `ARRAY_OF_OBJECTS` - Lista de objetos complejos (ej: líneas de factura)
     - `OBJECT` - Objeto anidado (ej: dirección completa)

2. Para objetos complejos, añade **campos hijos (children)**

**Ejemplo de Schema:**
```json
{
  "nombre_paciente": "STRING",
  "edad": "NUMBER",
  "diagnosticos": "ARRAY_OF_STRINGS",
  "medicamentos": "ARRAY_OF_OBJECTS" {
    "nombre": "STRING",
    "dosis": "STRING",
    "frecuencia": "STRING"
  }
}
```

#### Opción C: Generar Schema desde Prompt (IA)

1. Escribe en lenguaje natural qué quieres extraer:

   ```
   Extrae el nombre del paciente, edad, lista de diagnósticos,
   y una tabla con los medicamentos recetados (nombre, dosis, frecuencia)
   ```

2. Click en **"Generar Schema con IA"**
3. La IA analizará tu prompt y creará el schema automáticamente

### Paso 3: Personalizar el Prompt

El **prompt** le indica a la IA cómo debe interpretar el documento:

**Prompt por defecto:**
```
Extrae la información clave del siguiente documento según el esquema JSON proporcionado.
```

**Prompt personalizado (ejemplo médico):**
```
Eres un asistente médico experto. Extrae la información clínica del siguiente
documento médico con máxima precisión. Para los diagnósticos, incluye el código
CIE-10 si está presente. Para medicamentos, extrae nombre comercial, principio
activo, dosis y pauta completa.
```

**Prompt personalizado (ejemplo legal):**
```
Analiza el siguiente contrato legal y extrae las cláusulas clave, partes
contratantes, fechas de vigencia, condiciones de pago y cláusulas de rescisión.
Identifica si hay cláusulas de confidencialidad o no competencia.
```

### Paso 4: Seleccionar Modelo de IA

El modelo **Gemini 2.0 Flash Exp** está seleccionado por defecto (el más rápido y económico).

Puedes cambiar según tus necesidades:

- **Uso general (predeterminado):** Gemini 2.0 Flash Exp ⭐ - El más rápido y barato
- **Documentos muy simples:** Flash-Lite - El más económico
- **Máxima estabilidad:** Gemini 2.5 Flash - Modelo probado y estable
- **Documentos complejos:** Gemini 2.5 Pro - Máxima precisión

### Paso 5: Ejecutar Extracción

1. Click en **"Extraer Datos"**
2. La IA procesará el documento en **Europa (Bélgica)**
3. Verás el progreso en tiempo real
4. Los resultados aparecen en formato JSON estructurado

### Paso 6: Revisar y Corregir Resultados

Los resultados se muestran en un **editor JSON** interactivo:

```json
{
  "nombre_paciente": "María García López",
  "edad": 45,
  "diagnosticos": ["Hipertensión arterial", "Diabetes tipo 2"],
  "medicamentos": [
    {
      "nombre": "Enalapril",
      "dosis": "10mg",
      "frecuencia": "1 vez al día"
    },
    {
      "nombre": "Metformina",
      "dosis": "850mg",
      "frecuencia": "2 veces al día"
    }
  ]
}
```

**Acciones disponibles:**
- ✏️ **Editar** cualquier campo directamente
- 📋 **Copiar JSON** al portapapeles
- 💾 **Exportar** a Excel, PDF o CSV

---

## 📊 Exportación de Resultados

VerbadocPro ofrece múltiples formatos de exportación:

### 1. Excel (XLSX)
- Ideal para análisis de datos
- Tablas estructuradas con columnas
- Compatible con Microsoft Excel, Google Sheets
- **Uso:** Análisis masivo, reporting, dashboards

### 2. PDF
- Documento profesional con logo
- Tabla formateada con resultados
- Información del documento original
- **Uso:** Informes para clientes, archivo oficial

### 3. CSV
- Formato universal de datos
- Compatible con cualquier sistema
- Ideal para importar a bases de datos
- **Uso:** Integración con otros sistemas, ETL

### 4. JSON
- Formato técnico estructurado
- Ideal para APIs e integraciones
- Mantiene jerarquía de datos
- **Uso:** Desarrollo, integraciones técnicas

### Exportación de Múltiples Documentos

Si procesaste varios documentos:

1. Ve a **"Historial"**
2. Selecciona los documentos que quieres exportar
3. Click en **"Exportar Seleccionados"**
4. Elige el formato
5. Se generará un archivo consolidado

---

## 🔍 Historial de Extracciones

Todas tus extracciones se guardan automáticamente:

### Visualización del Historial

1. Click en **"Historial"** en el panel lateral
2. Verás una lista con:
   - 📄 Nombre del archivo
   - 📅 Fecha y hora
   - 🎯 Tipo (extracción/transcripción)
   - ✅ Estado

### Acciones sobre Historial

- **Ver Detalles:** Click en cualquier extracción
- **Reabrir:** Cargar de nuevo el documento y resultados
- **Exportar:** Exportar resultados individuales
- **Eliminar:** Borrar del historial

### Búsqueda en Historial

Usa la barra de búsqueda para encontrar extracciones por:
- Nombre de archivo
- Fecha
- Contenido de los campos extraídos

### Almacenamiento

El historial se guarda:
- **Localmente:** En el navegador (localStorage)
- **Usuario puede:** Borrar en cualquier momento
- **Privacidad:** Solo tú puedes acceder a tu historial

---

## 🤖 Funcionalidades Avanzadas

### 1. Clasificación Automática de Documentos

**¿Qué hace?**
La IA clasifica automáticamente tus documentos en categorías antes de procesarlos.

**Cómo usar:**
1. Sube varios documentos de diferentes tipos
2. Click en **"Clasificar Documentos"**
3. La IA analizará y categorizará:
   - Facturas
   - Contratos
   - Informes médicos
   - Recetas
   - CVs
   - etc.

4. Luego puedes procesar por lotes por categoría

**Ventajas:**
- Organización automática
- Aplicación automática de plantillas por tipo
- Ahorro de tiempo en documentos mixtos

### 2. Procesamiento por Lotes

**¿Qué hace?**
Procesa múltiples documentos a la vez con la misma plantilla.

**Cómo usar:**
1. Sube múltiples archivos (hasta 50)
2. Selecciona una plantilla o schema
3. Click en **"Procesar por Lotes"**
4. La aplicación procesará todos secuencialmente
5. Recibirás un archivo consolidado con todos los resultados

**Casos de uso:**
- Procesar 50 facturas del mes
- Extraer datos de 100 CVs
- Analizar múltiples contratos a la vez

**Monitoreo:**
- Barra de progreso global
- Estado individual de cada documento
- Notificación al completar

### 3. Sistema de Aprendizaje de Patrones

**¿Qué hace?**
VerbadocPro aprende de tus correcciones para mejorar futuras extracciones.

**Cómo funciona:**
1. Procesas un documento
2. Corriges algún campo mal extraído
3. El sistema guarda el patrón correcto
4. En futuros documentos similares, usará tu corrección

**Ejemplo:**
- Primera vez: Extrae "Dr." como parte del nombre
- Corriges: Separas título de nombre
- Próxima vez: Automáticamente separa títulos

**Gestión de patrones:**
- Ve a **"Configuración" → "Patrones Aprendidos"**
- Revisa todos los patrones guardados
- Elimina patrones incorrectos
- Exporta/importa patrones entre usuarios

### 4. Transcripción de Documentos a Mano (HTR)

**¿Qué hace?**
Convierte documentos escritos a mano en texto digital.

**Cómo usar:**
1. Sube una imagen de documento manuscrito
2. Click en **"Transcribir Escritura a Mano"**
3. La IA (OCR avanzado) reconoce la caligrafía
4. Obtienes el texto transcrito

**Calidad:**
- ✅ **Buena:** Letra clara y legible
- ⚠️ **Media:** Letra cursiva estándar
- ❌ **Difícil:** Caligrafía muy irregular (requiere Pro)

**Casos de uso:**
- Recetas médicas manuscritas
- Notas de enfermería
- Formularios rellenados a mano
- Documentos históricos

### 5. Búsqueda de Imágenes en PDFs

**¿Qué hace?**
Encuentra y extrae imágenes específicas dentro de documentos PDF.

**Cómo usar:**
1. Sube un PDF con imágenes
2. Click en **"Buscar Imágenes"**
3. Describe qué imagen buscas (ej: "logo de la empresa", "firma del paciente")
4. La IA encuentra la imagen y te permite descargarla

**Casos de uso:**
- Extraer firmas de contratos
- Obtener logos de facturas
- Capturar gráficos de informes

### 6. Generación de Metadatos

**¿Qué hace?**
Genera automáticamente título, resumen y palabras clave del documento.

**Cómo usar:**
1. Procesa un documento
2. Click en **"Generar Metadatos"**
3. Obtienes:
   - **Título:** Título descriptivo del documento
   - **Resumen:** Resumen en 2-3 frases
   - **Palabras clave:** Lista de términos relevantes

**Uso:**
- Catalogación de documentos
- Búsqueda posterior
- Organización de archivos

---

## 💬 Asistente Virtual Laia

**Laia** es tu asistente personal con IA que te ayuda en tiempo real.

### Capacidades de Laia

1. **Ayuda con la aplicación:**
   ```
   Usuario: ¿Cómo exporto a Excel?
   Laia: Para exportar a Excel, haz click en "Exportar"
         y selecciona formato XLSX...
   ```

2. **Explicación de resultados:**
   ```
   Usuario: ¿Qué significa este campo?
   Laia: Este campo representa el código CIE-10 del
         diagnóstico, que es un estándar internacional...
   ```

3. **Sugerencias de mejora:**
   ```
   Usuario: La extracción no es precisa
   Laia: Te recomiendo usar el modelo Pro para documentos
         complejos. También puedes mejorar el prompt...
   ```

4. **Preguntas sobre el documento:**
   ```
   Usuario: ¿Cuál es el importe total de la factura?
   Laia: El importe total de la factura es 1.245,50€ IVA incluido
   ```

### Cómo usar Laia

1. Click en el **icono de chat** 💬 (esquina inferior derecha)
2. Escribe tu pregunta en lenguaje natural
3. Laia responderá con contexto del documento actual

**Ejemplos de preguntas:**
- "¿Cómo añado un nuevo campo al schema?"
- "¿Por qué no se extrajo correctamente este campo?"
- "Resume este informe médico"
- "¿Qué modelo me recomiendas para este documento?"

---

## 👨‍💼 Panel de Administración

**Solo para usuarios con rol de Administrador**

### Acceso

1. Click en **"Admin"** en la esquina superior derecha
2. Solo visible si tienes permisos

### Funcionalidades Admin

#### 1. Gestión de Usuarios

- **Ver todos los usuarios registrados:**
  - Email
  - Nombre
  - Departamento
  - Fecha de registro
  - Último acceso
  - Rol actual

- **Cambiar roles:**
  - Promover usuario a admin
  - Revocar permisos de admin

- **Eliminar usuarios:**
  - Borrar cuenta (acción irreversible)

#### 2. Estadísticas de Uso

- **Métricas generales:**
  - Total de extracciones realizadas
  - Documentos procesados hoy/semana/mes
  - Usuarios activos
  - Modelo de IA más usado

- **Por usuario:**
  - Extracciones por usuario
  - Departamento más activo
  - Tiempo promedio de procesamiento

- **Por departamento:**
  - Distribución de uso
  - Plantillas más utilizadas

#### 3. Logs de Actividad

Visualiza todo lo que sucede en la plataforma:

- **Eventos registrados:**
  - Registros de usuarios
  - Inicios de sesión
  - Extracciones realizadas
  - Cambios de configuración
  - Exportaciones

- **Información de cada log:**
  - Timestamp exacto
  - Usuario que realizó la acción
  - Tipo de acción
  - Detalles adicionales
  - Departamento

- **Filtros:**
  - Por usuario
  - Por fecha
  - Por tipo de acción
  - Por departamento

#### 4. Configuración Global

- **Límites del sistema:**
  - Tamaño máximo de archivo
  - Número de extracciones simultáneas
  - Tiempo máximo de procesamiento

- **Modelos de IA:**
  - Activar/desactivar modelos
  - Configurar modelo por defecto

---

## ⚙️ Configuración de Usuario

### Preferencias Personales

**Modo Oscuro/Claro:**
- Toggle en la esquina superior derecha
- Se guarda automáticamente

**Departamento por defecto:**
- Selecciona tu departamento principal
- Las plantillas se filtrarán automáticamente

**Idioma:**
- Español (actual)
- Inglés (próximamente)

### Gestión de Plantillas Personalizadas

1. Ve a **"Configuración" → "Mis Plantillas"**
2. **Crear nueva plantilla:**
   - Nombre
   - Descripción
   - Departamento
   - Schema completo

3. **Editar plantillas existentes:**
   - Modificar campos
   - Cambiar orden
   - Añadir validaciones

4. **Compartir plantillas:**
   - Exportar como JSON
   - Compartir con compañeros de equipo

### Integración con API

**Próximamente:** API REST para integrar VerbadocPro con tus sistemas.

---

## 🔒 Seguridad y Cumplimiento

### Procesamiento de Datos

**🇪🇺 100% en Europa:**
- Todos los datos se procesan en **Bélgica (europe-west1)**
- **0% de datos** salen de la Unión Europea
- Cumplimiento total con **GDPR**

### Encriptación

- **En tránsito:** TLS 1.3 (HTTPS forzado)
- **Contraseñas:** bcrypt con 12 salt rounds
- **Sesiones:** JWT en httpOnly cookies (7 días de expiración)

### Privacidad

**Lo que NO hacemos:**
- ❌ No almacenamos tus documentos en servidores
- ❌ No entrenamos modelos con tus datos
- ❌ No compartimos datos con terceros
- ❌ No transferimos datos fuera de la UE

**Lo que SÍ hacemos:**
- ✅ Procesamiento efímero (en memoria)
- ✅ Historial solo en tu navegador (localStorage)
- ✅ Control total del usuario sobre sus datos
- ✅ Puedes borrar todo en cualquier momento

### Cumplimiento Normativo

- **GDPR (Reglamento General de Protección de Datos)**
- **LOPD (Ley Orgánica de Protección de Datos)**
- **Ley de Protección de Datos de Salud** (para sector sanitario)
- **Estándares de Seguridad:** ISO 27001 (infraestructura Vercel)

### Datos Sensibles (PHI/PII)

Para documentos médicos con **PHI** (Protected Health Information):

- **Cumplimiento:** HIPAA-aligned (datos en Europa)
- **Sensibilidad:** Niveles de clasificación automática
  - 🔴 Muy Alta: DNI, historia clínica completa
  - 🟠 Alta: Fecha de nacimiento, diagnósticos
  - 🟡 Media: Dirección, teléfono
  - 🟢 Baja: Información pública

---

## 💡 Casos de Uso Reales

### 1. Hospital - Digitalización de Historias Clínicas

**Problema:**
Miles de historias clínicas en papel que necesitan digitalizarse.

**Solución con VerbadocPro:**
1. Escanear historias clínicas en PDF
2. Usar plantilla "Historia Clínica Completa"
3. Procesamiento por lotes de 50 documentos
4. Exportar a Excel para importar a sistema HIS

**Resultado:**
- 95% de precisión en datos clave
- 10× más rápido que entrada manual
- Cumplimiento GDPR (datos en Europa)

### 2. Despacho Legal - Análisis de Contratos

**Problema:**
Revisar cientos de contratos para extraer cláusulas específicas.

**Solución con VerbadocPro:**
1. Subir contratos en PDF
2. Crear schema personalizado para cláusulas clave
3. Usar modelo Pro (Gemini 2.5 Pro)
4. Prompt: "Extrae partes contratantes, vigencia, condiciones de pago, cláusulas de rescisión"

**Resultado:**
- Identificación de cláusulas de riesgo
- Base de datos estructurada de todos los contratos
- Exportación a Excel para análisis comparativo

### 3. Empresa - Digitalización de Facturas

**Problema:**
Procesar 500 facturas mensuales de proveedores diversos.

**Solución con VerbadocPro:**
1. Clasificación automática de documentos
2. Plantilla de factura estándar
3. Procesamiento por lotes
4. Exportar a CSV para importar a sistema contable

**Resultado:**
- Reducción de 80% en tiempo de procesamiento
- 98% de precisión en importes y fechas
- Integración directa con software de contabilidad

### 4. RRHH - Análisis de Currículums

**Problema:**
Revisar 200 CVs para un proceso de selección.

**Solución con VerbadocPro:**
1. Subir todos los CVs (PDF, DOCX)
2. Plantilla de CV personalizada
3. Extraer: experiencia, formación, habilidades, idiomas
4. Exportar a Excel con puntuación automática

**Resultado:**
- Pre-selección en 2 horas vs 2 días
- Base de datos de candidatos estructurada
- Búsquedas rápidas por habilidades o experiencia

---

## 🆘 Solución de Problemas

### La extracción no es precisa

**Soluciones:**

1. **Mejorar el prompt:**
   ```
   ❌ Malo: "Extrae datos del documento"
   ✅ Bueno: "Extrae el nombre completo del paciente (incluyendo
             apellidos), la fecha de nacimiento en formato DD/MM/AAAA,
             y la lista completa de diagnósticos con códigos CIE-10"
   ```

2. **Usar un modelo más potente:**
   - Si usas Flash-Lite → Cambia a **2.0 Flash Exp** o **2.5 Flash**
   - Si usas 2.0 Flash Exp → Cambia a **2.5 Flash** (más estable) o **2.5 Pro**
   - Si usas 2.5 Flash → Cambia a **2.5 Pro** (máxima precisión)

3. **Mejorar la calidad del documento:**
   - Escanear a 300 DPI mínimo
   - Asegurar que el texto sea legible
   - Evitar documentos demasiado oscuros o borrosos

4. **Ajustar el schema:**
   - Si pides un NUMBER y el campo contiene letras, la IA se confunde
   - Usa STRING para datos mixtos y convierte después

### El documento tarda mucho en procesar

**Causas y soluciones:**

- **Documento muy grande (>50 páginas):**
  - Dividir en partes más pequeñas
  - Usar **Gemini 2.0 Flash Exp** (el más rápido) o **2.5 Flash-Lite**

- **Múltiples documentos en cola:**
  - Solo se procesa 1 a la vez
  - Esperar a que termine el anterior

- **Conexión lenta:**
  - Verificar tu conexión a internet
  - Los datos no se transfieren, solo los resultados

### Error: "Missing required fields"

**Causa:**
El schema tiene campos sin nombre o con nombres inválidos.

**Solución:**
1. Revisar que todos los campos tengan nombre
2. Nombres deben ser alfanuméricos (sin espacios ni tildes)
   - ✅ Correcto: `nombre_paciente`, `fecha_nacimiento`
   - ❌ Incorrecto: `nombre paciente`, `fecha_naciemento`

### No puedo exportar a Excel

**Causas posibles:**

1. **No hay resultados:**
   - Primero debes extraer datos
   - Verifica que la extracción fue exitosa

2. **Bloqueador de pop-ups:**
   - Permitir pop-ups en tu navegador
   - La descarga se abre en nueva ventana

3. **Navegador antiguo:**
   - Actualizar a la última versión
   - Navegadores compatibles: Chrome, Firefox, Edge, Safari

### El historial desapareció

**Causa:**
El historial se guarda en localStorage del navegador.

**Posibles razones:**
- Borrado de caché del navegador
- Modo incógnito (no se guarda)
- Cambio de navegador o dispositivo

**Solución:**
- El historial no es recuperable si se borró el localStorage
- **Recomendación:** Exportar extracciones importantes inmediatamente

### No puedo acceder al panel de Admin

**Causa:**
Tu usuario no tiene rol de administrador.

**Solución:**
- Contactar con tu administrador
- Solo administradores pueden gestionar usuarios

---

## 📞 Soporte y Contacto

### Ayuda dentro de la Aplicación

1. **Laia (Asistente Virtual):** Pregunta cualquier cosa 💬
2. **Modal de Ayuda:** Click en ❓ en la esquina superior
3. **Documentación:** Esta guía de usuario

### Soporte Técnico

**Email:** soporte@verbadocpro.eu
**Horario:** Lunes a Viernes, 9:00 - 18:00 CET
**Tiempo de respuesta:** < 24 horas

### Feedback y Sugerencias

Tu opinión es importante. Envíanos sugerencias a:
**feedback@verbadocpro.eu**

### Reportar Bugs

Problemas técnicos:
- **GitHub Issues:** https://github.com/VCNPRO/verbadoc_europa_pro/issues
- Describe el problema con detalle
- Incluye capturas de pantalla si es posible

---

## 🔄 Actualizaciones y Roadmap

### Versión Actual: 2.0.0

**Novedades:**
- ✅ Sistema de autenticación seguro (bcrypt + JWT)
- ✅ CORS restrictivo
- ✅ Headers de seguridad completos
- ✅ Procesamiento 100% en Europa
- ✅ Panel de administración mejorado

### Próximas Funcionalidades

**Q1 2025:**
- 🔜 API REST para integraciones
- 🔜 Webhooks para automatización
- 🔜 Exportación a formatos adicionales (Word, XML)

**Q2 2025:**
- 🔜 Soporte multiidioma (Inglés, Francés, Alemán)
- 🔜 OCR mejorado con modelos especializados
- 🔜 Plantillas de más sectores (Seguros, Logística, etc.)

**Q3 2025:**
- 🔜 App móvil (iOS y Android)
- 🔜 Procesamiento offline
- 🔜 Integración con Microsoft Office 365

---

## 📊 Glosario de Términos

### Términos Técnicos

- **Schema:** Estructura de datos que define qué campos extraer
- **Prompt:** Instrucciones en lenguaje natural para la IA
- **JSON:** Formato de datos estructurados
- **OCR:** Reconocimiento Óptico de Caracteres (convierte imágenes en texto)
- **HTR:** Reconocimiento de Escritura a Mano
- **API:** Interfaz de Programación de Aplicaciones (para integraciones)
- **JWT:** JSON Web Token (sistema de autenticación)

### Términos de IA

- **Vertex AI:** Plataforma de IA de Google Cloud
- **Gemini:** Familia de modelos de IA de Google
- **Prompt Engineering:** Técnica para mejorar las instrucciones a la IA
- **Token:** Unidad de procesamiento (aprox. 4 caracteres)

### Términos Médicos

- **PHI:** Protected Health Information (Información Protegida de Salud)
- **CIE-10:** Clasificación Internacional de Enfermedades (versión 10)
- **HL7:** Estándar de intercambio de datos médicos
- **FHIR:** Fast Healthcare Interoperability Resources

### Términos de Seguridad

- **GDPR:** Reglamento General de Protección de Datos (UE)
- **Bcrypt:** Algoritmo de cifrado de contraseñas
- **TLS:** Transport Layer Security (cifrado de conexiones)
- **httpOnly Cookie:** Cookie segura no accesible desde JavaScript

---

## ✅ Checklist de Mejores Prácticas

### Antes de Procesar

- [ ] Verificar calidad del documento (legible, sin manchas)
- [ ] Seleccionar el departamento correcto
- [ ] Elegir la plantilla más apropiada
- [ ] Revisar el prompt (añadir contexto si es necesario)
- [ ] Seleccionar el modelo adecuado según complejidad

### Durante el Procesamiento

- [ ] No cerrar la ventana mientras procesa
- [ ] Revisar resultados inmediatamente
- [ ] Corregir campos incorrectos (sistema aprende)
- [ ] Validar datos críticos manualmente

### Después del Procesamiento

- [ ] Exportar resultados importantes inmediatamente
- [ ] Guardar plantillas personalizadas si se reutilizan
- [ ] Borrar extracciones con datos sensibles del historial
- [ ] Documentar patrones de corrección para el equipo

---

## 🎓 Consejos de Expertos

### 1. Optimiza tus Prompts

**❌ Prompt genérico:**
```
Extrae información del documento
```

**✅ Prompt optimizado:**
```
Eres un experto en facturas españolas. Extrae los siguientes datos:
- NIF/CIF del emisor Y receptor
- Fecha de emisión (formato DD/MM/AAAA)
- Importe base imponible, IVA (21%, 10%, 4%) y total
- Líneas de detalle: descripción, cantidad, precio unitario, total
- Forma de pago y vencimiento
```

### 2. Estructura bien tu Schema

Para documentos con tablas, usa `ARRAY_OF_OBJECTS`:

```json
{
  "lineas_factura": "ARRAY_OF_OBJECTS" {
    "descripcion": "STRING",
    "cantidad": "NUMBER",
    "precio_unitario": "NUMBER",
    "iva": "NUMBER",
    "total": "NUMBER"
  }
}
```

### 3. Aprovecha el Sistema de Aprendizaje

- Corrige siempre los errores sistemáticos
- El sistema guardará el patrón correcto
- En el siguiente documento, aplicará tu corrección

### 4. Procesamiento por Lotes Inteligente

- Agrupa documentos similares
- Usa la misma plantilla para todos
- Revisa el primer resultado antes de procesar los demás
- Si el primero falla, ajusta la plantilla antes de continuar

### 5. Seguridad de Datos

- Borra el historial periódicamente si trabajas con datos sensibles
- Usa el modo incógnito para datos ultra-sensibles
- Exporta y guarda en sistemas seguros (no en el navegador)

---

## 📜 Historial de Versiones

### v2.0.0 (19/12/2024) - FASE 1 Seguridad ✅
- Sistema de autenticación real (bcrypt + JWT)
- CORS restrictivo
- Headers de seguridad completos
- Procesamiento 100% en Europa
- Documentación de seguridad

### v1.5.0 (27/11/2024)
- Sistema de cola de procesamiento
- Cron jobs para procesamiento masivo
- Mejoras en clasificación automática

### v1.0.0 (Noviembre 2024)
- Lanzamiento inicial
- Extracción con IA
- Plantillas predefinidas
- Historial y exportación

---

**© 2024 VerbadocPro Enterprise - Todos los derechos reservados**

---

*Esta guía se actualiza regularmente. Última actualización: 20/12/2024*

*Versión de la aplicación: 2.0.0*

*Procesamiento 100% en Europa 🇪🇺 - Cumplimiento GDPR ✅*
