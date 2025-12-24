/**
 * SERVICIO DE LECTURA DE CÓDIGOS DE BARRAS Y QR
 *
 * Detecta y lee códigos de barras (1D) y códigos QR (2D) en documentos
 * usando Google Gemini Vision API
 *
 * Tipos soportados:
 * - QR Codes
 * - EAN-13, EAN-8 (productos)
 * - Code 39, Code 128 (industrial)
 * - PDF417 (DNI español, pasaportes)
 * - Data Matrix
 * - UPC-A, UPC-E
 *
 * @version 1.0.0
 * @author VerbadocPro Team
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Tipos de códigos soportados
export enum BarcodeType {
  QR_CODE = 'QR_CODE',
  EAN_13 = 'EAN_13',
  EAN_8 = 'EAN_8',
  CODE_39 = 'CODE_39',
  CODE_128 = 'CODE_128',
  PDF417 = 'PDF417',
  DATA_MATRIX = 'DATA_MATRIX',
  UPC_A = 'UPC_A',
  UPC_E = 'UPC_E',
  UNKNOWN = 'UNKNOWN'
}

// Tipos de documentos que suelen tener códigos
export enum DocumentTypeWithCode {
  FACTURA = 'FACTURA',
  ALBARAN = 'ALBARAN',
  DNI = 'DNI',
  PASAPORTE = 'PASAPORTE',
  RECETA_MEDICA = 'RECETA_MEDICA',
  MULTA = 'MULTA',
  TICKET_FISCAL = 'TICKET_FISCAL',
  EXTRACTO_BANCARIO = 'EXTRACTO_BANCARIO',
  CERTIFICADO = 'CERTIFICADO',
  UNKNOWN = 'UNKNOWN'
}

// Interfaz para un código detectado
export interface DetectedCode {
  type: BarcodeType;
  rawData: string;
  parsedData?: any;
  confidence: number;
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Interfaz para el resultado completo
export interface BarcodeDetectionResult {
  codesDetected: number;
  codes: DetectedCode[];
  documentType?: DocumentTypeWithCode;
  structuredData?: any;
  validationStatus?: 'VALID' | 'INVALID' | 'UNVERIFIED';
  processingTime: number;
}

// Interfaz para datos de factura (QR/código de barras)
export interface FacturaQRData {
  numeroFactura?: string;
  cif?: string;
  total?: number;
  fecha?: string;
  referencia?: string;
  emisor?: string;
  receptor?: string;
  iban?: string;
}

// Interfaz para datos de DNI (PDF417)
export interface DNIData {
  nombre?: string;
  apellidos?: string;
  dni?: string;
  fechaNacimiento?: string;
  fechaExpedicion?: string;
  fechaCaducidad?: string;
  numeroSoporte?: string;
  nacionalidad?: string;
  sexo?: string;
}

// Interfaz para datos de multa
export interface MultaData {
  numeroExpediente?: string;
  matricula?: string;
  fecha?: string;
  hora?: string;
  lugar?: string;
  infraccion?: string;
  importe?: number;
  referenciaPago?: string;
  fechaLimite?: string;
  organismo?: string;
}

// Interfaz para datos de receta médica
export interface RecetaData {
  codigoReceta?: string;
  paciente?: string;
  medicamento?: string;
  dosis?: string;
  medico?: string;
  centroSalud?: string;
  fechaPrescripcion?: string;
  validezHasta?: string;
}

/**
 * Servicio principal de detección de códigos
 */
export class BarcodeService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * Detecta y lee códigos de barras/QR en una imagen
   */
  async detectAndReadCodes(base64Image: string): Promise<BarcodeDetectionResult> {
    const startTime = Date.now();

    const prompt = `
Analiza esta imagen y detecta TODOS los códigos de barras y códigos QR presentes.

Para cada código encontrado, proporciona:
1. Tipo de código (QR, EAN-13, Code 128, PDF417, etc.)
2. Contenido exacto del código
3. Posición aproximada en la imagen (coordenadas)
4. Nivel de confianza (0-1)

IMPORTANTE:
- Si es un QR de factura española, intenta extraer: número factura, CIF, total, fecha, referencia
- Si es PDF417 de DNI español, extrae: nombre, apellidos, DNI, fecha nacimiento, soporte
- Si es QR de multa, extrae: expediente, matrícula, importe, referencia pago
- Si es QR de receta electrónica, extrae: código receta, medicamento, fecha

Responde SOLO con JSON válido en este formato exacto:
{
  "codesDetected": número,
  "codes": [
    {
      "type": "QR_CODE" | "EAN_13" | "CODE_128" | "PDF417" | etc,
      "rawData": "contenido exacto del código",
      "parsedData": { objeto con datos estructurados si aplica },
      "confidence": 0.0 a 1.0,
      "position": { "x": 0, "y": 0, "width": 0, "height": 0 }
    }
  ],
  "documentType": "FACTURA" | "DNI" | "MULTA" | "RECETA_MEDICA" | etc,
  "structuredData": { datos extraídos y parseados }
}

Si NO hay códigos, devuelve:
{
  "codesDetected": 0,
  "codes": []
}
`;

    try {
      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: 'image/jpeg'
          }
        }
      ]);

      const responseText = result.response.text();

      // Limpiar respuesta (quitar markdown si existe)
      const jsonText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const parsedResult = JSON.parse(jsonText);

      const processingTime = Date.now() - startTime;

      return {
        codesDetected: parsedResult.codesDetected || 0,
        codes: parsedResult.codes || [],
        documentType: parsedResult.documentType || DocumentTypeWithCode.UNKNOWN,
        structuredData: parsedResult.structuredData,
        validationStatus: this.validateCodeData(parsedResult),
        processingTime: processingTime
      };

    } catch (error) {
      console.error('Error en detección de códigos:', error);
      return {
        codesDetected: 0,
        codes: [],
        processingTime: Date.now() - startTime
      };
    }
  }

  /**
   * Detecta códigos de forma rápida (pre-check antes de procesamiento completo)
   */
  async quickDetect(base64Image: string): Promise<boolean> {
    const prompt = `
Analiza rápidamente esta imagen.
¿Contiene algún código de barras o código QR?

Responde SOLO: "SI" o "NO"
`;

    try {
      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: 'image/jpeg'
          }
        }
      ]);

      const response = result.response.text().trim().toUpperCase();
      return response.includes('SI') || response.includes('YES');

    } catch (error) {
      console.error('Error en quick detect:', error);
      return false;
    }
  }

  /**
   * Valida datos del código (checksums, formato)
   */
  private validateCodeData(data: any): 'VALID' | 'INVALID' | 'UNVERIFIED' {
    // Validación básica de DNI español
    if (data.documentType === 'DNI' && data.structuredData?.dni) {
      return this.validateDNI(data.structuredData.dni) ? 'VALID' : 'INVALID';
    }

    // Validación de CIF español
    if (data.structuredData?.cif) {
      return this.validateCIF(data.structuredData.cif) ? 'VALID' : 'INVALID';
    }

    // Validación de EAN-13 (checksum)
    const ean13Code = data.codes?.find((c: any) => c.type === 'EAN_13');
    if (ean13Code) {
      return this.validateEAN13(ean13Code.rawData) ? 'VALID' : 'INVALID';
    }

    return 'UNVERIFIED';
  }

  /**
   * Valida DNI español (letra de control)
   */
  private validateDNI(dni: string): boolean {
    const dniRegex = /^(\d{8})([A-Z])$/;
    const match = dni.match(dniRegex);

    if (!match) return false;

    const numero = parseInt(match[1]);
    const letra = match[2];
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    return letras[numero % 23] === letra;
  }

  /**
   * Valida CIF español
   */
  private validateCIF(cif: string): boolean {
    const cifRegex = /^([ABCDEFGHJNPQRSUVW])(\d{7})([0-9A-J])$/;
    return cifRegex.test(cif);
  }

  /**
   * Valida EAN-13 (checksum)
   */
  private validateEAN13(ean: string): boolean {
    if (ean.length !== 13) return false;

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(ean[i]);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }

    const checksum = (10 - (sum % 10)) % 10;
    return checksum === parseInt(ean[12]);
  }

  /**
   * Parse específico para factura QR
   */
  parseFacturaQR(rawData: string): FacturaQRData | null {
    try {
      // Intentar parsear JSON (formato común en facturas)
      const data = JSON.parse(rawData);

      return {
        numeroFactura: data.numFactura || data.factura || data.invoice,
        cif: data.cif || data.nif || data.tax_id,
        total: parseFloat(data.total || data.amount || data.importe),
        fecha: data.fecha || data.date,
        referencia: data.ref || data.referencia || data.reference,
        emisor: data.emisor || data.issuer,
        receptor: data.receptor || data.recipient,
        iban: data.iban
      };
    } catch {
      // Si no es JSON, intentar parsear formato custom
      return null;
    }
  }

  /**
   * Parse específico para DNI PDF417
   */
  parseDNI_PDF417(rawData: string): DNIData | null {
    try {
      // Formato típico de PDF417 en DNI español (separado por delimitadores)
      const parts = rawData.split('<<');

      if (parts.length < 2) return null;

      return {
        apellidos: parts[0]?.trim(),
        nombre: parts[1]?.trim(),
        dni: this.extractDNI(rawData),
        fechaNacimiento: this.extractDate(rawData),
        nacionalidad: this.extractNationality(rawData),
        sexo: this.extractSex(rawData)
      };
    } catch {
      return null;
    }
  }

  /**
   * Parse específico para multa
   */
  parseMultaQR(rawData: string): MultaData | null {
    try {
      const data = JSON.parse(rawData);

      return {
        numeroExpediente: data.expediente || data.numero,
        matricula: data.matricula || data.plate,
        fecha: data.fecha || data.date,
        hora: data.hora || data.time,
        lugar: data.lugar || data.location,
        infraccion: data.infraccion || data.violation,
        importe: parseFloat(data.importe || data.amount),
        referenciaPago: data.referencia || data.paymentRef,
        fechaLimite: data.fechaLimite || data.deadline,
        organismo: data.organismo || data.authority
      };
    } catch {
      return null;
    }
  }

  // Métodos auxiliares de extracción
  private extractDNI(text: string): string | undefined {
    const match = text.match(/\d{8}[A-Z]/);
    return match ? match[0] : undefined;
  }

  private extractDate(text: string): string | undefined {
    const match = text.match(/\d{6}/); // YYMMDD
    if (match) {
      const year = '19' + match[0].substring(0, 2);
      const month = match[0].substring(2, 4);
      const day = match[0].substring(4, 6);
      return `${year}-${month}-${day}`;
    }
    return undefined;
  }

  private extractNationality(text: string): string | undefined {
    const match = text.match(/ESP|FRA|ITA|DEU/);
    return match ? match[0] : undefined;
  }

  private extractSex(text: string): string | undefined {
    const match = text.match(/[MF](?=<)/);
    return match ? match[0] : undefined;
  }
}

/**
 * Función helper para uso rápido
 */
export async function detectBarcodes(
  base64Image: string,
  apiKey: string
): Promise<BarcodeDetectionResult> {
  const service = new BarcodeService(apiKey);
  return await service.detectAndReadCodes(base64Image);
}

export default BarcodeService;
