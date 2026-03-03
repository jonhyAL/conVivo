import React from 'react';
import BottomNav from './BottomNav';
import { Home, ClipboardList, LifeBuoy, Book, User, Check, Clock, MapPin, ExternalLink } from 'lucide-react';

export default function AppointmentSuccess({ cita }) {
    
    const formatDate = (dateString, format) => {
        // Assuming dateString is ISO or PHP standard
        const date = new Date(dateString);
        if (format === 'full') {
             return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        if (format === 'dayName') {
             return date.toLocaleDateString('es-ES', { weekday: 'long' });
        }
        return date.toLocaleDateString();
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.substring(0, 5);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-slate-600 pb-safe relative">
            {/* Background Decoration */}
             <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal-200/40 rounded-full blur-[80px] opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/40 rounded-full blur-[80px] opacity-60"></div>
            </div>

            <div className="relative z-10 max-w-lg mx-auto px-4 py-8 mb-20">
                
                {/* Icon & Title */}
                 <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mb-6 shadow-lg shadow-teal-500/30 ring-4 ring-white">
                        <Check className="w-12 h-12 text-white" strokeWidth={3} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">¡Cita Confirmada!</h1>
                    <p className="text-slate-500">Tu consulta ha sido agendada con éxito.</p>
                </div>

                {/* Ticket Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 relative">
                     {/* Top Pattern */}
                    <div className="h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>

                    <div className="p-6">
                        {/* Reference */}
                        <div className="text-center mb-6">
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Referencia</p>
                            <p className="text-3xl font-mono font-bold text-slate-800 tracking-wider">
                                {cita?.id}-{cita?.email_cliente ? cita.email_cliente.substring(0, 3).toUpperCase() : 'REF'}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Specialist */}
                            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                                {cita?.especialista?.foto ? (
                                    <img src={`/storage/${cita.especialista.foto}`} className="w-16 h-16 rounded-full object-cover shadow-sm bg-slate-100" alt="Especialista" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl shadow-sm">
                                        👨‍⚕️
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-0.5">Especialista</p>
                                    <p className="font-bold text-lg text-slate-800 leading-tight">{cita?.especialista?.nombre || 'Especialista'}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded">{cita?.especialista?.especialidad || 'General'}</span>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Fecha</p>
                                    <p className="font-bold text-slate-700 text-sm leading-tight">
                                        {cita?.horario?.fecha ? formatDate(cita.horario.fecha, 'full') : ''}
                                    </p>
                                    <p className="text-xs text-slate-500 capitalize">
                                        {cita?.horario?.fecha ? formatDate(cita.horario.fecha, 'dayName') : ''}
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Hora</p>
                                    <p className="font-bold text-slate-700 text-sm leading-tight">
                                        {cita?.horario?.hora_inicio ? formatTime(cita.horario.hora_inicio) : ''}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        a {cita?.horario?.hora_fin ? formatTime(cita.horario.hora_fin) : ''}
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-blue-400 font-bold uppercase mb-0.5">Ubicación</p>
                                    <p className="text-sm font-semibold text-slate-700">{cita?.localidad}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Cutout Effect */}
                    <div className="relative h-6 bg-slate-50 opacity-50">
                        <div className="absolute -top-3 left-0 w-6 h-6 rounded-full bg-gray-50"></div>
                        <div className="absolute -top-3 right-0 w-6 h-6 rounded-full bg-gray-50"></div>
                        <div className="border-t border-dashed border-slate-300 w-full absolute top-0"></div>
                    </div>
                </div>

                {/* Info Box */}
                 <div className="bg-blue-50 p-4 rounded-2xl mb-20 text-sm text-blue-800 flex items-start gap-3">
                    <LifeBuoy className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                        Hemos enviado un correo de confirmación a <strong>{cita?.email_cliente}</strong>. Por favor llega 10 minutos antes.
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-8 mb-32 px-4">
                    <a href="/dashboard" className="block w-full text-center bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 ring-1 ring-slate-700">
                        Volver al Inicio
                    </a>
                </div>

            </div>

            <BottomNav active="appointments" />
        </div>
    );
}

