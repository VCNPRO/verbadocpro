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

// Generar PDF de Guia Rapida
export function generateQuickGuidePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - (2 * margin);

  function addBullet(text: string, yPos: number): number {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);

    const lines = doc.splitTextToSize(text, maxWidth - 10);
    doc.text('•', margin + 5, yPos);
    doc.text(lines, margin + 10, yPos);
    return yPos + (lines.length * 5);
  }

  // PAGINA 1
  addHeader(doc, 'Verbadoc Europa Pro - Guia Rapida', 1, 3);
  addFooter(doc);

  let yPos = 50;

  // Titulo
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Guia Rapida', margin, yPos);
  yPos += 10;

  doc.setFontSize(14);
  doc.setTextColor(...COLORS.textLight);
  doc.text('Empieza en 3 minutos', margin, yPos);
  yPos += 20;

  // Asistente IA
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Asistente IA - Tu Mejor Amigo', margin + 5, yPos + 8);
  yPos += 18;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  const lines1 = doc.splitTextToSize('Aparece automaticamente cuando subes un documento', maxWidth - 10);
  doc.text(lines1, margin + 5, yPos);
  yPos += 10;

  // Clasificacion
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Clasificacion Automatica', margin, yPos);
  yPos += 6;

  yPos = addBullet('Detecta el tipo de documento', yPos);
  yPos = addBullet('Sugiere esquema perfecto', yPos);
  yPos += 5;

  // Validacion
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Validacion Inteligente', margin, yPos);
  yPos += 6;

  yPos = addBullet('Revisa datos extraidos', yPos);
  yPos = addBullet('Detecta errores', yPos);
  yPos += 5;

  // Segmentacion
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Segmentacion de PDFs', margin, yPos);
  yPos += 6;

  yPos = addBullet('Detecta multiples documentos en un PDF', yPos);
  yPos = addBullet('Los separa automaticamente', yPos);
  yPos += 10;

  // 3 Pasos
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Empieza en 3 Pasos', margin + 5, yPos + 8);
  yPos += 18;

  // Paso 1
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('1. SUBE TU DOCUMENTO', margin, yPos);
  yPos += 6;

  yPos = addBullet('Arrastra tu PDF/imagen a la zona de carga', yPos);
  yPos = addBullet('O haz clic en "Haga clic para subir"', yPos);
  yPos += 5;

  // Paso 2
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('2. USA EL ASISTENTE IA', margin, yPos);
  yPos += 6;

  yPos = addBullet('Click en "Clasificar Documento"', yPos);
  yPos = addBullet('Espera 5-10 segundos', yPos);
  yPos = addBullet('Esquema se llena automaticamente', yPos);

  // PAGINA 2
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guia Rapida', 2, 3);
  addFooter(doc);
  yPos = 45;

  // Paso 3
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('3. EXTRAE Y DESCARGA', margin, yPos);
  yPos += 6;

  yPos = addBullet('Click en "Ejecutar Extraccion"', yPos);
  yPos = addBullet('Espera 10-30 segundos', yPos);
  yPos = addBullet('Click en "Excel" para descargar', yPos);
  yPos += 15;

  // Consejos
  doc.setFillColor(...COLORS.success);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Consejos Importantes', margin + 5, yPos + 8);
  yPos += 18;

  // Haz esto
  doc.setFillColor(34, 197, 94, 20);
  doc.roundedRect(margin, yPos, maxWidth, 50, 3, 3, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.success);
  doc.text('Haz Esto:', margin + 5, yPos + 7);
  yPos += 12;

  yPos = addBullet('Usa el Asistente IA siempre primero', yPos);
  yPos = addBullet('Valida datos antes de exportar', yPos);
  yPos = addBullet('Prueba con 1 antes de procesar 100', yPos);
  yPos = addBullet('Exporta a Excel', yPos);

  yPos += 10;

  // Evita esto
  doc.setFillColor(220, 38, 38, 20);
  doc.roundedRect(margin, yPos, maxWidth, 40, 3, 3, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38);
  doc.text('Evita Esto:', margin + 5, yPos + 7);
  yPos += 12;

  yPos = addBullet('No ignores el Asistente IA', yPos);
  yPos = addBullet('No mezcles tipos de documentos', yPos);
  yPos = addBullet('No proceses sin validar', yPos);

  // PAGINA 3
  doc.addPage();
  addHeader(doc, 'Verbadoc Europa Pro - Guia Rapida', 3, 3);
  addFooter(doc);
  yPos = 45;

  // Tipos de documentos
  doc.setFillColor(...COLORS.secondary);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Tipos de Documentos', margin + 5, yPos + 8);
  yPos += 18;

  const tipos = [
    'Facturas - Comerciales, recibos, tickets',
    'Formularios - Solicitudes, contratos, actas',
    'Reportes - Informes, documentos corporativos',
    'Medicos - Recetas, informes medicos',
    'Legales - Contratos, poderes, escrituras',
  ];

  tipos.forEach(tipo => {
    yPos = addBullet(tipo, yPos);
  });

  yPos += 10;

  // Cheat Sheet
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Cheat Sheet', margin + 5, yPos + 8);
  yPos += 18;

  const cheatsheet = [
    'Subir archivo: Arrastrar o click en zona de carga',
    'Clasificar: Click en "Clasificar Documento"',
    'Extraer: Click en "Ejecutar Extraccion"',
    'Descargar: Click en boton "Excel"',
    'Lote: Click en "Procesar Todos"',
    'Validar: Click en "Validar Datos"',
  ];

  cheatsheet.forEach(item => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);
    const parts = item.split(':');
    doc.setFont('helvetica', 'bold');
    doc.text(parts[0] + ':', margin + 5, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(parts[1], margin + 35, yPos);
    yPos += 5;
  });

  yPos += 10;

  // GDPR
  doc.setFillColor(34, 197, 94, 30);
  doc.roundedRect(margin, yPos, maxWidth, 25, 5, 5, 'F');
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.success);
  doc.setFont('helvetica', 'bold');
  doc.text('Cumplimiento GDPR - 100% Europeo', margin + 5, yPos + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Datos procesados en Europa (Belgica)', margin + 5, yPos + 16);
  doc.text('No se almacenan datos permanentemente', margin + 5, yPos + 22);

  // Descargar
  doc.save('Verbadoc_Europa_Pro_Guia_Rapida.pdf');
}

// Generar PDF de Guía Completa
export function generateFullGuidePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (2 * margin);
  let currentPage = 1;
  const totalPages = 6;

  // Helper para añadir texto con paginación automática
  function addText(text: string, yPos: number, fontSize: number = 10, style: 'normal' | 'bold' = 'normal'): number {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', style);
    doc.setTextColor(...COLORS.text);

    if (yPos > pageHeight - 40) {
      doc.addPage();
      currentPage++;
      addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', currentPage, totalPages);
      addFooter(doc);
      yPos = 45;
    }

    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, yPos);
    return yPos + (lines.length * (fontSize * 0.4));
  }

  function addBullet(text: string, yPos: number, indent: number = 0): number {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);

    if (yPos > pageHeight - 40) {
      doc.addPage();
      currentPage++;
      addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', currentPage, totalPages);
      addFooter(doc);
      yPos = 45;
    }

    const bulletX = margin + (indent * 5);
    const textX = bulletX + 5;
    const lines = doc.splitTextToSize(text, maxWidth - (indent * 5) - 5);

    doc.text('•', bulletX, yPos);
    doc.text(lines, textX, yPos);

    return yPos + (lines.length * 5);
  }

  // PÁGINA 1 - Portada e Índice
  addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', 1, totalPages);
  addFooter(doc);

  let yPos = 50;

  // Título principal
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Guia Completa de Usuario', margin, yPos);
  yPos += 15;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.textLight);
  doc.text('Verbadoc Europa Pro', margin, yPos);
  yPos += 5;
  doc.text('Extraccion profesional de datos con IA', margin, yPos);
  yPos += 20;

  // Tabla de contenidos
  doc.setFillColor(...COLORS.background);
  doc.roundedRect(margin, yPos, maxWidth, 100, 3, 3, 'F');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Indice de Contenidos', margin + 5, yPos + 10);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  yPos += 22;

  const tocItems = [
    '1. El Asistente IA',
    '2. Clasificacion Automatica',
    '3. Segmentacion de PDFs',
    '4. Validacion Inteligente',
    '5. Guia Paso a Paso',
    '6. Procesamiento en Lote',
    '7. Solucion de Problemas',
    '8. Consejos Profesionales',
  ];

  tocItems.forEach((item) => {
    doc.text(item, margin + 10, yPos);
    yPos += 8;
  });

  yPos += 20;

  // Box informativo
  doc.setFillColor(168, 85, 247, 30);
  doc.roundedRect(margin, yPos, maxWidth, 25, 3, 3, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('Nuevo: Asistente IA Integrado', margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);
  doc.text('Clasifica, valida y segmenta documentos automaticamente', margin + 5, yPos + 15);
  doc.text('usando IA avanzada en servidores europeos', margin + 5, yPos + 21);

  // PÁGINA 2 - El Asistente IA
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', currentPage, totalPages);
  addFooter(doc);
  yPos = 45;

  // Sección 1
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('1. El Asistente IA', margin + 5, yPos + 8);
  yPos += 18;

  yPos = addText('Panel inteligente que aparece automaticamente al subir un documento.', yPos, 10, 'normal');
  yPos = addText('Utiliza Google Vertex AI en servidores europeos (Belgica).', yPos + 2, 10, 'normal');
  yPos += 8;

  // Clasificación
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Clasificacion Automatica', margin, yPos);
  yPos += 7;

  yPos = addBullet('Detecta el tipo de documento automaticamente', yPos);
  yPos = addBullet('Genera esquema de extraccion personalizado', yPos);
  yPos = addBullet('Muestra nivel de confianza y indicadores clave', yPos);
  yPos += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.textLight);
  yPos = addText('Ejemplo: "FACTURA COMERCIAL (95% confianza)"', yPos, 9, 'normal');
  yPos += 8;

  // Validación
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Validacion Inteligente', margin, yPos);
  yPos += 7;

  yPos = addBullet('Revisa datos extraidos vs documento original', yPos);
  yPos = addBullet('Detecta errores e inconsistencias', yPos);
  yPos = addBullet('Asigna score de calidad (0-100)', yPos);
  yPos += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.textLight);
  yPos = addText('Ejemplo: "Score 85/100 - 3 problemas detectados"', yPos, 9, 'normal');
  yPos += 8;

  // Segmentación
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Segmentacion de PDFs', margin, yPos);
  yPos += 7;

  yPos = addBullet('Detecta multiples documentos en un PDF', yPos);
  yPos = addBullet('Identifica inicio y fin de cada documento', yPos);
  yPos = addBullet('Permite procesarlos por separado', yPos);
  yPos += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.textLight);
  yPos = addText('Ejemplo: "3 documentos: Doc1 (Pag.1-2), Doc2 (Pag.3)..."', yPos, 9, 'normal');

  // PÁGINA 3 - Guía Paso a Paso
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', currentPage, totalPages);
  addFooter(doc);
  yPos = 45;

  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('2. Guia Paso a Paso', margin + 5, yPos + 8);
  yPos += 18;

  // Paso 1
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('PASO 1: Abrir la Aplicacion', margin, yPos);
  yPos += 6;

  yPos = addBullet('Ve a: https://verbadoceuropapro.vercel.app', yPos);
  yPos = addBullet('Veras 4 secciones principales', yPos);
  yPos += 5;

  // Paso 2
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('PASO 2: Subir Documentos', margin, yPos);
  yPos += 6;

  yPos = addBullet('Arrastra tu archivo a la zona de carga', yPos);
  yPos = addBullet('O haz clic en "Haga clic para subir"', yPos);
  yPos = addBullet('Formatos: PDF, JPG, PNG, TIFF', yPos);
  yPos += 5;

  // Paso 3
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('PASO 3: Usar Asistente IA (RECOMENDADO)', margin, yPos);
  yPos += 6;

  yPos = addBullet('Aparece automaticamente en panel derecho', yPos);
  yPos = addBullet('Click en "Clasificar Documento"', yPos);
  yPos = addBullet('Espera 5-10 segundos', yPos);
  yPos = addBullet('Prompt y Esquema se llenan solos', yPos);
  yPos += 5;

  // Paso 4
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('PASO 4: Ejecutar Extraccion', margin, yPos);
  yPos += 6;

  yPos = addBullet('Revisa que todo este correcto', yPos);
  yPos = addBullet('Click en "Ejecutar Extraccion"', yPos);
  yPos = addBullet('Espera 10-30 segundos', yPos);
  yPos = addBullet('Veras resultados en JSON', yPos);
  yPos += 5;

  // Paso 5
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('PASO 5: Validar (Opcional)', margin, yPos);
  yPos += 6;

  yPos = addBullet('Click en "Validar Datos" del Asistente', yPos);
  yPos = addBullet('Revisa score y problemas', yPos);
  yPos = addBullet('Corrige si es necesario', yPos);
  yPos += 5;

  // Paso 6
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.accent);
  doc.text('PASO 6: Exportar', margin, yPos);
  yPos += 6;

  yPos = addBullet('Click en "Excel" (recomendado)', yPos);
  yPos = addBullet('O CSV/JSON segun prefieras', yPos);
  yPos = addBullet('Abre el archivo descargado', yPos);

  // PÁGINA 4 - Procesamiento en Lote
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', currentPage, totalPages);
  addFooter(doc);
  yPos = 45;

  doc.setFillColor(...COLORS.secondary);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('3. Procesamiento en Lote', margin + 5, yPos + 8);
  yPos += 18;

  yPos = addText('Para procesar multiples documentos similares:', yPos, 10, 'bold');
  yPos += 5;

  const loteSteps = [
    'Sube todos los archivos (10, 20, 50...)',
    'Selecciona el primer archivo',
    'Usa Asistente IA para clasificarlo',
    'Ejecuta extraccion en el primero',
    'Verifica que resultados sean correctos',
    'Click en "Procesar Todos"',
    'Espera a que termine (varios minutos)',
    'Descarga cada resultado',
  ];

  loteSteps.forEach((step, i) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(`${i + 1}.`, margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);
    const lines = doc.splitTextToSize(step, maxWidth - 10);
    doc.text(lines, margin + 7, yPos);
    yPos += lines.length * 6;
  });

  yPos += 5;

  doc.setFillColor(255, 193, 7, 30);
  doc.roundedRect(margin, yPos, maxWidth, 15, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text('IMPORTANTE:', margin + 5, yPos + 6);
  doc.setFont('helvetica', 'normal');
  yPos += 11;
  yPos = addText('Todos los archivos deben ser del mismo tipo (ej: todas facturas)', yPos, 9, 'normal');

  yPos += 10;

  // Solución de Problemas
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('4. Solucion de Problemas', margin + 5, yPos + 8);
  yPos += 18;

  const problemas = [
    ['Error: "El esquema esta vacio"', 'Usa boton "Clasificar Documento" del Asistente IA'],
    ['Error: "Datos incorrectos"', 'Click en "Validar Datos", lee sugerencias, ajusta'],
    ['Error 500 / No funciona', 'Recarga pagina (F5), intenta de nuevo'],
    ['Asistente no clasifica bien', 'Documento complejo o mal escaneado. Mejora calidad'],
  ];

  problemas.forEach(([error, solucion]) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    yPos = addText(error, yPos, 10, 'bold');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);
    yPos = addText(`→ ${solucion}`, yPos + 2, 9, 'normal');
    yPos += 5;
  });

  // PÁGINA 5 - Consejos
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', currentPage, totalPages);
  addFooter(doc);
  yPos = 45;

  doc.setFillColor(...COLORS.success);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('5. Consejos Profesionales', margin + 5, yPos + 8);
  yPos += 18;

  // Haz esto
  doc.setFillColor(34, 197, 94, 20);
  doc.roundedRect(margin, yPos, maxWidth, 60, 3, 3, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.success);
  doc.text('Haz Esto:', margin + 5, yPos + 7);
  yPos += 12;

  const hazEsto = [
    'Usa el Asistente IA siempre primero',
    'Valida datos antes de exportar',
    'Prueba con 1 antes de procesar 100',
    'Exporta a Excel para analisis facil',
    'Usa PDFs nativos (mejor que escaneados)',
  ];

  hazEsto.forEach(tip => {
    yPos = addBullet(tip, yPos);
  });

  yPos += 10;

  // Evita esto
  doc.setFillColor(220, 38, 38, 20);
  doc.roundedRect(margin, yPos, maxWidth, 45, 3, 3, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38);
  doc.text('Evita Esto:', margin + 5, yPos + 7);
  yPos += 12;

  const evitaEsto = [
    'No ignores el Asistente IA',
    'No mezcles tipos de documentos',
    'No proceses sin validar primero',
    'No uses imagenes de baja calidad',
  ];

  evitaEsto.forEach(tip => {
    yPos = addBullet(tip, yPos);
  });

  // PÁGINA 6 - GDPR y Resumen
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Verbadoc Europa Pro - Guia Completa', currentPage, totalPages);
  addFooter(doc);
  yPos = 50;

  // GDPR Box grande
  doc.setFillColor(34, 197, 94, 30);
  doc.roundedRect(margin, yPos, maxWidth, 45, 5, 5, 'F');

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.success);
  doc.text('Cumplimiento GDPR', margin + 5, yPos + 12);

  doc.setFontSize(16);
  doc.text('100% Europeo', margin + 5, yPos + 22);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  doc.text('Todos los datos se procesan en Europa (Belgica)', margin + 5, yPos + 31);
  doc.text('No se almacenan datos permanentemente', margin + 5, yPos + 38);

  yPos += 55;

  // Resumen final
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(margin, yPos, maxWidth, 12, 3, 3, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Resumen Rapido', margin + 5, yPos + 8);
  yPos += 18;

  const resumen = [
    '1. Sube documento',
    '2. Usa Asistente IA',
    '3. Ejecuta extraccion',
    '4. Valida datos',
    '5. Exporta a Excel',
  ];

  resumen.forEach((paso, i) => {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(paso, margin + 5, yPos + (i * 8));
  });

  yPos += 50;

  // Info de contacto
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.textLight);
  doc.text('Para mas informacion:', margin, yPos);
  doc.text('https://verbadoceuropapro.vercel.app', margin, yPos + 6);

  // Descargar
  doc.save('Verbadoc_Europa_Pro_Guia_Completa.pdf');
}
