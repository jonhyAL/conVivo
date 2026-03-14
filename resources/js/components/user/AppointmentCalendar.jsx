import React, { useState, useEffect } from 'react';
import BottomNav from './BottomNav';
import { Calendar, User, Clock, ChevronLeft } from 'lucide-react';

export default function AppointmentCalendar({ especialistas, sessionData }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [selectedEspecialista, setSelectedEspecialista] = useState(null);

    const handleHorarioChange = (horarioId, especialistaId) => {
        setSelectedHorario(horarioId);
        setSelectedEspecialista(especialistaId);
    };

    const formatDate = (dateString, format) => {
        const date = new Date(dateString);
        if (format === 'full') {
            return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        }
    };
    
    // Group horarios by date (Helper function since data comes from PHP grouped usually but let's assume raw or pre-grouped)
    // The PHP view receives $horariosPorFecha already inside the loop. 
    // But the React prop uses $especialistas which contains 'horarios_disponibles'. 
    // We need to group them here.

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-800 dark:text-slate-200 pb-safe relative">
            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 mb-20">
                {/* Progress Bar */}
                <div className="mb-12">
                     <div className="flex items-center justify-center space-x-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg shadow-green-500/20">✓</div>
                            <span className="text-sm mt-2 text-green-600 font-bold">Tipo</span>
                        </div>
                        <div className="w-20 h-1 bg-teal-600 rounded-full"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">2</div>
                            <span className="text-sm mt-2 text-teal-700 font-bold">Fecha</span>
                        </div>
                        <div className="w-20 h-1 bg-gray-200 rounded-full"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-white text-gray-400 flex items-center justify-center font-bold border border-gray-200">3</div>
                            <span className="text-sm mt-2 text-gray-400 font-medium">Confirmar</span>
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-700 bg-clip-text text-transparent drop-shadow-sm">
                        Selecciona Fecha y Hora
                    </h1>
                    <p className="text-xl text-gray-500 flex items-center justify-center gap-2">
                         <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-bold">{sessionData?.tipo_consulta || 'General'}</span>
                        <span className="text-gray-300">•</span>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">{sessionData?.localidad || 'General'}</span>
                    </p>
                </div>

                {(!especialistas || especialistas.length === 0) ? (
                    <div className="bg-yellow-50/80 backdrop-blur-md border border-yellow-200 p-8 rounded-3xl mb-8 shadow-xl shadow-yellow-500/10">
                        <div className="flex items-start">
                            <div className="bg-yellow-100 p-3 rounded-full mr-4 text-yellow-600">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-yellow-800 text-xl mb-2">No hay especialistas disponibles</h3>
                                <p className="text-yellow-700 mb-4">Lo sentimos, actualmente no hay especialistas disponibles para <span className="font-bold">{sessionData?.tipo_consulta}</span> en <span className="font-bold">{sessionData?.localidad}</span>.</p>
                                <a href="/citas/agendar" className="inline-flex items-center px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                                    ← Volver a seleccionar
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form action="/citas/seleccionar-horario" method="POST" id="appointment-form">
                        <input type="hidden" name="_token" value={csrfToken || ''} />
                        <input type="hidden" name="especialista_id" value={selectedEspecialista || ''} />
                        <input type="hidden" name="horario_id" value={selectedHorario || ''} />

                        <div className="space-y-8">
                            {especialistas.map((especialista) => {
                                // Group logic here manually or use pre-processed data
                                const horarios = especialista.horarios_disponibles || [];
                                const horariosByDate = horarios.reduce((acc, h) => {
                                    const dateKey = h.fecha.split('T')[0]; // Assuming ISO
                                    if (!acc[dateKey]) acc[dateKey] = [];
                                    acc[dateKey].push(h);
                                    return acc;
                                }, {});

                                return (
                                <div key={especialista.id} className="bg-white/60 backdrop-blur-3xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden ring-1 ring-white/60 transition-transform">
                                    {/* Specialist Header */}
                                    <div className="bg-gradient-to-r from-teal-600/90 to-emerald-600/90 p-8 backdrop-blur-md relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                        
                                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10">
                                            <div className="relative">
                                                {especialista.foto ? (
                                                    <img src={`/storage/${especialista.foto}`} alt={especialista.nombre} className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-2xl" />
                                                ) : (
                                                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 shadow-2xl text-white">
                                                        <User size={40} className="text-white/80" />
                                                    </div>
                                                )}
                                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-2 border-indigo-600 rounded-full" title="Disponible"></div>
                                            </div>
                                            
                                            <div className="text-center md:text-left text-white flex-1">
                                                <h3 className="text-2xl md:text-3xl font-bold mb-1">{especialista.nombre}</h3>
                                                <span className="inline-block px-3 py-1 bg-white/20 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/10 mb-3">
                                                    {especialista.especialidad}
                                                </span>
                                                {especialista.descripcion && <p className="text-white/80 text-sm max-w-2xl leading-relaxed">{especialista.descripcion}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Horarios logic */}
                                    <div className="p-8">
                                        {horarios.length === 0 ? (
                                            <div className="text-center py-8 bg-gray-50/50 rounded-2xl border border-dashed border-gray-300">
                                                <p className="text-gray-500 font-medium">No hay horarios disponibles por el momento.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-8">
                                                {Object.entries(horariosByDate).map(([fecha, hs]) => (
                                                    <div key={fecha}>
                                                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                            <span className="bg-teal-100 text-teal-600 p-2 rounded-lg mr-3 shadow-sm flex items-center"><Calendar size={16} /></span>
                                                            <span className="capitalize">
                                                                {new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </span>
                                                        </h4>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                            {hs.map(h => (
                                                                <label key={h.id} className="relative cursor-pointer group">
                                                                    <input 
                                                                        type="radio" 
                                                                        name="horario_temp" 
                                                                        value={h.id} 
                                                                        checked={selectedHorario == h.id}
                                                                        onChange={() => handleHorarioChange(h.id, especialista.id)}
                                                                        className="peer hidden" 
                                                                    />
                                                                    <div className={`bg-white/50 border-2 rounded-xl p-4 text-center transition-all cursor-pointer h-full flex flex-col justify-center
                                                                        ${selectedHorario == h.id 
                                                                            ? 'border-teal-600 bg-teal-50/90 shadow-lg shadow-teal-500/20 text-teal-700' 
                                                                            : 'border-slate-200 hover:bg-white hover:border-teal-400 text-slate-800'
                                                                        }`}>
                                                                        <div className="text-xl font-bold">
                                                                            {h.hora_inicio.substring(0, 5)}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 mt-1 font-medium">
                                                                            a {h.hora_fin.substring(0, 5)}
                                                                        </div>
                                                                    </div>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )})}
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200/50">
                            <a href="/citas/agendar" className="px-6 py-3 text-gray-500 hover:text-gray-800 font-semibold transition-colors flex items-center group">
                                <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> Volver
                            </a>
                            
                            <button 
                                type="submit" 
                                disabled={!selectedHorario}
                                className={`px-8 py-4 rounded-2xl font-bold transition-all shadow-sm flex items-center
                                    ${selectedHorario 
                                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 hover:-translate-y-1 cursor-pointer' 
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                Continuar <span className="ml-2">→</span>
                            </button>
                        </div>

                    </form>
                )}
            </div>

            <BottomNav active="appointments" />
        </div>
    );
}
