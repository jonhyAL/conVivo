import React, { useState } from 'react';
import { LogOut, MessageCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';
import ChatWidget from './ChatWidget';

export default function MobileHeader({ user }) {
    const [showChat, setShowChat] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-3xl border-b border-white/5 flex justify-between items-center px-4 h-14 shadow-sm">
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition">
                    <LogOut size={24} />
                </button>
                
                <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <img src="/images/logos/logo-unico.png" alt="Convivo" className="h-12 w-auto" />
                </h1>

                <button onClick={() => setShowChat(true)} className="text-slate-400 hover:text-teal-400 transition relative">
                    <MessageCircle size={24} />
                    {/* Notification dot placeholder */}
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                </button>
            </header>

            {/* Full Screen Chat Overlay */}
            {showChat && (
                <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col h-[100dvh] animate-in slide-in-from-right duration-200">
                    <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
                        <button onClick={() => setShowChat(false)} className="p-2 -ml-2 text-slate-400 hover:text-white">
                            <ArrowRight className="rotate-180" />
                        </button>
                        <span className="font-bold text-white">Mensajes</span>
                        <div className="w-8"></div>
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                         <ChatWidget currentUser={user} />
                    </div>
                </div>
            )}
        </>
    );
}
