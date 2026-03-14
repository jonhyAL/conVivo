import React, { useState } from 'react';
import { LogOut, MessageCircle, ArrowLeft } from 'lucide-react';
import ChatWidget from './ChatWidget';

export default function MobileHeader({ user }) {
    const [showChat, setShowChat] = useState(false);

    const handleLogout = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/logout';
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = '_token';
        input.value = document.querySelector('meta[name="csrf-token"]')?.content || '';
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/50 transition-colors"
                style={{ paddingTop: 'env(safe-area-inset-top)' }}>
              <div className="flex justify-between items-center px-4 h-14 max-w-7xl mx-auto">
                <button onClick={handleLogout} className="text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition">
                    <LogOut size={22} />
                </button>
                
                <h1 className="tracking-tight flex items-center gap-2">
                    <img src="/images/logos/logo-unico.png" alt="Convivo" className="h-12 w-auto" />
                </h1>

                <button onClick={() => setShowChat(true)} className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition relative">
                    <MessageCircle size={22} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>
              </div>
            </header>

            {/* Full Screen Chat */}
            {showChat && (
                <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors animate-in slide-in-from-right duration-200" style={{height:'100dvh'}}>
                    {/* Chat header — matches main header style */}
                    <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-14 bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/50 transition-colors shrink-0"
                        style={{ paddingTop: 'env(safe-area-inset-top)', height: 'calc(3.5rem + env(safe-area-inset-top))' }}>
                        <button
                            onClick={() => setShowChat(false)}
                            className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition rounded-xl"
                        >
                            <ArrowLeft size={22} />
                        </button>
                        <span className="font-bold text-slate-900 dark:text-white text-base">Mensajes</span>
                        <div className="w-10" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ChatWidget currentUser={user} />
                    </div>
                </div>
            )}
        </>
    );
}
