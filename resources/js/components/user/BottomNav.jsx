import React, { useState, useRef } from 'react';
import { Home, Book, Calendar, User, AlertTriangle, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function BottomNav({ active }) {
    const [showSOSSlider, setShowSOSSlider] = useState(false);

    return (
        <>
            {/* Floating bottom bar: pill nav + SOS side by side */}
            <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center px-4"
                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 14px)' }}>

                {/* Nav pill */}
                <div className="flex items-center h-14 md:h-16 rounded-full bg-white/80 dark:bg-slate-800/75 backdrop-blur-2xl border border-slate-200/60 dark:border-white/[0.08] gap-1 px-2 md:px-3 md:gap-1"
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)' }}>
                    <NavButton href="/dashboard" icon={Home} label="Inicio" active={active === 'dashboard'} />
                    <NavButton href="/recursos-protocolos" icon={Book} label="Recursos" active={active === 'resources'} />
                    <NavButton href="/citas/agendar" icon={Calendar} label="Citas" active={active === 'appointments'} />
                    <NavButton href="/perfil" icon={User} label="Perfil" active={active === 'profile'} />
                </div>

                {/* SOS — same row, vertically centered with the pill */}
                <button
                    onClick={() => setShowSOSSlider(true)}
                    className="relative ml-3 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-red-500 rounded-full shrink-0"
                    style={{ boxShadow: '0 0 20px rgba(239,68,68,0.5), 0 6px 20px rgba(0,0,0,0.35)' }}
                    aria-label="Emergencia SOS"
                >
                    <AlertTriangle className="w-6 h-6 text-white" strokeWidth={2.5} />
                    <span className="absolute inset-0 rounded-full animate-ping bg-red-400/25 pointer-events-none"></span>
                </button>
            </div>

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
    // Use Inertia Link for SPA navigation when inside an Inertia app,
    // otherwise fall back to a plain <a> (e.g. standalone Blade page mounts)
    const NavComp = window.__inertiaActive ? Link : 'a';
    return (
        <NavComp href={href} className={`flex items-center gap-1.5 rounded-full px-3 py-2.5 md:px-5 md:py-3 transition-all duration-200 ${
            active
                ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}>
            <Icon className="w-5 h-5 md:w-[22px] md:h-[22px] shrink-0" strokeWidth={active ? 2.5 : 1.8} />
            {active && (
                <span className="text-xs md:text-sm font-bold whitespace-nowrap">{label}</span>
            )}
        </NavComp>
    );
}
