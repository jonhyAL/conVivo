import React from 'react';

const About = () => {
    return (
        <section className="relative pt-32 pb-40 z-10 bg-transparent text-slate-800 dark:text-slate-200 overflow-hidden transition-colors duration-500">
             {/* Background Gradients removed for performance optimization */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] dark:opacity-100 pointer-events-none transition-colors"></div>
                 {/* Pixeles Aleatorios (Invertido para que aparezca desde arriba tras el título) */}
                 <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"> 
                     <div className="absolute top-[5%] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0s' }}></div>
                     <div className="absolute top-[15%] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 animate-pulse" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
                     <div className="absolute top-[25%] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 opacity-50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
                     
                     <div className="absolute top-[5%] left-[40%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
                     
                     <div className="absolute top-[5%] right-[20%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}></div>
                     <div className="absolute top-[15%] right-[20%] w-16 h-16 bg-teal-500/15 dark:bg-teal-400/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '2.5s' }}></div>
                     
                     {/* Cuadros flotantes animados */}
                     <div className="absolute top-[20%] left-[50%] w-4 h-4 bg-teal-500/40 dark:bg-teal-300/30 rounded-sm animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.2s' }}></div>
                     <div className="absolute top-[10%] right-[30%] w-2 h-2 bg-teal-500/60 dark:bg-teal-300/50 rounded-sm animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.2s' }}></div>
                 </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-4xl mb-32">
                    <span className="text-teal-600 dark:text-teal-500 font-mono tracking-widest text-sm uppercase mb-6 block">/ Nuestra Misión</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[1.1] mb-8 transition-colors duration-500">
                        Redefiniendo la <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-200 dark:to-cyan-400">seguridad escolar.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed transition-colors duration-500">
                        Creamos tecnología que protege. Nacimos con el propósito de erradicar el silencio en las aulas y construir entornos donde cada estudiante se sienta seguro y escuchado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-40">
                    <div className="space-y-12">
                        <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-colors duration-500">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">Prevención Activa</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed transition-colors duration-500">
                                Más allá de reaccionar, nuestros sistemas detectan patrones de riesgo antes de que se conviertan en crisis. El reporte anónimo es solo el primer paso.
                            </p>
                        </div>
                        <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors duration-500">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">Salud Mental Accesible</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed transition-colors duration-500">
                                Democratizamos el acceso a la ayuda psicológica. Eliminamos las barreras del estigma y la burocracia para conectar alumnos con especialistas.
                            </p>
                        </div>
                        <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors duration-500">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">Cultura de Cuidado</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed transition-colors duration-500">
                                No solo vendemos software; impulsamos un cambio cultural. Herramientas que fomentan la empatía, el respeto y la responsabilidad comunitaria.
                            </p>
                        </div>
                    </div>
                     <div className="relative group">
                         <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 rounded-[2rem] transform rotate-3 blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-700"></div>
                         <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" 
                            alt="Team Collaboration" 
                            className="relative rounded-[2rem] shadow-2xl filter grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700 object-cover w-full h-[600px] border border-white/10"
                         />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-40">
                    <div className="relative group order-2 md:order-1">
                        <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/20 to-pink-600/20 rounded-[2rem] transform -rotate-3 blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-700"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                            alt="Vision future" 
                            className="relative rounded-[2rem] shadow-2xl filter grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700 object-cover w-full h-[500px] border border-white/10"
                        />
                    </div>
                    
                    <div className="space-y-8 order-1 md:order-2">
                        <span className="text-purple-500 font-mono tracking-widest text-sm uppercase block">/ Visión 2030</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Un futuro sin miedo.</h2>
                        <p className="text-xl text-slate-400 leading-relaxed font-light">
                            Aspiramos a ser el estándar global en infraestructura de bienestar escolar. Imaginamos un mundo donde ninguna institución educativa carezca de las herramientas necesarias para proteger a su comunidad más vulnerable: los estudiantes.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <span className="text-blue-500 font-mono tracking-widest text-sm uppercase mb-12 block">/ Valores Nucleares</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValueCard icon="❤️" title="Empatía Radical" text="Sentimos lo que ellos sienten. El diseño centrado en el humano es nuestra prioridad." color="hover:border-rose-500/50 hover:bg-rose-500/5" />
                        <ValueCard icon="🛡️" title="Integridad Total" text="Transparencia absoluta. Protegemos los datos con los estándares más altos de la industria." color="hover:border-emerald-500/50 hover:bg-emerald-500/5" />
                        <ValueCard icon="🚀" title="Innovación Ágil" text="Iteramos rápido. La tecnología cambia, y las amenazas también. Nosotros vamos un paso adelante." color="hover:border-blue-500/50 hover:bg-blue-500/5" />
                        <ValueCard icon="🔒" title="Privacidad Primero" text="El anonimato no es opcional. Es la base de la confianza en nuestra plataforma." color="hover:border-amber-500/50 hover:bg-amber-500/5" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ValueCard = ({ icon, title, text, color }) => (
    <div className={`p-8 rounded-3xl bg-slate-900 border border-slate-800 transition-all duration-500 hover:-translate-y-2 group ${color}`}>
        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
        <h3 className="font-bold text-lg text-white mb-3">{title}</h3>
        <p className="text-sm text-slate-400 font-light leading-relaxed">{text}</p>
    </div>
);

export default About;
