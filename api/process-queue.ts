import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Función para procesar documento con Vertex AI
async function processDocumentWithVertexAI(fileData: string, schema: any, model: string) {
  // Esta función llamará a la API extract.ts existente
  const baseURL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:5173';

  const response = await fetch(`${baseURL}/api/extract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: fileData,
              mimeType: 'application/pdf'
            }
          }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error processing document');
  }

  return await response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verificar secret del cron para seguridad
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const BATCH_SIZE = 5; // Procesar 5 docs en paralelo por minuto
  const processed: string[] = [];
  const failed: Array<{ documentId: string; error: string }> = [];

  try {
    console.log('🔄 Iniciando procesamiento de cola...');

    // Obtener batch de documentos de la cola
    const docs = [];
    for (let i = 0; i < BATCH_SIZE; i++) {
      const docStr = await kv.lpop('documents_queue');
      if (docStr) {
        try {
          docs.push(JSON.parse(docStr as string));
        } catch (e) {
          console.error('Error parsing document:', e);
        }
      }
    }

    if (docs.length === 0) {
      console.log('📭 Cola vacía - sin documentos para procesar');
      return res.json({
        success: true,
        message: 'No documents in queue',
        processed: 0,
        failed: 0
      });
    }

    console.log(`📝 Procesando ${docs.length} documentos...`);

    // Procesar documentos en paralelo
    const results = await Promise.allSettled(
      docs.map(async (doc) => {
        const startTime = Date.now();

        try {
          console.log(`⏳ Procesando documento: ${doc.id} (${doc.fileName})`);

          // Actualizar estado a "processing"
          await kv.set(`doc:${doc.id}:status`, 'processing');
          await kv.set(`doc:${doc.id}:startTime`, startTime);

          // Procesar documento con Vertex AI
          const result = await processDocumentWithVertexAI(
            doc.fileData,
            doc.schema,
            doc.model
          );

          const processingTime = Date.now() - startTime;

          // Guardar resultado
          await kv.set(`doc:${doc.id}:result`, JSON.stringify(result));
          await kv.set(`doc:${doc.id}:status`, 'completed');
          await kv.set(`doc:${doc.id}:completedTime`, Date.now());
          await kv.set(`doc:${doc.id}:processingTime`, processingTime);

          // Configurar expiración de 24 horas para los resultados
          await kv.expire(`doc:${doc.id}:result`, 86400); // 24 horas
          await kv.expire(`doc:${doc.id}:metadata`, 86400);

          processed.push(doc.id);
          console.log(`✅ Documento completado: ${doc.id} (${processingTime}ms)`);

          return { success: true, documentId: doc.id };
        } catch (error: any) {
          console.error(`❌ Error procesando ${doc.id}:`, error.message);

          // Guardar error
          await kv.set(`doc:${doc.id}:status`, 'error');
          await kv.set(`doc:${doc.id}:error`, error.message);
          await kv.set(`doc:${doc.id}:errorTime`, Date.now());

          failed.push({ documentId: doc.id, error: error.message });

          throw error;
        }
      })
    );

    // Logs finales
    console.log(`✅ Procesados: ${processed.length}`);
    console.log(`❌ Fallados: ${failed.length}`);

    // Obtener tamaño actual de la cola
    const remainingInQueue = await kv.llen('documents_queue');

    return res.json({
      success: true,
      processed: processed.length,
      failed: failed.length,
      remainingInQueue,
      details: {
        processed,
        failed
      }
    });
  } catch (error: any) {
    console.error('❌ Error crítico en procesamiento de cola:', error);
    return res.status(500).json({
      error: 'Error processing queue',
      message: error.message,
      processed: processed.length,
      failed: failed.length
    });
  }
}
