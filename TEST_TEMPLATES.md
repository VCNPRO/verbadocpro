# Test de Diagnóstico - Problema de Plantillas

## Problema Reportado
Las plantillas (tanto personalizadas como predefinidas) NO se cargan en el panel central cuando se seleccionan.

## Diagnóstico Paso a Paso

### Test 1: Verificar que el click funciona
1. Abre la aplicación en el navegador
2. Abre DevTools (F12) → Consola
3. Click en cualquier plantilla
4. **Verifica logs:**
   - `👆 Click en plantilla: [nombre] - Schema fields: X` ← Debe aparecer
   - `📋 Plantilla seleccionada: {...}` ← Debe aparecer
   - `✅ Plantilla aplicada - Schema: X campos, Prompt: ...` ← Debe aparecer

**Si NO aparecen estos logs:**
- El problema está en TemplatesPanel.tsx → El onClick no se ejecuta
- Posible causa: Otro elemento capturando el click
- Solución: Revisar z-index y event propagation

**Si SÍ aparecen los logs:**
- El problema está en el rendering del ExtractionEditor
- Continuar con Test 2

### Test 2: Verificar que el state se actualiza
1. En la consola, después de hacer click en una plantilla, ejecuta:
```javascript
// Inspeccionar el componente React
$r.props.schema  // Debe mostrar el array de campos
$r.props.prompt  // Debe mostrar el texto del prompt
```

**Si los props NO tienen los valores correctos:**
- El problema está en App.tsx → handleSelectTemplate no actualiza el state
- Revisar que setSchema y setPrompt se llamen correctamente

**Si los props SÍ tienen los valores correctos:**
- El problema está en el render del ExtractionEditor
- Continuar con Test 3

### Test 3: Verificar el render del textarea y SchemaBuilder
1. Inspecciona el DOM del panel central
2. Busca el `<textarea>` con el prompt
3. Verifica su atributo `value`

**En la consola:**
```javascript
document.querySelector('textarea#prompt')?.value
```

**Si el textarea NO existe:**
- Está colapsado o no se renderiza
- Verificar el estado `showPrompt` en ExtractionEditor

**Si el textarea existe pero está vacío:**
- El prop `prompt` no llega correctamente
- Problema de React re-render

### Test 4: Force re-render
Agrega este código temporal en ExtractionEditor.tsx después de la línea 48:

```typescript
// DEBUG: Force log cuando cambian props
useEffect(() => {
    console.log('🔄 ExtractionEditor - Props actualizados:', {
        prompt: prompt?.substring(0, 30) + '...',
        schemaLength: schema?.length,
        file: file?.file?.name
    });
}, [prompt, schema, file]);
```

Después de agregar esto, recargar y hacer click en plantilla.

**Si el log NO aparece:**
- React no detecta el cambio de props
- Posible problema de referencia (schema y prompt no cambian su referencia)

**Si el log SÍ aparece:**
- Los props llegan pero el render no se actualiza
- Problema con controlled components

## Soluciones Posibles

### Solución 1: Forzar re-render con key
En App.tsx, agregar una key al ExtractionEditor:

```typescript
<ExtractionEditor
    key={`editor-${selectedTemplate?.id || 'default'}`}  // ← AGREGAR ESTO
    file={activeFile}
    template={selectedTemplate}
    // ... resto de props
/>
```

Esto fuerza a React a re-montar el componente cuando cambia la plantilla.

### Solución 2: Usar useEffect para sincronizar
En ExtractionEditor.tsx, agregar:

```typescript
// Sincronizar con props externos
useEffect(() => {
    if (prompt) {
        console.log('✅ Prompt recibido:', prompt.substring(0, 50));
    }
}, [prompt]);

useEffect(() => {
    if (schema && schema.length > 0) {
        console.log('✅ Schema recibido:', schema.length, 'campos');
    }
}, [schema]);
```

### Solución 3: Verificar que no hay conditional rendering bloqueando
En ExtractionEditor.tsx línea 208:

```typescript
{showPrompt && (
    <>
        {/* ... textarea del prompt ... */}
    </>
)}
```

Verificar que `showPrompt` sea `true` por defecto (línea 54).

### Solución 4: Verificar el estado inicial
El problema podría ser que `schema` y `prompt` se inicializan en App.tsx líneas 49-50:

```typescript
const [prompt, setPrompt] = useState<string>('Extrae la información clave...');
const [schema, setSchema] = useState<SchemaField[]>([{ id: `field-${Date.now()}`, name: '', type: 'STRING' }]);
```

Estos valores iniciales se muestran, pero cuando cambias la plantilla, React podría no detectar el cambio si la referencia no cambia.

## Test Manual Rápido

### Paso 1: Limpia localStorage
```javascript
localStorage.clear();
location.reload();
```

### Paso 2: Crea una plantilla simple
1. Nombre: "Test Debug"
2. Un campo: `test_field` (STRING)
3. Prompt: "Extraer campo test"
4. Guardar

### Paso 3: Selecciona la plantilla
- Observa la consola
- Observa el panel central
- ¿Aparece el prompt "Extraer campo test"?
- ¿Aparece el campo "test_field"?

### Paso 4: Prueba con plantilla predefinida
- Selecciona "Factura Estándar"
- ¿Aparece el prompt?
- ¿Aparecen los 4 campos (numero_factura, fecha_emision, total, impuestos)?

## Información para Debugging

### Estado Esperado después de seleccionar "Factura Estándar":
```javascript
{
    prompt: "Extrae el número de factura, la fecha de emisión, el total y los impuestos de la factura.",
    schema: [
        { id: 'f1', name: 'numero_factura', type: 'STRING' },
        { id: 'f2', name: 'fecha_emision', type: 'STRING' },
        { id: 'f3', name: 'total', type: 'NUMBER' },
        { id: 'f4', name: 'impuestos', type: 'NUMBER' }
    ]
}
```

### DOM Esperado:
```html
<textarea id="prompt">Extrae el número de factura, la fecha de emisión...</textarea>

<div class="schema-builder">
    <div class="schema-field">numero_factura [STRING]</div>
    <div class="schema-field">fecha_emision [STRING]</div>
    <div class="schema-field">total [NUMBER]</div>
    <div class="schema-field">impuestos [NUMBER]</div>
</div>
```

## Próximos Pasos

Ejecuta los tests en orden y reporta:
1. ¿Qué logs aparecen en la consola?
2. ¿En qué test falla?
3. Captura de pantalla del panel central después de seleccionar plantilla

Con esta información podremos identificar la causa raíz exacta.
