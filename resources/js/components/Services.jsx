import React from 'react';

const Services = () => {
    return (
        <section className="relative pt-20 pb-32 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                     <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Nuestro Ecosistema</span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 text-slate-900">Herramientas para la Seguridad y Apoyo</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        Una suite completa diseñada para prevenir, detectar y actuar ante situaciones de riesgo escolar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Servicio: Reportes */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-teal-400 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 text-3xl shadow-inner">
                            📝
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Sistema de Reportes</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">Permite a los estudiantes reportar incidentes de bullying o acoso de forma anónima y segura, garantizando una respuesta rápida.</p>
                    </div>

                    {/* Servicio: Citas */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-indigo-400 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 text-3xl shadow-inner">
                            📅
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Agenda con Especialistas</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">Conexión directa con psicólogos y consejeros escolares. Agenda citas privadas para recibir orientación profesional.</p>
                    </div>

                    {/* Servicio: Recursos */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 text-3xl shadow-inner">
                            📚
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Protocolos y Guías</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">Biblioteca de recursos educativos sobre salud mental, manejo del estrés y resolución pacífica de conflictos.</p>
                    </div>

                    {/* Servicio: SOS */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 text-3xl shadow-inner animate-pulse">
                            🚨
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Botón de Pánico (SOS)</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">Acceso inmediato a líneas de emergencia y contactos de seguridad en situaciones críticas que requieren intervención urgente.</p>
                    </div>

                    {/* Servicio: Dashboard */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2">
                       <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 text-3xl shadow-inner">
                            📊
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Panel de Control</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">Herramientas administrativas para que las escuelas monitoreen el clima escolar y gestionen los casos de manera efectiva.</p>
                    </div>

                     {/* CTA Card */}
                     <div className="group bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-800 flex flex-col justify-center items-center text-center hover:scale-105 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white mb-3">¿Listo para mejorar tu escuela?</h3>
                        <p className="text-slate-400 mb-8">Contáctanos hoy para una demostración personalizada.</p>
                        <a href="/contacto" className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg hover:shadow-teal-500/30">
                            Solicitar Demo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
