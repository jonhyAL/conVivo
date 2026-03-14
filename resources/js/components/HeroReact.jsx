import React from 'react';

export default function HeroReact() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent px-4 transition-colors duration-300">
            {/* Fondo con efectos sutiles y elegantes (Blobs removidos para mejor rendimiento, mantenemos el grid) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none transition-colors"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center">
                {/* Badge flotante elegante */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60 backdrop-blur-md mb-8 hover:border-teal-500/30 transition-colors cursor-default select-none shadow-sm dark:shadow-none">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 dark:bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600 dark:bg-teal-500"></span>
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 text-xs uppercase tracking-widest font-semibold transition-colors">Plataforma Integral Escolar</span>
                </div>

                {/* Título Masivo Estilo Editorial */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.95] mb-8 transition-colors">
                    Transforma la <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 dark:from-teal-200 dark:via-cyan-200 dark:to-blue-200 transition-all">
                        convivencia escolar.
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide transition-colors">
                    Salud mental, seguridad y bienestar optimizados para instituciones educativas privadas de alto rendimiento.
                </p>

                {/* Botones Minimalistas y Modernos */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                    <a href="/contacto" 
                       className="group relative px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 text-lg font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:bg-slate-800 dark:hover:bg-white overflow-hidden w-full sm:w-auto text-center">
                        <span className="relative z-10">Solicitar Demo</span>
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-teal-50/10 dark:group-hover:bg-slate-900/5"></div>
                    </a>
                    <a href="/servicios" 
                       className="group px-8 py-4 text-slate-600 dark:text-slate-300 text-lg font-medium transition-all duration-300 hover:text-teal-600 dark:hover:text-white flex items-center justify-center gap-2 w-full sm:w-auto text-center">
                        Explorar soluciones
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>
            
            {/* Efecto de Descomposición Tech (Grid + Pixels) */}
            <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden z-0 pointer-events-none">
                 {/* Grid Base */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.05] dark:opacity-[0.03] [mask-image:linear-gradient(to_top,black_20%,transparent_90%)] transition-colors"></div>
                 
                 {/* Pixeles Aleatorios (Simulando descomposición digital) */}
                 <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent)]"> 
                     <div className="absolute bottom-[0] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20"></div>
                     <div className="absolute bottom-[4rem] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10"></div>
                     <div className="absolute bottom-[8rem] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 opacity-50"></div>
                     
                     <div className="absolute bottom-[0] left-[35%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20"></div>
                     
                     <div className="absolute bottom-[0] right-[30%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20"></div>
                     <div className="absolute bottom-[4rem] right-[30%] w-16 h-16 bg-teal-500/15 dark:bg-teal-400/20"></div>
                     
                     <div className="absolute bottom-[0] right-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20"></div>
                     <div className="absolute bottom-[4rem] right-[10%] w-16 h-16 bg-teal-500/15 dark:bg-teal-400/20"></div>
                     <div className="absolute bottom-[8rem] right-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 opacity-50"></div>
                     
                     {/* Cuadros flotantes animados */}
                     <div className="absolute bottom-[20%] left-[50%] w-4 h-4 bg-teal-500/40 dark:bg-teal-300/30 rounded-sm animate-pulse duration-700"></div>
                     <div className="absolute bottom-[30%] left-[55%] w-2 h-2 bg-teal-500/60 dark:bg-teal-300/50 rounded-sm animate-pulse duration-1000"></div>
                     <div className="absolute bottom-[15%] right-[25%] w-3 h-3 bg-teal-500/50 dark:bg-teal-300/40 rounded-sm animate-pulse duration-1000"></div>
                 </div>

                 {/* Degradado para suavizar el corte con la siguiente sección */}
                 <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent transition-colors"></div>
            </div>
        </section>
    );
}
