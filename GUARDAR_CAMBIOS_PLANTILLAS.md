# Función "Guardar Cambios en Plantillas" - Verbadoc Europa

## Nueva Funcionalidad Implementada

Se ha implementado la capacidad de **guardar modificaciones** realizadas a plantillas existentes (tanto personalizadas como predefinidas) directamente desde el panel central de edición.

## ¿Cómo Funciona?

### 1. Seleccionar una Plantilla

Cuando seleccionas una plantilla desde el panel derecho:
- El prompt y esquema se cargan en el panel central
- Puedes editar tanto el prompt como los campos del esquema
- El sistema detecta automáticamente si hay cambios

### 2. Detectar Cambios

El sistema compara en tiempo real:
- **Prompt actual** vs **Prompt original de la plantilla**
- **Schema actual** vs **Schema original de la plantilla**

Si detecta diferencias, aparece un botón naranja: **"Guardar Cambios en Plantilla"**

### 3. Guardar Cambios

#### Para Plantillas Personalizadas (Custom)
- Click en "Guardar Cambios en Plantilla"
- Los cambios se guardan **directamente** en la plantilla existente
- Se actualiza el localStorage
- La plantilla se mantiene seleccionada con los nuevos valores

#### Para Plantillas Predefinidas
- Click en "Guardar Cambios en Plantilla"
- Se muestra un diálogo de confirmación:
  > "Factura Estándar" es una plantilla predefinida y no se puede modificar directamente.
  > ¿Deseas guardar una copia personalizada con tus cambios?
- Si aceptas, se crea una **nueva plantilla personalizada** con el nombre:
  - `[Nombre Original] (Modificada)`
  - Ejemplo: "Factura Estándar (Modificada)"
- La nueva plantilla se guarda en "Mis Modelos"
- Se selecciona automáticamente la nueva plantilla

## Características Técnicas

### Archivos Modificados

#### 1. `components/ExtractionEditor.tsx`

**Props añadidos:**
```typescript
onSaveTemplateChanges?: (templateId: string, updatedPrompt: string, updatedSchema: SchemaField[]) => void;
```

**Lógica de detección de cambios:**
```typescript
const hasTemplateChanges = useMemo(() => {
    if (!template) return false;
    if ('secciones' in template) return false; // No permitir plantillas de salud

    const promptChanged = prompt !== template.prompt;
    const schemaChanged = JSON.stringify(schema) !== JSON.stringify(template.schema);

    return promptChanged || schemaChanged;
}, [template, prompt, schema]);
```

**Botón de guardar:**
```typescript
{hasTemplateChanges && template && onSaveTemplateChanges && (
    <button onClick={handleSaveChanges} ...>
        Guardar Cambios en Plantilla
    </button>
)}
```

**Función de guardado:**
```typescript
const handleSaveChanges = () => {
    if (!template || !onSaveTemplateChanges) return;

    // Si es predefinida, preguntar por copia
    if (!template.custom) {
        const saveCopy = confirm(...);
        if (!saveCopy) return;
    }

    onSaveTemplateChanges(template.id, prompt, schema);
    alert(`✅ Cambios guardados en la plantilla "${template.name}"`);
};
```

#### 2. `App.tsx`

**Nueva función:**
```typescript
const handleSaveTemplateChanges = (templateId: string, updatedPrompt: string, updatedSchema: SchemaField[]) => {
    const originalTemplate = selectedTemplate;
    if (!originalTemplate) return;

    // Si es predefinida: crear copia personalizada
    if (!originalTemplate.custom) {
        const newCustomTemplate = {
            id: `custom-${Date.now()}`,
            name: `${originalTemplate.name} (Modificada)`,
            description: originalTemplate.description || 'Copia modificada',
            schema: JSON.parse(JSON.stringify(updatedSchema)),
            prompt: updatedPrompt,
            custom: true,
            archived: false
        };

        // Guardar en localStorage
        const stored = localStorage.getItem('customTemplates_europa');
        const customTemplates = stored ? JSON.parse(stored) : [];
        const updatedTemplates = [...customTemplates, newCustomTemplate];
        localStorage.setItem('customTemplates_europa', JSON.stringify(updatedTemplates));

        // Seleccionar la nueva plantilla
        setSelectedTemplate(newCustomTemplate);
        return;
    }

    // Si es personalizada: actualizar directamente
    const stored = localStorage.getItem('customTemplates_europa');
    const customTemplates = JSON.parse(stored);
    const updatedTemplates = customTemplates.map((t: any) => {
        if (t.id === templateId) {
            return { ...t, schema: updatedSchema, prompt: updatedPrompt };
        }
        return t;
    });

    localStorage.setItem('customTemplates_europa', JSON.stringify(updatedTemplates));

    // Actualizar plantilla seleccionada
    const updatedTemplate = updatedTemplates.find((t: any) => t.id === templateId);
    setSelectedTemplate(updatedTemplate);
};
```

**Prop pasado a ExtractionEditor:**
```typescript
<ExtractionEditor
    onSaveTemplateChanges={handleSaveTemplateChanges}
    // ... otros props
/>
```

### Flujo de Datos

```
Usuario selecciona plantilla
    ↓
TemplatesPanel → onSelectTemplate → App.tsx → handleSelectTemplate
    ↓
App.tsx → setSchema + setPrompt → ExtractionEditor (props)
    ↓
Usuario modifica prompt/schema en ExtractionEditor
    ↓
hasTemplateChanges = true → Botón "Guardar Cambios" visible
    ↓
Usuario click "Guardar Cambios"
    ↓
ExtractionEditor → onSaveTemplateChanges → App.tsx → handleSaveTemplateChanges
    ↓
¿Es plantilla custom?
    ├─ SÍ → Actualizar plantilla existente en localStorage
    └─ NO → Crear nueva plantilla personalizada en localStorage
    ↓
TemplatesPanel se actualiza automáticamente (por localStorage change)
```

## Ejemplos de Uso

### Ejemplo 1: Modificar Plantilla Personalizada

1. Usuario crea plantilla "Mi Factura" con campos: `numero`, `fecha`, `total`
2. Usuario selecciona "Mi Factura"
3. Usuario agrega campo `impuestos` (NUMBER)
4. Aparece botón "Guardar Cambios en Plantilla" (naranja)
5. Usuario hace click
6. ✅ La plantilla "Mi Factura" ahora tiene 4 campos

### Ejemplo 2: Modificar Plantilla Predefinida

1. Usuario selecciona "Factura Estándar"
2. Usuario modifica el prompt: "Extrae número, fecha, total, proveedor y método de pago"
3. Usuario agrega campos: `proveedor`, `metodo_pago`
4. Aparece botón "Guardar Cambios en Plantilla"
5. Usuario hace click
6. Diálogo: "¿Deseas guardar una copia personalizada con tus cambios?"
7. Usuario acepta
8. ✅ Se crea "Factura Estándar (Modificada)" en "Mis Modelos"

### Ejemplo 3: Plantillas de Salud (Restricción)

1. Usuario selecciona plantilla con `secciones` (plantilla de salud)
2. Usuario modifica campos
3. ❌ Botón "Guardar Cambios" NO aparece
4. Razón: Las plantillas de salud tienen estructura especial y no se pueden guardar con este método

## Validaciones Implementadas

1. **Sin plantilla seleccionada**: Botón no aparece
2. **Sin cambios detectados**: Botón no aparece
3. **Plantillas de salud**: Botón no aparece (estructura incompatible)
4. **Errores en schema**: Botón deshabilitado (igual que "Ejecutar Extracción")
5. **Schema vacío**: Botón deshabilitado

## Logs para Debugging

Los siguientes logs aparecen en la consola del navegador (F12):

```javascript
// Al detectar cambios
console.log('🔄 ExtractionEditor - Props recibidos:', {
    prompt: '...',
    schemaLength: 4,
    schemaFields: 'numero, fecha, total, impuestos',
    file: 'sin archivo',
    hasChanges: true  // ← Indica si hay cambios
});

// Al guardar cambios
console.log('💾 App.tsx - Guardando cambios en plantilla:', 'custom-1234567890');

// Si es plantilla predefinida
console.log('📋 Creando copia personalizada:', 'Factura Estándar (Modificada)');
console.log('✅ Copia guardada exitosamente como plantilla personalizada');

// Si es plantilla personalizada
console.log('✅ Plantilla personalizada actualizada exitosamente');
```

## Estilos del Botón

El botón "Guardar Cambios en Plantilla" tiene:
- **Color**: Naranja (`#f59e0b`) - Para diferenciarlo del botón azul de extracción
- **Icono**: Flecha hacia abajo con línea (save/download icon)
- **Posición**: Encima del botón "Ejecutar Extracción"
- **Espacio**: `mb-3` (margen inferior de 3 unidades)
- **Hover**: Opacidad 90% al pasar el mouse
- **Disabled**: 50% opacidad cuando hay errores en el schema

## Compatibilidad

- ✅ Compatible con plantillas existentes
- ✅ No afecta plantillas predefinidas (crea copias)
- ✅ Retrocompatible con localStorage anterior
- ✅ Funciona sin archivo cargado (modo preview)
- ✅ Funciona con archivo cargado

## Mejoras Futuras (Opcionales)

1. **Toast notifications**: Reemplazar `alert()` con notificaciones más elegantes
2. **Historial de versiones**: Guardar versiones anteriores de plantillas modificadas
3. **Comparación visual**: Mostrar diff entre plantilla original y modificada
4. **Export/Import**: Permitir exportar plantillas modificadas como archivos JSON
5. **Revertir cambios**: Botón para descartar cambios y volver a la plantilla original

## Testing Manual

### Escenario 1: Modificar y Guardar Plantilla Custom
```
1. Crear plantilla "Test1" con 2 campos
2. Seleccionar "Test1"
3. Agregar campo "nuevo_campo"
4. Verificar que aparece botón naranja "Guardar Cambios"
5. Click en "Guardar Cambios"
6. Verificar alert: "✅ Cambios guardados en la plantilla 'Test1'"
7. Verificar en "Mis Modelos" que "Test1" ahora tiene 3 campos
```

### Escenario 2: Modificar Plantilla Predefinida
```
1. Seleccionar "Informe de Gastos"
2. Modificar prompt: agregar "y descripción detallada"
3. Verificar que aparece botón naranja
4. Click en "Guardar Cambios"
5. Verificar diálogo de confirmación
6. Aceptar
7. Verificar que aparece "Informe de Gastos (Modificada)" en "Mis Modelos"
8. Verificar que la nueva plantilla está seleccionada
```

### Escenario 3: Sin Cambios
```
1. Seleccionar cualquier plantilla
2. NO modificar nada
3. Verificar que botón naranja NO aparece
4. Modificar un espacio en el prompt
5. Verificar que botón naranja SÍ aparece
6. Revertir el cambio
7. Verificar que botón naranja desaparece
```

## Conclusión

Esta funcionalidad permite a los usuarios:
- ✅ Iterar rápidamente sobre plantillas existentes
- ✅ Personalizar plantillas predefinidas sin afectar las originales
- ✅ Mantener un historial de plantillas modificadas en "Mis Modelos"
- ✅ Trabajar de manera más eficiente al no tener que recrear plantillas desde cero

---

**Fecha de implementación**: 17 de noviembre de 2025
**Versión**: Verbadoc Europa v2.1
**Desarrollador**: Claude Code
