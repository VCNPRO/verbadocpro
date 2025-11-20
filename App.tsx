import React, { useState, useMemo, useEffect } from 'react';
import { FileUploader } from './components/FileUploader.tsx';
import { ExtractionEditor } from './components/ExtractionEditor.tsx';
import { HistoryViewer } from './components/HistoryViewer.tsx';
import { TemplatesPanel } from './components/TemplatesPanel.tsx';
import { PdfViewer } from './components/PdfViewer.tsx';
import { HelpModal } from './components/HelpModal.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { ResultsViewer } from './components/ResultsViewer.tsx';
import { ChatbotLaia } from './components/ChatbotLaia.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import type { UploadedFile, ExtractionResult, SchemaField, SchemaFieldType, Departamento } from './types.ts';
import { logActivity } from './src/utils/activityLogger.ts';
import { AVAILABLE_MODELS, type GeminiModel } from './services/geminiService.ts';
import { getDepartamentoById, getDefaultTheme } from './utils/departamentosConfig.ts';
import { AuthProvider, useAuth } from './src/contexts/AuthContext.mock.tsx';
import { AuthModal } from './src/components/AuthModal.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';

// ========== ICONS COMPONENTS ==========
const DocumentIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const HistoryIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const TemplateIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
);

const AdminIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SunIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const HelpIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LogoutIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

type TabType = 'extractor' | 'historial' | 'plantillas' | 'admin';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { currentUser } = useAuth();
    if (currentUser?.role !== 'admin') {
        return <Navigate to="/" />;
    }
    return children;
}

function AppContent() {
    const { currentUser, userProfile, logout } = useAuth();

    // ========== STATE ==========
    const [activeTab, setActiveTab] = useState<TabType>('extractor');
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [activeFileId, setActiveFileId] = useState<string | null>(null);
    const [history, setHistory] = useState<ExtractionResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [viewingFile, setViewingFile] = useState<File | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
    const [currentDepartamento, setCurrentDepartamento] = useState<Departamento>('general');
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [selectedModel, setSelectedModel] = useState<GeminiModel>('gemini-2.5-flash');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved !== 'light';
    });

    const [prompt, setPrompt] = useState<string>('Extrae la información clave del siguiente documento según el esquema JSON proporcionado.');
    const [schema, setSchema] = useState<SchemaField[]>([{ id: `field-${Date.now()}`, name: '', type: 'STRING' }]);

    // ========== THEME MANAGEMENT ==========
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const currentTheme = useMemo(() => {
        const departamentoInfo = getDepartamentoById(currentDepartamento);
        return departamentoInfo?.theme || getDefaultTheme();
    }, [currentDepartamento]);

    const isLightMode = !isDarkMode;

    // ========== HISTORY PERSISTENCE ==========
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('verbadoc-history');
            if (savedHistory) {
                const parsed = JSON.parse(savedHistory);
                setHistory(parsed);
                console.log('✅ Historial cargado:', parsed.length, 'extracciones');
            }
        } catch (error) {
            console.error('Error al cargar historial:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('verbadoc-history', JSON.stringify(history));
            console.log('💾 Historial guardado:', history.length, 'extracciones');
        } catch (error) {
            console.error('Error al guardar historial:', error);
        }
    }, [history]);

    const activeFile = useMemo(() => files.find(f => f.id === activeFileId), [files, activeFileId]);

    // ========== HANDLERS ==========
    const handleFileSelect = (id: string | null) => {
        setActiveFileId(id);
    };

    const handleExtract = async () => {
        if (!activeFile) return;
        setIsLoading(true);
        setFiles(currentFiles =>
            currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'procesando', error: undefined, extractedData: undefined } : f)
        );

        try {
            let extractedData: object;

            if (activeFile.file.name.toLowerCase().endsWith('.json')) {
                const text = await activeFile.file.text();
                extractedData = JSON.parse(text);
                console.log('📄 JSON procesado:', activeFile.file.name);
            } else {
                const { extractDataFromDocument } = await import('./services/geminiService.ts');
                extractedData = await extractDataFromDocument(activeFile.file, schema, prompt, selectedModel);
            }

            setFiles(currentFiles =>
                currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'completado', extractedData, error: undefined } : f)
            );

            const newHistoryEntry: ExtractionResult = {
                id: `hist-${Date.now()}`,
                fileId: activeFile.id,
                fileName: activeFile.file.name,
                schema: JSON.parse(JSON.stringify(schema)),
                extractedData,
                timestamp: new Date().toISOString(),
            };
            setHistory(currentHistory => [newHistoryEntry, ...currentHistory]);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setFiles(currentFiles =>
                currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'error', error: errorMessage, extractedData: undefined } : f)
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleExtractAll = async () => {
        const pendingFiles = files.filter(f => f.status === 'pendiente' || f.status === 'error');
        if (pendingFiles.length === 0) return;

        setIsLoading(true);

        const nonJsonFiles = pendingFiles.filter(f => !f.file.name.toLowerCase().endsWith('.json'));
        let extractDataFromDocument: any = null;
        if (nonJsonFiles.length > 0) {
            const service = await import('./services/geminiService.ts');
            extractDataFromDocument = service.extractDataFromDocument;
        }

        for (const file of pendingFiles) {
            setFiles(currentFiles =>
                currentFiles.map(f => f.id === file.id ? { ...f, status: 'procesando', error: undefined, extractedData: undefined } : f)
            );

            try {
                let extractedData: object;

                if (file.file.name.toLowerCase().endsWith('.json')) {
                    const text = await file.file.text();
                    extractedData = JSON.parse(text);
                    console.log('📄 JSON procesado:', file.file.name);
                } else {
                    extractedData = await extractDataFromDocument(file.file, schema, prompt, selectedModel);
                }

                setFiles(currentFiles =>
                    currentFiles.map(f => f.id === file.id ? { ...f, status: 'completado', extractedData, error: undefined } : f)
                );

                const newHistoryEntry: ExtractionResult = {
                    id: `hist-${Date.now()}-${file.id}`,
                    fileId: file.id,
                    fileName: file.file.name,
                    schema: JSON.parse(JSON.stringify(schema)),
                    extractedData,
                    timestamp: new Date().toISOString(),
                };
                setHistory(currentHistory => [newHistoryEntry, ...currentHistory]);

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                setFiles(currentFiles =>
                    currentFiles.map(f => f.id === file.id ? { ...f, status: 'error', error: errorMessage, extractedData: undefined } : f)
                );
            }
        }

        setIsLoading(false);
        setActiveTab('historial'); // Cambiar automáticamente a la pestaña de historial
    };

    const handleSelectTemplate = (template: any) => {
        console.log('📋 Plantilla seleccionada:', template);
        setSelectedTemplate(template);
        const isHealthTemplate = 'secciones' in template;

        if (isHealthTemplate) {
            const newSchema: SchemaField[] = template.secciones.flatMap((seccion: any) =>
                seccion.campos.map((campo: any) => {
                    let type: SchemaFieldType = 'STRING';
                    switch (campo.tipo_dato) {
                        case 'numero':
                            type = 'NUMBER';
                            break;
                        case 'multiseleccion':
                            type = 'ARRAY_OF_STRINGS';
                            break;
                        case 'tabla':
                            type = 'ARRAY_OF_OBJECTS';
                            break;
                        default:
                            type = 'STRING';
                    }
                    return {
                        id: `field-${campo.nombre_campo}-${Date.now()}`,
                        name: campo.etiqueta,
                        type: type,
                    };
                })
            );
            setSchema(newSchema);
            setPrompt('Extrae la información clave del siguiente documento de salud.');
            console.log('✅ Health template aplicada - Schema:', newSchema.length, 'campos');
        } else {
            if (!template.schema || !Array.isArray(template.schema)) {
                console.error('❌ Error: La plantilla no tiene un schema válido', template);
                alert('Error: Esta plantilla no tiene un esquema válido.');
                return;
            }

            const newSchema = JSON.parse(JSON.stringify(template.schema));
            const newPrompt = template.prompt || 'Extrae la información clave del siguiente documento según el esquema JSON proporcionado.';

            setSchema(newSchema);
            setPrompt(newPrompt);
            console.log('✅ Plantilla aplicada - Schema:', newSchema.length, 'campos');
        }

        if (template.departamento) {
            setCurrentDepartamento(template.departamento);
        }

        // Cambiar a la pestaña de extractor para ver el resultado
        setActiveTab('extractor');
    };

    const handleSaveTemplateChanges = (templateId: string, updatedPrompt: string, updatedSchema: SchemaField[]) => {
        console.log('💾 Guardando cambios en plantilla:', templateId);

        const originalTemplate = selectedTemplate;
        if (!originalTemplate) {
            console.error('❌ No hay plantilla seleccionada');
            return;
        }

        if (!originalTemplate.custom) {
            const newCustomTemplate = {
                id: `custom-${Date.now()}`,
                name: `${originalTemplate.name} (Modificada)`,
                description: originalTemplate.description || 'Copia modificada de plantilla predefinida',
                type: 'modelo',
                icon: originalTemplate.icon || 'file',
                schema: JSON.parse(JSON.stringify(updatedSchema)),
                prompt: updatedPrompt,
                custom: true,
                archived: false
            };

            console.log('📋 Creando copia personalizada:', newCustomTemplate.name);

            const stored = localStorage.getItem('customTemplates_europa');
            const customTemplates = stored ? JSON.parse(stored) : [];
            const updatedTemplates = [...customTemplates, newCustomTemplate];
            localStorage.setItem('customTemplates_europa', JSON.stringify(updatedTemplates));

            console.log('✅ Copia guardada exitosamente');
            setSelectedTemplate(newCustomTemplate);
            return;
        }

        const stored = localStorage.getItem('customTemplates_europa');
        if (!stored) {
            console.error('❌ No se encontraron plantillas personalizadas');
            return;
        }

        const customTemplates = JSON.parse(stored);
        const updatedTemplates = customTemplates.map((t: any) => {
            if (t.id === templateId) {
                return {
                    ...t,
                    schema: JSON.parse(JSON.stringify(updatedSchema)),
                    prompt: updatedPrompt
                };
            }
            return t;
        });

        localStorage.setItem('customTemplates_europa', JSON.stringify(updatedTemplates));
        console.log('✅ Plantilla personalizada actualizada');

        const updatedTemplate = updatedTemplates.find((t: any) => t.id === templateId);
        if (updatedTemplate) {
            setSelectedTemplate(updatedTemplate);
        }
    };

    const handleDepartamentoChange = (departamento: Departamento) => {
        setCurrentDepartamento(departamento);
    };

    const handleViewFile = (file: File) => {
        setViewingFile(file);
    };

    const handleCloseViewer = () => {
        setViewingFile(null);
    };

    const handleUpdateHealthTemplate = (sectionId: string, fieldName: string, newLabel: string) => {
        if (!selectedTemplate) return;

        const newTemplate = { ...selectedTemplate };
        const section = newTemplate.secciones.find((s: any) => s.id === sectionId);
        if (section) {
            const field = section.campos.find((f: any) => f.nombre_campo === fieldName);
            if (field) {
                field.etiqueta = newLabel;
            }
        }
        setSelectedTemplate(newTemplate);
    };

    const handleClearHistory = () => {
        if (confirm('¿Estás seguro de que deseas eliminar todo el historial? Esta acción no se puede deshacer.')) {
            setHistory([]);
            localStorage.removeItem('verbadoc-history');
            console.log('🗑️ Historial limpiado');
        }
    };

    const handleExportHistory = () => {
        if (history.length === 0) {
            alert('No hay historial para exportar');
            return;
        }

        const dataStr = JSON.stringify(history, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `verbadoc-historial-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        console.log('📥 Historial exportado');
    };

    const handleExportExcel = async (transposed: boolean = false) => {
        if (history.length === 0) {
            alert('No hay historial para exportar');
            return;
        }

        try {
            const XLSX = await import('xlsx');

            const allFieldPaths = new Set<string>();
            const flattenObject = (obj: any, prefix = ''): any => {
                let result: any = {};
                for (const key in obj) {
                    const value = obj[key];
                    const newKey = prefix ? `${prefix}.${key}` : key;

                    if (value && typeof value === 'object' && !Array.isArray(value)) {
                        Object.assign(result, flattenObject(value, newKey));
                    } else if (Array.isArray(value)) {
                        if (value.length === 0) {
                            result[newKey] = '';
                        } else if (typeof value[0] === 'object' && value[0] !== null) {
                            if (value.length === 1) {
                                Object.assign(result, flattenObject(value[0], newKey));
                            } else {
                                value.forEach((item, idx) => {
                                    Object.assign(result, flattenObject(item, `${newKey}[${idx}]`));
                                });
                            }
                        } else {
                            result[newKey] = value.join('\n');
                        }
                    } else {
                        result[newKey] = value;
                    }
                    allFieldPaths.add(newKey);
                }
                return result;
            };

            const flattenedHistoryData = history.map(entry => ({
                fileName: entry.fileName,
                extractedData: flattenObject(entry.extractedData)
            }));

            const sortedFieldPaths = Array.from(allFieldPaths).sort();

            let excelData: (string | number | null)[][];
            let sheetName: string;
            let fileName: string;

            if (transposed) {
                const header = ['Campo', ...flattenedHistoryData.map(data => data.fileName)];
                excelData = [header];

                sortedFieldPaths.forEach(fieldPath => {
                    const row: (string | number | null)[] = [fieldPath];
                    flattenedHistoryData.forEach(data => {
                        const value = data.extractedData[fieldPath];
                        row.push(value !== undefined ? value : 'N/A');
                    });
                    excelData.push(row);
                });

                sheetName = 'Resultados Pivotados';
                fileName = `verbadoc-resultados-pivotados-${new Date().toISOString().split('T')[0]}.xlsx`;
            } else {
                const header = ['Archivo', ...sortedFieldPaths];
                excelData = [header];

                flattenedHistoryData.forEach(data => {
                    const row: (string | number | null)[] = [data.fileName];
                    sortedFieldPaths.forEach(fieldPath => {
                        const value = data.extractedData[fieldPath];
                        row.push(value !== undefined ? value : 'N/A');
                    });
                    excelData.push(row);
                });

                sheetName = 'Resultados';
                fileName = `verbadoc-resultados-${new Date().toISOString().split('T')[0]}.xlsx`;
            }

            const worksheet = XLSX.utils.aoa_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

            const maxColWidths = excelData[0].map((_, colIdx) =>
                Math.max(...excelData.map(row => (row[colIdx] ? String(row[colIdx]).length : 0)))
            );
            worksheet['!cols'] = maxColWidths.map(w => ({ wch: Math.min(w + 2, 50) }));

            XLSX.writeFile(workbook, fileName);

            console.log(`📊 Historial exportado como Excel ${transposed ? 'pivotado' : 'horizontal'}`);
        } catch (error) {
            console.error('Error exportando a Excel:', error);
            alert('Error al exportar a Excel');
        }
    };

    const handleExportAllPDFs = () => {
        if (history.length === 0) {
            alert('No hay historial para exportar');
            return;
        }

        import('./utils/exportUtils.ts').then(({ downloadPDF }) => {
            history.forEach((entry, index) => {
                setTimeout(() => {
                    downloadPDF(
                        entry.extractedData,
                        `${entry.fileName.replace(/\.[^/.]+$/, '')}_extraccion`,
                        entry.schema,
                        true
                    );
                }, index * 300);
            });

            console.log(`📄 Exportando ${history.length} PDFs...`);
            alert(`Se descargarán ${history.length} PDFs en formato vertical`);
        });
    };

    const handleImportHistory = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target?.result as string);
                    if (Array.isArray(imported)) {
                        if (confirm(`¿Importar ${imported.length} extracciones? Esto se añadirá al historial existente.`)) {
                            setHistory(currentHistory => [...imported, ...currentHistory]);
                            console.log('📤 Historial importado:', imported.length, 'extracciones');
                        }
                    } else {
                        alert('El archivo no contiene un historial válido');
                    }
                } catch (error) {
                    alert('Error al leer el archivo. Asegúrate de que sea un JSON válido.');
                    console.error('Error al importar historial:', error);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    // ========== AUTH CHECK ==========
    if (!currentUser) {
        return <AuthModal />;
    }

    // ========== TAB DEFINITIONS ==========
    const tabs = [
        { id: 'extractor' as TabType, label: 'Extractor', icon: DocumentIcon },
        { id: 'historial' as TabType, label: 'Historial', icon: HistoryIcon, badge: history.length },
        { id: 'plantillas' as TabType, label: 'Plantillas', icon: TemplateIcon },
        ...(currentUser?.role === 'admin' ? [{ id: 'admin' as TabType, label: 'Admin', icon: AdminIcon }] : []),
    ];

    // ========== RENDER ==========
    return (
        <div className="flex h-screen flex-col bg-background text-foreground transition-theme">
            {/* ========== HEADER ========== */}
            <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="flex items-baseline gap-3">
                        <h1 className="font-orbitron text-xl font-bold lowercase tracking-wider text-foreground">
                            verbadoc enterprise
                        </h1>
                        <span className="text-xs text-muted-foreground">
                            extracción inteligente de datos
                        </span>
                    </div>
                </div>

                {/* ========== NAVIGATION TABS ========== */}
                <nav className="flex items-center gap-2">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'bg-secondary text-secondary-foreground hover:bg-muted'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-sm font-medium">{tab.label}</span>
                                {tab.badge !== undefined && tab.badge > 0 && (
                                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                                        {tab.badge > 99 ? '99+' : tab.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* ========== HEADER ACTIONS ========== */}
                <div className="flex items-center gap-3">
                    {/* Model Selector */}
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value as GeminiModel)}
                        className="rounded-md border border-input bg-secondary px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        {AVAILABLE_MODELS.map(model => (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))}
                    </select>

                    {/* Help Button */}
                    <button
                        onClick={() => setIsHelpModalOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-muted"
                        title="Ayuda"
                    >
                        <HelpIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Ayuda</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="rounded-lg bg-secondary p-2 text-secondary-foreground transition-all hover:bg-muted"
                        title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                    >
                        {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className="rounded-lg bg-destructive p-2 text-destructive-foreground transition-all hover:opacity-90"
                        title="Cerrar sesión"
                    >
                        <LogoutIcon className="h-5 w-5" />
                    </button>
                </div>
            </header>

            {/* ========== MAIN CONTENT ========== */}
            <main className="flex-1 overflow-auto p-6">
                {activeTab === 'extractor' && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* File Uploader */}
                        <div className="lg:col-span-3">
                            <FileUploader
                                files={files}
                                setFiles={setFiles}
                                activeFileId={activeFileId}
                                onFileSelect={handleFileSelect}
                                onExtractAll={handleExtractAll}
                                isLoading={isLoading}
                                onViewFile={handleViewFile}
                                theme={currentTheme}
                                isLightMode={isLightMode}
                            />
                        </div>

                        {/* Extraction Editor */}
                        <div className="lg:col-span-9">
                            <ExtractionEditor
                                key={`editor-${selectedTemplate?.id || 'default'}`}
                                file={activeFile}
                                template={selectedTemplate}
                                onUpdateTemplate={handleUpdateHealthTemplate}
                                onSaveTemplateChanges={handleSaveTemplateChanges}
                                schema={schema}
                                setSchema={setSchema}
                                prompt={prompt}
                                setPrompt={setPrompt}
                                onExtract={handleExtract}
                                isLoading={isLoading}
                                theme={currentTheme}
                                isLightMode={isLightMode}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'historial' && (
                    <div className="mx-auto max-w-7xl">
                        <ResultsViewer
                            results={history}
                            theme={currentTheme}
                            isLightMode={isLightMode}
                            onClearHistory={handleClearHistory}
                            onExportHistory={handleExportHistory}
                            onExportExcel={handleExportExcel}
                            onExportAllPDFs={handleExportAllPDFs}
                            onImportHistory={handleImportHistory}
                        />
                    </div>
                )}

                {activeTab === 'plantillas' && (
                    <div className="mx-auto max-w-7xl">
                        <TemplatesPanel
                            onSelectTemplate={handleSelectTemplate}
                            currentSchema={schema}
                            currentPrompt={prompt}
                            onDepartamentoChange={handleDepartamentoChange}
                            currentDepartamento={currentDepartamento}
                            theme={currentTheme}
                            isLightMode={isLightMode}
                        />
                    </div>
                )}

                {activeTab === 'admin' && currentUser?.role === 'admin' && (
                    <div className="mx-auto max-w-7xl">
                        <AdminDashboard />
                    </div>
                )}
            </main>

            {/* ========== MODALS & OVERLAYS ========== */}
            <PdfViewer file={viewingFile} onClose={handleCloseViewer} />
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
            <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} isLightMode={isLightMode} />
            <ChatbotLaia isLightMode={isLightMode} />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
