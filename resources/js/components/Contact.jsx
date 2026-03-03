import React, { useState } from 'react';

const Contact = () => {
    // We can add simple state to handle button loading effect, though actual form submission 
    // will just be a standard HTML form submission if we want to keep it simple, 
    // or axios/fetch if we want SPA behavior. 
    // For now, mirroring the blade form style but with React.
    
    return (
        <section className="relative pt-20 pb-32 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                     <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Hablemos</span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 text-slate-900">¿Cómo podemos ayudarte?</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        Si eres una institución interesada en nuestras soluciones o necesitas asistencia técnica.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 mb-12 max-w-4xl mx-auto border border-slate-100">
                    <form action="#" method="POST" className="space-y-6">
                        {/* CSRF Token would be needed for standard post, usually printed in meta tag or handled by axios */}
                        {/* Input hidden for demo purposes if needed, but React apps typically use API */}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                                <input type="text" name="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors" placeholder="Tu nombre" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Correo Institucional</label>
                                <input type="email" name="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors" placeholder="correo@escuela.edu" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Asunto</label>
                            <select name="subject" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
                                <option>Información de ventas</option>
                                <option>Soporte Técnico</option>
                                <option>Alianzas</option>
                                <option>Otro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Mensaje</label>
                            <textarea name="message" rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors" placeholder="Cuéntanos más..." required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-slate-900/30">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>

                 <div className="text-center text-slate-500">
                    <p className="mb-2 font-bold">O contáctanos directamente:</p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                         <a href="mailto:hola@arcanecode.com" className="hover:text-teal-600 transition-colors font-medium flex items-center justify-center gap-2">
                            <span>📧</span> hola@arcanecode.com
                         </a>
                         <a href="tel:+525512345678" className="hover:text-teal-600 transition-colors font-medium flex items-center justify-center gap-2">
                            <span>📞</span> +52 55 1234 5678
                         </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
