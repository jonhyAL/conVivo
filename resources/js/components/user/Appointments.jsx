import React, { useState } from 'react';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import { Calendar, User, Clock, ChevronRight, ChevronLeft, MapPin, Stethoscope, Pencil, Brain, Pill, Users, Heart, Scale, Baby, Leaf, Activity, Shield, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

// Maps icon_class string (stored in DB) → Lucide component
const ICON_MAP = {
    Stethoscope, Brain, Heart, Users, User, Pill,
    Scale, Baby, Leaf, Activity, Shield, BookOpen,
    Briefcase, GraduationCap,
};

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
        // Current DB specialties
        'Psicología Clínica':  Brain,
        'Psicología Infantil': Baby,
        'Derecho Familiar':   Scale,
        'Derecho Penal':      Shield,
        'Nutrición':          Leaf,
        'Trabajo Social':     BookOpen,
        'Medicina General':   Stethoscope,
        // Legacy fallbacks
        'Psicología':     Brain,
        'Psiquiatría':    Pill,
        'Terapia Familiar': Users,
        'Terapia Infantil': Baby,
        'Apoyo Emocional':  Heart,
    };

    const resolveIcon = (especialista) =>
        ICON_MAP[especialista?.icon_class] || icons[especialista?.especialidad] || Stethoscope;

    return (
        <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 relative pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            <MobileHeader user={user} />



            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 pt-4 pb-4">
                
                 {/* Header & Tabs */}
                 <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start transition-colors">
                            <span className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-2 rounded-lg mr-3 shadow-lg shadow-teal-500/20 flex items-center"><Calendar size={18} /></span>
                            <span>Mis Citas</span>
                        </h1>
                    </div>

                    <div className="flex p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl w-full md:w-auto transition-colors">
                        <button 
                            onClick={() => setActiveTab('list')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform ${
                                activeTab === 'list' ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            Historial
                        </button>
                        <button 
                            onClick={() => setActiveTab('create')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform flex items-center justify-center gap-2 ${
                                activeTab === 'create' ? 'bg-teal-600 dark:bg-teal-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400'
                            }`}
                        >
                            <span>+</span> Agendar
                        </button>
                    </div>
                </div>

                {/* LIST VIEW (Historial) */}
                {activeTab === 'list' && (() => {
                    const today = new Date(); today.setHours(0,0,0,0);
                    const upcoming = historial.filter(c => {
                        if (!c.horario?.fecha) return c.estado === 'pendiente' || c.estado === 'confirmada';
                        return new Date(c.horario.fecha) >= today && c.estado !== 'cancelada';
                    });
                    const past = historial.filter(c => !upcoming.includes(c));

                    if (historial.length === 0) return (
                        <div className="flex flex-col items-center justify-center py-20 opacity-60">
                            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                                <Calendar className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No tienes citas registradas aún.</p>
                            <button onClick={() => setActiveTab('create')} className="mt-4 text-teal-600 dark:text-teal-400 font-bold hover:underline text-sm">Agendar mi primera cita</button>
                        </div>
                    );

                    return (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {upcoming.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3 px-1">Próximas Sesiones</h3>
                                    <div className="space-y-3">
                                        {upcoming.map((cita, i) => <AppCard key={cita.id || i} cita={cita} icons={icons} resolveIcon={resolveIcon} formatDate={formatDate} formatTime={formatTime} />)}
                                    </div>
                                </div>
                            )}
                            {past.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">Sesiones Pasadas</h3>
                                    <div className="space-y-3 opacity-75">
                                        {past.map((cita, i) => <AppCard key={cita.id || i} cita={cita} icons={icons} resolveIcon={resolveIcon} formatDate={formatDate} formatTime={formatTime} />)}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}

                {/* CREATE VIEW (Agendar) */}
                {activeTab === 'create' && (
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 transition-colors">
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
                                    <div className="w-16 h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors"></div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center font-bold border border-slate-200 dark:border-slate-700 text-sm transition-colors">2</div>
                                        <span className="text-xs mt-1 text-slate-400 dark:text-slate-500 font-medium transition-colors">Fecha</span>
                                    </div>
                                    <div className="w-16 h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors"></div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center font-bold border border-slate-200 dark:border-slate-700 text-sm transition-colors">3</div>
                                        <span className="text-xs mt-1 text-slate-400 dark:text-slate-500 font-medium transition-colors">Fin</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800 dark:text-white transition-colors">Agendar Consulta</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">Paso 1: ¿Qué tipo de apoyo necesitas hoy?</p>
                            </div>

                            <form action="/citas/calendario" method="POST">
                                <input type="hidden" name="_token" value={csrfToken || ''} />
                                
                                {/* Localidad */}
                                <div className="mb-8">
                                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-3 text-sm flex items-center transition-colors">
                                        <span className="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 p-1.5 rounded mr-2 text-base transition-colors"><MapPin className="w-4 h-4"/></span> 
                                        Selecciona tu localidad
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className="relative cursor-pointer group">
                                            <input type="radio" name="localidad" value="Nezahualcóyotl" required className="peer hidden" />
                                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-teal-400 dark:hover:border-teal-500 transition-all peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:dark:bg-teal-900/20 peer-checked:ring-1 peer-checked:ring-teal-200 dark:peer-checked:ring-teal-800 shadow-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-colors"></div>
                                                    <span className="font-bold text-slate-700 dark:text-slate-200 peer-checked:text-teal-700 dark:peer-checked:text-teal-400 transition-colors">Nezahualcóyotl</span>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="relative cursor-pointer group">
                                            <input type="radio" name="localidad" value="Puebla" required className="peer hidden" />
                                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-teal-400 dark:hover:border-teal-500 transition-all peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:dark:bg-teal-900/20 peer-checked:ring-1 peer-checked:ring-teal-200 dark:peer-checked:ring-teal-800 shadow-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-colors"></div>
                                                    <span className="font-bold text-slate-700 dark:text-slate-200 peer-checked:text-teal-700 dark:peer-checked:text-teal-400 transition-colors">Puebla</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Tipo de Consulta */}
                                <div className="mb-8">
                                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-3 text-sm flex items-center transition-colors">
                                        <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-1.5 rounded mr-2 text-base transition-colors"><Stethoscope className="w-4 h-4"/></span> 
                                        Especialidad
                                    </label>
                                    <div className="space-y-3">
                                        {especialidades.map((esp) => (
                                            <label key={esp} className="relative cursor-pointer group block">
                                                <input type="radio" name="tipo_consulta" value={esp} required className="peer hidden" />
                                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:dark:bg-emerald-900/20 peer-checked:ring-1 peer-checked:ring-emerald-200 dark:peer-checked:ring-emerald-800 shadow-sm flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 transition-colors">
                                                            {React.createElement(icons[esp] || Stethoscope, { size: 17 })}
                                                        </span>
                                                        <div>
                                                            <span className="font-bold text-slate-700 dark:text-slate-200 block transition-colors">{esp}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Descripción del Problema */}
                                <div className="mb-8">
                                    <label htmlFor="descripcion" className="block text-slate-700 dark:text-slate-300 font-bold mb-3 text-sm flex items-center transition-colors">
                                        <span className="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 p-1.5 rounded mr-2 text-base transition-colors"><Pencil className="w-4 h-4"/></span> 
                                        Cuéntanos brevemente
                                    </label>
                                    <textarea 
                                        name="descripcion" 
                                        id="descripcion" 
                                        rows="3" 
                                        required
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 dark:focus:ring-teal-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all resize-none outline-none shadow-sm"
                                        placeholder="Describe brevemente la razón de tu consulta para ayudarte mejor..."
                                    ></textarea>
                                </div>

                                {/* Error Messages */}
                                {errors.length > 0 && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl text-sm text-red-600 dark:text-red-400 transition-colors">
                                        <ul className="list-disc list-inside">
                                            {errors.map((error, idx) => (
                                                <li key={idx}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800 transition-colors">
                                    <a href="/dashboard" className="px-6 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold transition-colors flex items-center text-sm">
                                        <ChevronLeft size={16} className="mr-1" /> Cancelar
                                    </a>
                                    <button type="submit" className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-200 dark:shadow-none transition-all transform hover:-translate-y-0.5 flex items-center">
                                        Siguiente <ChevronRight size={16} className="ml-1" />
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

const STATUS_MAP = {
    pendiente:  { label: 'Pendiente',  cls: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700/30' },
    confirmada: { label: 'Confirmada', cls: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700/30' },
    cancelada:  { label: 'Cancelada',  cls: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30' },
    completada: { label: 'Completada', cls: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30' },
};

function AppCard({ cita, icons, resolveIcon, formatDate, formatTime }) {
    const esp = cita.horario?.especialista;
    const sc = STATUS_MAP[cita.estado] || STATUS_MAP['pendiente'];
    return (
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-colors">
            {/* Colored top bar */}
            <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 w-full"></div>
            <div className="p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-500 dark:text-teal-400 shrink-0 border border-teal-100 dark:border-teal-800/30 mt-0.5">
                    {React.createElement(resolveIcon(esp), { size: 24 })}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-800 dark:text-white text-base">{esp?.nombre || 'Especialista'}</h4>
                        <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border ${sc.cls}`}>{sc.label}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{esp?.especialidad || 'Consulta General'}</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-medium flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {cita.horario?.fecha ? formatDate(cita.horario.fecha) : 'Fecha pendiente'}</span>
                        {cita.horario?.hora_inicio ? <span className="flex items-center gap-1"><Clock size={12} /> {formatTime(cita.horario.hora_inicio)} hrs</span> : null}
                    </p>
                    {cita.horario?.localidad && (
                        <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 flex items-center gap-1"><MapPin size={12} /> {cita.horario.localidad}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
