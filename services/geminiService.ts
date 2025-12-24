// Vertex AI Service - 🇪🇺 Procesamiento en Europa (Bélgica)
// Fix: Use explicit file extension in import.
import type { SchemaField, SchemaFieldType } from '../types.ts';

// Helper para convertir File a base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

// Tipos para Vertex AI Schema
type SchemaType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ARRAY' | 'OBJECT';

interface VertexAISchema {
  type: SchemaType;
  properties?: any;
  required?: string[];
  items?: any;
}

// Convertir nuestro schema a formato Vertex AI
const convertSchemaToVertexAI = (schema: SchemaField[]): VertexAISchema => {
    const properties: { [key: string]: any } = {};
    const required: string[] = [];

    schema.forEach(field => {
        if (field.name) {
            required.push(field.name);
            let fieldSchema: any = {};

            switch (field.type) {
                case 'STRING':
                    fieldSchema.type = 'STRING';
                    break;
                case 'NUMBER':
                    fieldSchema.type = 'NUMBER';
                    break;
                case 'BOOLEAN':
                    fieldSchema.type = 'BOOLEAN';
                    break;
                case 'ARRAY_OF_STRINGS':
                    fieldSchema.type = 'ARRAY';
                    fieldSchema.items = { type: 'STRING' };
                    break;
                case 'OBJECT':
                    if (field.children && field.children.length > 0) {
                        const nestedSchema = convertSchemaToVertexAI(field.children);
                        fieldSchema.type = 'OBJECT';
                        fieldSchema.properties = nestedSchema.properties;
                        fieldSchema.required = nestedSchema.required;
                    } else {
                        fieldSchema.type = 'OBJECT';
                        fieldSchema.properties = { placeholder: { type: 'STRING' } };
                    }
                    break;
                case 'ARRAY_OF_OBJECTS':
                    fieldSchema.type = 'ARRAY';
                    if (field.children && field.children.length > 0) {
                        const nestedSchema = convertSchemaToVertexAI(field.children);
                        fieldSchema.items = {
                            type: 'OBJECT',
                            properties: nestedSchema.properties,
                            required: nestedSchema.required,
                        };
                    } else {
                        fieldSchema.items = {
                            type: 'OBJECT',
                            properties: { placeholder: { type: 'STRING' } }
                        };
                    }
                    break;
            }
            properties[field.name] = fieldSchema;
        }
    });

    return {
        type: 'OBJECT',
        properties,
        required,
    };
};

export type GeminiModel =
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite'
    | 'gemini-2.5-pro';

export interface ModelInfo {
    id: GeminiModel;
    name: string;
    description: string;
    bestFor: string;
    costPerDoc?: string;
    experimental?: boolean;
}

export const AVAILABLE_MODELS: ModelInfo[] = [
    {
        id: 'gemini-2.5-flash-lite',
        name: 'Rápido 🇪🇺',
        description: 'Modelo económico y rápido procesado en Europa (Bélgica)',
        bestFor: 'Documentos simples, formularios, recetas médicas',
        costPerDoc: '~$0.0005/doc (más económico)'
    },
    {
        id: 'gemini-2.5-flash',
        name: 'Estándar 🇪🇺',
        description: 'Modelo estable y probado procesado en Europa (Bélgica)',
        bestFor: 'Uso general, facturas, contratos, informes',
        costPerDoc: '~$0.0016/doc (recomendado)'
    },
    {
        id: 'gemini-2.5-pro',
        name: 'Avanzado 🇪🇺',
        description: 'Modelo avanzado procesado en Europa (Bélgica)',
        bestFor: 'Documentos complejos, múltiples tablas, análisis profundo',
        costPerDoc: '~$0.008/doc'
    }
];

// Función auxiliar para llamar a la API de Vercel
const callVertexAIAPI = async (endpoint: string, body: any): Promise<any> => {
    // Determinar la URL base según el entorno
    const baseURL = typeof window !== 'undefined'
        ? window.location.origin
        : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:5173';

    const url = `${baseURL}/api/${endpoint}`;

    console.log(`🇪🇺 Llamando a Vertex AI Europa: ${url}`);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
};

// Generar schema desde prompt
export const generateSchemaFromPrompt = async (
    prompt: string,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<SchemaField[]> => {
    const analysisPrompt = `Analiza el siguiente prompt de extracción de datos y genera una lista de campos JSON que se necesitan extraer.

Prompt del usuario:
"${prompt}"

INSTRUCCIONES:
1. Identifica TODOS los datos que el usuario quiere extraer
2. Para cada dato, crea un campo con:
   - name: nombre del campo en snake_case (sin espacios, sin tildes, ej: "nombre_paciente")
   - type: uno de estos tipos: STRING, NUMBER, BOOLEAN, ARRAY_OF_STRINGS, ARRAY_OF_OBJECTS
   - children: SOLO si type es ARRAY_OF_OBJECTS, define los sub-campos del objeto
3. Si menciona una lista o varios elementos del mismo tipo, usa ARRAY_OF_STRINGS
4. Si menciona objetos complejos con sub-campos, usa ARRAY_OF_OBJECTS y define los children

Responde SOLO con un JSON con este formato:
{
  "fields": [
    {
      "name": "nombre_campo",
      "type": "STRING"
    },
    {
      "name": "campo_complejo",
      "type": "ARRAY_OF_OBJECTS",
      "children": [
        {"name": "subcampo1", "type": "STRING"},
        {"name": "subcampo2", "type": "NUMBER"}
      ]
    }
  ]
}`;

    try {
        const result = await callVertexAIAPI('extract', {
            model: modelId,
            contents: {
                role: 'user',
                parts: [{ text: analysisPrompt }]
            },
            config: {
                responseMimeType: 'application/json',
            },
        });

        const jsonStr = result.text.trim();
        const parsed = JSON.parse(jsonStr);

        // Agregar IDs a los campos
        const addIdsToFields = (fields: any[], prefix: string = ''): SchemaField[] => {
            return fields.map((field: any, index: number) => {
                const id = prefix ? `${prefix}-${index}` : `field-${Date.now()}-${index}`;
                return {
                    id,
                    name: field.name,
                    type: field.type as SchemaFieldType,
                    children: field.children && field.children.length > 0
                        ? addIdsToFields(field.children, `${id}-child`)
                        : undefined
                };
            });
        };

        return addIdsToFields(parsed.fields);
    } catch (error) {
        console.error('Error al generar schema desde prompt:', error);
        throw new Error('No se pudo generar el schema automáticamente. Intenta definir los campos manualmente.');
    }
};

// Extraer datos de documento
export const extractDataFromDocument = async (
    file: File,
    schema: SchemaField[],
    prompt: string,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<object> => {
    const generativePart = await fileToGenerativePart(file);

    // Filtrar campos válidos
    const filterValidFields = (fields: SchemaField[]): SchemaField[] => {
        return fields
            .filter(f => f.name.trim() !== '')
            .map(f => ({
                ...f,
                children: f.children ? filterValidFields(f.children) : undefined
            }));
    };

    const validSchemaFields = filterValidFields(schema);
    if (validSchemaFields.length === 0) {
        throw new Error('El esquema está vacío o no contiene campos con nombre válidos.');
    }

    const vertexAISchema = convertSchemaToVertexAI(validSchemaFields);

    console.log(`📄 Procesando: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    console.log(`🤖 Modelo: ${modelId}`);
    console.log(`🇪🇺 Región: europe-west1 (Bélgica)`);

    try {
        const result = await callVertexAIAPI('extract', {
            model: modelId,
            contents: {
                role: 'user',
                parts: [
                    { text: prompt },
                    generativePart
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: vertexAISchema,
            },
        });

        console.log(`✅ Extracción completada`);
        console.log(`📍 Procesado en: ${result.location || 'europe-west1'}`);

        const jsonStr = result.text.trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error al llamar a Vertex AI:', error);
        if (error instanceof Error) {
            throw new Error(`Error de Vertex AI: ${error.message}`);
        }
        throw new Error('Ocurrió un error desconocido al comunicarse con Vertex AI.');
    }
};

// Transcribir documento completo
export const transcribeDocument = async (
    file: File,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<string> => {
    const generativePart = await fileToGenerativePart(file);
    const prompt = `Extrae el texto completo de este documento. Mantén la estructura original, incluyendo párrafos y saltos de línea. No resumas ni alteres el contenido. Devuelve únicamente el texto extraído.`;

    console.log(`📄 Transcribiendo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    console.log(`🤖 Modelo: ${modelId}`);
    console.log(`🇪🇺 Región: europe-west1 (Bélgica)`);

    try {
        const result = await callVertexAIAPI('extract', {
            model: modelId,
            contents: {
                role: 'user',
                parts: [
                    { text: prompt },
                    generativePart
                ]
            },
            // No se especifica responseMimeType para obtener texto plano
        });

        console.log(`✅ Transcripción completada`);
        console.log(`📍 Procesado en: ${result.location || 'europe-west1'}`);

        return result.text.trim();
    } catch (error) {
        console.error('Error al llamar a Vertex AI para transcribir:', error);
        if (error instanceof Error) {
            throw new Error(`Error de Vertex AI: ${error.message}`);
        }
        throw new Error('Ocurrió un error desconocido al comunicarse con Vertex AI.');
    }
};

// Transcribir documento manuscrito (HTR)
export const transcribeHandwrittenDocument = async (
    file: File,
    modelId: GeminiModel = 'gemini-2.5-pro'
): Promise<string> => {
    const generativePart = await fileToGenerativePart(file);
    const prompt = `Este documento contiene texto manuscrito. Transcríbelo con la mayor precisión posible, prestando especial atención a la caligrafía, la estructura y los saltos de línea. No resumas ni alteres el contenido. Devuelve únicamente el texto transcrito.`;

    console.log(`✍️  Transcribiendo (HTR): ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    console.log(`🤖 Modelo: ${modelId}`);
    console.log(`🇪🇺 Región: europe-west1 (Bélgica)`);

    try {
        const result = await callVertexAIAPI('extract', {
            model: modelId,
            contents: {
                role: 'user',
                parts: [
                    { text: prompt },
                    generativePart
                ]
            },
        });

        console.log(`✅ Transcripción (HTR) completada`);
        console.log(`📍 Procesado en: ${result.location || 'europe-west1'}`);

        return result.text.trim();
    } catch (error) {
        console.error('Error al llamar a Vertex AI para HTR:', error);
        if (error instanceof Error) {
            throw new Error(`Error de Vertex AI (HTR): ${error.message}`);
        }
        throw new Error('Ocurrió un error desconocido al comunicarse con Vertex AI para HTR.');
    }
};

// Generar metadatos a partir de texto
export const generateMetadata = async (
    text: string,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<{ title: string; summary: string; keywords: string[] }> => {
    const prompt = `A partir del siguiente texto, genera metadatos útiles.

Texto:
---
${text.substring(0, 8000)}...
---

INSTRUCCIONES:
1.  **Título:** Crea un título breve y descriptivo que resuma el documento.
2.  **Resumen:** Escribe un resumen conciso de 2-3 frases sobre el contenido principal.
3.  **Palabras Clave:** Extrae entre 5 y 10 palabras o frases clave que representen los temas principales.

Devuelve la respuesta únicamente en formato JSON con la siguiente estructura:
{
  "title": "string",
  "summary": "string",
  "keywords": ["string"]
}`;

    console.log(`🧠 Generando metadatos con el modelo: ${modelId}`);

    try {
        const result = await callVertexAIAPI('extract', {
            model: modelId,
            contents: {
                role: 'user',
                parts: [{ text: prompt }]
            },
            config: {
                responseMimeType: 'application/json',
            },
        });

        console.log(`✅ Metadatos generados`);
        const jsonStr = result.text.trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error al generar metadatos:', error);
        if (error instanceof Error) {
            throw new Error(`Error de Vertex AI (Metadata): ${error.message}`);
        }
        throw new Error('Ocurrió un error desconocido al generar los metadatos.');
    }
};

// Buscar imagen en documento
export const searchImageInDocument = async (
    documentFile: File,
    referenceImageFile: File,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<{ found: boolean; description: string; location?: string; confidence?: string }> => {
    const documentPart = await fileToGenerativePart(documentFile);
    const referencePart = await fileToGenerativePart(referenceImageFile);

    const promptText = `Analiza el documento y busca si contiene una imagen o logo similar a la imagen de referencia proporcionada.

Proporciona la respuesta en formato JSON con los siguientes campos:
- found: boolean (true si se encontró una imagen similar, false si no)
- description: string (descripción de lo que encontraste o no encontraste)
- location: string (opcional, ubicación aproximada en el documento)
- confidence: string (opcional, nivel de confianza: "alta", "media", "baja")`;

    try {
        const result = await callVertexAIAPI('extract', {
            model: modelId,
            contents: {
                role: 'user',
                parts: [
                    { text: promptText },
                    { text: 'Imagen de referencia a buscar:' },
                    referencePart,
                    { text: 'Documento donde buscar:' },
                    documentPart
                ]
            },
            config: {
                responseMimeType: 'application/json',
            },
        });

        const jsonStr = result.text.trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error al buscar imagen en documento:', error);
        if (error instanceof Error) {
            throw new Error(`Error de búsqueda: ${error.message}`);
        }
        throw new Error('Ocurrió un error desconocido al buscar la imagen.');
    }
};
