import React, { useState, useRef, useEffect } from 'react';
import { Home, Book, LifeBuoy, Calendar, User, AlertTriangle, X } from 'lucide-react';

export default function BottomNav({ active }) {
    const [showSOSSlider, setShowSOSSlider] = useState(false);

    return (
        <>
            <nav className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 z-50 cursor-pointer" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <div className="grid grid-cols-5 h-16 max-w-7xl mx-auto">
                    <NavButton href="/dashboard" icon={Home} label="Inicio" active={active === 'dashboard'} />
                    <NavButton href="/recursos-protocolos" icon={Book} label="Recursos" active={active === 'resources'} />
                    
                    <button 
                        onClick={() => setShowSOSSlider(true)}
                        className={`flex flex-col items-center justify-center transition group relative ${active === 'sos' ? 'text-red-400 bg-white/5' : 'text-red-500 hover:text-red-400 hover:bg-white/5'}`}
                    >
                        <div className="bg-red-900/20 rounded-full p-2 mb-1 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.4)] relative">
                            <LifeBuoy className="w-6 h-6 animate-pulse" />
                            {/* Ripple Effect hint */}
                            <span className="absolute inset-0 rounded-full animate-ping bg-red-500/20"></span>
                        </div>
                        <span className="text-[9px] font-bold tracking-wide">SOS</span>
                    </button>

                    <NavButton href="/citas/agendar" icon={Calendar} label="Citas" active={active === 'appointments'} />
                    <NavButton href="/perfil" icon={User} label="Perfil" active={active === 'profile'} />
                </div>
            </nav>

            {/* SOS Confirmation Overlay */}
            {showSOSSlider && (
                <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-200">
                    <button 
                        onClick={() => setShowSOSSlider(false)}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-10 max-w-xs">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                            <AlertTriangle size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Modo de Emergencia</h2>
                        <p className="text-slate-400 text-sm">Desliza el botón para activar el protocolo de ayuda inmediata discretamente.</p>
                    </div>

                    <div className="w-full max-w-sm">
                        <SlideToSOS onCancel={() => setShowSOSSlider(false)} />
                    </div>
                    
                    <button 
                        onClick={() => setShowSOSSlider(false)}
                        className="mt-8 text-slate-500 text-sm hover:text-white"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </>
    );
}

function SlideToSOS({ onCancel }) {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState(0);
    const [completed, setCompleted] = useState(false);
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    
    // Logic remains same, only update styles in return

    const handleStart = (clientX) => { /* ... same ... */ setIsDragging(true); window.addEventListener('mousemove', handleMove); window.addEventListener('mouseup', handleEnd); window.addEventListener('touchmove', handleTouchMove, { passive: false }); window.addEventListener('touchend', handleEnd); };
    const handleMove = (e) => { 
        if (!containerRef.current) return; 
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const rect = containerRef.current.getBoundingClientRect();
        const buttonWidth = 64; 
        const maxOffset = rect.width - buttonWidth;
        let newX = clientX - rect.left - (buttonWidth / 2);
        if (newX < 0) newX = 0; if (newX > maxOffset) newX = maxOffset;
        setOffset(newX);
        if (newX > maxOffset * 0.9) triggerSOS();
    };
    const handleTouchMove = (e) => { handleMove(e); };
    const handleEnd = () => { setIsDragging(false); window.removeEventListener('mousemove', handleMove); window.removeEventListener('mouseup', handleEnd); window.removeEventListener('touchmove', handleTouchMove); window.removeEventListener('touchend', handleEnd); if (!completed) setOffset(0); };
    const triggerSOS = () => { if (completed) return; setCompleted(true); window.removeEventListener('mousemove', handleMove); window.removeEventListener('mouseup', handleEnd); window.removeEventListener('touchmove', handleTouchMove); window.removeEventListener('touchend', handleEnd); window.location.href = '/system-check'; };

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-16 bg-slate-800/50 rounded-full border border-slate-700 overflow-hidden shadow-inner touch-none select-none"
        >
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-red-500/50 font-bold tracking-[0.2em] uppercase transition-opacity duration-300 ${isDragging ? 'opacity-20' : 'opacity-100'} text-xs`}>
                    Deslizar para confirmar
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
            </div>

            {/* Slider Button */}
            <div 
                ref={sliderRef}
                onMouseDown={(e) => handleStart(e.clientX)}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                style={{ transform: `translateX(${offset}px)`, transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
                className={`
                    absolute top-0 bottom-0 w-16 rounded-full 
                    flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-xl
                    ${isDragging ? 'scale-105' : 'scale-100'}
                    ${completed ? 'bg-red-500' : 'bg-gradient-to-r from-red-600 to-red-500'}
                    border border-red-400/30
                `}
            >
                {completed ? (
                    <AlertTriangle className="text-white animate-ping" />
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-white font-bold text-xl">»</span>
                    </div>
                )}
            </div>

            {/* Progress Fill */}
            <div 
                style={{ width: `${offset + 32}px`, transition: isDragging ? 'none' : 'width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
                className="absolute left-0 top-0 bottom-0 bg-red-600/20 pointer-events-none rounded-l-full"
            ></div>
        </div>
    );
}

function NavButton({ href, icon: Icon, label, active }) {
    return (
        <a href={href} className={`flex flex-col items-center justify-center transition group ${active ? 'text-teal-400 bg-white/5' : 'text-slate-400 hover:text-teal-400 hover:bg-white/5'}`}>
            <Icon className={`w-6 h-6 mb-1 transition-transform ${active ? '-translate-y-0.5' : 'group-hover:-translate-y-0.5'}`} />
            <span className="text-[9px] font-medium tracking-wide">{label}</span>
        </a>
    );
}
