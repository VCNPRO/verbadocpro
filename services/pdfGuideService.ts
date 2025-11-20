import jsPDF from 'jspdf';

// Colores corporativos
const COLORS = {
  primary: [14, 165, 233], // cyan-500
  secondary: [100, 116, 139], // slate-500
  accent: [168, 85, 247], // purple-500
  success: [34, 197, 94], // green-500
  text: [15, 23, 42], // slate-900
  textLight: [148, 163, 184], // slate-400
  background: [248, 250, 252], // slate-50
};

// Función auxiliar para añadir header
function addHeader(doc: jsPDF, title: string, pageNum: number, totalPages: number) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Fondo del header
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Logo/Icono (emoji como texto)
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('🤖', 15, 20);

  // Título
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(title, 35, 20);

  // Paginación
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - 40, 20);
}

// Función auxiliar para añadir footer
function addFooter(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFillColor(...COLORS.background);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textLight);
  doc.setFont('helvetica', 'normal');
  doc.text('Verbadoc Europa Pro - 🇪🇺 100% GDPR Compliant', 15, pageHeight - 10);
  doc.text('https://verbadoceuropapro.vercel.app', pageWidth - 70, pageHeight - 10);
}

// Función auxiliar para añadir sección
function addSection(doc: jsPDF, yPos: number, icon: string, title: string, content: string[], colorRgb: number[]): number {
  let currentY = yPos;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const maxWidth = pageWidth - (2 * margin);

  // Título de la sección
  doc.setFillColor(...colorRgb);
  doc.roundedRect(margin, currentY, maxWidth, 12, 3, 3, 'F');

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(`${icon} ${title}`, margin + 5, currentY + 8);

  currentY += 18;

  // Contenido
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);

  content.forEach((line) => {
    // Check if we need a new page
    if (currentY > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      addHeader(doc, 'Verbadoc Europa Pro - Guía', 1, 1);
      currentY = 45;
    }

    const lines = doc.splitTextToSize(line, maxWidth);
    doc.text(lines, margin + 5, currentY);
    currentY += lines.length * 6;
  });

  return currentY + 5;
}

// Generar PDF de Guía Rápida
export function generateQuickGuidePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPos = 45;
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  addHeader(doc, 'Verbadoc Europa Pro - Guía Rápida', 1, 3);

  // Título principal
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('⚡ Guía Rápida - Empieza en 3 Minutos', margin, yPos);
  yPos += 15;

  // Asistente IA
  yPos = addSection(doc, yPos, '🤖', 'Asistente IA - Tu Mejor Amigo', [
    'El Asistente IA aparece automáticamente cuando subes un documento.',
    '',
    '🏷️ Clasificación Automática',
    '   • Detecta el tipo de documento automáticamente',
    '   • Sugiere el esquema perfecto de extracción',
    '',
    '✅ Validación Inteligente',
    '   • Revisa los datos extraídos',
    '   • Detecta errores e inconsistencias',
    '',
    '📑 Segmentación de PDFs',
    '   • Detecta múltiples documentos en un PDF',
    '   • Los separa automáticamente',
  ], COLORS.accent);

  // Página 2
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guía Rápida', 2, 3);
  yPos = 45;

  // Pasos rápidos
  yPos = addSection(doc, yPos, '🚀', 'Empieza en 3 Pasos', [
    '1️⃣ SUBE TU DOCUMENTO',
    '   Arrastra tu PDF/imagen a la zona de carga',
    '   o haz clic en "Haga clic para subir"',
    '',
    '2️⃣ USA EL ASISTENTE IA',
    '   • Click en "🔍 Clasificar Documento"',
    '   • Espera 5-10 segundos',
    '   • El esquema se llena automáticamente',
    '',
    '3️⃣ EXTRAE Y DESCARGA',
    '   • Click en "Ejecutar Extracción"',
    '   • Espera 10-30 segundos',
    '   • Click en "Excel" para descargar',
  ], COLORS.primary);

  // Consejos
  yPos = addSection(doc, yPos, '💡', 'Consejos Importantes', [
    '✅ Haz Esto:',
    '   • Usa el Asistente IA siempre primero',
    '   • Valida los datos antes de exportar',
    '   • Prueba con 1 documento antes de procesar 100',
    '   • Exporta a Excel para facilitar análisis',
    '',
    '❌ Evita Esto:',
    '   • No ignores el Asistente IA',
    '   • No mezcles tipos de documentos diferentes',
    '   • No proceses sin validar primero',
  ], COLORS.success);

  // Página 3
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guía Rápida', 3, 3);
  yPos = 45;

  // Tipos de documentos
  yPos = addSection(doc, yPos, '📚', 'Tipos de Documentos Soportados', [
    '📄 Facturas - Facturas comerciales, recibos, tickets',
    '📋 Formularios - Solicitudes, contratos, actas',
    '📊 Reportes - Informes, documentos corporativos',
    '🏥 Médicos - Recetas, informes médicos, análisis',
    '📜 Legales - Contratos, poderes, escrituras',
  ], COLORS.secondary);

  // Cheat Sheet
  yPos = addSection(doc, yPos, '📌', 'Cheat Sheet', [
    'Subir archivo → Arrastrar o click en zona de carga',
    'Detectar tipo → Click en "Clasificar Documento" 🤖',
    'Extraer datos → Click en "Ejecutar Extracción"',
    'Descargar Excel → Click en botón "Excel" verde',
    'Procesar varios → Click en "Procesar Todos"',
    'Ver errores → Click en "Validar Datos" ✅',
    'Separar PDF → Click en "Buscar Documentos" 📑',
  ], COLORS.accent);

  // GDPR
  doc.setFillColor(34, 197, 94, 30);
  doc.rect(margin, yPos, pageWidth - (2 * margin), 20, 'F');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.success);
  doc.setFont('helvetica', 'bold');
  doc.text('🇪🇺 Cumplimiento GDPR', margin + 5, yPos + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Todos los datos se procesan en Europa (Bélgica)', margin + 5, yPos + 12);
  doc.text('No se almacenan datos permanentemente', margin + 5, yPos + 17);

  // Footer en todas las páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc);
  }

  // Descargar
  doc.save('Verbadoc_Europa_Pro_Guia_Rapida.pdf');
}

// Generar PDF de Guía Completa (resumen)
export function generateFullGuidePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPos = 45;
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Página 1
  addHeader(doc, 'Verbadoc Europa Pro - Guía Completa', 1, 5);

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('📘 Guía Completa de Usuario', margin, yPos);
  yPos += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  doc.text('Verbadoc Europa Pro - Extracción profesional de datos con IA', margin, yPos);
  yPos += 20;

  // Tabla de contenidos
  doc.setFillColor(...COLORS.background);
  doc.rect(margin, yPos, pageWidth - (2 * margin), 80, 'F');

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('📑 Índice de Contenidos', margin + 5, yPos + 8);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  yPos += 18;

  const toc = [
    '1. El Asistente IA - Tu Ayudante Inteligente',
    '2. Clasificación Automática de Documentos',
    '3. Segmentación de PDFs Multipágina',
    '4. Validación Inteligente de Datos',
    '5. Guía Paso a Paso - Primera Extracción',
    '6. Procesamiento en Lote',
    '7. Solución de Problemas Comunes',
    '8. Consejos y Mejores Prácticas',
  ];

  toc.forEach((item, index) => {
    doc.text(`${item}`, margin + 10, yPos + (index * 7));
  });

  yPos += 75;

  // Página 2 - El Asistente IA
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guía Completa', 2, 5);
  yPos = 45;

  yPos = addSection(doc, yPos, '🤖', '1. El Asistente IA', [
    'El Asistente IA es un panel que aparece automáticamente cuando subes',
    'un documento. Utiliza IA avanzada de Google Vertex AI en servidores europeos.',
    '',
    'FUNCIONES PRINCIPALES:',
    '',
    '🏷️ Clasificación Automática',
    'Analiza tu documento y detecta automáticamente el tipo (factura, contrato,',
    'formulario, etc.). Genera un esquema de extracción personalizado.',
    '',
    'Ejemplo de resultado:',
    '"FACTURA COMERCIAL (95% confianza)"',
    'El documento contiene número de factura, fecha, cliente y totales.',
    'Indicadores: N° 001414, Fecha: 19/11/2025, Cliente: Miriam Ruiz',
    '',
    '✅ Validación Inteligente',
    'Revisa los datos extraídos, detecta errores e inconsistencias,',
    'compara con los datos reales del documento.',
    '',
    'Ejemplo: "El total calculado (1250.50) no coincide con el total',
    'extraído (1240.50). Score: 85/100"',
    '',
    '📑 Segmentación de PDFs',
    'Detecta si tu PDF contiene varios documentos, identifica dónde empieza',
    'y termina cada uno, te permite procesarlos por separado.',
    '',
    'Ejemplo: "3 documentos detectados: Doc 1 (Pág. 1-2), Doc 2 (Pág. 3),',
    'Doc 3 (Pág. 4-5)"',
  ], COLORS.accent);

  // Página 3 - Guía Paso a Paso
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guía Completa', 3, 5);
  yPos = 45;

  yPos = addSection(doc, yPos, '🚀', '2. Guía Paso a Paso', [
    'PASO 1: Abrir la Aplicación',
    '• Ve a: https://verbadoceuropapro.vercel.app',
    '• Verás 4 secciones: Plantillas, Documentos, Editor, Asistente IA',
    '',
    'PASO 2: Subir Documentos',
    '• Arrastra tu archivo a la zona de carga',
    '• O haz clic en "Haga clic para subir"',
    '• Formatos: PDF, JPG, PNG, TIFF',
    '',
    'PASO 3: Usar el Asistente IA (RECOMENDADO)',
    '• El Asistente aparece automáticamente en el panel derecho',
    '• Click en "🔍 Clasificar Documento"',
    '• Espera 5-10 segundos',
    '• El Prompt y Esquema se llenan automáticamente',
    '',
    'PASO 4: Ejecutar la Extracción',
    '• Revisa que todo esté correcto',
    '• Click en "Ejecutar Extracción"',
    '• Espera 10-30 segundos',
    '• Verás los resultados en formato JSON',
    '',
    'PASO 5: Validar Datos (Opcional pero Recomendado)',
    '• Click en "🔍 Validar Datos" en el Asistente IA',
    '• Revisa el score y los problemas detectados',
    '• Corrige si es necesario',
    '',
    'PASO 6: Exportar',
    '• Click en "Excel" (recomendado)',
    '• O CSV/JSON según prefieras',
    '• Abre el archivo descargado',
  ], COLORS.primary);

  // Página 4 - Procesamiento en Lote
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guía Completa', 4, 5);
  yPos = 45;

  yPos = addSection(doc, yPos, '🔄', '3. Procesamiento en Lote', [
    'Para procesar múltiples documentos similares:',
    '',
    '1. Sube todos los archivos (10, 20, 50...)',
    '2. Selecciona el primer archivo',
    '3. Usa el Asistente IA para clasificarlo',
    '4. Ejecuta la extracción en el primero',
    '5. Verifica que los resultados sean correctos',
    '6. Click en "Procesar Todos"',
    '7. Espera a que termine (varios minutos)',
    '8. Descarga cada resultado',
    '',
    'IMPORTANTE: Todos los archivos deben ser del mismo tipo',
    '(ej: todas facturas, todos contratos, etc.)',
  ], COLORS.secondary);

  yPos = addSection(doc, yPos, '⚠️', '4. Solución de Problemas', [
    'Error: "El esquema está vacío"',
    '→ Usa el botón "Clasificar Documento" del Asistente IA',
    '',
    'Error: "Los datos están incorrectos"',
    '→ Click en "Validar Datos", lee las sugerencias, ajusta',
    '',
    'Error 500 / No funciona',
    '→ Recarga la página (F5), intenta de nuevo',
    '',
    'El Asistente IA no clasifica bien',
    '→ El documento puede ser muy complejo o estar mal escaneado',
    '→ Prueba con mejor calidad de imagen',
  ], [220, 38, 38]);

  // Página 5 - Consejos
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guía Completa', 5, 5);
  yPos = 45;

  yPos = addSection(doc, yPos, '💡', '5. Consejos y Mejores Prácticas', [
    '✅ USA EL ASISTENTE IA SIEMPRE',
    'Es la forma más rápida y precisa. Te ahorra 90% del tiempo.',
    '',
    '✅ VALIDA ANTES DE EXPORTAR',
    'El botón "Validar Datos" detecta errores que no ves a simple vista.',
    '',
    '✅ PRUEBA CON 1 PRIMERO',
    'Antes de procesar 100 documentos, prueba con 1 y verifica.',
    '',
    '✅ EXPORTA A EXCEL',
    'Es el formato más fácil de usar y editar.',
    '',
    '✅ DOCUMENTOS DE BUENA CALIDAD',
    'PDFs nativos funcionan mejor que escaneados.',
    'Si escaneas, usa 300 DPI mínimo.',
    '',
    '❌ NO MEZCLES TIPOS DE DOCUMENTOS',
    'No proceses facturas y contratos juntos.',
    '',
    '❌ NO IGNORES LAS SUGERENCIAS DEL ASISTENTE IA',
    'Si te dice que hay un problema, probablemente lo hay.',
  ], COLORS.success);

  // GDPR Footer
  yPos = doc.internal.pageSize.getHeight() - 50;
  doc.setFillColor(34, 197, 94, 30);
  doc.rect(margin, yPos, pageWidth - (2 * margin), 25, 'F');
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.success);
  doc.setFont('helvetica', 'bold');
  doc.text('🇪🇺 Cumplimiento GDPR - 100% Europeo', margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('✅ Todos los datos se procesan en Europa (Bélgica)', margin + 5, yPos + 14);
  doc.text('✅ No se almacenan datos permanentemente', margin + 5, yPos + 19);

  // Footer en todas las páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc);
  }

  // Descargar
  doc.save('Verbadoc_Europa_Pro_Guia_Completa.pdf');
}
