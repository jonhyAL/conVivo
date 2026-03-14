import React from 'react';

const Services = () => {
    return (
        <section className="relative pt-32 pb-40 z-10 bg-transparent text-slate-800 dark:text-slate-200 overflow-hidden transition-colors duration-500">
             {/* Gradient Orb removed for performance */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] dark:opacity-100 pointer-events-none transition-colors"></div>
                 {/* Pixeles Aleatorios (Desde arriba) */}
                 <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"> 
                     <div className="absolute top-[5%] left-[5%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0s' }}></div>
                     <div className="absolute top-[15%] left-[5%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}></div>
                     
                     <div className="absolute top-[5%] right-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
                     <div className="absolute top-[18%] right-[15%] w-16 h-16 bg-teal-500/15 dark:bg-teal-400/20 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
                     
                     {/* Cuadros flotantes animados */}
                     <div className="absolute top-[25%] left-[45%] w-4 h-4 bg-teal-500/40 dark:bg-teal-300/30 rounded-sm animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }}></div>
                     <div className="absolute top-[12%] right-[25%] w-2 h-2 bg-teal-500/60 dark:bg-teal-300/50 rounded-sm animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }}></div>
                 </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                     <span className="text-teal-600 dark:text-teal-500 font-mono tracking-widest text-sm uppercase mb-4 inline-block border border-teal-500/20 px-4 py-1 rounded-full bg-teal-500/5">Nuestro Ecosistema</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter mb-8 leading-tight transition-colors duration-500">
                        La suite completa de <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-teal-200 dark:to-indigo-300">bienestar escolar.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-500">
                        Desde la prevención hasta la intervención. Herramientas diseñadas para cada etapa crítica de la seguridad estudiantil.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Servicio: Reportes */}
                    <ServiceCard 
                        icon="📝" 
                        title="Sistema de Reportes" 
                        desc="Canal encriptado y anónimo. Permite a los estudiantes alzar la voz sin miedo a represalias. Tablero de gestión para administradores."
                        color="from-teal-500/20 to-emerald-500/5 hover:border-teal-500/50"
                        accent="text-teal-500 dark:text-teal-400"
                    />

                    {/* Servicio: Citas */}
                    <ServiceCard 
                        icon="📅" 
                        title="Agenda Digital" 
                        desc="Optimice el tiempo de sus especialistas. Sistema de citas automatizado con recordatorios y sincronización de calendarios."
                        color="from-indigo-500/20 to-purple-500/5 hover:border-indigo-500/50"
                        accent="text-indigo-500 dark:text-indigo-400"
                    />

                    {/* Servicio: Recursos */}
                    <ServiceCard 
                        icon="📚" 
                        title="Centro de Recursos" 
                        desc="Base de conocimientos dinámica. Artículos, videos y guías interactivas sobre salud mental y resolución de conflictos."
                        color="from-blue-500/20 to-cyan-500/5 hover:border-blue-500/50"
                        accent="text-blue-500 dark:text-blue-400"
                    />

                    {/* Servicio: SOS */}
                    <ServiceCard 
                        icon="🚨" 
                        title="Protocolo SOS" 
                        desc="Botón de emergencia digital de latencia cero. Notificación instantánea a autoridades escolares y servicios de emergencia."
                        color="from-red-500/20 to-rose-500/5 hover:border-red-500/50"
                        accent="text-red-500 dark:text-red-400"
                        animate={true}
                    />

                    {/* Servicio: Dashboard */}
                    <ServiceCard 
                        icon="📊" 
                        title="Analytics & Insights" 
                        desc="Tome decisiones basadas en datos. Visualice patrones de comportamiento y mida la efectividad de sus programas de intervención."
                        color="from-purple-500/20 to-fuchsia-500/5 hover:border-purple-500/50"
                        accent="text-purple-500 dark:text-purple-400"
                    />

                     {/* CTA Card */}
                     <div className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/20 overflow-hidden shadow-xl dark:shadow-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 dark:from-teal-900/40 to-slate-50 dark:to-slate-900 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors">¿Listo para comenzar?</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-8 font-light transition-colors">Transforme su escuela hoy mismo.</p>
                            <a href="/contacto" className="inline-block px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-full hover:bg-slate-800 dark:hover:bg-teal-50 transition-colors shadow-lg hover:shadow-slate-400/20 dark:hover:shadow-white/20">
                                Solicitar Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ icon, title, desc, color, accent, animate }) => (
    <div className={`group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-lg dark:shadow-none ${color}`}>
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="relative z-10">
            <div className={`w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 flex items-center justify-center mb-8 text-4xl shadow-inner ${animate ? 'animate-pulse' : ''} group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:${accent} transition-colors`}>{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-light group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">{desc}</p>
        </div>
    </div>
);

export default Services;
