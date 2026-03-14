import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, AlertTriangle, User, Calendar,
    FileText, Users, MessageSquare, LogOut, Mail, MapPin, BookOpen
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import UsersTable from './UsersTable';
import SpecialistsTable from './SpecialistsTable';
import ReportsTable from './ReportsTable';
import AppointmentsTable from './AppointmentsTable';
import ContactsTable from './ContactsTable';
import SOSMap from './SOSMap';
import ChatWidget from '../user/ChatWidget';
import ResourcesTable from './ResourcesTable';
import axios from 'axios';

// Shared liquid-glass card style
const CARD = 'bg-white/[0.03] backdrop-blur-3xl border border-white/[0.07] rounded-3xl';
const CARD_SHADOW = { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.18)' };

export default function AdminDashboard({
    currentUser,
    stats = {},
    sosAlerts = [],
    users = [],
    reports = [],
    specialists = [],
    appointments = [],
    usersChart = [],
    contacts = [],
    recursos = []
}) {
    const [activeSection, setActiveSection] = useState('inicio');
    const [riskUserSearch, setRiskUserSearch] = useState('');
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    const pendingAlerts = sosAlerts.filter(
        a => a.status !== 'resolved' && a.status !== 'resuelto'
    );

    const riskUsers = users.filter(u => {
        if (u.risk_level === 'Alto' || u.risk_level === 'High') return true;
        if (u.mood_score !== undefined && u.mood_score !== null && u.mood_score < 2.5) return true;
        return false;
    });

    // Chart data
    const usersData = useMemo(() =>
        usersChart.map(item => ({ name: item.date, usuarios: item.count })),
    [usersChart]);

    const contactsData = useMemo(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const label = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
            const count = contacts.filter(c => c.created_at && c.created_at.startsWith(dateStr)).length;
            days.push({ name: label, mensajes: count });
        }
        return days;
    }, [contacts]);

    const todayCount = contactsData[contactsData.length - 1]?.mensajes ?? 0;

    // Donut chart: reports by status (field: estado)
    const reportsPieData = useMemo(() => [
        { name: 'Pendientes',  value: reports.filter(r => r.estado === 'pendiente').length,   color: '#fbbf24' },
        { name: 'En revisión', value: reports.filter(r => r.estado === 'en_revision').length, color: '#818cf8' },
        { name: 'Resueltos',   value: reports.filter(r => r.estado === 'resuelto').length,    color: '#34d399' },
        { name: 'Rechazados',  value: reports.filter(r => r.estado === 'rechazado').length,   color: '#f87171' },
    ].filter(d => d.value > 0), [reports]);

    // ── Animation variants ──
    const slideDown  = { hidden: { y: -80,  opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } } };
    const slideUp    = { hidden: { y:  80,  opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut', delay: 0.35 } } };
    const slideLeft  = { hidden: { x: -80,  opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut', delay: 0.1 } } };
    const slideRight = { hidden: { x:  80,  opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut', delay: 0.2 } } };
    const logoAnim   = { hidden: { scale: 0.7, opacity: 0 }, visible: { scale: 1, opacity: 0.28, transition: { duration: 1.8, ease: 'easeOut', delay: 0.2 } } };

    const handleLogout = async () => {
        try { await axios.post('/logout'); window.location.href = '/login'; }
        catch (e) { console.error('Logout failed', e); }
    };

    const isInicio = activeSection === 'inicio';

    const navItems = [
        { id: 'inicio',        label: 'Inicio',      icon: Activity      },
        { id: 'usuarios',      label: 'Usuarios',    icon: Users         },
        { id: 'mapa-sos',      label: 'Mapa SOS',   icon: MapPin        },
        { id: 'citas',         label: 'Citas',       icon: Calendar      },
        { id: 'especialistas', label: 'Esp.',        icon: User          },
        { id: 'reportes',      label: 'Reportes',   icon: FileText      },
        { id: 'biblioteca',    label: 'Biblioteca', icon: BookOpen      },
        { id: 'mensajes',      label: 'Buzón',       icon: Mail          },
        { id: 'chat',          label: 'Chat',        icon: MessageSquare },
    ];

    // ════════════════════════════════════════════════════
    //  MOBILE LAYOUT (< 768px)
    // ════════════════════════════════════════════════════
    // Solid card style — no backdrop-blur (unreliable on mobile browsers)
    const MC  = 'bg-slate-800/90 border border-slate-700/60 rounded-2xl';
    const MCS = { boxShadow: '0 4px 16px rgba(0,0,0,0.4)' };

    if (isMobile) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">

                {/* ── Mobile top bar ── */}
                <div className="sticky top-0 left-0 right-0 z-30 h-14 flex items-center justify-between px-4 bg-slate-900 border-b border-slate-700/60">
                    <img src="/images/logos/logo-unico.png" alt="Logo" className="h-8 w-auto"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(45,212,191,0.4))' }} />
                    {isInicio && (
                        <span className="text-sm font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent truncate mx-3">
                            Bienvenido{currentUser?.name ? `, ${currentUser.name.split(' ')[0]}` : ''}
                        </span>
                    )}
                    {!isInicio && (
                        <span className="text-sm font-bold text-slate-300 truncate mx-3">
                            {navItems.find(n => n.id === activeSection)?.label ?? ''}
                        </span>
                    )}
                    <button onClick={handleLogout} className="text-red-400 p-2 rounded-xl hover:bg-red-500/15 shrink-0">
                        <LogOut size={18} />
                    </button>
                </div>

                {/* ── Scrollable content ── */}
                <div className="flex-1 overflow-y-auto pb-20 px-3 space-y-3">

                    {/* ── INICIO ── */}
                    {isInicio && (<>

                        {/* SOS alert */}
                        {pendingAlerts.length > 0 && (
                            <div className={`mt-3 ${MC} border-red-500/50 p-3.5 flex items-center gap-3`}
                                style={MCS}>
                                <AlertTriangle className="text-red-400 animate-pulse shrink-0" size={18} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-red-400 font-bold text-sm">¡Alerta SOS Activa!</p>
                                    <p className="text-red-300/60 text-xs">{pendingAlerts.length} pendiente{pendingAlerts.length !== 1 ? 's' : ''}</p>
                                </div>
                                <button onClick={() => setActiveSection('mapa-sos')}
                                    className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 hover:bg-red-600">
                                    Ver →
                                </button>
                            </div>
                        )}

                        {/* Stats 3×2 grid */}
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            {[
                                { label: 'Usuarios',  value: stats.users_count        ?? users.length        },
                                { label: 'Riesgo',    value: stats.users_low_mood     ?? riskUsers.length    },
                                { label: 'Reportes',  value: stats.reports_count      ?? reports.length      },
                                { label: 'Espec.',    value: stats.specialists_count  ?? specialists.length  },
                                { label: 'Citas',     value: stats.appointments_count ?? appointments.length },
                                { label: 'Buzón hoy', value: todayCount },
                            ].map(item => (
                                <div key={item.label} className={`${MC} p-3 flex flex-col items-center justify-center`} style={MCS}>
                                    <span className="text-xl font-bold text-teal-300">{item.value}</span>
                                    <span className="text-[10px] text-slate-500 mt-0.5 text-center">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Risk users */}
                        {riskUsers.length > 0 && (
                            <div className={`${MC} overflow-hidden`} style={MCS}>
                                <div className="px-4 py-3 border-b border-red-500/15 flex items-center gap-2">
                                    <AlertTriangle className="text-red-400 animate-pulse shrink-0" size={14} />
                                    <h3 className="text-sm font-bold text-red-400">Riesgo Emocional</h3>
                                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">{riskUsers.length}</span>
                                </div>
                                <div className="p-2 space-y-1.5 max-h-44 overflow-y-auto">
                                    {riskUsers.map((u, i) => (
                                        <button key={u.id || i}
                                            onClick={() => { setRiskUserSearch(u.name); setActiveSection('usuarios'); }}
                                            className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-red-950/20 border border-red-500/10 hover:border-red-500/30 text-left transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-red-300 font-bold text-sm border border-red-500/25 shrink-0">
                                                {u.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <span className="text-sm font-medium text-slate-200 truncate flex-1">{u.name}</span>
                                            <span className="text-red-400 text-xs shrink-0">Ver →</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chart: Usuarios */}
                        <div className={`${MC} p-4`} style={{ ...MCS, height: 200 }}>
                            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 shrink-0">Registro de Usuarios · 7 días</h4>
                            <div style={{ height: 148 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={usersData}>
                                        <defs>
                                            <linearGradient id="mGradUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.7} />
                                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                        <XAxis dataKey="name" stroke="#4b5563" tick={{ fontSize: 9 }} />
                                        <YAxis stroke="#4b5563" tick={{ fontSize: 9 }} allowDecimals={false} width={18} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '10px', fontSize: '11px' }} itemStyle={{ color: '#818cf8' }} />
                                        <Area type="monotone" dataKey="usuarios" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#mGradUsers)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Chart: Buzón */}
                        <div className={`${MC} p-4`} style={{ ...MCS, height: 200 }}>
                            <div className="flex items-center justify-between mb-2 shrink-0">
                                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <Mail size={10} className="text-teal-400" /> Buzón · 7 días
                                </h4>
                                <span className="text-teal-400 text-sm font-bold">{todayCount} hoy</span>
                            </div>
                            <div style={{ height: 148 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={contactsData}>
                                        <defs>
                                            <linearGradient id="mGradContacts" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%"  stopColor="#2dd4bf" stopOpacity={0.9} />
                                                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.35} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                        <XAxis dataKey="name" stroke="#4b5563" tick={{ fontSize: 9 }} />
                                        <YAxis stroke="#4b5563" tick={{ fontSize: 9 }} allowDecimals={false} width={18} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '10px', fontSize: '11px' }} itemStyle={{ color: '#2dd4bf' }} formatter={v => [v, 'Mensajes']} />
                                        <Bar dataKey="mensajes" fill="url(#mGradContacts)" radius={[3, 3, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Chart: Reportes donut */}
                        <div className={`${MC} p-4`} style={{ ...MCS, height: 220 }}>
                            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 shrink-0">Estado de Reportes</h4>
                            <div className="flex items-center gap-3" style={{ height: 168 }}>
                                <div style={{ flex: 1, height: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={reportsPieData.length ? reportsPieData : [{ name: 'Sin datos', value: 1, color: '#334155' }]}
                                                cx="50%" cy="50%" innerRadius="42%" outerRadius="65%" paddingAngle={3} dataKey="value" strokeWidth={0}>
                                                {(reportsPieData.length ? reportsPieData : [{ name: 'Sin datos', value: 1, color: '#334155' }]).map((e, i) => (
                                                    <Cell key={i} fill={e.color} fillOpacity={0.9} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '10px', fontSize: '11px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col gap-2 shrink-0 justify-center">
                                    {(reportsPieData.length ? reportsPieData : [{ name: 'Sin datos', value: 0, color: '#334155' }]).map((item, i) => (
                                        <div key={i} className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-[10px] text-slate-400">{item.name}</span>
                                            <span className="text-[10px] font-bold ml-1" style={{ color: item.color }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </>)}

                    {/* ── NON-INICIO SECTIONS ── */}
                    {!isInicio && (
                        <div className="mt-3">
                            {activeSection === 'mapa-sos' && (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="text-red-400" size={18} />
                                        <h2 className="text-base font-bold">Mapa SOS</h2>
                                        <span className="ml-auto bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full border border-red-500/25">{pendingAlerts.length}</span>
                                    </div>
                                    <div className={`${MC} overflow-hidden`} style={{ ...MCS, height: '62vh' }}>
                                        <SOSMap alerts={sosAlerts} />
                                    </div>
                                </div>
                            )}
                            {activeSection === 'usuarios'      && <UsersTable users={users} initialFilterRisk={false} initialSearch={riskUserSearch} onClearFilter={() => setRiskUserSearch('')} />}
                            {activeSection === 'citas'         && <AppointmentsTable appointments={appointments} />}
                            {activeSection === 'especialistas' && <SpecialistsTable specialists={specialists} appointments={appointments} />}
                            {activeSection === 'reportes'      && <ReportsTable reports={reports} />}
                            {activeSection === 'biblioteca'     && <ResourcesTable items={recursos} />}
                            {activeSection === 'mensajes'      && <ContactsTable contacts={contacts} />}
                            {activeSection === 'chat'          && (
                                <div className={`${MC} overflow-hidden`} style={{ ...MCS, height: 'calc(100svh - 130px)' }}>
                                    <ChatWidget currentUser={currentUser} />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Fixed bottom nav ── */}
                <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-700/60 flex items-center justify-around px-1 py-2">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => setActiveSection(item.id)}
                            className={`relative flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
                                activeSection === item.id ? 'text-teal-400' : 'text-slate-600 hover:text-slate-400'
                            }`}>
                            <item.icon size={18} />
                            <span className="text-[9px] font-medium leading-none">{item.label}</span>
                            {activeSection === item.id && (
                                <motion.div layoutId="mobileNavDot" className="absolute -bottom-1 w-1 h-1 rounded-full bg-teal-400"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                            )}
                        </button>
                    ))}
                </div>

            </div>
        );
    }

    // ════════════════════════════════════════════════════
    //  DESKTOP LAYOUT (≥ 768px)
    // ════════════════════════════════════════════════════
    const G  = 12;   // gap from screen edge
    const TH = 68;   // top bar height
    const LW = 80;   // left sidebar width (icon-only)
    const RW = 280;  // right risk panel width
    const BH = 238;  // bottom charts height

    // derived
    const topEdge  = G + TH + G;          // 92  — where side panels start
    const leftEdge = G + LW + G;          // 104 — where center starts
    const rightEdge = G + RW + G;         // 304 — from right (when right panel showing)
    const botEdge  = G + BH + G;          // 262 — from bottom (when charts showing)
    const sosBannerH = 74;               // SOS alert card height in right column
    const rightTop = G;                  // right-column panels start at same level as top bar
    const riskPanelTop = (isInicio && pendingAlerts.length > 0)
        ? rightTop + sosBannerH + G
        : rightTop;

    return (
        <div className="fixed inset-0 bg-slate-950 overflow-hidden text-slate-200 font-sans selection:bg-teal-500/30">

            {/* ── LOGO — centered, shines through the hollow ── */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0" style={{ transform: 'translateX(80px)' }}>
                <motion.img
                    src="/images/logos/logo-unico.png"
                    alt=""
                    variants={logoAnim}
                    initial="hidden"
                    animate="visible"
                    className="w-[520px] h-[520px] object-contain"
                    style={{ filter: 'drop-shadow(0 0 90px rgba(45,212,191,0.28)) drop-shadow(0 0 30px rgba(45,212,191,0.1))' }}
                />
            </div>

            {/* ═══════════════════════════════════════════════════
                TOP FLOATING CARD — "Bienvenido" + stats pills
                Slides DOWN
            ═══════════════════════════════════════════════════ */}
            <motion.div
                variants={slideDown}
                initial="hidden"
                animate="visible"
                className="fixed z-30 grid items-center px-6"
                style={{ top: G, left: G, right: G, height: TH, gridTemplateColumns: '1fr auto 1fr' }}
            >
                {/* Logo — left */}
                <div className="flex items-center">
                    <img
                        src="/images/logos/logo-unico.png"
                        alt="Logo"
                        className="h-10 w-auto object-contain"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.4))' }}
                    />
                </div>

                {/* Stats pills — true center */}
                <div className="flex items-center gap-3">
                    {[
                        { label: 'Usuarios',      value: stats.users_count        ?? users.length        },
                        { label: 'Riesgo Alto',   value: stats.users_low_mood     ?? riskUsers.length    },
                        { label: 'Reportes',      value: stats.reports_count      ?? reports.length      },
                        { label: 'Especialistas', value: stats.specialists_count  ?? specialists.length  },
                        { label: 'Citas',         value: stats.appointments_count ?? appointments.length },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl text-sm font-semibold text-slate-200" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                            <span className="text-lg font-bold text-teal-300">{item.value}</span>
                            <span className="text-xs text-slate-400 hidden lg:inline">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Right spacer — keeps pills centered */}
                <div />
            </motion.div>

            {/* ── Greeting — floats to the right of the Inicio nav button ── */}
            <AnimatePresence>
            {isInicio && (
                <motion.div
                    key="greeting"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="fixed z-20 pointer-events-none"
                    style={{ top: topEdge + 14, left: leftEdge + 10 }}
                >
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                        Bienvenido{currentUser?.name ? `, ${currentUser.name.split(' ')[0]}` : ''}
                    </h1>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mt-1">Panel de administración</p>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════
                LEFT FLOATING CARD — icon-only nav circles
                Slides LEFT → RIGHT
            ═══════════════════════════════════════════════════ */}
            <motion.div
                variants={slideLeft}
                initial="hidden"
                animate="visible"
                className={`fixed z-20 flex flex-col items-center py-4 gap-1 ${CARD}`}
                style={{ top: topEdge, left: G, bottom: G, width: LW, ...CARD_SHADOW }}
            >
                <nav className="flex flex-col items-center gap-1 flex-1 w-full px-2 mt-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            title={item.label}
                            className={`relative w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group ${
                                activeSection === item.id
                                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/40 scale-110'
                                    : 'text-slate-500 hover:bg-slate-700/60 hover:text-slate-200 hover:scale-105'
                            }`}
                        >
                            <item.icon size={19} />
                            {/* Tiny label below icon */}
                            <span className="text-[9px] mt-0.5 leading-none font-medium opacity-80 truncate w-full text-center px-0.5">
                                {item.label}
                            </span>

                            {/* Active glow ring */}
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="navActiveRing"
                                    className="absolute inset-0 rounded-2xl ring-2 ring-teal-400/60"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Logout circle */}
                <button
                    onClick={handleLogout}
                    title="Cerrar Sesión"
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-red-400 hover:bg-red-500/15 hover:scale-105 transition-all border border-transparent hover:border-red-500/30 mb-1"
                >
                    <LogOut size={18} />
                </button>
            </motion.div>

            {/* ═══════════════════════════════════════════════════
                SOS ALERT — right column, above risk panel
            ═══════════════════════════════════════════════════ */}
            <AnimatePresence>
            {isInicio && pendingAlerts.length > 0 && (
                <motion.div
                    key="sos-right"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className={`fixed z-30 ${CARD} border-red-500/35 p-4 flex items-center gap-3`}
                    style={{ top: rightTop, right: G, width: RW, height: sosBannerH, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 30px rgba(239,68,68,0.18), 0 20px 60px rgba(0,0,0,0.55)' }}
                >
                    <div className="bg-red-500/20 p-2 rounded-xl shrink-0">
                        <AlertTriangle className="text-red-400 animate-pulse" size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-red-400 font-bold text-sm leading-tight">¡Alerta SOS!</h3>
                        <p className="text-red-300/60 text-[11px]">{pendingAlerts.length} pendiente{pendingAlerts.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button
                        onClick={() => setActiveSection('mapa-sos')}
                        className="shrink-0 bg-red-500 text-white px-2.5 py-1 rounded-xl font-bold text-[11px] hover:bg-red-600 transition-colors"
                    >
                        Ver →
                    </button>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════
                RIGHT FLOATING CARD — Riesgo Emocional
                Slides RIGHT → LEFT. Only visible on inicio.
            ═══════════════════════════════════════════════════ */}
            <AnimatePresence>
            {isInicio && (
                <motion.div
                    key="risk-panel"
                    variants={slideRight}
                    initial="hidden"
                    animate="visible"
                    exit={{ x: 100, opacity: 0, transition: { duration: 0.3 } }}
                    className={`fixed z-20 flex flex-col overflow-hidden ${CARD} border-red-500/20`}
                    style={{ top: riskPanelTop, right: G, bottom: G + BH + G, width: RW, ...CARD_SHADOW }}
                >
                    {/* Header */}
                    <div className="px-5 pt-5 pb-4 border-b border-red-500/15 shrink-0">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-red-400 flex items-center gap-2">
                                <AlertTriangle className="animate-pulse" size={18} />
                                Riesgo Emocional
                            </h2>
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        </div>
                        <p className="text-[11px] text-red-300/50 mt-0.5">Atención prioritaria requerida</p>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                        {riskUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-600 py-8">
                                <span className="text-4xl mb-3">✅</span>
                                <p className="text-sm">Sin riesgos detectados</p>
                            </div>
                        ) : (
                            riskUsers.map((user, idx) => (
                                <motion.div
                                    key={user.id || idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 * idx }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => { setRiskUserSearch(user.name); setActiveSection('usuarios'); }}
                                    className="bg-red-950/20 border border-red-500/10 rounded-2xl p-3.5 cursor-pointer hover:border-red-500/40 hover:bg-red-900/25 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center text-red-300 font-bold border border-red-500/30 group-hover:bg-red-500 group-hover:text-white transition-colors text-sm shrink-0">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-slate-200 text-sm truncate">{user.name || 'Usuario'}</h4>
                                            <span className="text-[10px] uppercase text-red-400 font-bold tracking-wider">Nivel Crítico</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-red-500/10 relative z-10">
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Calendar size={10} />
                                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Reciente'}
                                        </span>
                                        <span className="text-xs text-red-400 group-hover:translate-x-1 transition-transform">Ver →</span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════
                BOTTOM FLOATING CARD — Charts
                Slides BOTTOM → UP. Only visible on inicio.
            ═══════════════════════════════════════════════════ */}
            {/* ── Chart card 1: Usuarios ── */}
            <AnimatePresence>
            {isInicio && (
                <motion.div
                    key="chart-users"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ y: 100, opacity: 0, transition: { duration: 0.3 } }}
                    className={`fixed z-20 flex flex-col overflow-hidden px-5 pt-4 pb-3 ${CARD}`}
                    style={{ bottom: G, left: leftEdge, width: 'calc((100vw - 140px) / 3)', height: BH, ...CARD_SHADOW }}
                >
                    <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 shrink-0">
                        Registro de Usuarios · 7 días
                    </h4>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={usersData}>
                                <defs>
                                    <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.7} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="name" stroke="#4b5563" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#4b5563" tick={{ fontSize: 10 }} allowDecimals={false} width={22} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '10px', fontSize: '12px' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area type="monotone" dataKey="usuarios" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#gradUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ── Chart card 2: Buzón ── */}
            <AnimatePresence>
            {isInicio && (
                <motion.div
                    key="chart-buzon"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ y: 100, opacity: 0, transition: { duration: 0.3 } }}
                    className={`fixed z-20 flex flex-col overflow-hidden px-5 pt-4 pb-3 ${CARD}`}
                    style={{ bottom: G + 22, left: `calc(${leftEdge}px + (100vw - 140px) / 3 + ${G}px)`, width: 'calc((100vw - 140px) / 3)', height: BH, ...CARD_SHADOW }}
                >
                    <div className="flex items-center justify-between mb-2 shrink-0">
                        <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Mail size={11} className="text-teal-400" />
                            Buzón · 7 días
                        </h4>
                        <span className="text-teal-400 text-sm font-bold">{todayCount} hoy</span>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={contactsData}>
                                <defs>
                                    <linearGradient id="gradContacts" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%"  stopColor="#2dd4bf" stopOpacity={0.9} />
                                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0.35} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="name" stroke="#4b5563" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#4b5563" tick={{ fontSize: 10 }} allowDecimals={false} width={22} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '10px', fontSize: '12px' }}
                                    itemStyle={{ color: '#2dd4bf' }}
                                    formatter={v => [v, 'Mensajes']}
                                />
                                <Bar dataKey="mensajes" fill="url(#gradContacts)" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ── Chart card 3: Riesgo por nivel (donut) ── */}
            <AnimatePresence>
            {isInicio && (
                <motion.div
                    key="chart-riesgo"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ y: 100, opacity: 0, transition: { duration: 0.3 } }}
                    className={`fixed z-20 flex flex-col overflow-hidden px-5 pt-4 pb-3 ${CARD}`}
                    style={{ bottom: G, right: G, width: 'calc((100vw - 140px) / 3)', height: BH, ...CARD_SHADOW }}
                >
                    <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1 shrink-0">
                        Estado de Reportes
                    </h4>
                    <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={reportsPieData.length ? reportsPieData : [{ name: 'Sin datos', value: 1, color: '#334155' }]}
                                        cx="50%" cy="50%"
                                        innerRadius="48%" outerRadius="72%"
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {(reportsPieData.length ? reportsPieData : [{ name: 'Sin datos', value: 1, color: '#334155' }]).map((entry, i) => (
                                            <Cell key={i} fill={entry.color} fillOpacity={0.9} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '10px', fontSize: '12px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Legend */}
                        <div className="flex flex-col gap-2 shrink-0 justify-center">
                            {(reportsPieData.length ? reportsPieData : [{ name: 'Sin datos', value: 0, color: '#334155' }]).map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] text-slate-400">{item.name}</span>
                                    <span className="text-[10px] font-bold ml-auto pl-2" style={{ color: item.color }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════
                CENTER CONTENT PANEL
                Appears for non-inicio sections, fills the hollow.
                Slides in as a floating card.
            ═══════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
            {!isInicio && (
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className={`fixed z-10 overflow-hidden ${CARD}`}
                    style={{
                        top: topEdge,
                        left: leftEdge,
                        right: G,
                        bottom: G,
                        ...CARD_SHADOW,
                    }}
                >
                    <div className="h-full overflow-y-auto p-6 custom-scrollbar">
                        {activeSection === 'mapa-sos' && (
                            <div className="h-full flex flex-col gap-4">
                                <div className="flex items-center gap-3 shrink-0">
                                    <MapPin className="text-red-400" size={20} />
                                    <h2 className="text-lg font-bold">Mapa de Actividad SOS</h2>
                                    <span className="ml-auto bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">
                                        {pendingAlerts.length} pendiente{pendingAlerts.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="flex-1 rounded-2xl overflow-hidden border border-slate-700/30">
                                    <SOSMap alerts={sosAlerts} />
                                </div>
                            </div>
                        )}
                        {activeSection === 'usuarios' && (
                            <UsersTable
                                users={users}
                                initialFilterRisk={false}
                                initialSearch={riskUserSearch}
                                onClearFilter={() => setRiskUserSearch('')}
                            />
                        )}
                        {activeSection === 'citas'         && <AppointmentsTable appointments={appointments} />}
                        {activeSection === 'especialistas' && <SpecialistsTable specialists={specialists} appointments={appointments} />}
                        {activeSection === 'reportes'      && <ReportsTable reports={reports} />}
                        {activeSection === 'biblioteca'    && <ResourcesTable items={recursos} />}
                        {activeSection === 'mensajes'      && <ContactsTable contacts={contacts} />}
                        {activeSection === 'chat'          && (
                            <div className="h-full bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-700/30">
                                <ChatWidget currentUser={currentUser} />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

        </div>
    );
}
