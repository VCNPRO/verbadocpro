# 🔧 Solución al Error 500 en /api/extract

## Problema Identificado

El error HTTP 500 en el endpoint `/api/extract` ocurre cuando **no están configuradas correctamente las credenciales de Google Cloud / Vertex AI**.

## Causas Comunes

1. ❌ Variables de entorno no configuradas
2. ❌ Credenciales de Google Cloud inválidas o expiradas
3. ❌ Proyecto de Google Cloud sin permisos para Vertex AI
4. ❌ Modelo no disponible en la región `europe-west1`

---

## ✅ Solución Paso a Paso

### 1. Crear un archivo `.env.local` en la raíz del proyecto

```bash
# En C:\Users\La Bestia\verbadoc_enterprise\.env.local
```

### 2. Configurar las variables de entorno

Copia este contenido en tu archivo `.env.local`:

```env
# Tu Project ID de Google Cloud
VITE_GEMINI_PROJECT_ID=tu-project-id-aqui
GOOGLE_CLOUD_PROJECT=tu-project-id-aqui

# Credenciales de Service Account (JSON completo)
# Opción 1 (Desarrollo Local): Ruta al archivo JSON
GOOGLE_APPLICATION_CREDENTIALS=./credenciales-google-cloud.json

# Opción 2 (Producción/Vercel): Pegar el contenido JSON completo como string
# GOOGLE_APPLICATION_CREDENTIALS='{"type":"service_account","project_id":"...", ...}'
```

### 3. Obtener las Credenciales

#### Paso A: Ir a Google Cloud Console
1. Ve a https://console.cloud.google.com/
2. Selecciona tu proyecto (o crea uno nuevo)
3. Anota el **Project ID**

#### Paso B: Habilitar Vertex AI API
1. Ve a **APIs & Services** > **Library**
2. Busca "Vertex AI API"
3. Haz clic en **Enable**

#### Paso C: Crear Service Account
1. Ve a **IAM & Admin** > **Service Accounts**
2. Clic en **Create Service Account**
3. Nombre: `verbadoc-ai`
4. Permisos necesarios:
   - `Vertex AI User`
   - `Vertex AI Service Agent`
5. Clic en **Create Key** > JSON
6. Descarga el archivo JSON

#### Paso D: Configurar las credenciales

**Para desarrollo local:**
```bash
# Copiar el archivo JSON a la raíz del proyecto
# Renombrarlo a: credenciales-google-cloud.json

# En .env.local
GOOGLE_APPLICATION_CREDENTIALS=./credenciales-google-cloud.json
```

**Para despliegue en Vercel:**
```bash
# Abrir el archivo JSON descargado
# Copiar TODO el contenido (es un JSON grande)
# Ir a Vercel > Project Settings > Environment Variables
# Crear variable: GOOGLE_APPLICATION_CREDENTIALS
# Pegar el JSON completo como valor (sin comillas adicionales)
```

---

## 🧪 Verificar la Configuración

### Opción 1: Verificar logs en la consola del navegador

Después de configurar las variables, recarga la aplicación e intenta clasificar un documento nuevamente. Los nuevos logs te indicarán exactamente qué está fallando:

```
🇪🇺 Procesando con Vertex AI en europe-west1
📍 Proyecto: tu-project-id
🤖 Modelo: gemini-2.5-flash-lite
📄 Tipo de contenido: text, file(application/pdf)
⏳ Llamando a Vertex AI...
✅ Respuesta generada (1234 caracteres)
```

### Opción 2: Verificar en el servidor (si tienes acceso)

Si estás corriendo el servidor localmente:

```bash
cd verbadoc_enterprise
vercel dev
```

Mira los logs del servidor en la terminal.

---

## 📝 Errores Específicos y Soluciones

### Error: "PROJECT_ID no está configurado"
```
❌ Solución: Configura VITE_GEMINI_PROJECT_ID en .env.local
```

### Error: "Credenciales de Google Cloud no configuradas"
```
❌ Solución: Configura GOOGLE_APPLICATION_CREDENTIALS en .env.local
```

### Error: "Las credenciales son inválidas o han expirado"
```
❌ Solución: Descarga nuevas credenciales desde Google Cloud Console
```

### Error: "La cuenta de servicio no tiene permisos"
```
❌ Solución: Añade el rol "Vertex AI User" a la service account
```

### Error: "El modelo no está disponible en europe-west1"
```
❌ Solución: Verifica que el modelo esté disponible en la región europea
           o cambia el modelo en aiAgentService.ts:110
```

---

## 🚀 Mejoras Implementadas

He mejorado el archivo `/api/extract.ts` con:

1. ✅ **Validaciones previas** - Verifica credenciales antes de llamar a Vertex AI
2. ✅ **Logs detallados** - Muestra exactamente qué está pasando en cada paso
3. ✅ **Mensajes de error específicos** - Te dice exactamente qué falla y cómo solucionarlo
4. ✅ **Mejor manejo de excepciones** - Captura errores comunes (autenticación, permisos, cuota, etc.)

---

## 📞 ¿Necesitas Ayuda?

Si sigues teniendo problemas después de seguir estos pasos:

1. Verifica los logs en la consola del navegador (F12)
2. Verifica los logs del servidor (si tienes acceso)
3. Comprueba que el archivo `.env.local` esté en la raíz del proyecto
4. Asegúrate de reiniciar el servidor después de cambiar las variables de entorno

---

## 🔐 Seguridad

**IMPORTANTE:**
- ❌ NUNCA subas el archivo `.env.local` a Git
- ❌ NUNCA subas el archivo de credenciales JSON a Git
- ✅ Estos archivos ya están en `.gitignore`
- ✅ Para producción, usa variables de entorno de Vercel
