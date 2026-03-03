import React from 'react';

const About = () => {
    return (
        <section className="relative pt-20 pb-32 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Nuestra Misión</span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 text-slate-900">Cuidando el bienestar escolar</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        Nacimos con el propósito de crear entornos seguros donde cada estudiante pueda expresarse y recibir ayuda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">🛡️ Prevención del Acoso</h3>
                            <p className="text-slate-600">Implementamos sistemas de reporte anónimo para detectar y atender casos de bullying a tiempo.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">🧠 Salud Mental</h3>
                            <p className="text-slate-600">Facilitamos el acceso a profesionales de la psicología y psiquiatría dentro del entorno educativo.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">🤝 Comunidad Segura</h3>
                            <p className="text-slate-600">Fomentamos una cultura de apoyo mutuo y respeto a través de recursos y protocolos claros.</p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-3xl transform rotate-3 blur-sm opacity-20 group-hover:rotate-6 transition-all duration-500"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                            alt="Students talking" 
                            className="relative rounded-3xl shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500 object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
