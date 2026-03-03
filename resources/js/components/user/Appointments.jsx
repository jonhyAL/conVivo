import React, { useState } from 'react';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import { Calendar, User, Clock, ChevronRight, MapPin, Stethoscope, Pencil } from 'lucide-react';

export default function Appointments({ user, historial = [], especialidades = [], errors = [] }) {
    const [activeTab, setActiveTab] = useState(historial.length > 0 ? 'list' : 'create');
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.substring(0, 5); // Assumes HH:MM:SS format
    };

    const icons = {
        'Psicología': '🧩', 
        'Psiquiatría': '💊', 
        'Terapia Familiar': '👨‍👩‍👧', 
        'Terapia Infantil': '🧸', 
        'Apoyo Emocional': '❤️'
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-slate-800 relative pb-24">
            <MobileHeader user={user} />

             {/* Background Decoration */}
             <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100/40 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-[80px]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-4">
                
                 {/* Header & Tabs */}
                 <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start">
                            <span className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-2 rounded-lg mr-3 shadow-lg text-lg">🗓️</span> 
                            <span>Mis Citas</span>
                        </h1>
                    </div>

                    <div className="flex p-1 bg-white border border-slate-200 shadow-sm rounded-xl w-full md:w-auto">
                        <button 
                            onClick={() => setActiveTab('list')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform ${
                                activeTab === 'list' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            Historial
                        </button>
                        <button 
                            onClick={() => setActiveTab('create')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform flex items-center justify-center gap-2 ${
                                activeTab === 'create' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:text-teal-600'
                            }`}
                        >
                            <span>+</span> Agendar
                        </button>
                    </div>
                </div>

                {/* LIST VIEW (Historial) */}
                {activeTab === 'list' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {historial.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
                                        <tr>
                                            <th className="px-5 py-4 font-bold text-teal-600">Especialista</th>
                                            <th className="px-5 py-4 font-bold text-teal-600">Fecha</th>
                                            <th className="px-5 py-4 font-bold text-teal-600">Estado</th>
                                            <th className="px-5 py-4 font-bold text-teal-600 text-right">Detalles</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {historial.map((cita, index) => (
                                            <tr key={cita.id || index} className="hover:bg-slate-50 transition duration-150">
                                                <td className="px-5 py-4">
                                                    <div className="font-bold text-slate-800">{cita.horario?.especialista?.nombre || 'Especialista'}</div>
                                                    <div className="text-xs text-slate-500">{cita.horario?.especialista?.especialidad || 'Consulta General'}</div>
                                                </td>
                                                <td className="px-5 py-4 text-sm text-slate-500">
                                                    {cita.horario?.fecha ? formatDate(cita.horario.fecha) : 'Fecha pendiente'}
                                                    <span className="text-slate-400 text-xs block">
                                                        {cita.horario?.hora_inicio ? formatTime(cita.horario.hora_inicio) : ''} hrs
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border
                                                        ${cita.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                                                          cita.estado === 'confirmada' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                                          cita.estado === 'cancelada' ? 'bg-red-50 text-red-600 border-red-200' :
                                                          'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                                        {cita.estado ? cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1) : 'Agendada'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-teal-600 transition-colors">
                                                        <ChevronRight className="w-5 h-5 ml-auto" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 opacity-60">
                                <div className="bg-slate-100 p-4 rounded-full mb-4">
                                    <Calendar className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-slate-500 font-medium">No tienes citas registradas aún.</p>
                                <button onClick={() => setActiveTab('create')} className="mt-4 text-teal-600 font-bold hover:underline text-sm hover:text-teal-800">Agendar mi primera cita</button>
                            </div>
                        )}
                    </div>
                )}

                {/* CREATE VIEW (Agendar) */}
                {activeTab === 'create' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {/* Glass Shine */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

                        <div className="relative z-10 p-6 md:p-10">
                            {/* Progress Bar (Steps) */}
                            <div className="mb-10">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold shadow-lg shadow-teal-500/20 text-sm">1</div>
                                        <span className="text-xs mt-1 text-teal-600 font-bold">Tipo</span>
                                    </div>
                                    <div className="w-16 h-0.5 bg-slate-200 rounded-full"></div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-white text-slate-400 flex items-center justify-center font-bold border border-slate-200 text-sm">2</div>
                                        <span className="text-xs mt-1 text-slate-400 font-medium">Fecha</span>
                                    </div>
                                    <div className="w-16 h-0.5 bg-slate-200 rounded-full"></div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-white text-slate-400 flex items-center justify-center font-bold border border-slate-200 text-sm">3</div>
                                        <span className="text-xs mt-1 text-slate-400 font-medium">Fin</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800">Agendar Consulta</h2>
                                <p className="text-slate-500 text-sm">Paso 1: ¿Qué tipo de apoyo necesitas hoy?</p>
                            </div>

                            <form action="/citas/calendario" method="POST">
                                <input type="hidden" name="_token" value={csrfToken || ''} />
                                
                                {/* Localidad */}
                                <div className="mb-8">
                                    <label className="block text-slate-700 font-bold mb-3 text-sm flex items-center">
                                        <span className="bg-teal-50 text-teal-600 p-1.5 rounded mr-2 text-base"><MapPin className="w-4 h-4"/></span> 
                                        Selecciona tu localidad
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className="relative cursor-pointer group">
                                            <input type="radio" name="localidad" value="Nezahualcóyotl" required className="peer hidden" />
                                            <div className="bg-white border border-slate-200 rounded-xl p-4 hover:border-teal-400 transition-all peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:ring-1 peer-checked:ring-teal-200 shadow-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300 peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-colors"></div>
                                                    <span className="font-bold text-slate-700 peer-checked:text-teal-700">Nezahualcóyotl</span>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="relative cursor-pointer group">
                                            <input type="radio" name="localidad" value="Puebla" required className="peer hidden" />
                                            <div className="bg-white border border-slate-200 rounded-xl p-4 hover:border-teal-400 transition-all peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:ring-1 peer-checked:ring-teal-200 shadow-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300 peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-colors"></div>
                                                    <span className="font-bold text-slate-700 peer-checked:text-teal-700">Puebla</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Tipo de Consulta */}
                                <div className="mb-8">
                                    <label className="block text-slate-700 font-bold mb-3 text-sm flex items-center">
                                        <span className="bg-emerald-50 text-emerald-600 p-1.5 rounded mr-2 text-base"><Stethoscope className="w-4 h-4"/></span> 
                                        Especialidad
                                    </label>
                                    <div className="space-y-3">
                                        {especialidades.map((esp) => (
                                            <label key={esp} className="relative cursor-pointer group block">
                                                <input type="radio" name="tipo_consulta" value={esp} required className="peer hidden" />
                                                <div className="bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-400 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:ring-1 peer-checked:ring-emerald-200 shadow-sm flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-xl">{icons[esp] || '🩺'}</span>
                                                        <div>
                                                            <span className="font-bold text-slate-700 block">{esp}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-4 h-4 rounded-full border border-slate-300 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Descripción del Problema */}
                                <div className="mb-8">
                                    <label htmlFor="descripcion" className="block text-slate-700 font-bold mb-3 text-sm flex items-center">
                                        <span className="bg-blue-50 text-blue-600 p-1.5 rounded mr-2 text-base"><Pencil className="w-4 h-4"/></span> 
                                        Cuéntanos brevemente
                                    </label>
                                    <textarea 
                                        name="descripcion" 
                                        id="descripcion" 
                                        rows="3" 
                                        required
                                        className="w-full bg-white border border-slate-200 rounded-xl p-4 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 text-slate-700 placeholder-slate-400 transition-all resize-none outline-none shadow-sm"
                                        placeholder="Describe brevemente la razón de tu consulta para ayudarte mejor..."
                                    ></textarea>
                                </div>

                                {/* Error Messages */}
                                {errors.length > 0 && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                                        <ul className="list-disc list-inside">
                                            {errors.map((error, idx) => (
                                                <li key={idx}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                    <a href="/dashboard" className="px-6 py-3 text-slate-500 hover:text-slate-800 font-semibold transition-colors flex items-center text-sm">
                                        <span className="mr-2">←</span> Cancelar
                                    </a>
                                    <button type="submit" className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-200 transition-all transform hover:-translate-y-0.5 flex items-center">
                                        Siguiente <span className="ml-2">→</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <BottomNav active="appointments" />
        </div>
    );
}

