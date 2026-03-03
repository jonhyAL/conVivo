import React, { useState, useEffect } from 'react';
import HeroReact from './HeroReact';

const BannerSection = () => (
    <section className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
            <div className="relative bg-white shadow-2xl shadow-blue-900/10 rounded-[3rem] overflow-hidden border border-slate-200 p-2 ring-1 ring-slate-100/50">
                <div className="relative group rounded-[2.5rem] overflow-hidden">
                    <div className="relative z-10">
                        <div className="absolute -top-6 left-0 right-0 h-16 z-0 pointer-events-none opacity-60">
                            <svg className="wave-animate absolute w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                                <path d="M0,50 Q300,10 600,50 T1200,50 L1200,100 L0,100 Z" fill="url(#wave-gradient-top)" opacity="0.4"/>
                            </svg>
                        </div>
                        <div className="relative z-20 overflow-hidden transition-all duration-300">
                            <img 
                                src="https://988lifeline.org/wp-content/uploads/2024/06/988-hero-2048x683.png" 
                                alt="Banner de apoyo comunitario" 
                                className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14 z-30">
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
                                    Juntos podemos hacer la diferencia
                                </h3>
                                <p className="text-slate-100 text-xl drop-shadow-md font-light max-w-2xl">
                                    Tu voz tiene poder. Usa esta plataforma para ponerte seguro/a y proteger a los demas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const FeatureCard = ({ color, title, description, icon }) => {
    const shadowColor = color === 'teal' ? 'shadow-teal-900/10' : 'shadow-blue-900/10';
    const hoverShadow = color === 'teal' ? 'hover:shadow-teal-900/20' : 'hover:shadow-blue-900/20';
    const borderColor = color === 'teal' ? 'hover:border-teal-800/50' : 'hover:border-blue-800/50';
    const iconColor = color === 'teal' ? 'text-teal-400' : 'text-blue-400';
    const blurColor = color === 'teal' ? 'bg-teal-500/5' : 'bg-blue-500/5';

    return (
        <div className={`relative bg-slate-900 shadow-xl ${shadowColor} rounded-[2rem] p-10 ${hoverShadow} transition-all duration-500 group border border-slate-800 ${borderColor} hover:-translate-y-2 hover:scale-[1.02] transform overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-48 h-48 ${blurColor} rounded-full blur-3xl -mr-10 -mt-10`}></div>
            <div className="flex items-start space-x-6 relative z-10">
                <div className="flex-shrink-0 w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 backdrop-blur-md shadow-inner border border-slate-700">
                    <div className={`w-10 h-10 ${iconColor} drop-shadow-md`}>{icon}</div>
                </div>
                <div className="flex-1">
                    <h3 className="text-3xl font-bold text-slate-100 mb-4 drop-shadow-md">{title}</h3>
                    <p className="text-slate-400 leading-relaxed text-lg font-light">{description}</p>
                </div>
            </div>
        </div>
    );
};

const FeaturesSection = () => (
    <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-700">
                    Una solución completa para tu Institución
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    conVivo ofrece las herramientas necesarias para construir un entorno escolar seguro, confiable y moderno.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureCard 
                    color="blue"
                    title="Protocolos de Seguridad"
                    description="Sistema de gestión de incidentes y reportes (bullying, acoso) diseñado para cumplir con normativas escolares. Garantice la confidencialidad."
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    }
                />
                <FeatureCard 
                    color="teal"
                    title="Red de Especialistas"
                    description="Centralice la gestión de psicólogos y orientadores escolares. Facilite el agendamiento de citas y seguimiento de expedientes clínicos."
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    }
                />
                <FeatureCard 
                    color="blue"
                    title="Biblioteca de Recursos"
                    description="Acceso a una biblioteca digital con guías, talleres y materiales preventivos actualizados para campañas de concienciación."
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    }
                />
                <FeatureCard 
                    color="teal"
                    title="Herramientas de Bienestar"
                    description='Incorpore herramientas tecnológicas como el "Diario Personal" para fomentar la expresión emocional saludable.'
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
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
             <div className={`group relative bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 border h-full ring-1 ${isAlert ? 'shadow-red-900/10 hover:shadow-red-900/20 border-red-900/30 ring-red-900/20' : 'shadow-blue-900/10 hover:shadow-blue-900/20 border-slate-800 ring-slate-800'}`}>
                <div className="relative h-64 overflow-hidden rounded-t-[2.5rem]">
                    <img 
                        src={image} 
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isAlert ? 'from-red-950 via-red-900/40' : 'from-slate-900 via-slate-900/40'} to-transparent`}></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className={`text-2xl font-bold drop-shadow-lg ${isAlert ? 'text-red-50' : 'text-slate-100'}`}>{title}</h3>
                    </div>
                </div>
                <div className="p-8">
                    <p className="text-slate-400 leading-relaxed font-light mb-4">{description}</p>
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
                    <span className="flex-1 px-4 py-2 bg-slate-800 text-slate-400 text-center rounded-lg font-semibold text-xs border border-slate-700">Integración 911</span>
                    <span className="flex-1 px-4 py-2 bg-slate-800 text-slate-400 text-center rounded-lg font-semibold text-xs border border-slate-700">Integración 988</span>
                </div>
            )
        }
    ];

    return (
        <section id="ayuda" className="relative py-20 px-4 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-700 drop-shadow-sm">
                        Gestión Integral de Ayuda
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Optimice la atención psicológica y educativa de su institución con módulos diseñados para cada necesidad.
                    </p>
                </div>

                <div 
                    className="relative mb-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-700 ease-out py-10"
                            style={{ transform: `translateX(${percentage}%)` }}
                        >
                            {cards.map((card, idx) => (
                                <CarouselCard key={idx} {...card} />
                            ))}
                        </div>
                    </div>

                    <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-slate-800/90 hover:bg-slate-700 text-teal-400 p-4 rounded-full shadow-2xl hover:shadow-teal-900/30 transition-all hover:scale-110 z-10 border border-slate-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-slate-800/90 hover:bg-slate-700 text-teal-400 p-4 rounded-full shadow-2xl hover:shadow-teal-900/30 transition-all hover:scale-110 z-10 border border-slate-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalItems }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx ? 'bg-teal-500' : 'bg-slate-600 hover:bg-slate-500'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-12 shadow-2xl shadow-black/40 border border-slate-700/50">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 drop-shadow-lg">
                        ¿Está lista su escuela para dar el siguiente paso?
                    </h3>
                    <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                        Contáctenos hoy mismo para agendar una demostración de la plataforma y descubrir cómo podemos ayudar a mejorar el bienestar de su comunidad educativa.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="mailto:ventas@arcanecode.com" className="px-8 py-4 bg-gradient-to-r from-teal-700 to-teal-900 text-white hover:from-teal-600 hover:to-teal-800 rounded-xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform border border-teal-500/20">
                            Contactar Ventas
                        </a>
                        <a href="/reportes" className="px-8 py-4 bg-slate-800/50 border-2 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-xl font-semibold transition-all backdrop-blur-sm">
                            Ver Demo de Reporte
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Welcome() {
    return (
        <div className="min-h-screen">
            <HeroReact />
            <BannerSection />
            <FeaturesSection />
            <CarouselSection />
        </div>
    );
}
