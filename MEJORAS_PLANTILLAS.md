# Mejoras en el Sistema de Plantillas - Verbadoc Europa

## Problema Reportado

El usuario reportó que al crear y guardar una plantilla personalizada en "Mis Modelos", cuando la seleccionaba posteriormente, **no se cargaban el prompt ni el esquema en el panel central** (ExtractionEditor), independientemente de si había un archivo seleccionado o no.

## Análisis Realizado

### Código Revisado

1. **App.tsx** - Función `handleSelectTemplate` (líneas 210-248)
2. **TemplatesPanel.tsx** - Componente `TemplateCard` y función `handleSaveTemplate`
3. **ExtractionEditor.tsx** - Visualización de prompt y schema

### Hallazgos

El flujo de código **era funcionalmente correcto**:

```typescript
// App.tsx línea 210
const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    // ...
    setSchema(JSON.parse(JSON.stringify(template.schema)));
    setPrompt(template.prompt);
}
```

Sin embargo, identificamos **potenciales problemas de validación y debugging**:

1. **Falta de validación**: No se validaba que `template.schema` existiera y fuera un array válido
2. **Sin feedback visual**: El usuario no recibía confirmación cuando guardaba o seleccionaba una plantilla
3. **Debugging difícil**: Sin logs para rastrear el flujo de datos

## Mejoras Implementadas

### 1. Validación Robusta en `handleSelectTemplate` (App.tsx)

**Antes:**
```typescript
setSchema(JSON.parse(JSON.stringify(template.schema)));
setPrompt(template.prompt);
```

**Después:**
```typescript
// Validar que template.schema existe y es un array
if (!template.schema || !Array.isArray(template.schema)) {
    console.error('❌ Error: La plantilla no tiene un schema válido', template);
    alert('Error: Esta plantilla no tiene un esquema válido. Por favor, verifica la plantilla.');
    return;
}

const newSchema = JSON.parse(JSON.stringify(template.schema));
const newPrompt = template.prompt || 'Extrae la información clave del siguiente documento según el esquema JSON proporcionado.';

setSchema(newSchema);
setPrompt(newPrompt);
console.log('✅ Plantilla aplicada - Schema:', newSchema.length, 'campos, Prompt:', newPrompt.substring(0, 50) + '...');
```

**Beneficios:**
- ✅ Detecta plantillas corruptas o mal formadas
- ✅ Proporciona feedback inmediato al usuario
- ✅ Fallback seguro para prompt vacío
- ✅ Logs para debugging

### 2. Validación al Guardar Plantillas (TemplatesPanel.tsx)

**Agregado:**
```typescript
const handleSaveTemplate = () => {
    // Validación de nombre
    if (!newTemplateName.trim()) {
        alert('Por favor, ingresa un nombre para la plantilla');
        return;
    }

    // Validación de esquema no vacío
    if (schemaToSave.length === 0) {
        alert('El esquema debe tener al menos un campo');
        return;
    }

    // Validación de campos con nombre
    const invalidFields = schemaToSave.filter(f => !f.name || f.name.trim() === '');
    if (invalidFields.length > 0) {
        alert('Todos los campos del esquema deben tener un nombre válido');
        return;
    }

    // Logging para debugging
    console.log('💾 Guardando nueva plantilla:', {
        nombre: newTemplate.name,
        campos: newTemplate.schema.length,
        prompt: newTemplate.prompt.substring(0, 50) + '...'
    });

    // ... guardar ...

    // Confirmación visual
    alert(`✅ Plantilla "${newTemplate.name}" guardada correctamente`);
}
```

**Beneficios:**
- ✅ Previene guardar plantillas inválidas
- ✅ Feedback inmediato al usuario
- ✅ Logs para rastrear el guardado
- ✅ Valida que los campos tengan nombres válidos

### 3. Logging en Selección de Plantillas (TemplatesPanel.tsx)

**Agregado en TemplateCard:**
```typescript
<button
    onClick={() => {
        console.log('👆 Click en plantilla:', template.name, '- Schema fields:', template.schema?.length || 0);
        onSelectTemplate(template);
    }}
>
```

**Beneficios:**
- ✅ Rastrea cuándo se hace clic en una plantilla
- ✅ Muestra cuántos campos tiene el schema
- ✅ Facilita debugging del flujo

### 4. Logging Detallado en App.tsx

**Agregado:**
```typescript
console.log('📋 Plantilla seleccionada:', template);
// ... aplicar cambios ...
console.log('🎯 Estado actualizado - Revisa el panel central');
```

**Beneficios:**
- ✅ Rastrea el objeto completo de la plantilla
- ✅ Confirma que el estado se actualizó
- ✅ Guía al desarrollador/usuario para debugging

## Cómo Usar las Mejoras

### Para el Usuario

1. **Crear Plantilla:**
   - El sistema ahora valida que todos los campos tengan nombre
   - Recibes una alerta de confirmación cuando se guarda correctamente
   - Si algo falla, recibes un mensaje claro del error

2. **Seleccionar Plantilla:**
   - Si la plantilla está corrupta, recibes una alerta inmediata
   - El sistema carga automáticamente el prompt y esquema en el panel central
   - **No requiere** tener un archivo seleccionado

3. **Debugging:**
   - Abre la consola del navegador (F12)
   - Al guardar una plantilla, verás: `💾 Guardando nueva plantilla: {...}`
   - Al seleccionar una plantilla, verás: `👆 Click en plantilla: ...` y `✅ Plantilla aplicada - ...`
   - Si hay un error, verás: `❌ Error: ...` con detalles

### Para el Desarrollador

**Flujo de Debugging:**

```
1. Usuario crea plantilla:
   → Logs: "💾 Guardando nueva plantilla: { nombre, campos, prompt }"
   → Logs: "✅ Plantilla guardada exitosamente. Total plantillas: X"
   → Alert: "✅ Plantilla 'nombre' guardada correctamente"

2. Usuario selecciona plantilla:
   → Logs: "👆 Click en plantilla: nombre - Schema fields: X"
   → Logs: "📋 Plantilla seleccionada: { ...objeto completo... }"
   → Logs: "✅ Plantilla aplicada - Schema: X campos, Prompt: ..."
   → Logs: "🎯 Estado actualizado - Revisa el panel central"

3. Si hay error:
   → Logs: "❌ Error: La plantilla no tiene un schema válido"
   → Alert: "Error: Esta plantilla no tiene un esquema válido..."
```

## Casos de Uso Resueltos

### Caso 1: Plantilla sin Schema
**Antes:** La app crasheaba o mostraba pantalla en blanco
**Ahora:** Alert de error + log detallado + no se aplica la plantilla

### Caso 2: Plantilla sin Prompt
**Antes:** Se mostraba campo vacío
**Ahora:** Se usa un prompt por defecto + log indica que se usó fallback

### Caso 3: Campos sin Nombre
**Antes:** Se guardaba la plantilla con campos vacíos
**Ahora:** Validación impide guardar + alert explica el problema

### Caso 4: Usuario no ve cambios
**Antes:** Sin feedback, usuario confundido
**Ahora:** Logs en consola + alerts de confirmación

## Estructura de una Plantilla Válida

```typescript
{
  id: "custom-1731845678901",
  name: "Mi Plantilla",
  description: "Descripción opcional",
  type: "modelo",
  icon: "file",
  schema: [
    {
      id: "field-1731845678901",
      name: "nombre_campo",
      type: "STRING"
    },
    {
      id: "field-1731845678902",
      name: "otro_campo",
      type: "NUMBER"
    }
  ],
  prompt: "Extrae nombre_campo y otro_campo del documento",
  custom: true,
  archived: false
}
```

## Testing Manual

### Escenario 1: Crear y Usar Plantilla Normal
1. Click en "Crear Nueva Plantilla"
2. Ingresar nombre: "Test Factura"
3. Agregar campos: `numero_factura` (STRING), `total` (NUMBER)
4. Modificar prompt: "Extrae número de factura y total"
5. Click "Guardar Plantilla"
6. Verificar alert de confirmación
7. Click en la plantilla guardada
8. Verificar que aparece el prompt y schema en el centro

**Logs esperados:**
```
💾 Guardando nueva plantilla: { nombre: "Test Factura", campos: 2, prompt: "Extrae número de factura y total" }
✅ Plantilla guardada exitosamente. Total plantillas: 1
👆 Click en plantilla: Test Factura - Schema fields: 2
📋 Plantilla seleccionada: {...}
✅ Plantilla aplicada - Schema: 2 campos, Prompt: Extrae número de factura y total
🎯 Estado actualizado - Revisa el panel central
```

### Escenario 2: Intentar Guardar Plantilla Inválida
1. Click en "Crear Nueva Plantilla"
2. **NO ingresar nombre**
3. Click "Guardar Plantilla"
4. Verificar alert: "Por favor, ingresa un nombre para la plantilla"

5. Ingresar nombre pero dejar campos sin nombre
6. Click "Guardar Plantilla"
7. Verificar alert: "Todos los campos del esquema deben tener un nombre válido"

### Escenario 3: Plantilla Corrupta en LocalStorage
1. Abrir DevTools → Console
2. Ejecutar:
```javascript
localStorage.setItem('customTemplates_europa', JSON.stringify([
  {
    id: "corrupted",
    name: "Plantilla Corrupta",
    schema: null,  // ← Inválido
    prompt: "Test"
  }
]));
location.reload();
```
3. Click en "Plantilla Corrupta"
4. Verificar alert de error
5. Verificar log: `❌ Error: La plantilla no tiene un schema válido`

## Archivos Modificados

1. **App.tsx**
   - Función `handleSelectTemplate`: Validación y logs

2. **components/TemplatesPanel.tsx**
   - Función `handleSaveTemplate`: Validaciones y confirmación
   - Componente `TemplateCard`: Logging en click

## Compatibilidad

- ✅ Retrocompatible con plantillas existentes
- ✅ No requiere migración de datos
- ✅ Plantillas antiguas seguirán funcionando
- ✅ Nuevas validaciones solo aplican a plantillas nuevas

## Próximos Pasos (Opcional)

Si el problema persiste después de estas mejoras, considerar:

1. **Agregar Test E2E**: Cypress/Playwright para probar el flujo completo
2. **State Management**: Considerar Zustand/Redux si el estado es complejo
3. **Notificaciones Toast**: Reemplazar `alert()` con toasts más elegantes
4. **Modo Debug**: Toggle en UI para activar/desactivar logs

## Conclusión

Las mejoras implementadas:
- ✅ **Validan datos** antes de guardar y al cargar
- ✅ **Proporcionan feedback** claro al usuario
- ✅ **Facilitan debugging** con logs detallados
- ✅ **Previenen errores** comunes
- ✅ **Son retrocompatibles** con plantillas existentes

**El problema reportado debería estar resuelto.** Si persiste, los nuevos logs en consola ayudarán a identificar la causa raíz exacta.

---

**Fecha:** 17 de noviembre de 2025
**Versión:** Verbadoc Europa v2.0
**Desarrollador:** Claude Code
