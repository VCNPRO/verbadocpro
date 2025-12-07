import React, { useState, useEffect } from 'react';
import type { ExtractionResult } from '../types.ts';
import { JsonViewer } from './JsonViewer.tsx';
import { downloadExcel, downloadCSV, downloadPDF as downloadExtractionPDF, downloadTextAsPDF } from '../utils/exportUtils.ts';
import { DocumentTextIcon, TableCellsIcon } from './Icons.tsx';

interface ResultsViewerProps {
    results: ExtractionResult[];
    theme?: any;
    isLightMode?: boolean;
    onClose?: () => void;
    onClearHistory?: () => void;
    onExportHistory?: () => void;
    onExportExcel?: (transposed: boolean) => void;
    onExportAllPDFs?: () => void;
    onImportHistory?: () => void;
}

export const ResultsViewer: React.FC<ResultsViewerProps> = ({
    results,
    theme,
    isLightMode,
    onClose,
    onClearHistory,
    onExportHistory,
    onExportExcel,
    onExportAllPDFs,
    onImportHistory
}) => {
    const [selectedResult, setSelectedResult] = useState<ExtractionResult | null>(null);
    
    useEffect(() => {
        if (results.length > 0 && !selectedResult) {
            setSelectedResult(results[0]);
        }
        if (selectedResult && !results.find(r => r.id === selectedResult.id)) {
            setSelectedResult(results.length > 0 ? results[0] : null);
        }
    }, [results, selectedResult]);

    const [excelTransposed, setExcelTransposed] = useState<boolean>(false);
    const [historyExcelTransposed, setHistoryExcelTransposed] = useState<boolean>(false);

    const cardBg = isLightMode ? '#ffffff' : 'rgba(30, 41, 59, 0.5)';
    const borderColor = isLightMode ? '#dbeafe' : 'rgba(51, 65, 85, 0.5)';
    const textColor = isLightMode ? '#1e3a8a' : '#f1f5f9';
    const textSecondary = isLightMode ? '#475569' : '#94a3b8';
    const accentColor = isLightMode ? '#2563eb' : '#06b6d4';
    const headerBg = isLightMode ? '#eff6ff' : 'rgba(2, 6, 23, 0.5)';

    // Handlers for Transcription downloads
    const handleDownloadTranscriptionTXT = () => {
        if (!selectedResult || !selectedResult.transcription) return;
        const blob = new Blob([selectedResult.transcription], { type: 'text/plain;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_transcripcion.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDownloadTranscriptionPDF = () => {
        if (!selectedResult || !selectedResult.transcription) return;
        downloadTextAsPDF(selectedResult.transcription, `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_transcripcion`);
    };

    // Handlers for Extraction downloads
    const handleDownloadJSON = () => {
        if (!selectedResult || !selectedResult.extractedData) return;
        const dataStr = JSON.stringify(selectedResult.extractedData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_extraccion.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadCSV = () => {
        if (!selectedResult || !selectedResult.extractedData) return;
        downloadCSV(
            selectedResult.extractedData,
            `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_extraccion`,
            selectedResult.schema
        );
    };

    const handleDownloadExtractionPDF = () => {
        if (!selectedResult || !selectedResult.extractedData) return;
        downloadExtractionPDF(
            selectedResult.extractedData,
            `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_extraccion`,
            selectedResult.schema,
            true // Siempre en formato vertical
        );
    };

    const handleDownloadExcel = () => {
        if (!selectedResult || !selectedResult.extractedData) return;
        downloadExcel(
            selectedResult.extractedData,
            `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_extraccion`,
            selectedResult.schema,
            excelTransposed
        );
    };

    const handleCopyToClipboard = () => {
        if (!selectedResult) return;
        const contentToCopy = selectedResult.type === 'transcription' 
            ? selectedResult.transcription
            : JSON.stringify(selectedResult.extractedData, null, 2);
        
        if (contentToCopy) {
            navigator.clipboard.writeText(contentToCopy);
            alert('Resultado copiado al portapapeles');
        }
    };

    if (results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full rounded-lg border p-6 text-center transition-colors duration-500" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: textSecondary }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <h3 className="text-xl font-semibold" style={{ color: textColor }}>Sin Resultados</h3>
                <p className="max-w-sm mx-auto mt-1" style={{ color: textSecondary }}>Los resultados de las extracciones y transcripciones aparecerán aquí.</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border flex flex-col h-full transition-colors duration-500" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
            <div className="p-4 border-b transition-colors duration-500" style={{ backgroundColor: headerBg, borderBottomColor: borderColor }}>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: textColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: accentColor }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Resultados
                    </h2>
                    {onClose && <button onClick={onClose} className="p-1 rounded transition-colors hover:opacity-80" style={{ color: textSecondary }}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {results.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>Seleccionar resultado:</label>
                        <select
                            value={selectedResult?.id || ''}
                            onChange={(e) => setSelectedResult(results.find(r => r.id === e.target.value) || null)}
                            className="w-full rounded-md p-2 text-sm transition-colors"
                            style={{ backgroundColor: isLightMode ? '#ffffff' : '#1e293b', borderWidth: '1px', borderStyle: 'solid', borderColor: borderColor, color: textColor }}
                        >
                            {results.map(result => (
                                <option key={result.id} value={result.id}>
                                    {result.type === 'transcription' ? '📄' : '📊'} {result.fileName} - {new Date(result.timestamp).toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {(onClearHistory || onExportHistory || onImportHistory || onExportExcel) && (
                    <div className="p-3 rounded-lg border transition-colors" style={{ backgroundColor: isLightMode ? '#eff6ff' : 'rgba(55, 65, 81, 0.5)', borderColor: borderColor }}>
                        <h3 className="text-sm font-semibold mb-2" style={{ color: textColor }}>📂 Gestión de Historial ({results.length} resultados)</h3>
                        {onExportExcel && (
                            <div className="mb-3 p-2 rounded-md" style={{ backgroundColor: isLightMode ? '#f0f9ff' : 'rgba(15, 23, 42, 0.5)' }}>
                                <p className="text-xs font-medium mb-1.5" style={{ color: textColor }}>Formato de Excel para historial completo (solo extracciones):</p>
                                {/* ... (resto de la UI de gestión de historial) ... */}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2">{/* ... (botones de gestión) ... */}</div>
                    </div>
                )}

                {selectedResult && (
                    <>
                        <div className="p-3 rounded-lg border transition-colors" style={{ backgroundColor: isLightMode ? '#f0fdf4' : 'rgba(15, 23, 42, 0.5)', borderColor: borderColor }}>
                            <p className="text-sm font-semibold" style={{ color: textColor }}>{selectedResult.fileName}</p>
                            <p className="text-xs mt-1" style={{ color: textSecondary }}>{selectedResult.type === 'transcription' ? 'Transcripción' : 'Extracción'} el {new Date(selectedResult.timestamp).toLocaleString()}</p>
                        </div>
                        
                        {/* VISTA PARA TRANSCRIPCIÓN */}
                        {selectedResult.type === 'transcription' && (
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <button onClick={handleDownloadTranscriptionPDF} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: isLightMode ? '#dc2626' : '#ef4444', color: '#ffffff' }} title="Descargar PDF"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>Descargar PDF</button>
                                    <button onClick={handleDownloadTranscriptionTXT} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: isLightMode ? '#2563eb' : '#3b82f6', color: '#ffffff' }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Descargar TXT</button>
                                    <button onClick={handleCopyToClipboard} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: isLightMode ? '#6ee7b7' : 'rgba(100, 116, 139, 0.5)', color: isLightMode ? '#064e3b' : '#f1f5f9', borderWidth: '1px', borderStyle: 'solid', borderColor: borderColor }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copiar Texto</button>
                                </div>
                                <div className="p-4 rounded-lg border transition-colors overflow-auto" style={{ backgroundColor: isLightMode ? '#f9fafb' : 'rgba(15, 23, 42, 0.5)', borderColor: borderColor, maxHeight: '50vh' }}>
                                    <pre className="whitespace-pre-wrap text-sm" style={{ color: isLightMode ? '#334155' : '#cbd5e1' }}>{selectedResult.transcription}</pre>
                                </div>
                            </div>
                        )}

                        {/* VISTA PARA EXTRACCIÓN */}
                        {selectedResult.type === 'extraction' && (
                            <>
                                <div className="p-3 rounded-lg border transition-colors" style={{ backgroundColor: isLightMode ? '#f0f9ff' : 'rgba(30, 41, 59, 0.5)', borderColor: borderColor }}>
                                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: textColor }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: accentColor }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>Formato de Excel</h3>
                                    {/* ... (resto de la UI de selección de formato excel) ... */}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={handleDownloadExtractionPDF} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: isLightMode ? '#dc2626' : '#ef4444', color: '#ffffff' }} title="Descargar PDF (formato vertical)"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>Descargar PDF</button>
                                    {/* ... (resto de botones de descarga) ... */}
                                    <button onClick={handleCopyToClipboard} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: isLightMode ? '#6ee7b7' : 'rgba(100, 116, 139, 0.5)', color: isLightMode ? '#064e3b' : '#f1f5f9', borderWidth: '1px', borderStyle: 'solid', borderColor: borderColor }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copiar JSON</button>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold mb-2" style={{ color: textColor }}>Datos Extraídos:</h3>
                                    <div className="p-4 rounded-lg border transition-colors overflow-x-auto" style={{ backgroundColor: isLightMode ? '#f9fafb' : 'rgba(15, 23, 42, 0.5)', borderColor: borderColor }}>
                                        <JsonViewer data={selectedResult.extractedData} />
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
