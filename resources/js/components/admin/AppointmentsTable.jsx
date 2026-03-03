import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText, CreditCard, Activity } from 'lucide-react';

export default function AppointmentsTable({ appointments }) {
    const [selectedCita, setSelectedCita] = useState(null);

    // Helper to safely format date/time
    const formatDateTime = (horario) => {
        if (!horario) return 'Fecha no asignada';
        
        try {
            // Check if fecha is YYYY-MM-DD and hours is HH:MM:SS
            const dateStr = horario.fecha;
            const timeStr = horario.hora_inicio;
            
            // Construct a safe ISO-like string: YYYY-MM-DDTHH:MM
            // Removing seconds if present or keeping them, browser usually handles T separator best
            const isoString = `${dateStr.split('T')[0]}T${timeStr}`;
            
            const dateObj = new Date(isoString);
            
            if (isNaN(dateObj.getTime())) {
                // Fallback if parsing fails (e.g. invalid format)
                return `${dateStr} ${timeStr}`;
            }

            return dateObj.toLocaleString('es-ES', {
                dateStyle: 'long',
                timeStyle: 'short'
            });
        } catch (e) {
            return 'Error en fecha';
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'confirmada': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pendiente': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'cancelada': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="relative">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Citas Programadas</h2>
                <p className="text-gray-400 text-sm">Agenda de consultas con especialistas</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((cita) => (
                    <div key={cita.id} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-white text-lg">{cita.especialista?.nombre || 'Especialista no asignado'}</h3>
                                <p className="text-purple-400 text-sm">{cita.especialista?.especialidad}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getStatusColor(cita.estado)}`}>
                                {cita.estado}
                            </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="flex items-center gap-2"><Calendar size={14}/> Fecha:</span>
                                <span className="text-gray-200">{formatDateTime(cita.horario)}</span>
                            </div>
                            <div className="flex justify-between pt-1">
                                <span className="flex items-center gap-2"><User size={14}/> Cliente:</span>
                                <span className="text-gray-200">
                                    {cita.user ? cita.user.name : (cita.nombre_cliente || 'Invitado')}
                                </span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedCita(cita)}
                            className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm font-medium transition-colors border border-white/10 flex justify-center items-center gap-2"
                        >
                            <FileText size={16} /> Ver Detalles
                        </button>
                    </div>
                ))}

                {appointments.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 border border-white/10 border-dashed rounded-xl">
                        No hay citas programadas recientemente
                    </div>
                )}
            </div>

            {/* Modal de Detalles */}
            {selectedCita && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
                            <div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    Detalles de la Cita #{selectedCita.id}
                                    <span className={`px-2 py-1 ml-3 rounded text-xs font-bold uppercase border ${getStatusColor(selectedCita.estado)}`}>
                                        {selectedCita.estado}
                                    </span>
                                </h3>
                                <p className="text-gray-400 mt-1">Información completa de la consulta</p>
                            </div>
                            <button 
                                onClick={() => setSelectedCita(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                            
                            {/* Grid Layout */}
                            <div className="grid md:grid-cols-2 gap-6">
                                
                                {/* Columna Izquierda: Detalles Médicos */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Información Médica</h4>
                                        <div className="space-y-4">
                                            <div className="bg-white/5 p-3 rounded-lg">
                                                <p className="text-xs text-gray-500 mb-1">Especialista</p>
                                                <p className="text-white font-medium">{selectedCita.especialista?.nombre}</p>
                                                <p className="text-sm text-gray-400">{selectedCita.especialista?.especialidad}</p>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-lg">
                                                <p className="text-xs text-gray-500 mb-1">Motivo / Descripción</p>
                                                <p className="text-white italic">
                                                    "{selectedCita.descripcion_problema || 'Sin descripción'}"
                                                </p>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex-1 bg-white/5 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">Tipo</p>
                                                    <p className="text-white flex items-center gap-2">
                                                        <Activity size={16} className="text-blue-400"/> 
                                                        {selectedCita.tipo_consulta}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Columna Derecha: Cliente y Horario */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Cliente</h4>
                                        <div className="bg-white/5 p-4 rounded-lg space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-500">Nombre</p>
                                                <p className="text-white font-medium flex items-center gap-2">
                                                    <User size={16} /> 
                                                    {selectedCita.user ? selectedCita.user.name : selectedCita.nombre_cliente}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Contacto</p>
                                                <p className="text-gray-300 text-sm">
                                                    {selectedCita.user ? selectedCita.user.email : selectedCita.email_cliente}
                                                </p>
                                                <p className="text-gray-300 text-sm">{selectedCita.telefono_cliente}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Horario y Pago</h4>
                                        <div className="bg-white/5 p-4 rounded-lg space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-500">Fecha y Hora</p>
                                                <p className="text-white font-medium flex items-center gap-2">
                                                    <Clock size={16} /> 
                                                    {formatDateTime(selectedCita.horario)}
                                                </p>
                                            </div>
                                            <div className="pt-2 border-t border-white/5">
                                                <p className="text-xs text-gray-500">Pago ({selectedCita.metodo_pago})</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xl font-bold text-white">${selectedCita.monto}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded uppercase border ${
                                                        selectedCita.estado_pago === 'completado' ? 'border-green-500 text-green-400' : 'border-yellow-500 text-yellow-400'
                                                    }`}>
                                                        {selectedCita.estado_pago || 'Pendiente'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        {/* Footer */}
                        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
                            <button 
                                onClick={() => setSelectedCita(null)}
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
