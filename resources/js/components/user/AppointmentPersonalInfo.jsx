import React from 'react';
import BottomNav from './BottomNav';
import { ChevronLeft, Clipboard, User, Mail, Phone, Lock, Upload } from 'lucide-react';

export default function AppointmentPersonalInfo({ horario, user, oldInput = {}, errors = {} }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const formatDate = (dateString) => {
        // Need to handle potential formats, but standard PHP JSON encode of Carbon is ISO
        return new Date(dateString).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800 pb-safe relative">
             {/* Background Decoration */}
             <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 mb-20">
                {/* Progress Bar */}
                <div className="mb-12">
                     <div className="flex items-center justify-center space-x-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg shadow-green-500/20">✓</div>
                            <span className="text-sm mt-2 text-green-600 font-bold">Tipo</span>
                        </div>
                        <div className="w-20 h-1 bg-green-500 rounded-full shadow-sm"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg shadow-green-500/20">✓</div>
                            <span className="text-sm mt-2 text-green-600 font-bold">Fecha</span>
                        </div>
                         <div className="w-20 h-1 bg-teal-600 rounded-full"></div>
                        <div className="flex flex-col items-center">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">3</div>
                            <span className="text-sm mt-2 text-teal-700 font-bold">Confirmar</span>
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-700 bg-clip-text text-transparent drop-shadow-sm">
                        Confirmar Cita Gratuita
                    </h1>
                     <p className="text-xl text-gray-500">Completa tus datos para confirmar tu consulta sin costo</p>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-blue-200 shadow-lg shadow-teal-500/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center relative z-10 text-lg">
                        <span className="bg-teal-100 text-teal-600 p-2 rounded-lg mr-2">📋</span>
                        Resumen de tu cita
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 relative z-10">
                         <div className="bg-white/50 p-4 rounded-xl border border-white/60">
                            <span className="block text-xs text-gray-500 uppercase font-semibold mb-1">Especialista</span>
                            <span className="font-bold text-lg text-gray-800">{horario?.especialista?.nombre}</span>
                        </div>
                        <div className="bg-white/50 p-4 rounded-xl border border-white/60">
                            <span className="block text-xs text-gray-500 uppercase font-semibold mb-1">Especialidad</span>
                            <span className="font-bold text-lg text-gray-800">{horario?.especialista?.especialidad}</span>
                        </div>
                        <div className="bg-white/50 p-4 rounded-xl border border-white/60">
                            <span className="block text-xs text-gray-500 uppercase font-semibold mb-1">Fecha</span>
                            <span className="font-bold text-lg text-gray-800 capitalize">{horario?.fecha ? formatDate(horario.fecha) : ''}</span>
                        </div>
                         <div className="bg-white/50 p-4 rounded-xl border border-white/60">
                            <span className="block text-xs text-gray-500 uppercase font-semibold mb-1">Hora</span>
                            <span className="font-bold text-lg text-gray-800">
                                {horario?.hora_inicio?.substring(0,5)} - {horario?.hora_fin?.substring(0,5)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form encType='multipart/form-data' action="/citas/confirmar" method="POST" className="bg-white/60 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-white/50 p-8 md:p-12 relative overflow-hidden ring-1 ring-white/60">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
                     
                     <div className="relative z-10 space-y-6">
                        <input type="hidden" name="_token" value={csrfToken || ''} />

                        {/* Name */}
                        <div>
                             <label className="block text-gray-800 font-bold mb-2 ml-1">Nombre Completo *</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                required
                                defaultValue={oldInput.nombre || user.name || ''}
                                placeholder="Tu nombre completo"
                                className="w-full bg-white/50 border border-gray-200 text-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder-gray-400 shadow-inner"
                            />
                             {errors.nombre && <p className="text-red-500 text-sm mt-2 ml-1 font-medium">{errors.nombre}</p>}
                        </div>

                        {/* Email */}
                        <div>
                             <label className="block text-gray-800 font-bold mb-2 ml-1">Correo Electrónico *</label>
                            <input 
                                type="email" 
                                name="email" 
                                required
                                defaultValue={oldInput.email || user.email || ''}
                                placeholder="tu@email.com"
                                className="w-full bg-white/50 border border-gray-200 text-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder-gray-400 shadow-inner"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-2 ml-1 font-medium">{errors.email}</p>}
                            <p className="text-sm text-gray-500 mt-2 ml-1">Te enviaremos la confirmación de tu cita a este correo</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-800 font-bold mb-2 ml-1">Teléfono *</label>
                            <input 
                                type="tel" 
                                name="telefono" 
                                required
                                defaultValue={oldInput.telefono || ''}
                                placeholder="55 1234 5678"
                                className="w-full bg-white/50 border border-gray-200 text-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder-gray-400 shadow-inner"
                            />
                             {errors.telefono && <p className="text-red-500 text-sm mt-2 ml-1 font-medium">{errors.telefono}</p>}
                             <p className="text-sm text-gray-500 mt-2 ml-1">Para poder contactarte en caso necesario</p>
                        </div>

                        {/* Privacy Note */}
                        <div className="bg-teal-50/50 rounded-xl p-5 border border-blue-100 shadow-sm backdrop-blur-sm">
                             <div className="flex items-start">
                                <div className="bg-teal-100 text-teal-600 p-2 rounded-full mr-3 flex-shrink-0">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div className="text-sm text-blue-900">
                                    <p className="font-bold mb-1 text-base">Privacidad y Confidencialidad</p>
                                    <p className="leading-relaxed opacity-90">Tus datos personales serán tratados con total confidencialidad y solo serán utilizados para gestionar tu cita. No compartimos tu información con terceros.</p>
                                </div>
                            </div>
                        </div>

                         {/* Documents */}
                        <div className="mt-8 mb-8">
                            <label className="block text-slate-700 font-bold mb-3 ml-1">Documentos / Referencias (Opcional)</label>
                            <div className="relative group">
                                <input 
                                    type="file" 
                                    name="documentos[]" 
                                    multiple 
                                    className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-3 file:px-6
                                    file:rounded-xl file:border-0
                                    file:text-sm file:font-bold
                                    file:bg-teal-50 file:text-teal-700
                                    hover:file:bg-teal-100
                                    cursor-pointer border border-slate-200 rounded-xl bg-white/50 shadow-sm transition-all"
                                />
                                <p className="text-xs text-slate-400 mt-2 ml-1">Puedes adjuntar imágenes o documentos relevantes.</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                            <a href="#" onClick={() => window.history.back()} className="px-6 py-3 text-slate-500 hover:text-slate-800 font-semibold transition-colors flex items-center group">
                                <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> Volver
                            </a>
                            <button type="submit" className="px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 transition-all hover:-translate-y-1 ring-2 ring-white/20">
                                Confirmar Cita <span className="ml-2">→</span>
                            </button>
                        </div>

                     </div>
                </form>
            </div>

            <BottomNav active="appointments" />
        </div>
    );
}

