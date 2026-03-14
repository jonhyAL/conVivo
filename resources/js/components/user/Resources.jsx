import React, { useState } from 'react';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import {
    Download, ExternalLink, BookOpen, Brain, Heart, Lock, Lightbulb,
    Shield, FileText, HeartPulse, Users, Star, Zap, Target, Compass,
    Globe, Award, Music, AlertTriangle,
} from 'lucide-react';

// ─── Icon map (string → Lucide component) ────────────────────────────────────
const ICON_MAP = {
    Brain, Heart, Lock, Lightbulb, Shield, FileText, HeartPulse, Users,
    BookOpen, Star, Zap, Target, Compass, Globe, Award, Music, AlertTriangle,
};

// ─── Protocol type → gradient / icon / type label / status color ─────────────
const PROTOCOL_TYPE_CONFIG = {
    seguridad:     { label: 'Protocolo de Seguridad',  gradient: 'from-red-500 to-orange-500',    iconName: 'Shield',        statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30' },
    crisis:        { label: 'Protocolo de Crisis',     gradient: 'from-rose-500 to-red-600',      iconName: 'HeartPulse',    statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30' },
    institucional: { label: 'Documento Institucional', gradient: 'from-slate-500 to-slate-700',   iconName: 'FileText',      statusColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700' },
    orientacion:   { label: 'Guía de Orientación',     gradient: 'from-green-500 to-teal-600',    iconName: 'Users',         statusColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30' },
    proteccion:    { label: 'Protocolo de Protección', gradient: 'from-purple-500 to-violet-600', iconName: 'Shield',        statusColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/30' },
    convivencia:   { label: 'Guía de Convivencia',     gradient: 'from-emerald-500 to-teal-600',  iconName: 'Users',         statusColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30' },
    acoso:         { label: 'Protocolo Anti-Acoso',    gradient: 'from-red-500 to-orange-500',    iconName: 'AlertTriangle', statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30' },
};

// ─── Tag → badge color (for resources) ───────────────────────────────────────
const TAG_COLOR = {
    Nuevo:        'bg-teal-400/90 text-white',
    Esencial:     'bg-teal-700/90 text-white',
    Recomendado:  'bg-emerald-500/90 text-white',
    Popular:      'bg-teal-500/90 text-white',
    Destacado:    'bg-teal-600/90 text-white',
    Actualizado:  'bg-teal-500/90 text-white',
};

// ─── Map DB record → normalized resource item ─────────────────────────────────
function normalizeRecurso(r) {
    const Icon = ICON_MAP[r.icon_name] || Brain;
    return {
        id:              r.id,
        Icon,
        gradient:        r.background_value || 'from-teal-500 to-emerald-600',
        background_type: r.background_type || 'color',
        image_path:      r.image_path || null,
        title:           r.title,
        description:     r.description,
        status:          r.tag,
        statusColor:     TAG_COLOR[r.tag] || 'bg-teal-500/90 text-white',
    };
}

// ─── Map DB record → normalized protocol item ─────────────────────────────────
function normalizeProtocolo(p) {
    const cfg  = PROTOCOL_TYPE_CONFIG[p.protocol_type] || PROTOCOL_TYPE_CONFIG.seguridad;
    const Icon = ICON_MAP[cfg.iconName] || Shield;
    return {
        id:          p.id,
        Icon,
        gradient:    cfg.gradient,
        title:       p.title,
        type:        cfg.label,
        status:      p.tag,
        statusColor: cfg.statusColor,
        description: p.description,
        file_path:   p.file_path || null,
    };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Resources({ user, recursos = [], protocolos = [] }) {
    const [activeTab, setActiveTab] = useState('resources');

    const resourceItems  = recursos.map(normalizeRecurso);
    const protocolItems  = protocolos.map(normalizeProtocolo);

    return (
        <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 relative pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            <MobileHeader user={user} />

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-4 pt-4 pb-4">

                {/* Header & Tabs */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start transition-colors">
                            <span className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-2 rounded-lg mr-3 shadow-lg shadow-teal-500/20 flex items-center">
                                <BookOpen size={18} />
                            </span>
                            <span>Biblioteca</span>
                        </h1>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl w-full md:w-auto transition-colors">
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform ${
                                activeTab === 'resources'
                                    ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-md'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            Académicos
                        </button>
                        <button
                            onClick={() => setActiveTab('protocols')}
                            className={`flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform ${
                                activeTab === 'protocols'
                                    ? 'bg-red-600 dark:bg-red-500 text-white shadow-md'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-400'
                            }`}
                        >
                            Protocolos
                        </button>
                    </div>
                </div>

                {/* ── RESOURCES TAB ───────────────────────────────── */}
                {activeTab === 'resources' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {resourceItems.length === 0 ? (
                            <div className="col-span-2 bg-white dark:bg-slate-900/50 rounded-3xl p-10 text-center border border-dashed border-slate-200 dark:border-slate-800">
                                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4">
                                    <BookOpen size={26} className="text-teal-400 dark:text-teal-500" />
                                </div>
                                <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base mb-1">Aún no hay recursos</h3>
                                <p className="text-slate-400 dark:text-slate-500 text-sm">Pronto el equipo publicará materiales académicos para ti.</p>
                            </div>
                        ) : resourceItems.map((item, i) => (
                            <div key={item.id ?? i} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all dark:shadow-none group cursor-pointer">
                                {/* Card header — image or gradient */}
                                {item.background_type === 'image' && item.image_path ? (
                                    <div className="h-28 relative flex items-end p-3 overflow-hidden">
                                        <img
                                            src={`/storage/${item.image_path}`}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30" />
                                        <span className={`relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full ${item.statusColor}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ) : (
                                    <div className={`h-28 bg-gradient-to-br ${item.gradient} relative flex items-end p-3`}>
                                        <item.Icon size={52} className="absolute top-3 right-3 opacity-20 text-white pointer-events-none" />
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.statusColor}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                )}
                                {/* Content */}
                                <div className="bg-white dark:bg-slate-900 p-4">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-base mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── PROTOCOLS TAB ───────────────────────────────── */}
                {activeTab === 'protocols' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {protocolItems.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-10 text-center border border-dashed border-slate-200 dark:border-slate-800">
                                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                                    <Shield size={26} className="text-red-400 dark:text-red-500" />
                                </div>
                                <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base mb-1">Aún no hay protocolos</h3>
                                <p className="text-slate-400 dark:text-slate-500 text-sm">Los protocolos y documentos oficiales estarán disponibles pronto.</p>
                            </div>
                        ) : protocolItems.map((item, i) => (
                            <div key={item.id ?? i} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                                {/* Colored header band */}
                                <div className={`h-16 bg-gradient-to-br ${item.gradient} relative flex items-center justify-between px-4`}>
                                    <item.Icon size={42} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20 text-white pointer-events-none" />
                                    <span className="text-white/90 text-xs font-bold uppercase tracking-wider">{item.type}</span>
                                </div>
                                {/* Content */}
                                <div className="bg-white dark:bg-slate-900 p-4">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="font-bold text-slate-800 dark:text-white text-base">{item.title}</h3>
                                        <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.statusColor}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{item.description}</p>
                                    {item.file_path ? (
                                        <a
                                            href={`/storage/${item.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-3 py-1.5 rounded-lg border border-teal-100 dark:border-teal-800/30 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
                                        >
                                            <Download size={12} /> Ver / Descargar
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <ExternalLink size={12} /> Sin archivo adjunto
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            <BottomNav active="resources" />
        </div>
    );
}
