import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Trash2, Plus, X, User, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function SpecialistScheduleModal({ specialist, onClose, allAppointments }) {
    const [activeTab, setActiveTab] = useState('horarios');
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSchedule, setNewSchedule] = useState({
        fecha: '',
        hora_inicio: '',
        hora_fin: ''
    });

    // Determine Specialist Appointments from global list
    // (In a real large app, you might fetch this from API instead)
    const specialistAppointments = allAppointments.filter(
        app => app.especialista_id === specialist.id
    );

    useEffect(() => {
        fetchSchedules();
    }, [specialist.id]);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`/admin/especialistas/${specialist.id}/horarios`);
            setSchedules(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setLoading(false);
        }
    };

    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/admin/horarios', {
                especialista_id: specialist.id,
                ...newSchedule
            });
            
            // The controller returns { success: true, horario: {...} }
            // We need to extract the 'horario' object
            if (response.data.success && response.data.horario) {
                setSchedules([...schedules, response.data.horario]);
                setNewSchedule({ fecha: '', hora_inicio: '', hora_fin: '' });
                // alert('Horario añadido correctamente'); // Removed alert to prevent UI blocking
            } else {
                 // Fallback if structure is different
                 setSchedules([...schedules, response.data]);
            }
        } catch (error) {
            console.error('Error adding schedule:', error);
            alert(error.response?.data?.message || 'Error al añadir horario. Verifica conflictos.');
        }
    };

    const handleDeleteSchedule = async (id) => {
        if (!confirm('¿Eliminar este horario?')) return;
        try {
            await axios.delete(`/admin/horarios/${id}`);
            setSchedules(schedules.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-800/50 rounded-t-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            {specialist.nombre.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{specialist.nombre}</h3>
                            <p className="text-purple-400 text-sm">{specialist.especialidad}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={28} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    <button 
                        onClick={() => setActiveTab('horarios')}
                        className={`flex-1 py-4 text-center font-medium transition-colors ${
                            activeTab === 'horarios' ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Clock size={18} />
                            Gestión de Horarios
                        </div>
                    </button>
                    <button 
                        onClick={() => setActiveTab('citas')}
                        className={`flex-1 py-4 text-center font-medium transition-colors ${
                            activeTab === 'citas' ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                         <div className="flex items-center justify-center gap-2">
                            <Calendar size={18} />
                            Citas Agendadas ({specialistAppointments.length})
                        </div>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'horarios' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form */}
                            <div className="lg:col-span-1">
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <Plus size={18} className="text-blue-400" />
                                        Nuevo Horario
                                    </h4>
                                    <form onSubmit={handleAddSchedule} className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1">Fecha</label>
                                            <input 
                                                type="date" 
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                                                value={newSchedule.fecha}
                                                onChange={e => setNewSchedule({...newSchedule, fecha: e.target.value})}
                                                min={new Date().toISOString().split('T')[0]}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Inicio</label>
                                                <input 
                                                    type="time" 
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                                                    value={newSchedule.hora_inicio}
                                                    onChange={e => setNewSchedule({...newSchedule, hora_inicio: e.target.value})}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Fin</label>
                                                <input 
                                                    type="time" 
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                                                    value={newSchedule.hora_fin}
                                                    onChange={e => setNewSchedule({...newSchedule, hora_fin: e.target.value})}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                                        >
                                            Añadir Horario
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* List */}
                            <div className="lg:col-span-2">
                                <h4 className="text-white font-bold mb-4">Horarios Disponibles</h4>
                                {loading ? (
                                    <p className="text-gray-500">Cargando horarios...</p>
                                ) : schedules.length === 0 ? (
                                    <p className="text-gray-500 italic">No hay horarios registrados.</p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {schedules.map(schedule => (
                                            <div 
                                                key={schedule.id} 
                                                className={`p-3 rounded-lg border flex justify-between items-center ${
                                                    schedule.disponible 
                                                    ? 'bg-green-500/10 border-green-500/20 text-green-100' 
                                                    : 'bg-red-500/10 border-red-500/20 text-red-300 opacity-60' // Dim occupied slots
                                                }`}
                                            >
                                                <div>
                                                    <div className="font-bold">{new Date(schedule.fecha).toLocaleDateString()}</div>
                                                    <div className="text-sm font-mono">
                                                        {schedule.hora_inicio ? schedule.hora_inicio.substring(0,5) : '--:--'} - {schedule.hora_fin ? schedule.hora_fin.substring(0,5) : '--:--'}
                                                    </div>
                                                    {!schedule.disponible && (
                                                        <span className="text-xs uppercase font-bold text-red-400 mt-1 block">Ocupado</span>
                                                    )}
                                                </div>
                                                {schedule.disponible && (
                                                    <button 
                                                        onClick={() => handleDeleteSchedule(schedule.id)}
                                                        className="p-2 hover:bg-white/10 rounded-full text-red-400 transition-colors"
                                                        title="Eliminar Horario"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'citas' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {specialistAppointments.map(cita => (
                                    <div key={cita.id} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <User className="text-blue-400" size={16} />
                                                <span className="text-white font-medium">Usuario ID: {cita.user_id}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                                cita.estado === 'confirmada' ? 'bg-green-500/20 text-green-400' :
                                                cita.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                                {cita.estado}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-2 text-sm text-gray-400 pl-6 border-l-2 border-white/10">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase">Fecha y Hora</p>
                                                 {cita.horario ? (
                                                     <p className="text-white">
                                                         {new Date(cita.horario.fecha).toLocaleDateString()} 
                                                         <span className="mx-2">•</span>
                                                         {cita.horario.hora_inicio}
                                                     </p>
                                                 ) : (
                                                     <p className="text-red-400 italic">Horario no disponible</p>
                                                 )}
                                            </div>
                                            {cita.notas && (
                                                 <div>
                                                     <p className="text-xs text-gray-500 uppercase">Notas</p>
                                                     <p className="italic">"{cita.notas}"</p>
                                                 </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {specialistAppointments.length === 0 && (
                                    <div className="col-span-full py-12 text-center">
                                        <div className="inline-block p-4 rounded-full bg-white/5 mb-3">
                                            <CheckCircle className="text-gray-500" size={32} />
                                        </div>
                                        <p className="text-gray-400">Este especialista no tiene citas programadas próximamente.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

