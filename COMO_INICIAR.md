# 🚀 Cómo Iniciar Verbadoc Enterprise

## ⚠️ IMPORTANTE: Usa Vercel Dev (no solo Vite)

La aplicación necesita **Vercel CLI** para que las APIs serverless funcionen correctamente.

---

## 📋 Pasos para Iniciar

### 1️⃣ Detén el servidor actual (si está corriendo)
Presiona `Ctrl + C` en la terminal donde está corriendo

### 2️⃣ Inicia con Vercel Dev
```bash
cd "C:\Users\La Bestia\verbadoc_enterprise"
npm run dev
```

### 3️⃣ Espera a que arranque
Verás algo como:
```
Vercel CLI 39.x.x
> Ready! Available at http://localhost:3000
```

### 4️⃣ Abre el navegador
```
http://localhost:3000
```

---

## ✅ ¿Cómo saber si funciona?

Cuando intentes clasificar un documento, en la consola del navegador (F12) deberías ver:

**✅ CORRECTO:**
```
🤖 Clasificando documento: tu-archivo.pdf
🇪🇺 Procesando con Vertex AI en europe-west1
✅ Clasificado como: factura_comercial (95%)
```

**❌ INCORRECTO (si usas solo vite):**
```
Failed to load resource: the server responded with a status of 404
❌ Error clasificando documento: Error: HTTP 404: Not Found
```

---

## 🔧 Comandos Disponibles

```bash
# Modo desarrollo con Vercel (APIs funcionan) ✅
npm run dev

# Solo Vite (APIs NO funcionan) ❌
npm run dev:vite

# Build para producción
npm run build

# Preview de producción
npm run preview
```

---

## 🆘 Solución de Problemas

### Error: "Vercel CLI no encontrado"
```bash
npm install -g vercel
```

### Error: Variables de entorno no cargadas
Vercel Dev carga automáticamente `.env.local`, pero asegúrate de que existe:
```bash
ls -la .env.local
```

### Puerto 3000 ocupado
Edita `vercel.json` o usa:
```bash
vercel dev --listen 3001
```

### Las APIs siguen dando 404
1. Verifica que el servidor dice "Vercel CLI" y no solo "VITE"
2. Reinicia el servidor completamente
3. Borra la carpeta `.vercel` y vuelve a iniciar

---

## 📚 Más Información

- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [Developing with Vercel](https://vercel.com/docs/cli/dev)
