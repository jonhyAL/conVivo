import React, { useState, useRef, useEffect } from 'react';
import BottomNav from './BottomNav';
import { User, Phone, Calendar, MapPin, Lock, ChevronRight, LogOut, Edit, Camera, Save, X, Plus, Trash2, Heart, CheckCircle, AlertCircle } from 'lucide-react';

export default function Profile({ user: initialUser, success, serverErrors }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    // State for local data management
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // profile, password, family
    const [userData, setUserData] = useState(initialUser);

    useEffect(() => {
        // If there are errors related to password, switch to password tab
        if (serverErrors && serverErrors.length > 0) {
           // Simple heuristic: check if errors contain "password" or match common password validation messages
           const passwordRelated = serverErrors.some(e => e.toLowerCase().includes('password') || e.toLowerCase().includes('contraseña'));
           if (passwordRelated && activeTab !== 'password') {
               setActiveTab('password');
           }
        }
        
        // If success message related to password
        if (success === 'password-updated') {
            setActiveTab('password');
        }
        if (success === 'family-added' || success === 'family-updated' || success === 'family-deleted') {
            setActiveTab('family');
        }
    }, [serverErrors, success]);


    // References for forms to submit programmatically if needed
    const photoFormRef = useRef(null);

    // Helpers
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
        // If it's already YYYY-MM-DD, return it. If it's full ISO, split.
        return dateString.includes('T') ? dateString.split('T')[0] : dateString;
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-slate-600 pb-24 relative">
             {/* Background Decoration */}
             <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200">
                <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mi Perfil</h1>
                    <a href="/dashboard" className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <ChevronRight className="w-6 h-6 rotate-180" /> 
                    </a>
                </div>
            </div>

            <div className="max-w-lg mx-auto px-4 py-6 mb-20 relative z-10">
                
                {/* Feedback Messages */}
                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up">
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
                        <button onClick={() => window.location.href = window.location.pathname} className="ml-auto text-green-500 hover:text-green-700"><X className="w-4 h-4" /></button>
                    </div>
                )}

                {serverErrors && serverErrors.length > 0 && (
                     <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up">
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
                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-indigo-100/50 border border-white mb-8 flex flex-col items-center text-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 pointer-events-none"></div>
                    
                    <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-lg cursor-pointer transform group-hover:scale-105 transition-all duration-300" onClick={handlePhotoClick}>
                            <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center relative">
                                {userData.photo_path ? (
                                    <img src={`/storage/${userData.photo_path}`} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-bold text-indigo-500">{userData.name.charAt(0).toUpperCase()}</span>
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

                    <h2 className="text-2xl font-bold text-slate-800 relative">{userData.name}</h2>
                    <p className="text-slate-500 text-sm mb-4 relative">{userData.email}</p>
                    
                    <div className="flex gap-2 relative z-10">
                        <button 
                            onClick={() => { setIsEditing(!isEditing); setActiveTab('profile'); }}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${isEditing && activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50'}`}
                        >
                            {isEditing && activeTab === 'profile' ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                            {isEditing && activeTab === 'profile' ? 'Cancelar' : 'Editar Datos'}
                        </button>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    <button 
                        onClick={() => { setActiveTab('profile'); setIsEditing(false); }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'profile' ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        Información
                    </button>
                    <button 
                        onClick={() => { setActiveTab('family'); setIsEditing(false); }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'family' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        Familiares
                    </button>
                    <button 
                        onClick={() => { setActiveTab('password'); setIsEditing(false); }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'password' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        Seguridad
                    </button>
                </div>

                {/* CONTENT: Profile Info */}
                {activeTab === 'profile' && (
                    <div className="animate-fade-in-up">
                        {isEditing ? (
                             <form action="/perfil" method="POST" className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
                                <input type="hidden" name="_token" value={csrfToken} />
                                <input type="hidden" name="_method" value="PATCH" />
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre Completo</label>
                                    <input type="text" name="name" defaultValue={userData.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" />
                                </div>
                                {/* Removed Email Field */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Teléfono</label>
                                    <input type="tel" name="phone_number" defaultValue={userData.phone_number || ''} placeholder="55 1234 5678" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Fecha de Nacimiento</label>
                                    <input type="date" name="birthdate" defaultValue={getFormattedDate(userData.birthdate)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ubicación</label>
                                    <input type="text" name="location" defaultValue={userData.location || ''} placeholder="Ciudad, Estado" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" />
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <input type="checkbox" name="location_enabled" value="true" id="loc_enabled" defaultChecked={Boolean(userData.location_enabled)} className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                                    <label htmlFor="loc_enabled" className="text-sm font-medium text-slate-700">Compartir mi ubicación en emergencias</label>
                                </div>

                                <button type="submit" className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                                    <Save className="w-5 h-5" /> Guardar Cambios
                                </button>
                             </form>
                        ) : (
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-2">
                                <InfoItem icon={<User className="text-indigo-500" />} label="Nombre" value={userData.name} />
                                <InfoItem icon={<Phone className="text-indigo-500" />} label="Teléfono" value={userData.phone_number || 'No registrado'} />
                                <InfoItem icon={<Calendar className="text-indigo-500" />} label="Fecha de Nacimiento" value={formatDate(userData.birthdate)} />
                                <InfoItem icon={<MapPin className="text-indigo-500" />} label="Ubicación" value={userData.location || 'No registrada'} />
                                <div className="p-4 flex items-center gap-3 bg-slate-50 rounded-xl mt-4">
                                    <div className={`w-3 h-3 rounded-full ${Boolean(userData.location_enabled) ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                    <span className="text-sm text-slate-600 font-medium">{Boolean(userData.location_enabled) ? 'Ubicación compartida activada' : 'Ubicación desactivada'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* CONTENT: Family Members */}
                {activeTab === 'family' && (
                    <div className="animate-fade-in-up space-y-6">
                        <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100 flex items-start gap-4">
                            <div className="bg-rose-100 p-2 rounded-full text-rose-500 shrink-0">
                                <Heart className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-rose-800">Contactos de Emergencia</h4>
                                <p className="text-sm text-rose-600/80 mt-1">Configura a quién debemos contactar primero en caso de que actives el botón de pánico.</p>
                            </div>
                        </div>

                        {/* Add New Family Member Form */}
                        <form action="/perfil/family" method="POST" className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <input type="hidden" name="_token" value={csrfToken} />
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-indigo-500" /> Agregar Familiar
                            </h3>
                            <div className="space-y-4">
                                <input type="text" name="name" placeholder="Nombre completo" required className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="relationship" placeholder="Parentesco (Ej. Mamá)" required className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
                                    <input type="tel" name="phone_number" placeholder="Teléfono" required className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" name="is_primary_contact" value="1" id="new_primary" className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                                    <label htmlFor="new_primary" className="text-sm font-medium text-slate-600">Este es mi contacto principal</label>
                                </div>
                                <button type="submit" className="w-full py-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl font-bold transition-colors">
                                    Agregar Contacto
                                </button>
                            </div>
                        </form>

                        {/* List Family Members */}
                        <div className="space-y-4">
                            {userData.family_members && userData.family_members.length > 0 ? (
                                userData.family_members.map(member => (
                                    <div key={member.id} className={`bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between ${member.is_primary_contact ? 'border-rose-200 ring-2 ring-rose-50' : 'border-slate-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${member.is_primary_contact ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">{member.name} {member.is_primary_contact && <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-md ml-2">Principal</span>}</h4>
                                                <p className="text-sm text-slate-500 font-medium">{member.relationship} • {member.phone_number}</p>
                                            </div>
                                        </div>
                                        <form action={`/perfil/family/${member.id}`} method="POST" onSubmit={(e) => { if(!confirm('¿Estás seguro?')) e.preventDefault(); }}>
                                            <input type="hidden" name="_token" value={csrfToken} />
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <button type="submit" className="w-10 h-10 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 flex items-center justify-center transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-400">
                                    <p>No tienes familiares registrados</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CONTENT: Password */}
                {activeTab === 'password' && (
                    <div className="animate-fade-in-up">
                        <form action="/perfil/password" method="POST" className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
                            <input type="hidden" name="_token" value={csrfToken} />
                            <input type="hidden" name="_method" value="PUT" />
                            
                            <div className="bg-indigo-50 p-4 rounded-xl flex items-start gap-4 mb-4">
                                <Lock className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                <p className="text-sm text-indigo-800 opacity-90">Asegúrate de usar una contraseña segura. Te recomendamos usar mayúsculas, números y símbolos.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contraseña Actual</label>
                                <input type="password" name="current_password" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nueva Contraseña</label>
                                <input type="password" name="password" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirmar Nueva Contraseña</label>
                                <input type="password" name="password_confirmation" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" />
                            </div>

                            <button type="submit" className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                                <Lock className="w-5 h-5" /> Actualizar Contraseña
                            </button>
                        </form>
                    </div>
                )}

                 {/* Logout */}
                <form method="POST" action="/logout" className="mt-12 text-center">
                    <input type="hidden" name="_token" value={csrfToken || ''} />
                    <button type="submit" className="text-red-500 font-bold hover:text-red-600 flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl hover:bg-red-50 transition-colors">
                        <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </button>
                    <p className="text-xs text-slate-300 mt-2">Versión 2.0.1 • ArcaneCode</p>
                </form>

            </div>

           <BottomNav active="profile" />
        </div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="p-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                    {React.cloneElement(icon, { size: 18 })}
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-base font-medium text-slate-700">{value}</p>
                </div>
            </div>
        </div>
    );
}