import React, { useState } from 'react';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import { Book, Heart, Shield, FileText, AlertTriangle, BookOpen } from 'lucide-react';

export default function Resources({ user }) {
    const [activeTab, setActiveTab] = useState('resources');

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-slate-800 relative pb-24">
            <MobileHeader user={user} />

            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/40 rounded-full blur-[80px]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-4 pt-20 pb-4"> 
                
                {/* Header & Tabs */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start">
                            <span className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-2 rounded-lg mr-3 shadow-lg text-lg">📚</span> 
                            <span>Biblioteca</span>
                        </h1>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-white border border-slate-200 shadow-sm rounded-xl w-full md:w-auto">
                        <button 
                            onClick={() => setActiveTab('resources')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform ${
                                activeTab === 'resources' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            Académicos
                        </button>
                        <button 
                            onClick={() => setActiveTab('protocols')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform ${
                                activeTab === 'protocols' ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-red-700'
                            }`}
                        >
                            Protocolos
                        </button>
                    </div>
                </div>

                {/* RESOURCES TAB */}
                {activeTab === 'resources' && (
                    <div className="grid gap-4 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {/* Support Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-300 transition-colors group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <span className="text-2xl">🧠</span>
                                </div>
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Popular</span>
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition">Refuerzo Académico</h3>
                            <p className="text-sm text-slate-500 mb-4">Recursos para complementar el estudio y mejorar el rendimiento.</p>
                            <ul className="text-xs text-slate-500 space-y-2">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> Guías de estudio</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> Técnicas de concentración</li>
                            </ul>
                        </div>

                        {/* Emotional Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-teal-300 transition-colors group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-teal-100 p-3 rounded-xl text-teal-600">
                                    <span className="text-2xl">❤️</span>
                                </div>
                                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">Nuevo</span>
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-teal-600 transition">Bienestar Emocional</h3>
                            <p className="text-sm text-slate-500 mb-4">Herramientas para gestionar estrés, ansiedad y emociones.</p>
                            <ul className="text-xs text-slate-500 space-y-2">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span> Meditaciones guiadas</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span> Ejercicios de respiración</li>
                            </ul>
                        </div>

                        {/* Digital Safety */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-purple-300 transition-colors group md:col-span-2">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-purple-600 transition">Seguridad Digital</h3>
                                    <p className="text-sm text-slate-500">Cómo protegerte en redes sociales y navegar seguro.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                 {/* PROTOCOLS TAB */}
                 {activeTab === 'protocols' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                         {/* Protocol 1 */}
                        <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex items-start gap-4">
                            <div className="bg-red-100 p-3 rounded-xl text-red-600 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-800 text-lg mb-1">Acoso Escolar</h3>
                                <p className="text-sm text-red-600/80 mb-3">Pasos a seguir si eres víctima o testigo de acoso.</p>
                                <button className="text-xs font-bold bg-white text-red-600 px-4 py-2 rounded-lg shadow-sm border border-red-100 hover:bg-red-50 transition">
                                    Ver Protocolo
                                </button>
                            </div>
                        </div>

                         {/* Protocol 2 */}
                         <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4 hover:border-slate-300 transition">
                            <div className="bg-slate-100 p-3 rounded-xl text-slate-600 shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg mb-1">Reglamento Interno</h3>
                                <p className="text-sm text-slate-500 mb-3">Normas de convivencia y derechos estudiantiles.</p>
                                <button className="text-xs font-bold text-slate-600 hover:text-slate-900 border-b border-slate-300 hover:border-slate-900 transition">
                                    Leer Documento
                                </button>
                            </div>
                        </div>
                    </div>
                 )}

            </div>

            <BottomNav active="resources" />
        </div>
    );
}
