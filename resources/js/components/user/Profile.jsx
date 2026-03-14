import React, { useState, useRef, useEffect } from 'react';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import { User, Phone, Calendar, MapPin, Lock, ChevronRight, LogOut, Edit, Camera, Save, X, Plus, Trash2, Heart, CheckCircle, AlertCircle, Sun, Moon } from 'lucide-react';

export default function Profile({ user: initialUser, success, serverErrors }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    // State for local data management
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('general'); // general, privacy
    const [userData, setUserData] = useState(initialUser);
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
    const [showAddFamily, setShowAddFamily] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showLocationForm, setShowLocationForm] = useState(false);
    const toggleTheme = () => {
        const nowDark = document.documentElement.classList.toggle('dark');
        localStorage.panelTheme = nowDark ? 'dark' : 'light';
        setIsDark(nowDark);
    };

    useEffect(() => {
        if (serverErrors && serverErrors.length > 0) {
           const passwordRelated = serverErrors.some(e => e.toLowerCase().includes('password') || e.toLowerCase().includes('contraseña'));
           if (passwordRelated) { setActiveTab('privacy'); setShowPasswordForm(true); }
        }
        if (success === 'password-updated') setActiveTab('privacy');
        if (success === 'family-added' || success === 'family-updated' || success === 'family-deleted') setActiveTab('general');
    }, [serverErrors, success]);


    const photoFormRef = useRef(null);

    const formatDate = (dateString) => {
        if (!dateString) return 'No especificada';
        return new Date(dateString).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const handlePhotoClick = () => {
        document.getElementById('photo-input').click();
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
             photoFormRef.current.submit();
        }
    };
    
    const getFormattedDate = (dateString) => {
        if (!dateString) return '';
        return dateString.includes('T') ? dateString.split('T')[0] : dateString;
    };

    return (
        <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 relative pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
             
             <MobileHeader user={initialUser} />



            <div className="max-w-lg mx-auto px-4 pt-4 pb-4 relative z-10">
                
                {/* Feedback Messages */}
                {success && (
                    <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up transition-colors">
                        <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-bold">¡Operación exitosa!</p>
                            <p className="text-sm opacity-90">
                                {success === 'profile-updated' && 'Tu información personal ha sido actualizada.'}
                                {success === 'password-updated' && 'Tu contraseña ha sido cambiada correctamente.'}
                                {success === 'photo-updated' && 'Foto de perfil actualizada.'}
                                {success === 'family-added' && 'Familiar agregado correctamente.'}
                                {success === 'family-deleted' && 'Familiar eliminado correctamente.'}
                            </p>
                        </div>
                        <button onClick={() => window.location.href = window.location.pathname} className="ml-auto text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300"><X className="w-4 h-4" /></button>
                    </div>
                )}

                {serverErrors && serverErrors.length > 0 && (
                     <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up transition-colors">
                        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-bold">Ocurrió un error</p>
                            <ul className="list-disc list-inside text-sm opacity-90 mt-1">
                                {serverErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Profile Card & Photo */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 mb-8 flex flex-col items-center text-center relative overflow-hidden group transition-colors">
                     <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-900/10 dark:to-emerald-900/10 pointer-events-none transition-colors"></div>
                    
                    <div className="relative mb-4 z-10">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 p-1 shadow-lg shadow-teal-500/20 cursor-pointer transform group-hover:scale-105 transition-all duration-300" onClick={handlePhotoClick}>
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 overflow-hidden flex items-center justify-center relative transition-colors">
                                {userData.photo_path ? (
                                    <img src={`/storage/${userData.photo_path}`} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-bold text-teal-600 dark:text-teal-400 transition-colors">{userData.name.charAt(0).toUpperCase()}</span>
                                )}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                        <form ref={photoFormRef} action="/perfil/photo" method="POST" encType="multipart/form-data" className="hidden">
                             <input type="hidden" name="_token" value={csrfToken} />
                             <input type="file" id="photo-input" name="photo" accept="image/*" onChange={handlePhotoChange} />
                        </form>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white relative z-10 transition-colors">{userData.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 relative z-10 transition-colors">{userData.email}</p>
                    
                    <div className="flex gap-2 relative z-10">
                        <button 
                            onClick={() => { setIsEditing(!isEditing); setActiveTab('general'); }}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${isEditing && activeTab === 'general' ? 'bg-teal-600 text-white shadow-teal-200 dark:shadow-none' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20'}`}
                        >
                            {isEditing && activeTab === 'general' ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                            {isEditing && activeTab === 'general' ? 'Cancelar' : 'Editar Datos'}
                        </button>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <div className="flex gap-2 mb-6">
                    <button 
                        onClick={() => { setActiveTab('general'); setIsEditing(false); }}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'general' ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-lg shadow-slate-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        General
                    </button>
                    <button 
                        onClick={() => { setActiveTab('privacy'); setIsEditing(false); }}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'privacy' ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        Cuenta y Privacidad
                    </button>
                </div>

                {/* CONTENT: General — Info + Familiares */}
                {activeTab === 'general' && (
                    <div className="animate-fade-in-up space-y-6">
                        {/* Personal Info */}
                        {isEditing ? (
                             <form action="/perfil" method="POST" className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 space-y-5 transition-colors">
                                <input type="hidden" name="_token" value={csrfToken} />
                                <input type="hidden" name="_method" value="PATCH" />
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Nombre Completo</label>
                                    <input type="text" name="name" defaultValue={userData.name} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all font-medium" />
                                </div>
                                {/* Removed Email Field */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Teléfono</label>
                                    <input type="tel" name="phone_number" defaultValue={userData.phone_number || ''} placeholder="55 1234 5678" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Fecha de Nacimiento</label>
                                    <input type="date" name="birthdate" defaultValue={getFormattedDate(userData.birthdate)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Ubicación</label>
                                    <input type="text" name="location" defaultValue={userData.location || ''} placeholder="Ciudad, Estado" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all font-medium" />
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <input type="checkbox" name="location_enabled" value="true" id="loc_enabled" defaultChecked={Boolean(userData.location_enabled)} className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-gray-300 dark:border-gray-600 dark:bg-slate-800" />
                                    <label htmlFor="loc_enabled" className="text-sm font-medium text-slate-700 dark:text-slate-300">Compartir mi ubicación en emergencias</label>
                                </div>

                                <button type="submit" className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-bold shadow-lg shadow-slate-200 dark:shadow-none hover:bg-slate-900 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                                    <Save className="w-5 h-5" /> Guardar Cambios
                                </button>
                             </form>
                        ) : (
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 space-y-2 transition-colors">
                                <InfoItem icon={<User className="text-teal-600 dark:text-teal-400" />} label="Nombre" value={userData.name} />
                                <InfoItem icon={<Phone className="text-teal-600 dark:text-teal-400" />} label="Teléfono" value={userData.phone_number || 'No registrado'} />
                                <InfoItem icon={<Calendar className="text-teal-600 dark:text-teal-400" />} label="Fecha de Nacimiento" value={formatDate(userData.birthdate)} />
                                <InfoItem icon={<MapPin className="text-teal-600 dark:text-teal-400" />} label="Ubicación" value={userData.location || 'No registrada'} />
                                <div className="p-4 flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl mt-4 transition-colors">
                                    <div className={`w-3 h-3 rounded-full ${Boolean(userData.location_enabled) ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{Boolean(userData.location_enabled) ? 'Ubicación compartida activada' : 'Ubicación desactivada'}</span>
                                </div>
                            </div>
                        )}

                        {/* Familiares / Contactos de Emergencia */}
                        <div>
                        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-5 border border-rose-100 dark:border-rose-900/30 flex items-start gap-4 transition-colors">
                            <div className="bg-rose-100 dark:bg-rose-900/40 p-2 rounded-full text-rose-500 dark:text-rose-400 shrink-0">
                                <Heart className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-rose-800 dark:text-rose-400 transition-colors">Contactos de Emergencia</h4>
                                <p className="text-sm text-rose-600/80 dark:text-rose-400/70 mt-1 transition-colors">Configura a quién debemos contactar primero en caso de que actives el botón de pánico.</p>
                            </div>
                        </div>

                        {/* Add Family — Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setShowAddFamily(!showAddFamily)}
                            className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                                    <Plus className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-200">Agregar familia y amigos</span>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showAddFamily ? 'rotate-90' : ''}`} />
                        </button>

                        {/* Expandable Add Form */}
                        {showAddFamily && (
                            <form action="/perfil/family" method="POST" className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors">
                                <input type="hidden" name="_token" value={csrfToken} />
                                <div className="space-y-4">
                                    <input type="text" name="name" placeholder="Nombre completo" required className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all font-medium" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" name="relationship" placeholder="Parentesco (Ej. Mamá)" required className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all font-medium" />
                                        <input type="tel" name="phone_number" placeholder="Teléfono" required className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all font-medium" />
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                        <input type="checkbox" name="is_primary_contact" value="1" id="new_primary" className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-gray-300 dark:border-gray-600 dark:bg-slate-800" />
                                        <label htmlFor="new_primary" className="text-sm font-medium text-slate-600 dark:text-slate-400">Este es mi contacto principal</label>
                                    </div>
                                    <button type="submit" className="w-full py-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50 rounded-xl font-bold transition-colors">
                                        Agregar Contacto
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* List Family Members */}
                        <div className="space-y-4">
                            {userData.family_members && userData.family_members.length > 0 ? (
                                userData.family_members.map(member => (
                                    <div key={member.id} className={`bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 shadow-sm dark:shadow-none border flex items-center justify-between transition-colors ${member.is_primary_contact ? 'border-rose-200 dark:border-rose-800/50 ring-2 ring-rose-50 dark:ring-rose-900/10' : 'border-slate-100 dark:border-slate-800'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors ${member.is_primary_contact ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-white transition-colors">{member.name} {member.is_primary_contact && <span className="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md ml-2 border border-rose-200 dark:border-rose-800/30">Principal</span>}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">{member.relationship} • {member.phone_number}</p>
                                            </div>
                                        </div>
                                        <form action={`/perfil/family/${member.id}`} method="POST" onSubmit={(e) => { if(!confirm('¿Estás seguro?')) e.preventDefault(); }}>
                                            <input type="hidden" name="_token" value={csrfToken} />
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <button type="submit" className="w-10 h-10 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 flex items-center justify-center transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-400 dark:text-slate-500 transition-colors">
                                    <p>No tienes familiares registrados</p>
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                )}

                {/* CONTENT: Cuenta y Privacidad */}
                {activeTab === 'privacy' && (
                    <div className="animate-fade-in-up space-y-6">

                        {/* Appearance Toggle */}
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                {isDark ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                                Apariencia
                            </h3>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    {isDark
                                        ? <Moon className="w-5 h-5 text-indigo-400" />
                                        : <Sun className="w-5 h-5 text-amber-500" />}
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{isDark ? 'Modo oscuro' : 'Modo claro'}</span>
                                </div>
                                <button onClick={toggleTheme} className="relative w-11 h-6 flex-shrink-0" aria-label="Cambiar tema">
                                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${isDark ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
                                    <div className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${isDark ? 'translate-x-5' : ''}`}></div>
                                </button>
                            </div>
                        </div>
                        {/* Password — Collapsible Row */}
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                            <button
                                type="button"
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-slate-200">Cambiar contraseña</span>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showPasswordForm ? 'rotate-90' : ''}`} />
                            </button>

                            {showPasswordForm && (
                            <form action="/perfil/password" method="POST" className="px-6 pb-6 pt-1 space-y-5 border-t border-slate-100 dark:border-slate-800 transition-colors">
                            <input type="hidden" name="_token" value={csrfToken} />
                            <input type="hidden" name="_method" value="PUT" />

                            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl flex items-start gap-4 mt-4 border border-teal-100 dark:border-teal-800/30 transition-colors">
                                <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-1 transition-colors" />
                                <p className="text-sm text-teal-800 dark:text-teal-300 opacity-90 transition-colors">Asegúrate de usar una contraseña segura. Te recomendamos usar mayúsculas, números y símbolos.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Contraseña Actual</label>
                                <input type="password" name="current_password" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Nueva Contraseña</label>
                                <input type="password" name="password" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Confirmar Nueva Contraseña</label>
                                <input type="password" name="password_confirmation" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all" />
                            </div>

                            <button type="submit" className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-bold shadow-lg shadow-slate-200 dark:shadow-none hover:bg-slate-900 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                                <Lock className="w-5 h-5" /> Actualizar Contraseña
                            </button>
                            </form>
                            )}
                        </div>

                        {/* Location — Collapsible Row */}
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                            <button
                                type="button"
                                onClick={() => setShowLocationForm(!showLocationForm)}
                                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-700 dark:text-slate-200">Ubicación en emergencias</span>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{Boolean(userData.location_enabled) ? 'Activa' : 'Inactiva'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${Boolean(userData.location_enabled) ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showLocationForm ? 'rotate-90' : ''}`} />
                                </div>
                            </button>

                            {showLocationForm && (
                                <form action="/perfil" method="POST" className="px-6 pb-6 border-t border-slate-100 dark:border-slate-800 pt-5 transition-colors">
                                    <input type="hidden" name="_token" value={csrfToken} />
                                    <input type="hidden" name="_method" value="PATCH" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Activa esta opción para que podamos localizarte cuando actives el botón SOS.</p>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{Boolean(userData.location_enabled) ? 'Ubicación activa' : 'Ubicación inactiva'}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" name="location_enabled" value="true" defaultChecked={Boolean(userData.location_enabled)} className="sr-only peer" onChange={e => e.target.form.submit()} />
                                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                                        </label>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                 {/* Logout */}
                <form method="POST" action="/logout" className="mt-12 text-center">
                    <input type="hidden" name="_token" value={csrfToken || ''} />
                    <button type="submit" className="text-red-500 font-bold hover:text-red-600 dark:hover:text-red-400 flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </button>
                    <p className="text-xs text-slate-300 dark:text-slate-600 mt-2 transition-colors">Versión 2.0.1 • ArcaneCode</p>
                </form>

            </div>

           <BottomNav active="profile" />
        </div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="p-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center border border-slate-100 dark:border-slate-700/50 group-hover:bg-white dark:group-hover:bg-slate-700/50 group-hover:shadow-sm transition-all">
                    {React.cloneElement(icon, { size: 18 })}
                </div>
                <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-0.5 transition-colors">{label}</p>
                    <p className="text-base font-medium text-slate-700 dark:text-slate-200 transition-colors">{value}</p>
                </div>
            </div>
        </div>
    );
}