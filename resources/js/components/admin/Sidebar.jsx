import React from 'react';
import { LayoutDashboard, Users, Calendar, FileText, UserCheck, ShieldAlert, LogOut, MessageSquare, Mail } from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection }) {
    const menuItems = [
        { id: 'inicio', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'mensajes', label: 'Buzón', icon: Mail },
        { id: 'citas', label: 'Citas', icon: Calendar },
        { id: 'especialistas', label: 'Especialistas', icon: UserCheck },
        { id: 'usuarios', label: 'Usuarios', icon: Users },
        { id: 'reportes', label: 'Reportes', icon: FileText },
        { id: 'chat', label: 'Chat en Vivo', icon: MessageSquare },
    ];

    const logout = () => {
        // Submit the hidden logout form or create one dynamically
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/logout';
        
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = '_token';
        hiddenField.value = csrfToken;

        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <aside className="w-64 bg-black/40 backdrop-blur-md border-r border-white/10 hidden md:flex flex-col">
            <div className="p-6">
                <img src="/images/logos/logo-fullwhite.png" alt="ArcaneCode" className="h-33 w-auto" />
                <p className="text-sm text-gray-400 mt-2">Admin Portal</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                isActive 
                                ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
