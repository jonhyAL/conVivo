import React from 'react';

export default function HeroReact() {
    return (
        <section className="relative px-4 pt-12 pb-20 z-10">
            <div className="max-w-7xl mx-auto">
                {/* Tarjeta Principal Oscura */}
                <div className="relative bg-slate-900 shadow-2xl shadow-slate-900/20 rounded-[2.5rem] p-1 md:p-2 overflow-hidden group border border-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 opacity-100 rounded-[2.3rem]"></div>
                    
                    <div className="relative p-12 md:p-20 overflow-hidden rounded-[2rem]">
                        {/* Efectos decorativos de fondo */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 mix-blend-overlay"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-20 -mb-20 mix-blend-overlay"></div>

                        {/* Imagen de fondo difuminada */}
                        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                            <img src="/images/logos/logo-unico.png" 
                                 alt="Background Decoration" 
                                 className="w-full h-full object-contain opacity-10 blur-sm scale-100 transform transition-transform duration-1000 group-hover:scale-105 mix-blend-overlay" />
                        </div>
                    
                        <div className="relative text-center z-10">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg leading-tight tracking-tight">
                                Transforma la convivencia escolar<br />con <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-200">conVivo</span>.
                            </h1>
                        
                            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                                La plataforma integral diseñada para <span className="text-teal-400 font-semibold">escuelas privadas</span> que buscan priorizar la salud mental, seguridad y bienestar de sus estudiantes.
                            </p>
                        
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#contacto" 
                                   className="inline-block px-10 py-5 bg-gradient-to-r from-teal-700 to-teal-900 text-white hover:from-teal-600 hover:to-teal-800 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-teal-900/20 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 border border-teal-500/20">
                                    Solicitar Demo
                                </a>
                                <a href="#mas-info" 
                                   className="inline-block px-10 py-5 bg-slate-800/50 backdrop-blur-md border border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white text-lg font-semibold rounded-2xl transition-all duration-300">
                                    Saber más
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
