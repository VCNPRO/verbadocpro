import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

// Componentes de la App
import { FileUploader } from '@/components/FileUploader.tsx';
import { ExtractionEditor } from '@/components/ExtractionEditor.tsx';
import { HistoryViewer } from '@/components/HistoryViewer.tsx';
import { TemplatesPanel } from '@/components/TemplatesPanel.tsx';
import { PdfViewer } from '@/components/PdfViewer.tsx';
import { HelpModal } from '@/components/HelpModal.tsx';
import { SettingsModal } from '@/components/SettingsModal.tsx';
import { ResultsViewer } from '@/components/ResultsViewer.tsx';
import { ChatbotLaia } from '@/components/ChatbotLaia.tsx';
import { AdminDashboard } from '@/components/AdminDashboard.tsx';
import { AIAssistantPanel } from '@/components/AIAssistantPanel.tsx';
import { LoginPage } from '@/components/auth/LoginPage.tsx';
import { RegisterPage } from '@/components/auth/RegisterPage.tsx';

// Tipos y utilidades
import type { UploadedFile, ExtractionResult, SchemaField, SchemaFieldType, Departamento } from '@/types.ts';
import { logActivity } from '@/utils/activityLogger.ts';
import { AVAILABLE_MODELS, type GeminiModel } from '@/services/geminiService.ts';


// Autenticación
import { useAuth } from '@/contexts/AuthContext.tsx';
import { ProtectedRoute, AdminRoute } from '@/components/auth/ProtectedRoute.tsx';


function AppContent() {
    const { user, logout } = useAuth();

    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [activeFileId, setActiveFileId] = useState<string | null>(null);
    const [history, setHistory] = useState<ExtractionResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [viewingFile, setViewingFile] = useState<File | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
    
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [showResultsExpanded, setShowResultsExpanded] = useState<boolean>(false);
    const [selectedModel, setSelectedModel] = useState<GeminiModel>('gemini-1.5-flash-latest');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to dark mode

    const [prompt, setPrompt] = useState<string>('Extrae la información clave del siguiente documento según el esquema JSON proporcionado.');
    const [schema, setSchema] = useState<SchemaField[]>([{ id: `field-${Date.now()}`, name: '', type: 'STRING' }]);

    const currentTheme = {
        primary: 'blue',
        secondary: 'slate',
    };

    const isLightMode = !isDarkMode;

    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('verbadoc-history');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (error) {
            console.error('Error al cargar historial desde localStorage:', error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('verbadoc-history', JSON.stringify(history));
    }, [history]);

    const activeFile = useMemo(() => files.find(f => f.id === activeFileId), [files, activeFileId]);

    const handleFileSelect = (id: string | null) => setActiveFileId(id);
    
    const handleExtract = async () => {
        if (!activeFile) return;

        setIsLoading(true);
        setFiles(currentFiles =>
            currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'procesando', error: undefined, extractedData: undefined } : f)
        );

        try {
            const { extractDataFromDocument } = await import('./src/services/geminiService');
            const extractedData = await extractDataFromDocument(activeFile.file, schema, prompt, selectedModel);
            
            setFiles(currentFiles =>
                currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'completado', extractedData: extractedData, error: undefined } : f)
            );

            const newHistoryEntry: ExtractionResult = {
                id: `hist-${Date.now()}`,
                fileId: activeFile.id,
                fileName: activeFile.file.name,
                schema: JSON.parse(JSON.stringify(schema)),
                extractedData: extractedData,
                timestamp: new Date().toISOString(),
            };
            setHistory(currentHistory => [newHistoryEntry, ...currentHistory]);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
            setFiles(currentFiles =>
                currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'error', error: errorMessage, extractedData: undefined } : f)
            );
        } finally {
            setIsLoading(false);
        }
    };
    
    // El resto de las funciones de manejo de eventos...
    
    return (
        <div
            className="min-h-screen font-sans transition-colors duration-500 flex flex-col"
            style={{
                backgroundColor: isDarkMode ? '#0f172a' : '#f0f9ff',
                color: isDarkMode ? '#e2e8f0' : '#0f172a'
            }}
        >
            <header
                className="backdrop-blur-sm border-b-2 sticky top-0 z-10 transition-colors duration-500 shadow-md"
                style={{
                    backgroundColor: isDarkMode ? 'rgba(2, 6, 23, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                    borderBottomColor: isDarkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(59, 130, 246, 0.5)'
                }}
            >
              <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                      <div className="flex items-baseline gap-3">
                          <h1
                              className="text-2xl font-bold font-orbitron tracking-wider transition-colors duration-500"
                              style={{ color: isLightMode ? '#1e3a8a' : '#f1f5f9' }}
                          >verbadoc enterprise</h1>
                          <p
                              className="text-sm font-sans transition-colors duration-500"
                              style={{ color: isLightMode ? '#475569' : '#94a3b8' }}
                          >
                              Extracción Inteligente de Datos
                          </p>
                      </div>
                      <div className="flex items-center gap-4">
                          {user?.role === 'admin' && (
                              <a
                                  href="/admin"
                                  className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-105"
                                  style={{
                                      backgroundColor: isLightMode ? '#ffffff' : '#1e293b',
                                      borderColor: isLightMode ? '#8b5cf6' : '#475569',
                                      color: isLightMode ? '#7c3aed' : '#a78bfa'
                                  }}
                                  title="Panel de Administración"
                              >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                  <span className="hidden sm:inline">Admin</span>
                              </a>
                          )}
                          <button
                              onClick={logout}
                              className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-105"
                              style={{
                                  backgroundColor: isLightMode ? '#ffffff' : '#1e293b',
                                  borderColor: isLightMode ? '#ef4444' : '#475569',
                                  color: isLightMode ? '#dc2626' : '#f87171'
                              }}
                              title="Cerrar Sesión"
                          >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                          </button>
                      </div>
                  </div>
              </div>
            </header>

            <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-16rem)]">
                <div className="lg:col-span-3 h-full">
                   <FileUploader
                      files={files}
                      setFiles={setFiles}
                      activeFileId={activeFileId}
                      onFileSelect={handleFileSelect}
                      onExtractAll={() => {}}
                      isLoading={isLoading}
                      onViewFile={() => {}}
                      theme={currentTheme}
                      isLightMode={isLightMode}
                  />
                </div>
                <div className="lg:col-span-6 h-full">
                  <ExtractionEditor
                      key={`editor-${selectedTemplate?.id || 'default'}`}
                      file={activeFile}
                      template={selectedTemplate}
                      onUpdateTemplate={() => {}}
                      onSaveTemplateChanges={() => {}}
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
                <div className="lg:col-span-3 h-full">
                  <div className="h-full flex flex-col gap-4">
                      {history.length > 0 && (
                          <button
                              onClick={() => setShowResultsExpanded(true)}
                              className="px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 shadow-md"
                          >
                              Ver Resultados ({history.length})
                          </button>
                      )}
                      <AIAssistantPanel
                          file={activeFile?.file || null}
                          onSchemaGenerated={(schema, prompt) => {
                              setSchema(schema);
                              setPrompt(prompt);
                          }}
                          onValidationComplete={(validation) => {
                              console.log('Validación completada:', validation);
                          }}
                          extractedData={activeFile?.extractedData}
                          currentSchema={schema}
                      />
                      <div className="flex-1 overflow-auto">
                          <TemplatesPanel
                              onSelectTemplate={()=>{}}
                              currentSchema={schema}
                              currentPrompt={prompt}
                              theme={currentTheme}
                              isLightMode={isLightMode}
                          />
                      </div>
                  </div>
                </div>
              </div>
            </main>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <AppContent />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard isLightMode={false} />
                        </AdminRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;