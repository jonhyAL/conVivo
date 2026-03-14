import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Información de ventas',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            await window.axios.post('/contacto/enviar', formData);
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: 'Información de ventas',
                message: ''
            });
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Ocurrió un error al enviar el mensaje. Por favor verifica tu conexión.');
        }
    };

    return (
        <section className="relative pt-32 pb-40 z-10 bg-transparent text-slate-800 dark:text-slate-200 min-h-screen flex items-center transition-colors duration-500">
            {/* Background elements removed for performance */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.05] dark:opacity-100 pointer-events-none transition-colors"></div>
                 {/* Pixeles Aleatorios (Desde arriba) */}
                 <div className="absolute inset-0 pointer-events-none"> 
                     <div className="absolute top-[10%] left-[8%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0s' }}></div>
                     <div className="absolute top-[20%] left-[8%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }}></div>
                     
                     <div className="absolute top-[10%] right-[35%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
                     
                     <div className="absolute top-[15%] right-[10%] w-16 h-16 bg-teal-500/15 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
                     <div className="absolute top-[25%] right-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/20 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '3s' }}></div>
                     
                     <div className="absolute bottom-[20%] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
                     <div className="absolute bottom-[10%] right-[40%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '2.5s' }}></div>

                     {/* Cuadros flotantes animados */}
                     <div className="absolute top-[20%] left-[50%] w-4 h-4 bg-teal-500/40 dark:bg-teal-300/30 rounded-sm animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.2s' }}></div>
                     <div className="absolute top-[30%] left-[25%] w-2 h-2 bg-teal-500/60 dark:bg-teal-300/50 rounded-sm animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                     <div className="absolute bottom-[25%] right-[20%] w-3 h-3 bg-teal-500/50 dark:bg-teal-300/40 rounded-sm animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1.8s' }}></div>
                 </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Text Content */}
                <div className="space-y-8">
                    <span className="text-teal-600 dark:text-teal-500 font-mono tracking-widest text-sm uppercase block">/ Contacto</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[1.05] transition-colors duration-500">
                        Empecemos la <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-200 dark:to-cyan-400">conversación.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg font-light leading-relaxed transition-colors duration-500">
                        Estamos listos para escuchar las necesidades de su institución y diseñar un plan a medida.
                    </p>
                    
                    <div className="space-y-6 pt-8">
                        <ContactInfo icon="📧" title="Correo" value="contacto@convivo.app" />
                        <ContactInfo icon="📱" title="Teléfono" value="+52 (55) 1234 5678" />
                        <ContactInfo icon="📍" title="Oficinas" value="Ciudad de México, MX" />
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative overflow-hidden group transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    {status === 'success' ? (
                        <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                            <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mb-8 border border-teal-500/20">
                                <svg className="w-10 h-10 text-teal-500 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">¡Mensaje recibido!</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">Nuestro equipo analizará su solicitud y se pondrá en contacto en breve.</p>
                            <button onClick={() => setStatus('idle')} className="px-8 py-3 rounded-full border border-slate-300 dark:border-slate-700 text-teal-600 dark:text-teal-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Enviar otro mensaje</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            {status === 'error' && (
                                <div className="bg-red-500/10 text-red-500 dark:text-red-400 p-4 rounded-2xl border border-red-500/20 text-center text-sm">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="space-y-6">
                                <InputGroup label="Nombre Completo" name="name" value={formData.name} onChange={handleChange} placeholder="Ej. Dr. Roberto Martínez" />
                                <InputGroup label="Correo Institucional" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contacto@escuela.edu" />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">Asunto</label>
                                <div className="relative">
                                    <select 
                                        name="subject" 
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all appearance-none cursor-pointer hover:bg-white dark:hover:bg-slate-900"
                                        disabled={status === 'submitting'}
                                    >
                                        <option value="Información de ventas">Información de ventas</option>
                                        <option value="Soporte técnico">Soporte técnico</option>
                                        <option value="Agendar demo">Agendar demostración</option>
                                        <option value="Otro">Otro tema</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">Mensaje</label>
                                <textarea 
                                    name="message" 
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all min-h-[150px] resize-none hover:bg-white dark:hover:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                                    placeholder="Cuéntanos más sobre tu institución..." 
                                    required 
                                    disabled={status === 'submitting'}
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-2xl hover:bg-slate-800 dark:hover:bg-teal-50 transition-all shadow-lg hover:shadow-slate-400/20 dark:hover:shadow-white/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

const InputGroup = ({ label, name, type = "text", value, onChange, placeholder }) => (
    <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">{label}</label>
        <input 
            type={type} 
            name={name} 
            value={value}
            onChange={onChange}
            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all hover:bg-white dark:hover:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-600" 
            placeholder={placeholder}
            required 
        />
    </div>
);

const ContactInfo = ({ icon, title, value }) => (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-slate-200 dark:hover:border-white/5">
        <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-xl shadow-inner text-slate-900 dark:text-white">
            {icon}
        </div>
        <div>
            <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
            <p className="text-slate-900 dark:text-white font-medium text-lg transition-colors">{value}</p>
        </div>
    </div>
);

export default Contact;
