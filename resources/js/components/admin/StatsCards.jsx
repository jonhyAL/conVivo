import React from 'react';
import { Users, FileText, UserCheck, Calendar, Activity } from 'lucide-react';

export default function StatsCards({ stats, onRiskClick }) {
    const cards = [
        {
            title: 'Usuarios',
            value: stats.users_count,
            sub: `+${stats.new_users_today} Hoy`,
            icon: Users,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Reportes',
            value: stats.reports_count,
            sub: `${stats.reports_pending} Pendientes`,
            icon: FileText,
            color: 'from-orange-500 to-red-500'
        },
        {
            title: 'Especialistas',
            value: stats.specialists_count,
            sub: `${stats.specialists_active} Activos`,
            icon: UserCheck,
            color: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Citas',
            value: stats.appointments_count,
            sub: `${stats.appointments_today} Hoy`,
            icon: Calendar,
            color: 'from-purple-500 to-pink-500'
        },
        // Mood Card
        {
            title: 'Riesgo Emocional',
            value: stats.users_low_mood || 0,
            sub: 'Usuarios críticos',
            icon: Activity,
            color: 'from-rose-500 to-pink-600',
            alert: true,
            action: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div 
                        key={index} 
                        onClick={card.action && onRiskClick ? onRiskClick : undefined}
                        className={`relative group overflow-hidden bg-white/5 border ${card.alert ? 'border-rose-500/30 bg-rose-900/10' : 'border-white/10'} p-6 rounded-xl hover:bg-white/10 transition-all duration-300 ${card.action ? 'cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-rose-900/20' : ''}`}
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 blur-xl rounded-full group-hover:opacity-20 transition-opacity`}></div>
                        
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                                <h3 className={`text-3xl font-bold mt-1 ${card.alert ? 'text-rose-400' : 'text-white'}`}>{card.value}</h3>
                                <p className="text-sm text-gray-400 mt-1 flex items-center">
                                    <span className={card.alert ? "text-rose-300 mr-1" : "text-green-400 mr-1"}>{card.sub}</span>
                                </p>
                            </div>
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-20`}>
                                <Icon className="text-white" size={24} />
                            </div>
                        </div>
                    </div>
                );

            })}
        </div>
    );
}
