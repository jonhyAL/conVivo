import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartsSection({ usersChart, stats }) {
    // Process data if needed, currently passed in correct format
    const data = useMemo(() => {
        return usersChart.map(item => ({
            name: item.date,
            users: item.count
        }));
    }, [usersChart]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col">
                <h4 className="text-lg font-medium text-white mb-4">Registro de Usuarios (7 días)</h4>
                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                itemStyle={{ color: '#818cf8' }}
                            />
                            <Area type="monotone" dataKey="users" stroke="#818cf8" fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h4 className="text-lg font-medium text-white mb-4">Resumen General</h4>
                <div className="space-y-4">
                     {/* Simple progress bars or stats for variety */}
                     <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Objetivo Mensual (Usuarios)</span>
                            <span className="text-sm text-white">75%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                     </div>

                     <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Reportes Atendidos</span>
                            <span className="text-sm text-white">45%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                     </div>
                     
                     <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                        <h5 className="text-blue-400 font-medium mb-1">Nota del Sistema</h5>
                        <p className="text-sm text-blue-200/70">
                            La actividad de usuarios ha incrementado un 12% respecto a la semana anterior.
                        </p>
                     </div>
                </div>
            </div>
        </div>
    );
}
