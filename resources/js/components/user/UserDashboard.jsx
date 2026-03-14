import React, { useState, useEffect, useRef } from 'react';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import { router } from '@inertiajs/react';
import { 
    Heart, 
    Sparkles, 
    Search,
    AlertTriangle,
    BarChart2,
    ChevronLeft,
    ChevronRight,
    Sun,
    CloudSun,
    Moon,
    Check,
    BookOpen,
    Calendar
} from 'lucide-react';
import { 
    ResponsiveContainer, 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid 
} from 'recharts';
import axios from 'axios';
import ChatWidget from './ChatWidget';

const motivationalQuotes = {
    high: [
        { title: "¡Sigue así!", text: "Mantén ese impulso increíble.", gradient: "from-teal-500 to-emerald-600" },
        { title: "Eres fuerte", text: "Tu energía mueve montañas hoy.", gradient: "from-teal-600 to-teal-800" },
        { title: "Brilla", text: "Contagias tu luz a los demás.", gradient: "from-emerald-500 to-teal-700" },
        { title: "Imparable", text: "Nada te detiene en este estado.", gradient: "from-teal-500 via-emerald-600 to-teal-800" },
    ],
    low: [
        { title: "No estás solo", text: "Estamos aquí contigo, siempre.", gradient: "from-teal-800 to-slate-800" },
        { title: "Eres valioso", text: "Tu presencia es un regalo único.", gradient: "from-teal-700 to-emerald-900" },
        { title: "Paso a paso", text: "Cada pequeño avance cuenta.", gradient: "from-emerald-600 to-teal-800" },
        { title: "Resiste", text: "Después de la tormenta, sale el sol.", gradient: "from-teal-600 to-teal-900" },
    ],
    neutral: [
        { title: "Equilibrio", text: "La paz comienza contigo mismo.", gradient: "from-teal-600 to-emerald-700" },
        { title: "Respira", text: "Conecta con tu presente ahora.", gradient: "from-teal-500 to-teal-700" },
        { title: "Crece", text: "Todo proceso lleva su tiempo.", gradient: "from-emerald-500 to-teal-700" },
        { title: "Confía", text: "Estás justo donde debes estar.", gradient: "from-teal-600 via-teal-700 to-emerald-800" },
    ]
};

const TIME_STARS = [
    [10,15,'2px'],[20,35,'1.5px'],[35,12,'2px'],[50,25,'1px'],[65,8,'2px'],
    [75,40,'1.5px'],[85,20,'1px'],[15,55,'1.5px'],[45,48,'2px'],[70,55,'1px'],
    [30,20,'1px'],[60,35,'1.5px'],[5,40,'2px'],[92,30,'1px'],[55,60,'1.5px'],
];

const TIME_CONFIG = {
    morning: {
        label: 'Buenos días',
        gradient: 'from-teal-500 to-emerald-600',
        Icon: Sun,
    },
    afternoon: {
        label: 'Buenas tardes',
        gradient: 'from-teal-600 to-teal-800',
        Icon: CloudSun,
    },
    night: {
        label: 'Buenas noches',
        gradient: 'from-teal-900 via-slate-900 to-slate-950',
        Icon: Moon,
    },
};

export default function UserDashboard({ 
    user, 
    moodData = [], 
    hasMoodToday = false,
    currentMoodValue = null,
    stats = {}
}) {
    const [showMoodModal, setShowMoodModal] = useState(!hasMoodToday);
    
    // Determine motivational set based on mood
    const getMotivationalSet = () => {
        if (!currentMoodValue) return 'neutral';
        if (currentMoodValue >= 4) return 'high';
        if (currentMoodValue <= 2) return 'low';
        return 'neutral';
    };
    
    const moodState = getMotivationalSet();
    const currentCards = motivationalQuotes[moodState];

    const handleLogout = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/logout';
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = '_token';
        input.value = document.querySelector('meta[name="csrf-token"]')?.content || '';
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    };

    const getTimeOfDay = () => { const h = new Date().getHours(); return h >= 6 && h < 12 ? 'morning' : h >= 12 && h < 20 ? 'afternoon' : 'night'; };
    const timeOfDay = getTimeOfDay();
    const timeConf = TIME_CONFIG[timeOfDay];
    const firstName = user?.name?.split(' ')[0] || '';

    const handleMoodSubmit = (value) => {
        if (window.__inertiaActive) {
            router.post('/dashboard/mood', { mood: value }, {
                onSuccess: () => setShowMoodModal(false),
                preserveScroll: true,
            });
        } else {
            axios.post('/dashboard/mood', { mood: value })
                .then(() => { setShowMoodModal(false); window.location.reload(); })
                .catch(err => console.error('Mood submission failed', err));
        }
    };

const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        if (!currentCards) return;
        const interval = setInterval(() => {
            setCarouselIndex((prev) => (prev + 1) % currentCards.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, [currentCards]);

    // Chart Data Formatter
    const chartData = moodData.map(d => ({
        date: d.date,
        value: d.value,
        emoji: ['😡', '😰', '😐', '🙂', '😁'][Math.round(d.value) - 1] || '❓'
    }));

    return (
        <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 relative pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

            <MobileHeader user={user} />

            <main className="relative z-10 pt-4 px-4 max-w-2xl mx-auto space-y-3">

                {/* Greeting card */}
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${timeConf.gradient} p-5 text-white`}>
                    {timeOfDay === 'night' && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {TIME_STARS.map(([l,t,s], i) => (
                                <div key={i} className="absolute rounded-full bg-white opacity-40" style={{ left:`${l}%`, top:`${t}%`, width:s, height:s }} />
                            ))}
                        </div>
                    )}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-10">
                        <timeConf.Icon size={96} strokeWidth={1} />
                    </div>
                    <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest flex items-center gap-1.5 relative z-10">
                        <timeConf.Icon size={12} /> {timeConf.label}
                    </p>
                    <h2 className="text-2xl font-bold mt-1 relative z-10 tracking-tight">{firstName}</h2>
                    {!hasMoodToday && (
                        <button onClick={() => setShowMoodModal(true)}
                            className="mt-3 inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white/25 active:scale-95 transition relative z-10">
                            ¿Cómo te sientes hoy? <ChevronRight size={12} />
                        </button>
                    )}
                    {hasMoodToday && (
                        <p className="mt-2 text-white/60 text-xs flex items-center gap-1.5 relative z-10">
                            <Check size={12} /> Estado de ánimo registrado hoy
                        </p>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <a href="/reportes" className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-800/50 hover:shadow-md active:scale-95 transition-all">
                        <div className="w-9 h-9 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                            <AlertTriangle size={17} />
                        </div>
                        <div>
                            <p className="text-slate-800 dark:text-white font-semibold text-sm leading-tight">Reportar</p>
                            <p className="text-slate-400 dark:text-slate-500 text-xs">Incidente o acoso</p>
                        </div>
                    </a>
                    <a href="/diario" className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-700/50 hover:shadow-md active:scale-95 transition-all">
                        <div className="w-9 h-9 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                            <Sparkles size={17} />
                        </div>
                        <div>
                            <p className="text-slate-800 dark:text-white font-semibold text-sm leading-tight">Mi Diario</p>
                            <p className="text-slate-400 dark:text-slate-500 text-xs">Expresa tu día</p>
                        </div>
                    </a>
                </div>

                {/* Motivational Carousel */}
                <div className="relative overflow-hidden rounded-2xl group">
                    <div
                        className="flex transition-transform duration-700 ease-out"
                        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                    >
                        {currentCards.map((card, idx) => (
                            <div key={idx} className={`min-w-full flex-shrink-0 bg-gradient-to-br ${card.gradient} p-6 h-[136px] flex flex-col justify-between relative overflow-hidden`}>
                                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
                                <div className="absolute -right-2 -bottom-6 w-20 h-20 rounded-full bg-black/10 pointer-events-none" />
                                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Mensaje para ti</p>
                                <div>
                                    <h4 className="font-bold text-white text-xl leading-tight">{card.title}</h4>
                                    <p className="text-white/70 text-sm mt-0.5">{card.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setCarouselIndex(p => p === 0 ? currentCards.length - 1 : p - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/35 transition opacity-0 group-hover:opacity-100">
                        <ChevronLeft size={15} />
                    </button>
                    <button
                        onClick={() => setCarouselIndex(p => (p + 1) % currentCards.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/35 transition opacity-0 group-hover:opacity-100">
                        <ChevronRight size={15} />
                    </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                        {currentCards.map((_, idx) => (
                            <button key={idx} onClick={() => setCarouselIndex(idx)}
                                className={`h-0.5 rounded-full transition-all duration-300 bg-white ${idx === carouselIndex ? 'w-5 opacity-70' : 'w-2 opacity-25'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Weekly Mood Chart */}
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
                            <BarChart2 size={16} className="text-teal-500" /> Estado de ánimo
                        </h3>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg">Últimos 7 días</span>
                    </div>

                    {chartData.length > 0 ? (
                        <div className="h-44 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid vertical={false} stroke="#64748b" strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#64748b"
                                        tick={{fontSize: 10, fill: '#94a3b8'}}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={8}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis
                                        domain={[0, 6]}
                                        ticks={[1, 2, 3, 4, 5]}
                                        tickFormatter={(value) => {
                                            const map = {5: '😁', 4: '🙂', 3: '😐', 2: '😔', 1: '😰'};
                                            return map[value] || '';
                                        }}
                                        width={30}
                                        tick={{fontSize: 14}}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl shadow-lg text-center">
                                                        <span className="text-xl block">{data.emoji}</span>
                                                        <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">{label}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#0d9488"
                                        strokeWidth={2.5}
                                        dot={false}
                                        activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#0d9488' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 gap-2">
                            <BarChart2 size={32} className="text-slate-200 dark:text-slate-700" />
                            <p className="text-slate-400 dark:text-slate-500 text-sm">Sin registros aún</p>
                            <button onClick={() => setShowMoodModal(true)} className="text-teal-600 dark:text-teal-400 text-xs font-semibold hover:underline mt-1">Registrar ahora</button>
                        </div>
                    )}
                </div>

            </main>

            {/* Bottom Nav */}
            <BottomNav active="dashboard" />

            {/* Mood Modal */}
            {showMoodModal && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/50 dark:bg-slate-950/70 backdrop-blur-sm"
                        onClick={() => setShowMoodModal(false)}
                    />

                    {/* Sheet */}
                    <div className="relative w-full max-w-sm bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-t sm:border border-slate-200/80 dark:border-slate-700/60 rounded-t-[2rem] sm:rounded-3xl shadow-2xl overflow-hidden transition-colors">

                        {/* Drag handle — mobile only */}
                        <div className="flex justify-center pt-4 pb-1 sm:hidden">
                            <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                        </div>

                        {/* Gradient header strip */}
                        <div className="relative mx-4 mt-4 mb-5 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-indigo-500 to-purple-600 opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="relative z-10 px-5 py-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner">
                                    🧠
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-white leading-tight">Check diario</h3>
                                    <p className="text-white/75 text-xs mt-0.5">¿Cómo te sientes hoy?</p>
                                </div>
                            </div>
                        </div>

                        {/* Mood Buttons */}
                        <div className="px-4 pb-2 grid grid-cols-5 gap-2">
                            <MoodButton emoji="😡" label="Mal"    gradient="from-rose-500 to-red-600"    ring="ring-rose-400"    onClick={() => handleMoodSubmit(1)} />
                            <MoodButton emoji="😰" label="Ansioso" gradient="from-orange-400 to-amber-500" ring="ring-orange-400"  onClick={() => handleMoodSubmit(2)} />
                            <MoodButton emoji="😐" label="Neutro" gradient="from-slate-400 to-slate-500"  ring="ring-slate-400"   onClick={() => handleMoodSubmit(3)} />
                            <MoodButton emoji="🙂" label="Bien"   gradient="from-teal-400 to-teal-500"   ring="ring-teal-400"    onClick={() => handleMoodSubmit(4)} />
                            <MoodButton emoji="😁" label="Genial" gradient="from-indigo-500 to-purple-600" ring="ring-indigo-400" onClick={() => handleMoodSubmit(5)} />
                        </div>

                        {/* Skip */}
                        <div className="px-4 pb-6 pt-3">
                            <button
                                onClick={() => setShowMoodModal(false)}
                                className="w-full py-3 rounded-2xl text-sm font-semibold text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
                            >
                                Omitir por ahora
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MoodButton({ emoji, label, gradient, ring, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`group flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-transparent hover:shadow-lg active:scale-95 transition-all duration-200 hover:ring-2 ${ring}`}
        >
            <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                {emoji}
            </span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-none">{label}</span>
        </button>
    );
}

