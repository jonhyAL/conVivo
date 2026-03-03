import React, { useState, useRef, useEffect } from 'react';
import { Search, Edit, Trash2, Plus, X, User, Mail, Lock, Save, Camera, Eye, MapPin, Phone, Calendar, Heart, Shield, AlertTriangle, Activity, Filter } from 'lucide-react';
import axios from 'axios';

export default function UsersTable({ users, initialFilterRisk = false, onClearFilter }) {
    const [list, setList] = useState(users);
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState(initialFilterRisk);

    useEffect(() => {
        setRiskFilter(initialFilterRisk);
    }, [initialFilterRisk]);
    
    // Modal & Form State for Create/Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', avatar: null });
    const [previewUrl, setPreviewUrl] = useState(null); // For image preview
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    // Modal State for View User
    const [viewingUser, setViewingUser] = useState(null);

    const filteredUsers = list.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRisk = riskFilter ? (user.mood_score !== null && user.mood_score < 2.5) : true;
        
        return matchesSearch && matchesRisk;
    });

    const clearRiskFilter = () => {
        setRiskFilter(false);
        if (onClearFilter) onClearFilter();
    };

    const handleCreate = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', password: '', avatar: null });
        setPreviewUrl(null);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, password: '', avatar: null });
        setPreviewUrl(user.photo_path ? `/storage/${user.photo_path}` : null); // Use photo_path if available
        setErrors({});
        setIsModalOpen(true);
    };

    const handleView = (user) => {
        setViewingUser(user);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, avatar: file });
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

        try {
            await axios.delete(`/admin/users/${id}`); 
            setList(list.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            if (error.response && error.response.status === 403) {
                 alert(error.response.data.message);
            } else {
                 alert('Error al eliminar usuario');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Create FormData for file upload
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        if (formData.password) data.append('password', formData.password);
        if (formData.avatar) data.append('avatar', formData.avatar);

        try {
            if (editingUser) {
                // Update (Use method spoofing for Laravel PUT with files)
                data.append('_method', 'PUT');
                const response = await axios.post(`/admin/users/${editingUser.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                // Update list carefully
                const updatedUser = response.data.user;
                // If the backend returns "user" including familyMembers, great. If not, we might lose family members in the list view if we just swap.
                // However, updatedUser usually comes clean. If we want to preserve familyMembers, we might need to merge or re-fetch.
                // For now, let's assume crud operations return basic user data, so we might lose familyMembers until refresh.
                // To fix, we can merge existing familyMembers if not returned.
                const mergedUser = { ...editingUser, ...updatedUser }; 
                setList(list.map(u => u.id === editingUser.id ? mergedUser : u));
            } else {
                // Create
                const response = await axios.post('/admin/users', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const newUser = response.data.user;
                setList([newUser, ...list]);
            }
            setIsModalOpen(false);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error saving user:', error);
                alert('Error al guardar usuario');
            }
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        Gestión de Usuarios
                        {riskFilter && (
                            <span className="text-xs bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer hover:bg-rose-500/30 transition-colors" onClick={clearRiskFilter}>
                                <Activity size={10} /> Riesgo Emocional <X size={10} />
                            </span>
                        )}
                    </h2>
                    <p className="text-gray-400 text-sm">Administra los usuarios registrados en la plataforma</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <input 
                            type="text" 
                            placeholder="Buscar usuarios..." 
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
                        <span className="hidden md:inline">Nuevo Usuario</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-gray-400">
                    <thead className="bg-white/5 text-gray-200 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Usuario</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Fecha Registro</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xs overflow-hidden">
                                        {user.photo_path ? (
                                            <img src={`/storage/${user.photo_path}`} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user.name.substring(0, 2).toUpperCase()
                                        )}
                                    </div>
                                    <span className="font-medium text-white">{user.name}</span>
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button 
                                        onClick={() => handleView(user)}
                                        className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                                        title="Ver Detalles"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleEdit(user)}
                                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                        title="Editar Usuario"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                        title="Eliminar Usuario"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron usuarios coincidentes
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-gray-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative my-auto">
                         <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                        
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">
                                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                {editingUser ? 'Modifica los datos de acceso del usuario' : 'Crea una nueva cuenta de acceso'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="flex flex-col items-center justify-center mb-6">
                                <div 
                                    className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-500 hover:border-blue-500 cursor-pointer group transition-colors"
                                    onClick={triggerFileInput}
                                >
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-gray-400">
                                            <User size={40} />
                                        </div>
                                    )}
                                    
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white" size={24} />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Click para cambiar foto de perfil</p>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {errors.avatar && <p className="text-red-400 text-xs mt-1">{errors.avatar[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <input 
                                        type="text" 
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        placeholder="Nombre Usuario"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <input 
                                        type="email" 
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        placeholder="correo@ejemplo.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    {editingUser ? 'Nueva Contraseña (Opcional)' : 'Contraseña'}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                    <input 
                                        type="password" 
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                        placeholder={editingUser ? "Dejar en blanco para no cambiar" : "Mínimo 8 caracteres"}
                                        value={formData.password}
                                        onChange={e => setFormData({...formData, password: e.target.value})}
                                        required={!editingUser}
                                        minLength={8}
                                    />
                                </div>
                                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password[0]}</p>}
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

            {/* View Details Modal */}
            {viewingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative my-auto animate-fade-in-up">
                         <button 
                            onClick={() => setViewingUser(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 rounded-full p-1"
                        >
                            <X size={24} />
                        </button>
                        
                        {/* Header with Photo */}
                        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 flex flex-col items-center border-b border-white/10">
                            <div className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-xl overflow-hidden mb-4">
                                {viewingUser.photo_path ? (
                                    <img src={`/storage/${viewingUser.photo_path}`} alt={viewingUser.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white text-3xl font-bold">
                                        {viewingUser.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white">{viewingUser.name}</h2>
                            <p className="text-blue-200">{viewingUser.email}</p>
                            <p className="text-xs text-gray-400 mt-2">Registrado el {new Date(viewingUser.created_at).toLocaleDateString()}</p>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Personal Info Column */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                                    <User size={20} className="text-blue-400" /> Información Personal
                                </h3>
                                <div className="space-y-4">
                                    {/* Mood Analysis (New) */}
                                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                                            <span>Estado Emocional (Promedio)</span>
                                            <Activity size={12} className="text-purple-400"/>
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl font-bold text-white">
                                                {viewingUser.mood_score ? viewingUser.mood_score : 'N/A'}
                                            </div>
                                            <div>
                                                {viewingUser.mood_score ? (
                                                    <>
                                                        <div className={`text-sm font-bold px-2 py-0.5 rounded-full inline-block mb-1
                                                            ${viewingUser.mood_score >= 4 ? 'bg-green-500/20 text-green-400' : 
                                                              viewingUser.mood_score >= 3 ? 'bg-blue-500/20 text-blue-400' : 
                                                              viewingUser.mood_score >= 2 ? 'bg-orange-500/20 text-orange-400' : 
                                                              'bg-red-500/20 text-red-500'}`}>
                                                            {viewingUser.mood_score >= 4 ? 'Excelente' : 
                                                             viewingUser.mood_score >= 3 ? 'Estable' : 
                                                             viewingUser.mood_score >= 2 ? 'Bajo' : 
                                                             'Crítico'}
                                                        </div>
                                                        <p className="text-[10px] text-gray-500">Basado en últimos 7 días</p>
                                                    </>
                                                ) : (
                                                    <p className="text-sm text-gray-500">Sin datos suficientes</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Teléfono</p>
                                        <p className="text-gray-300 font-medium flex items-center gap-2">
                                            <Phone size={14} className="text-gray-500" />
                                            {viewingUser.phone_number || 'No registrado'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Fecha de Nacimiento</p>
                                        <p className="text-gray-300 font-medium flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-500" />
                                            {viewingUser.birthdate ? new Date(viewingUser.birthdate).toLocaleDateString() : 'No registrada'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Ubicación</p>
                                        <p className="text-gray-300 font-medium flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-500" />
                                            {viewingUser.location || 'No registrada'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Compartir Ubicación en Emergencia</p>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mt-1 ${Boolean(viewingUser.location_enabled) ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {Boolean(viewingUser.location_enabled) ? <Shield size={12} /> : <AlertTriangle size={12} />}
                                            {Boolean(viewingUser.location_enabled) ? 'ACTIVADO' : 'DESACTIVADO'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Family Members Column */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                                    <Heart size={20} className="text-rose-400" /> Familiares / Contactos
                                </h3>
                                
                                <div className="space-y-3">
                                    {(viewingUser.family_members || viewingUser.familyMembers || []).length > 0 ? (
                                        (viewingUser.family_members || viewingUser.familyMembers).map(member => (
                                            <div key={member.id} className={`p-3 rounded-lg border ${Boolean(member.is_primary_contact) ? 'bg-rose-900/20 border-rose-500/30' : 'bg-white/5 border-white/5'}`}>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-bold text-gray-200">{member.name}</p>
                                                        <p className="text-sm text-gray-400">{member.relationship}</p>
                                                    </div>
                                                    {Boolean(member.is_primary_contact) && (
                                                        <span className="bg-rose-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Principal</span>
                                                    )}
                                                </div>
                                                <div className="mt-2 flex items-center gap-2 text-sm text-rose-300">
                                                    <Phone size={12} /> {member.phone_number}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm italic py-4 text-center bg-white/5 rounded-lg">
                                            No hay familiares registrados.
                                        </p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
