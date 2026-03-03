import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MapPin, Phone, User, Stethoscope, Save, X, Calendar } from 'lucide-react';
import axios from 'axios';
import SpecialistScheduleModal from './SpecialistScheduleModal';

export default function SpecialistsTable({ specialists, appointments = [] }) {
    const [list, setList] = useState(specialists);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        especialidad: '',
        descripcion: '',
        localidad: '',
        activo: true
    });
    const [errors, setErrors] = useState({});

    // Predefined lists for consistancy and validation
    const specialties = [
        "Psicología Clínica", 
        "Psicología Infantil",
        "Derecho Familiar",
        "Derecho Penal",
        "Nutrición",
        "Trabajo Social",
        "Medicina General"
    ];

    const locations = [
       "Nezahualcóyotl",
       "Puebla" 
    ];

    const filtered = list.filter(s => 
        s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        setEditingId(null);
        setFormData({ nombre: '', especialidad: '', descripcion: '', localidad: '', activo: true });
        setIsModalOpen(true);
    };

    const handleEdit = (specialist) => {
        setEditingId(specialist.id);
        setFormData({
            nombre: specialist.nombre,
            especialidad: specialist.especialidad,
            descripcion: specialist.descripcion || '',
            localidad: specialist.localidad || '',
            activo: specialist.activo
        });
        setIsModalOpen(true);
    };

    const handleSchedule = (specialist) => {
        setSelectedSpecialist(specialist);
        setScheduleModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este especialista?')) return;
        
        try {
            await axios.delete(`/admin/especialistas/${id}`);
            setList(list.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting specialist:', error);
            alert('Error al eliminar especialista');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Ensure active is sent in a way PHP expects if needed, avoiding issues
        const payload = { ...formData, activo: formData.activo ? 1 : 0 };

        try {
            if (editingId) {
                // Update
                const response = await axios.put(`/admin/especialistas/${editingId}`, payload);
                // Fix: Controller returns { success: true, especialista: {...} }
                const updatedItem = response.data.especialista || response.data;
                setList(list.map(item => item.id === editingId ? updatedItem : item));
            } else {
                // Create
                const response = await axios.post('/admin/especialistas', payload);
                // Fix: Controller returns { success: true, especialista: {...} }
                const newItem = response.data.especialista || response.data;
                setList([newItem, ...list]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Submit error:', error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                alert('Ocurrió un error al guardar. Verifique los datos.');
            }
        }
    };

    return (
        <div className="relative">
            {/* Header and Search - Same as before */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Especialistas</h2>
                    <p className="text-gray-400 text-sm">Gestiona la red de apoyo profesional</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <input 
                            type="text" 
                            placeholder="Buscar especialistas..." 
                            className="w-full md:w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    </div>
                    <button 
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                        <Plus size={18} />
                        <span className="hidden md:inline">Nuevo Especialista</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-gray-400">
                    <thead className="bg-white/5 text-gray-200 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Especialidad</th>
                            <th className="px-6 py-4">Descripción</th>
                            <th className="px-6 py-4">Ubicación</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{item.nombre}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded text-xs">
                                        {item.especialidad}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm max-w-xs truncate" title={item.descripcion}>
                                    {item.descripcion || '-'}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-start gap-2">
                                        <MapPin size={14} className="text-gray-500 mt-1 min-w-[14px]"/>
                                        <span className="truncate max-w-[150px]">{item.localidad || '-'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.activo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="text-sm">{item.activo ? 'Activo' : 'Inactivo'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button 
                                        onClick={() => handleSchedule(item)}
                                        className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
                                        title="Gestionar Agenda"
                                    >
                                        <Calendar size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleEdit(item)}
                                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Create/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    {/* ...existing modal code... */}
                    <div className="bg-gray-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">
                                {editingId ? 'Editar Especialista' : 'Nuevo Especialista'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <input 
                                        type="text" 
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        placeholder="Dr. Juan Pérez"
                                        value={formData.nombre}
                                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                                        required
                                    />
                                </div>
                                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Especialidad</label>
                                <div className="relative">
                                    <Stethoscope className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <select 
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white appearance-none focus:outline-none focus:border-blue-500"
                                        value={formData.especialidad}
                                        onChange={e => setFormData({...formData, especialidad: e.target.value})}
                                        required
                                    >
                                        <option value="" className="bg-gray-900 text-gray-400">Seleccionar especialidad</option>
                                        {specialties.map(spec => (
                                            <option key={spec} value={spec} className="bg-gray-900 text-white">{spec}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.especialidad && <p className="text-red-400 text-xs mt-1">{errors.especialidad[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Localidad</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <select 
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white appearance-none focus:outline-none focus:border-blue-500"
                                        value={formData.localidad}
                                        onChange={e => setFormData({...formData, localidad: e.target.value})}
                                        required
                                    >
                                        <option value="" className="bg-gray-900 text-gray-400">Seleccionar ubicación</option>
                                        {locations.map(loc => (
                                            <option key={loc} value={loc} className="bg-gray-900 text-white">{loc}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.localidad && <p className="text-red-400 text-xs mt-1">{errors.localidad[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
                                <textarea 
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                                    placeholder="Breve reseña profesional..."
                                    value={formData.descripcion}
                                    onChange={e => setFormData({...formData, descripcion: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="activo"
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                                    checked={formData.activo}
                                    onChange={e => setFormData({...formData, activo: e.target.checked})}
                                />
                                <label htmlFor="activo" className="text-sm text-gray-300">Cuenta Activa</label>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            {scheduleModalOpen && selectedSpecialist && (
                <SpecialistScheduleModal 
                    specialist={selectedSpecialist} 
                    allAppointments={appointments}
                    onClose={() => setScheduleModalOpen(false)} 
                />
            )}
        </div>
    );
}

