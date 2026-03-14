import React, { useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail } from 'lucide-react';

export default function ChartsSection({ usersChart, stats, contacts = [] }) {
    const usersData = useMemo(() => {
        return usersChart.map(item => ({
            name: item.date,
            usuarios: item.count
        }));
    }, [usersChart]);

    // Build contacts-per-day chart for the last 7 days
    const contactsData = useMemo(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
            const label = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
            const count = contacts.filter(c => c.created_at && c.created_at.startsWith(dateStr)).length;
            days.push({ name: label, mensajes: count });
        }
        return days;
    }, [contacts]);

    const totalContactsWeek = contactsData.reduce((sum, d) => sum + d.mensajes, 0);
    const todayLabel = contactsData[contactsData.length - 1]?.name;
    const todayCount = contactsData[contactsData.length - 1]?.mensajes ?? 0;

    return (
        <div className="space-y-4 h-full flex flex-col justify-end pb-4 px-3">
            {/* Row: Users + Contacts charts side by side - float at the bottom of the hollow center */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Users chart */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col shadow-xl shadow-black/30">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Usuarios (7 días)</h4>
                    <div className="flex-1 w-full min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={usersData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
                                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '12px' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area type="monotone" dataKey="usuarios" stroke="#818cf8" fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Contacts / Buzón chart */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col shadow-xl shadow-black/30">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <Mail size={14} className="text-teal-400" />
                            Buzón (7 días)
                        </h4>
                        <div className="text-right">
                            <span className="text-xs text-slate-500 block">Hoy ({todayLabel})</span>
                            <span className="text-lg font-bold text-teal-400">{todayCount}</span>
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={contactsData}>
                                <defs>
                                    <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.9}/>
                                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0.4}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
                                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '12px' }}
                                    itemStyle={{ color: '#2dd4bf' }}
                                    formatter={(value) => [value, 'Mensajes']}
                                />
                                <Bar dataKey="mensajes" fill="url(#colorContacts)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">
                        Total semana: <span className="text-teal-400 font-semibold">{totalContactsWeek}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
