import React, { useState, useEffect, useRef } from 'react';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import { 
    Heart, 
    Sparkles, 
    Search,
    AlertTriangle
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

export default function UserDashboard({ 
    user, 
    moodData = [], 
    hasMoodToday = false,
    stats = {}
}) {
    const [showMoodModal, setShowMoodModal] = useState(!hasMoodToday);
    // const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'chat' - Removed as MobileHeader handles it

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleMoodSubmit = async (value) => {
        try {
            await axios.post('/dashboard/mood', { mood: value });
            setShowMoodModal(false);
            window.location.reload(); // Reload to refresh data/chart
        } catch (error) {
            console.error('Mood submission failed', error);
        }
    };

    // Chart Data Formatter
    const chartData = moodData.map(d => ({
        date: d.date,
        value: d.value,
        emoji: ['😡', '😰', '😐', '🙂', '😁'][Math.round(d.value) - 1] || '❓'
    }));

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-slate-800 relative pb-24">
            
            <MobileHeader user={user} />

            <main className="pt-20 px-4 max-w-7xl mx-auto space-y-8">
                
                {/* 1. Motivational Content (Stories Style) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
                    <MotivationalCard 
                        icon="🌿" 
                        title="Calma"
                        text="Respira profundo." 
                        color="bg-emerald-100 border-emerald-200 text-emerald-800" 
                    />
                    <MotivationalCard 
                        icon="💪" 
                        title="Fuerza"
                        text="Tú puedes con todo." 
                        color="bg-blue-100 border-blue-200 text-blue-800" 
                    />
                    <MotivationalCard 
                        icon="✨" 
                        title="Brilla"
                        text="Eres único." 
                        color="bg-amber-100 border-amber-200 text-amber-800" 
                    />
                    <MotivationalCard 
                        icon="❤️" 
                        title="Ámate"
                        text="Cuida de ti." 
                        color="bg-rose-100 border-rose-200 text-rose-800" 
                    />
                </div>

                {/* 2. Quick Actions (Reports & Journal) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/reportes" className="group relative overflow-hidden p-6 rounded-3xl bg-red-600 border border-red-500 shadow-lg hover:shadow-red-500/40 transition-all active:scale-95">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition">
                            <AlertTriangle size={100} className="text-white -mr-6 -mt-6 rotate-12" />
                        </div>
                        <div className="relative z-10 flex flex-col justify-between h-32">
                            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 backdrop-blur-sm group-hover:scale-110 transition">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-1">Reportar</h3>
                                <p className="text-red-100 text-sm">Incidente o acoso escolar</p>
                            </div>
                        </div>
                    </a>

                    <a href="/diario" className="group relative overflow-hidden p-6 rounded-3xl bg-blue-600 border border-blue-500 shadow-lg hover:shadow-blue-500/40 transition-all active:scale-95">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition">
                            <Sparkles size={100} className="text-white -mr-6 -mt-6 rotate-12" />
                        </div>
                        <div className="relative z-10 flex flex-col justify-between h-32">
                            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 backdrop-blur-sm group-hover:scale-110 transition">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-1">Mi Diario</h3>
                                <p className="text-blue-100 text-sm">Expresa y guarda tu día</p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* 3. Weekly Mood Status Chart */}
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <span>📊</span> Tu semana
                        </h3>
                        <span className="text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">Últimos 7 días</span>
                    </div>

                    {chartData.length > 0 ? (
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="#334155" strokeDasharray="3 3" opacity={0.5} />
                                    <XAxis 
                                        dataKey="date" 
                                        stroke="#94a3b8" 
                                        tick={{fontSize: 10, fill: '#cbd5e1'}} 
                                        tickLine={false} 
                                        axisLine={false} 
                                        dy={10}
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
                                        tick={{fontSize: 16}}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip 
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-white border border-slate-200 p-2 rounded-lg shadow-xl text-center">
                                                        <span className="text-2xl block mb-1">{data.emoji}</span>
                                                        <p className="text-slate-500 text-[10px]">{label}</p>
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
                                        strokeWidth={3} 
                                        dot={false}
                                        activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#0d9488' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center py-8 text-center opacity-50">
                            <span className="text-4xl mb-2 grayscale">😶‍🌫️</span>
                            <p className="text-slate-400 text-sm">Sin datos aún</p>
                        </div>
                    )}
                </div>

            </main>

            {/* Bottom Nav */}
            <BottomNav active="dashboard" />

            {/* Mood Modal */}
            {showMoodModal && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowMoodModal(false)}></div>
                    <div className="relative bg-slate-900 border-t sm:border border-slate-800 rounded-t-[2rem] sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom-20 duration-300 ring-1 ring-white/10">
                        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6 sm:hidden"></div>
                        
                        <div className="text-center mb-8">
                            <span className="text-4xl mb-3 block animate-bounce">👋</span>
                            <h3 className="text-xl font-bold text-white mb-2">¿Cómo estás hoy?</h3>
                            <p className="text-slate-400 text-sm">Tu bienestar es lo más importante.</p>
                        </div>

                        <div className="grid grid-cols-5 gap-2 mb-6">
                            <MoodButton emoji="😡" value={1} onClick={() => handleMoodSubmit(1)} />
                            <MoodButton emoji="😰" value={2} onClick={() => handleMoodSubmit(2)} />
                            <MoodButton emoji="😐" value={3} onClick={() => handleMoodSubmit(3)} />
                            <MoodButton emoji="🙂" value={4} onClick={() => handleMoodSubmit(4)} />
                            <MoodButton emoji="😁" value={5} onClick={() => handleMoodSubmit(5)} />
                        </div>

                        <button 
                            onClick={() => setShowMoodModal(false)}
                            className="w-full py-4 text-slate-500 text-sm font-medium hover:text-slate-300 transition"
                        >
                            Omitir por ahora
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function MotivationalCard({ icon, title, text, color }) {
    return (
        <div className={`flex flex-col justify-between p-4 rounded-3xl h-[120px] shadow-sm transition-transform hover:scale-105 ${color}`}>
            <span className="text-3xl">{icon}</span>
            <div>
                <h4 className="font-bold text-lg mb-0.5">{title}</h4>
                <p className="text-xs opacity-90 leading-tight">{text}</p>
            </div>
        </div>
    );
}

function MoodButton({ emoji, value, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className="aspect-square rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-2xl sm:text-3xl transition-transform active:scale-95 border border-slate-700 hover:border-teal-500 shadow-lg ring-1 ring-white/5"
        >
            {emoji}
        </button>
    );
}

