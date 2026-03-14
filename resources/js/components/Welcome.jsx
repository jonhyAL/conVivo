import React, { useState, useEffect } from 'react';
import HeroReact from './HeroReact';

const BannerSection = () => (
    <section className="relative py-32 px-4 z-10 w-full overflow-hidden transition-colors duration-300">
         {/* Fondo extendido */}
         <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent transition-colors"></div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent transition-colors"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
            <div className="relative bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 p-1 group shadow-xl dark:shadow-none transition-all duration-300">
                <div className="relative rounded-[2.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-teal-600/10 dark:bg-teal-500/10 mix-blend-overlay z-10 transition-colors"></div>
                     <img 
                        src="https://988lifeline.org/wp-content/uploads/2024/06/988-hero-2048x683.png" 
                        alt="Banner de apoyo comunitario" 
                        fetchPriority="high"
                        className="w-full h-[500px] object-cover filter grayscale-[10%] dark:grayscale-[30%] contrast-[1.1] transition-all duration-[2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 dark:from-slate-950 dark:via-slate-900/60 to-transparent z-20 transition-colors"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-10 md:p-20 z-30 max-w-4xl">
                        <div className="inline-block px-4 py-1 mb-6 rounded-full border border-teal-200 dark:border-teal-500/30 bg-teal-50/80 dark:bg-teal-500/10 backdrop-blur-md shadow-sm dark:shadow-none transition-colors">
                            <span className="text-teal-700 dark:text-teal-300 font-semibold tracking-wide text-sm uppercase transition-colors">Comunidad Unida</span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight transition-colors">
                            Juntos podemos <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-200 dark:to-blue-200 transition-all">hacer la diferencia.</span>
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl font-light leading-relaxed max-w-2xl border-l-2 border-teal-500/50 pl-6 transition-colors">
                            Tu voz tiene poder. Usa esta plataforma para expresarte con seguridad y proteger a los demás en tu entorno escolar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const FeatureCard = ({ color, title, description, icon }) => {
    return (
        <div className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-sm shadow-lg dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-all duration-300 shadow-sm dark:shadow-[0_0_15px_-3px_rgba(20,184,166,0.3)]">
                    <div className="w-7 h-7">{icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-200 transition-colors">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-light group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    {description}
                </p>
            </div>
        </div>
    );
};

const FeaturesSection = () => (
    <section className="relative py-32 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
                <span className="text-teal-600 dark:text-teal-500 font-semibold tracking-widest text-xs uppercase mb-4 block transition-colors">Ecosistema Integral</span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white tracking-tighter transition-colors">
                    Todo lo que su institución necesita.
                </h2>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed transition-colors">
                    Arquitectura de seguridad digital diseñada específicamente para entornos educativos modernos.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                <FeatureCard 
                    color="blue"
                    title="Protocolos de Seguridad"
                    description="Sistema de gestión de incidentes y reportes anónimos. Cumplimiento normativo y protección total de la identidad del estudiante."
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    }
                />
                <FeatureCard 
                    color="teal"
                    title="Red de Especialistas"
                    description="Conexión encriptada con psicólogos y orientadores. Agendamiento inteligente y expedientes clínicos digitales seguros."
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    }
                />
                <FeatureCard 
                    color="blue"
                    title="Biblioteca de Recursos"
                    description="Centro de conocimiento con material preventivo curado por expertos. Talleres, guías y contenido multimedia actualizado."
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    }
                />
                <FeatureCard 
                    color="teal"
                    title="Herramientas de Bienestar"
                    description="Suite de 'Wellness' digital incluyendo diario emocional encriptado y herramientas de seguimiento del estado de ánimo."
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    }
                />
            </div>
        </div>
    </section>
);

const CarouselCard = ({ title, description, image, isAlert, special }) => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
             <div className={`group relative bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 border h-full ring-1 ${isAlert ? 'shadow-red-200/30 dark:shadow-red-900/10 hover:shadow-red-900/20 border-red-200 dark:border-red-900/30 ring-red-200/50 dark:ring-red-900/20' : 'shadow-slate-200/50 dark:shadow-blue-900/10 hover:shadow-blue-900/20 border-slate-200 dark:border-slate-800 ring-slate-200 dark:ring-slate-800'}`}>
                <div className="relative h-64 overflow-hidden rounded-t-[2.5rem]">
                    <img 
                        src={image} 
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 dark:opacity-80"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isAlert ? 'from-red-950 via-red-900/40' : 'from-slate-900 via-slate-900/40'} to-transparent transition-colors`}></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className={`text-2xl font-bold drop-shadow-lg ${isAlert ? 'text-red-50' : 'text-slate-100'}`}>{title}</h3>
                    </div>
                </div>
                <div className="p-8">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-4 transition-colors">{description}</p>
                    {special}
                </div>
            </div>
        </div>
    );
};

const CarouselSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const totalItems = 6;

    const updateDimensions = () => {
        if (window.innerWidth >= 1024) setItemsPerView(3);
        else if (window.innerWidth >= 768) setItemsPerView(2);
        else setItemsPerView(1);
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const maxIndex = Math.max(0, totalItems - itemsPerView);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovered, maxIndex]);

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
    };

    const percentage = -(currentIndex * (100 / itemsPerView));


    const cards = [
        {
            title: "Gestión de Counseling",
            description: "Centralice las citas con los consejeros escolares. Permite a los estudiantes agendar sesiones de forma privada y al personal llevar un control eficiente.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop"
        },
        {
            title: "Detección de Riesgos",
            description: "Herramientas analíticas para identificar patrones de comportamiento o reportes que sugieran riesgos de bullying o problemas emocionales.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
        },
        {
            title: "Talleres Grupales",
            description: "Organice y difunda talleres de integración y salud mental. Gestione inscripciones y asistencias a grupos de apoyo dentro de la misma plataforma.",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop"
        },
        {
            title: "Canalización Externa",
            description: "Sistema de referencia seguro para conectar a estudiantes con psiquiatras y especialistas externos verificados cuando el caso requiera atención clínica avanzada.",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop"
        },
        {
            title: "Módulo Familiar",
            description: "Facilite la comunicación con padres y tutores. Agende reuniones de seguimiento y comparta recursos para extender el apoyo al hogar.",
            image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop"
        },
        {
            title: "🚨 Alertas de Crisis",
            description: "Botón de pánico digital y sistema de notificaciones inmediatas para situaciones de emergencia, conectando con las líneas 911 y autoridades del plantel.",
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
            isAlert: true,
            special: (
                <div className="flex gap-2 opacity-50 pointer-events-none grayscale">
                    <span className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-center rounded-lg font-semibold text-xs border border-slate-200 dark:border-slate-700">Integración 911</span>
                    <span className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-center rounded-lg font-semibold text-xs border border-slate-200 dark:border-slate-700">Integración 988</span>
                </div>
            )
        }
    ];

    return (
        <section id="ayuda" className="relative py-24 px-4 bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
             {/* Fondo decorativo */}
             <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent z-0 transition-colors duration-500"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                     <span className="text-blue-500 font-semibold tracking-widest text-xs uppercase mb-4 block">Módulos Especializados</span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white tracking-tighter transition-colors duration-500">
                        Gestión Integral de Ayuda
                    </h2>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-light transition-colors duration-500">
                        Módulos diseñados para optimizar cada aspecto de la atención psicológica y seguridad escolar.
                    </p>
                </div>

                <div 
                    className="relative mb-24"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="overflow-hidden p-4 -m-4">
                        <div 
                            className="flex transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
                            style={{ transform: `translateX(${percentage}%)` }}
                        >
                            {cards.map((card, idx) => (
                                <CarouselCard key={idx} {...card} />
                            ))}
                        </div>
                    </div>

                    <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-teal-500 text-teal-500 dark:text-teal-400 hover:text-white p-4 rounded-full border border-slate-200 dark:border-slate-700 hover:border-teal-400 transition-all z-20 group shadow-lg">
                        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-teal-500 text-teal-500 dark:text-teal-400 hover:text-white p-4 rounded-full border border-slate-200 dark:border-slate-700 hover:border-teal-400 transition-all z-20 group shadow-lg">
                        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    <div className="flex justify-center gap-3 mt-12">
                        {Array.from({ length: totalItems }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-12 bg-teal-500' : 'w-4 bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative rounded-[3rem] p-12 overflow-hidden text-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm group shadow-2xl dark:shadow-none transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-teal-50 dark:from-blue-900/20 dark:via-slate-900/50 dark:to-teal-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                     <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-500">
                            ¿Listo para transformar su escuela?
                        </h3>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto font-light transition-colors duration-500">
                            Agenda una demostración hoy y descubre cómo conVivo puede elevar los estándares de seguridad y bienestar en tu comunidad.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <a href="/contacto" className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-teal-50 rounded-full font-bold transition-all shadow-lg hover:scale-105 transform">
                                Contactar Ventas
                            </a>
                            <a href="/nosotros" className="px-10 py-4 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-full font-medium transition-all hover:border-slate-400 dark:hover:border-slate-500">
                                Conocer Más
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Welcome() {
    return (
        <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 selection:bg-teal-500 selection:text-white transition-colors duration-500">
            <HeroReact />
            <BannerSection />
            <FeaturesSection />
            <CarouselSection />
        </div>
    );
}
