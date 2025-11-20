import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

// Professional Color Palette (RGB values)
const COLORS = {
  primary: [14, 165, 233],      // Cyan 500
  primaryDark: [3, 105, 161],   // Cyan 700
  secondary: [100, 116, 139],   // Slate 500
  accent: [168, 85, 247],       // Purple 500
  success: [34, 197, 94],       // Green 500
  warning: [245, 158, 11],      // Amber 500
  danger: [239, 68, 68],        // Red 500
  text: [15, 23, 42],           // Slate 900
  textLight: [100, 116, 139],   // Slate 500
  bgLight: [248, 250, 252],     // Slate 50
  bgMedium: [226, 232, 240],    // Slate 200
  white: [255, 255, 255],
};

// Helper: Convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

// Helper: Add professional header
function addProfessionalHeader(doc: jsPDF, title: string, subtitle: string, pageNum: number, totalPages: number) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header background
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Brand name
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.white);
  doc.text('Verbadoc Enterprise', 20, 18);

  // Subtitle
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.white);
  doc.text(subtitle, 20, 28);

  // Page number
  doc.setFontSize(9);
  doc.text(`Pag. ${pageNum}/${totalPages}`, pageWidth - 30, 18);
}

// Helper: Add professional footer
function addProfessionalFooter(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Footer line
  doc.setDrawColor(...COLORS.bgMedium);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);

  // Footer text
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textLight);
  doc.setFont('helvetica', 'normal');
  doc.text('100% GDPR Compliant - Procesado en Europa', 20, pageHeight - 12);
  doc.text('https://verbadoceuropapro.vercel.app', pageWidth - 90, pageHeight - 12);
}

// Helper: Add section title
function addSectionTitle(doc: jsPDF, y: number, title: string, color: number[] = COLORS.primary): number {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Background bar
  doc.setFillColor(...color);
  doc.rect(20, y, pageWidth - 40, 12, 'F');

  // Title
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.white);
  doc.text(title, 25, y + 8);

  return y + 18;
}

// Helper: Add info box
function addInfoBox(doc: jsPDF, y: number, title: string, content: string[], bgColor: number[], textColor: number[] = COLORS.text): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const boxWidth = pageWidth - 40;
  let currentY = y;

  // Calculate box height
  let boxHeight = 10;
  content.forEach(line => {
    const lines = doc.splitTextToSize(line, boxWidth - 10);
    boxHeight += lines.length * 5;
  });

  // Draw box
  doc.setFillColor(...bgColor);
  doc.roundedRect(20, currentY, boxWidth, boxHeight, 3, 3, 'F');

  currentY += 7;

  // Title
  if (title) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textColor);
    doc.text(title, 25, currentY);
    currentY += 6;
  }

  // Content
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textColor);

  content.forEach(line => {
    const lines = doc.splitTextToSize(line, boxWidth - 10);
    doc.text(lines, 25, currentY);
    currentY += lines.length * 5;
  });

  return y + boxHeight + 5;
}

// Helper: Add bullet list
function addBulletList(doc: jsPDF, y: number, items: string[]): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - 50;
  let currentY = y;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);

  items.forEach(item => {
    // Bullet point (small circle)
    doc.setFillColor(...COLORS.primary);
    doc.circle(22, currentY - 2, 1, 'F');

    // Text
    const lines = doc.splitTextToSize(item, maxWidth);
    doc.text(lines, 27, currentY);
    currentY += lines.length * 5;
  });

  return currentY;
}

// QUICK GUIDE PDF
export function generateQuickGuidePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const totalPages = 2;
  let currentPage = 1;

  // PAGE 1 - Cover & Quick Start
  addProfessionalHeader(doc, 'Verbadoc Enterprise', 'Guia Rapida', currentPage, totalPages);
  addProfessionalFooter(doc);

  let y = 55;

  // Main title
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Guia Rapida', 20, y);
  y += 10;

  doc.setFontSize(14);
  doc.setTextColor(...COLORS.textLight);
  doc.setFont('helvetica', 'normal');
  doc.text('Comienza en 3 minutos', 20, y);
  y += 20;

  // AI Assistant Box
  y = addInfoBox(doc, y, 'ASISTENTE IA - Tu mejor aliado', [
    'Panel inteligente que aparece automaticamente al subir documentos.',
    'Clasifica, valida y segmenta usando IA avanzada en servidores europeos.'
  ], [243, 232, 255], COLORS.text);

  y += 3;

  // Three main features
  y = addSectionTitle(doc, y, 'CLASIFICACION AUTOMATICA', COLORS.accent);
  y = addBulletList(doc, y, [
    'Detecta el tipo de documento',
    'Sugiere esquema de extraccion perfecto',
    'Muestra nivel de confianza'
  ]);
  y += 5;

  y = addSectionTitle(doc, y, 'VALIDACION INTELIGENTE', COLORS.success);
  y = addBulletList(doc, y, [
    'Revisa datos extraidos automaticamente',
    'Detecta errores e inconsistencias',
    'Asigna puntuacion de calidad'
  ]);
  y += 5;

  y = addSectionTitle(doc, y, 'SEGMENTACION DE PDFs', COLORS.warning);
  y = addBulletList(doc, y, [
    'Detecta multiples documentos en un PDF',
    'Los separa automaticamente',
    'Procesa cada uno individualmente'
  ]);
  y += 10;

  // Quick Start Steps
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Empieza en 3 Pasos', 20, y);
  y += 10;

  // Step 1
  doc.setFillColor(219, 234, 254);
  doc.roundedRect(20, y, pageWidth - 40, 20, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primaryDark);
  doc.text('1. SUBE TU DOCUMENTO', 25, y + 7);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  doc.text('Arrastra tu PDF/imagen o haz clic en "Haga clic para subir"', 25, y + 13);
  y += 25;

  // Step 2
  doc.setFillColor(243, 232, 255);
  doc.roundedRect(20, y, pageWidth - 40, 20, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(124, 58, 237);
  doc.text('2. USA EL ASISTENTE IA', 25, y + 7);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  doc.text('Click en "Clasificar Documento" - El esquema se llena solo', 25, y + 13);
  y += 25;

  // Step 3
  doc.setFillColor(209, 250, 229);
  doc.roundedRect(20, y, pageWidth - 40, 20, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(5, 150, 105);
  doc.text('3. EXTRAE Y DESCARGA', 25, y + 7);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  doc.text('Click "Ejecutar Extraccion" y luego "Excel" para descargar', 25, y + 13);

  // PAGE 2 - Tips & Document Types
  doc.addPage();
  currentPage++;
  addProfessionalHeader(doc, 'Verbadoc Enterprise', 'Guia Rapida', currentPage, totalPages);
  addProfessionalFooter(doc);

  y = 55;

  // Document Types Table
  y = addSectionTitle(doc, y, 'TIPOS DE DOCUMENTOS SOPORTADOS', COLORS.secondary);

  doc.autoTable({
    startY: y,
    head: [['Tipo', 'Ejemplos']],
    body: [
      ['Facturas', 'Facturas comerciales, recibos, tickets'],
      ['Formularios', 'Solicitudes, contratos, actas'],
      ['Reportes', 'Informes, documentos corporativos'],
      ['Medicos', 'Recetas, informes medicos, analisis'],
      ['Legales', 'Contratos, poderes, escrituras'],
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.secondary, textColor: COLORS.white, fontSize: 10 },
    bodyStyles: { fontSize: 9, textColor: COLORS.text },
    alternateRowStyles: { fillColor: COLORS.bgLight },
    margin: { left: 20, right: 20 },
  });

  y = doc.lastAutoTable.finalY + 10;

  // Best Practices
  y = addSectionTitle(doc, y, 'MEJORES PRACTICAS', COLORS.success);

  const doList = [
    'Usa el Asistente IA siempre primero',
    'Valida datos antes de exportar',
    'Prueba con 1 antes de procesar 100',
    'Exporta a Excel para analisis facil'
  ];

  y = addInfoBox(doc, y, 'HAZ ESTO:', doList, [209, 250, 229], [5, 150, 105]);
  y += 3;

  const dontList = [
    'No ignores el Asistente IA',
    'No mezcles tipos de documentos',
    'No proceses sin validar primero'
  ];

  y = addInfoBox(doc, y, 'EVITA ESTO:', dontList, [254, 226, 226], [220, 38, 38]);
  y += 5;

  // GDPR Badge
  y = addInfoBox(doc, y, '', [
    'CUMPLIMIENTO GDPR - 100% EUROPEO',
    'Datos procesados en Europa (Belgica) - No se almacenan permanentemente'
  ], [209, 250, 229], [5, 150, 105]);

  doc.save('Verbadoc_Enterprise_Guia_Rapida.pdf');
}

// FULL GUIDE PDF
export function generateFullGuidePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const totalPages = 4;
  let currentPage = 1;

  // PAGE 1 - Cover & TOC
  addProfessionalHeader(doc, 'Verbadoc Enterprise', 'Guia Completa', currentPage, totalPages);
  addProfessionalFooter(doc);

  let currentY = 60;

  // Main Title
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Guia Completa', 20, currentY);
  currentY += 12;

  doc.setFontSize(16);
  doc.setTextColor(...COLORS.textLight);
  doc.setFont('helvetica', 'normal');
  doc.text('Verbadoc Enterprise', 20, currentY);
  currentY += 6;

  doc.setFontSize(12);
  doc.text('Extraccion profesional de datos con IA', 20, currentY);
  currentY += 20;

  // Highlight Box
  currentY = addInfoBox(doc, currentY, 'NUEVO: ASISTENTE IA INTEGRADO', [
    'Clasifica, valida y segmenta documentos automaticamente usando',
    'IA avanzada en servidores europeos (Google Vertex AI - Belgica).'
  ], [243, 232, 255], COLORS.accent);

  currentY += 10;

  // Table of Contents
  doc.setFillColor(...COLORS.bgLight);
  doc.roundedRect(20, currentY, pageWidth - 40, 90, 3, 3, 'F');

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('INDICE DE CONTENIDOS', 25, currentY + 10);

  currentY += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);

  const tocItems = [
    '1. El Asistente IA',
    '2. Guia Paso a Paso',
    '3. Procesamiento en Lote',
    '4. Solucion de Problemas',
    '5. Mejores Practicas',
    '6. Cumplimiento GDPR',
  ];

  tocItems.forEach(item => {
    doc.text(item, 30, currentY);
    currentY += 7;
  });

  // PAGE 2 - AI Assistant
  doc.addPage();
  currentPage++;
  addProfessionalHeader(doc, 'Verbadoc Enterprise', 'Guia Completa', currentPage, totalPages);
  addProfessionalFooter(doc);

  currentY = 55;

  currentY = addSectionTitle(doc, currentY, '1. EL ASISTENTE IA', COLORS.accent);

  currentY = addInfoBox(doc, currentY, '', [
    'Panel inteligente que aparece automaticamente al subir un documento.',
    'Utiliza Google Vertex AI en servidores europeos (Belgica) para garantizar',
    'cumplimiento total con regulaciones GDPR.'
  ], COLORS.bgLight, COLORS.text);

  currentY += 5;

  // Classification
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('CLASIFICACION AUTOMATICA', 20, currentY);
  currentY += 6;

  currentY = addBulletList(doc, currentY, [
    'Detecta automaticamente el tipo de documento',
    'Genera esquema de extraccion personalizado',
    'Muestra nivel de confianza e indicadores clave',
    'Ejemplo: "FACTURA COMERCIAL (95% confianza)"'
  ]);
  currentY += 8;

  // Validation
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('VALIDACION INTELIGENTE', 20, currentY);
  currentY += 6;

  currentY = addBulletList(doc, currentY, [
    'Revisa datos extraidos vs documento original',
    'Detecta errores e inconsistencias',
    'Asigna score de calidad (0-100)',
    'Ejemplo: "Score 85/100 - 3 problemas detectados"'
  ]);
  currentY += 8;

  // Segmentation
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('SEGMENTACION DE PDFs', 20, currentY);
  currentY += 6;

  currentY = addBulletList(doc, currentY, [
    'Detecta multiples documentos en un PDF',
    'Identifica inicio y fin de cada documento',
    'Permite procesarlos por separado',
    'Ejemplo: "3 documentos: Doc1 (Pag.1-2), Doc2 (Pag.3-4)..."'
  ]);

  // PAGE 3 - Step by Step & Batch Processing
  doc.addPage();
  currentPage++;
  addProfessionalHeader(doc, 'Verbadoc Enterprise', 'Guia Completa', currentPage, totalPages);
  addProfessionalFooter(doc);

  currentY = 55;

  currentY = addSectionTitle(doc, currentY, '2. GUIA PASO A PASO', COLORS.primary);

  const steps = [
    ['PASO 1: Abrir Aplicacion', 'Ve a: https://verbadoceuropapro.vercel.app'],
    ['PASO 2: Subir Documentos', 'Arrastra archivo o click en "Haga clic para subir"'],
    ['PASO 3: Usar Asistente IA', 'Click "Clasificar Documento" - Espera 5-10 seg'],
    ['PASO 4: Ejecutar Extraccion', 'Revisa todo, click "Ejecutar Extraccion"'],
    ['PASO 5: Validar (Opcional)', 'Click "Validar Datos" del Asistente'],
    ['PASO 6: Exportar', 'Click en "Excel" para descargar'],
  ];

  steps.forEach(([title, desc]) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primaryDark);
    doc.text(title, 20, currentY);
    currentY += 5;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);
    const lines = doc.splitTextToSize(desc, pageWidth - 50);
    doc.text(lines, 25, currentY);
    currentY += lines.length * 5 + 3;
  });

  currentY += 5;

  currentY = addSectionTitle(doc, currentY, '3. PROCESAMIENTO EN LOTE', COLORS.secondary);

  currentY = addBulletList(doc, currentY, [
    'Sube todos los archivos (10, 20, 50...)',
    'Selecciona el primer archivo',
    'Usa Asistente IA para clasificarlo',
    'Ejecuta extraccion en el primero',
    'Verifica que resultados sean correctos',
    'Click en "Procesar Todos"',
    'Espera a que termine',
    'Descarga cada resultado'
  ]);

  currentY += 5;

  currentY = addInfoBox(doc, currentY, 'IMPORTANTE:', [
    'Todos los archivos deben ser del mismo tipo (ej: todas facturas)'
  ], [254, 243, 199], [146, 64, 14]);

  // PAGE 4 - Troubleshooting & Best Practices
  doc.addPage();
  currentPage++;
  addProfessionalHeader(doc, 'Verbadoc Enterprise', 'Guia Completa', currentPage, totalPages);
  addProfessionalFooter(doc);

  currentY = 55;

  currentY = addSectionTitle(doc, currentY, '4. SOLUCION DE PROBLEMAS', COLORS.danger);

  doc.autoTable({
    startY: currentY,
    head: [['Problema', 'Solucion']],
    body: [
      ['El esquema esta vacio', 'Usa "Clasificar Documento" del Asistente IA'],
      ['Datos incorrectos', 'Click "Validar Datos", lee sugerencias, ajusta'],
      ['Error 500', 'Recarga pagina (F5), intenta de nuevo'],
      ['No clasifica bien', 'Documento complejo. Mejora calidad de escaneo'],
    ],
    theme: 'striped',
    headStyles: { fillColor: COLORS.danger, textColor: COLORS.white, fontSize: 10 },
    bodyStyles: { fontSize: 9, textColor: COLORS.text },
    margin: { left: 20, right: 20 },
  });

  currentY = doc.lastAutoTable.finalY + 10;

  currentY = addSectionTitle(doc, currentY, '5. MEJORES PRACTICAS', COLORS.success);

  const doList = [
    'Usa el Asistente IA siempre primero',
    'Valida datos antes de exportar',
    'Prueba con 1 antes de procesar 100',
    'Exporta a Excel para analisis facil',
    'Usa PDFs nativos (mejor que escaneados)'
  ];

  currentY = addInfoBox(doc, currentY, 'HAZ ESTO:', doList, [209, 250, 229], [5, 150, 105]);
  currentY += 3;

  const dontList = [
    'No ignores el Asistente IA',
    'No mezcles tipos de documentos',
    'No proceses sin validar primero',
    'No uses imagenes de baja calidad'
  ];

  currentY = addInfoBox(doc, currentY, 'EVITA ESTO:', dontList, [254, 226, 226], [220, 38, 38]);
  currentY += 5;

  // GDPR Section
  currentY = addSectionTitle(doc, currentY, '6. CUMPLIMIENTO GDPR - 100% EUROPEO', COLORS.success);

  currentY = addInfoBox(doc, currentY, '', [
    'TODOS LOS DATOS SE PROCESAN EN EUROPA (BELGICA)',
    'NO SE ALMACENAN DATOS PERMANENTEMENTE',
    'CUMPLIMIENTO TOTAL CON REGULACIONES EUROPEAS'
  ], [209, 250, 229], [5, 150, 105]);

  doc.save('Verbadoc_Enterprise_Guia_Completa.pdf');
}
