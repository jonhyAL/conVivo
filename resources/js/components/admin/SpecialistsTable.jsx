import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MapPin, Phone, User, Stethoscope, Save, X, Calendar, Brain, Heart, Users, Pill, Scale, Baby, Leaf, Activity, Shield, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import axios from 'axios';
import SpecialistScheduleModal from './SpecialistScheduleModal';

const SPECIALIST_ICONS = [
    { name: 'Stethoscope', component: Stethoscope, label: 'Medicina' },
    { name: 'Brain',       component: Brain,       label: 'Psicología' },
    { name: 'Heart',       component: Heart,       label: 'Apoyo emocional' },
    { name: 'Users',       component: Users,       label: 'Terapia familiar' },
    { name: 'User',        component: User,        label: 'Individual' },
    { name: 'Pill',        component: Pill,        label: 'Psiquiatría' },
    { name: 'Scale',       component: Scale,       label: 'Derecho' },
    { name: 'Baby',        component: Baby,        label: 'Infantil' },
    { name: 'Leaf',        component: Leaf,        label: 'Nutrición' },
    { name: 'Activity',    component: Activity,    label: 'Salud' },
    { name: 'Shield',      component: Shield,      label: 'Protección' },
    { name: 'BookOpen',    component: BookOpen,    label: 'Trabajo social' },
    { name: 'Briefcase',   component: Briefcase,   label: 'Profesional' },
    { name: 'GraduationCap', component: GraduationCap, label: 'Educación' },
];

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
        icon_class: 'Stethoscope',
        activo: true
    });
    const [errors, setErrors] = useState({});
    const [deleteConfirm, setDeleteConfirm] = useState(null);

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
        setFormData({ nombre: '', especialidad: '', descripcion: '', localidad: '', icon_class: 'Stethoscope', activo: true });
        setIsModalOpen(true);
    };

    const handleEdit = (specialist) => {
        setEditingId(specialist.id);
        setFormData({
            nombre: specialist.nombre,
            especialidad: specialist.especialidad,
            descripcion: specialist.descripcion || '',
            localidad: specialist.localidad || '',
            icon_class: specialist.icon_class || 'Stethoscope',
            activo: specialist.activo
        });
        setIsModalOpen(true);
    };

    const handleSchedule = (specialist) => {
        setSelectedSpecialist(specialist);
        setScheduleModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/especialistas/${id}`);
            setList(list.filter(item => item.id !== id));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting specialist:', error);
            setDeleteConfirm(null);
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
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-teal-900/40"
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
                                        onClick={() => setDeleteConfirm(item.id)}
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

            {/* Create/Edit Drawer */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-stretch justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative h-full w-full max-w-md bg-slate-900 border-l border-slate-700/60 shadow-2xl flex flex-col overflow-hidden">

                        {/* Sticky header */}
                        <div className="shrink-0 bg-slate-900 border-b border-slate-800 px-5 py-4 flex items-center justify-between">
                            <h2 className="font-bold text-white text-sm">
                                {editingId ? 'Editar Especialista' : 'Nuevo Especialista'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                <X size={15} />
                            </button>
                        </div>

                        {/* Scrollable body + footer as form */}
                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

                                {/* Nombre */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Nombre Completo <span className="text-red-400">*</span></label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                                        <input
                                            type="text"
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm"
                                            placeholder="Dr. Juan Pérez"
                                            value={formData.nombre}
                                            onChange={e => setFormData({...formData, nombre: e.target.value})}
                                            required
                                        />
                                    </div>
                                    {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre[0]}</p>}
                                </div>

                                {/* Especialidad */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Especialidad <span className="text-red-400">*</span></label>
                                    <div className="relative">
                                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                                        <select
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 appearance-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm"
                                            value={formData.especialidad}
                                            onChange={e => setFormData({...formData, especialidad: e.target.value})}
                                            required
                                        >
                                            <option value="" className="bg-slate-900 text-slate-400">Seleccionar especialidad</option>
                                            {specialties.map(spec => (
                                                <option key={spec} value={spec} className="bg-slate-900 text-white">{spec}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.especialidad && <p className="text-red-400 text-xs mt-1">{errors.especialidad[0]}</p>}
                                </div>

                                {/* Localidad */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Localidad <span className="text-red-400">*</span></label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                                        <select
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 appearance-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm"
                                            value={formData.localidad}
                                            onChange={e => setFormData({...formData, localidad: e.target.value})}
                                            required
                                        >
                                            <option value="" className="bg-slate-900 text-slate-400">Seleccionar ubicación</option>
                                            {locations.map(loc => (
                                                <option key={loc} value={loc} className="bg-slate-900 text-white">{loc}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.localidad && <p className="text-red-400 text-xs mt-1">{errors.localidad[0]}</p>}
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Descripción</label>
                                    <textarea
                                        className="w-full px-3 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm h-24 resize-none"
                                        placeholder="Breve reseña profesional..."
                                        value={formData.descripcion}
                                        onChange={e => setFormData({...formData, descripcion: e.target.value})}
                                    />
                                </div>

                                {/* Ícono */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Ícono del especialista</label>
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {SPECIALIST_ICONS.map(({ name, component: IconComp, label }) => {
                                            const isSelected = formData.icon_class === name;
                                            return (
                                                <button
                                                    key={name}
                                                    type="button"
                                                    title={label}
                                                    onClick={() => setFormData({ ...formData, icon_class: name })}
                                                    className={`flex items-center justify-center w-full aspect-square rounded-xl transition-all border ${
                                                        isSelected
                                                            ? 'bg-teal-500/20 border-teal-500 text-teal-400 ring-1 ring-teal-500/50'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                                                    }`}
                                                >
                                                    <IconComp size={16} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {formData.icon_class && (
                                        <p className="text-[11px] text-teal-400 mt-1.5 flex items-center gap-1">
                                            {(() => { const ic = SPECIALIST_ICONS.find(i => i.name === formData.icon_class); return ic ? <><ic.component size={11} /> {ic.label}</> : null; })()}
                                        </p>
                                    )}
                                </div>

                                {/* Estado activo */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Estado</label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({...formData, activo: !formData.activo})}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                            formData.activo
                                                ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${formData.activo ? 'bg-teal-400' : 'bg-slate-600'}`} />
                                        {formData.activo ? 'Activo' : 'Inactivo'}
                                    </button>
                                </div>

                            </div>

                            {/* Sticky footer */}
                            <div className="shrink-0 border-t border-slate-800 px-5 py-4 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-teal-900/40"
                                >
                                    <Save size={15} />
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

            {/* Delete confirmation overlay */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="font-bold text-white text-base mb-2">¿Eliminar especialista?</h3>
                        <p className="text-slate-400 text-sm mb-5">Esta acción no se puede deshacer.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">
                                Cancelar
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

