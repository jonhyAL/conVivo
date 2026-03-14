import React, { useState } from 'react';
import axios from 'axios';
import {
    Plus, Edit2, Trash2, Eye, EyeOff, BookOpen, Shield, FileText,
    Brain, Heart, Lock, Lightbulb, HeartPulse, Users, X, Upload,
    Star, Zap, Target, Compass, Globe, Award, Music, AlertTriangle,
    Palette, Image as ImageIcon, Download,
} from 'lucide-react';

// ─── Config shared with user-side Resources.jsx ──────────────────────────────

export const PROTOCOL_TYPE_CONFIG = {
    seguridad:     { label: 'Protocolo de Seguridad',  gradient: 'from-red-500 to-orange-500',    iconName: 'Shield',        statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30' },
    crisis:        { label: 'Protocolo de Crisis',     gradient: 'from-rose-500 to-red-600',      iconName: 'HeartPulse',    statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30' },
    institucional: { label: 'Documento Institucional', gradient: 'from-slate-500 to-slate-700',   iconName: 'FileText',      statusColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700' },
    orientacion:   { label: 'Guía de Orientación',     gradient: 'from-green-500 to-teal-600',    iconName: 'Users',         statusColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30' },
    proteccion:    { label: 'Protocolo de Protección', gradient: 'from-purple-500 to-violet-600', iconName: 'Shield',        statusColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/30' },
    convivencia:   { label: 'Guía de Convivencia',     gradient: 'from-emerald-500 to-teal-600',  iconName: 'Users',         statusColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30' },
    acoso:         { label: 'Protocolo Anti-Acoso',    gradient: 'from-red-500 to-orange-500',    iconName: 'AlertTriangle', statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30' },
};

export const ICON_MAP = {
    Brain, Heart, Lock, Lightbulb, Shield, FileText, HeartPulse, Users,
    BookOpen, Star, Zap, Target, Compass, Globe, Award, Music, AlertTriangle,
};

// ─── Options ─────────────────────────────────────────────────────────────────

const GRADIENT_OPTIONS = [
    { value: 'from-teal-500 to-emerald-600',  label: 'Teal → Esmeralda' },
    { value: 'from-teal-600 to-teal-800',     label: 'Teal Intenso' },
    { value: 'from-teal-700 to-slate-800',    label: 'Teal → Pizarra' },
    { value: 'from-emerald-500 to-teal-700',  label: 'Esmeralda → Teal' },
    { value: 'from-teal-400 to-emerald-500',  label: 'Teal Claro' },
    { value: 'from-emerald-600 to-green-700', label: 'Verde Profundo' },
    { value: 'from-teal-600 to-emerald-800',  label: 'Teal Profundo' },
    { value: 'from-green-500 to-teal-600',    label: 'Verde → Teal' },
];

const ICON_OPTIONS = [
    { value: 'Brain',        label: 'Cerebro'  },
    { value: 'Heart',        label: 'Corazón'  },
    { value: 'Lock',         label: 'Candado'  },
    { value: 'Lightbulb',   label: 'Bombilla' },
    { value: 'BookOpen',     label: 'Libro'    },
    { value: 'Star',         label: 'Estrella' },
    { value: 'Zap',          label: 'Rayo'     },
    { value: 'Target',       label: 'Meta'     },
    { value: 'Users',        label: 'Personas' },
    { value: 'Compass',      label: 'Brújula'  },
    { value: 'Globe',        label: 'Globo'    },
    { value: 'Award',        label: 'Premio'   },
    { value: 'Shield',       label: 'Escudo'   },
    { value: 'Music',        label: 'Música'   },
];

const TAG_OPTS_RECURSO   = ['Nuevo', 'Esencial', 'Recomendado', 'Popular', 'Destacado', 'Actualizado'];
const TAG_OPTS_PROTOCOLO = ['Activo', 'Vigente', 'Nuevo', 'Actualizado'];

const EMPTY_FORM = {
    item_type:        'recurso',
    protocol_type:    'seguridad',
    title:            '',
    description:      '',
    tag:              'Nuevo',
    background_type:  'color',
    background_value: 'from-teal-500 to-emerald-600',
    icon_name:        'Brain',
    is_active:        true,
    sort_order:       0,
    image_file:       null,
    protocol_file:    null,
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function ResourcesTable({ items: initial = [] }) {
    const [items, setItems]             = useState(initial);
    const [filter, setFilter]           = useState('all');
    const [showModal, setShowModal]     = useState(false);
    const [editItem, setEditItem]       = useState(null);
    const [form, setForm]               = useState(EMPTY_FORM);
    const [saving, setSaving]           = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [imagePreview, setImagePreview]   = useState(null);

    const filtered = items.filter(i => filter === 'all' || i.item_type === filter);

    // ── helpers ──────────────────────────────────────────────────────────────
    const getIcon = (item) => {
        if (item.item_type === 'protocolo') {
            const cfg = PROTOCOL_TYPE_CONFIG[item.protocol_type] || PROTOCOL_TYPE_CONFIG.seguridad;
            return ICON_MAP[cfg.iconName] || Shield;
        }
        return ICON_MAP[item.icon_name] || Brain;
    };

    const getGradient = (item) => {
        if (item.item_type === 'protocolo') {
            const cfg = PROTOCOL_TYPE_CONFIG[item.protocol_type] || PROTOCOL_TYPE_CONFIG.seguridad;
            return cfg.gradient;
        }
        return item.background_value || 'from-teal-500 to-emerald-600';
    };

    // ── actions ──────────────────────────────────────────────────────────────
    const openCreate = () => {
        setForm(EMPTY_FORM);
        setEditItem(null);
        setImagePreview(null);
        setShowModal(true);
    };

    const openEdit = (item) => {
        setForm({
            item_type:        item.item_type,
            protocol_type:    item.protocol_type || 'seguridad',
            title:            item.title,
            description:      item.description,
            tag:              item.tag,
            background_type:  item.background_type || 'color',
            background_value: item.background_value || 'from-teal-500 to-emerald-600',
            icon_name:        item.icon_name || 'Brain',
            is_active:        item.is_active,
            sort_order:       item.sort_order || 0,
            image_file:       null,
            protocol_file:    null,
        });
        setEditItem(item);
        setImagePreview(item.image_path ? `/storage/${item.image_path}` : null);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.description.trim()) return;
        setSaving(true);
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (k === 'image_file' || k === 'protocol_file') {
                if (v) fd.append(k, v);
            } else if (v !== null && v !== undefined) {
                fd.append(k, String(v));
            }
        });
        // Override boolean as 1/0 so FormData sends correctly
        fd.set('is_active', form.is_active ? '1' : '0');

        try {
            let res;
            if (editItem) {
                fd.append('_method', 'PATCH');
                res = await axios.post(`/admin/recursos/${editItem.id}`, fd, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setItems(prev => prev.map(i => i.id === editItem.id ? res.data : i));
            } else {
                res = await axios.post('/admin/recursos', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setItems(prev => [res.data, ...prev]);
            }
            setShowModal(false);
        } catch (err) {
            const msg = err.response?.data?.message
                || Object.values(err.response?.data?.errors || {}).flat().join('\n')
                || 'Error al guardar';
            alert(msg);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/recursos/${id}`);
            setItems(prev => prev.filter(i => i.id !== id));
            setDeleteConfirm(null);
        } catch {
            alert('Error al eliminar');
        }
    };

    const toggleActive = async (item) => {
        const fd = new FormData();
        // Send all fields required by validation
        ['item_type','protocol_type','title','description','tag',
         'background_type','background_value','icon_name','sort_order'].forEach(k => {
            if (item[k] !== null && item[k] !== undefined) fd.append(k, String(item[k]));
        });
        fd.append('is_active', item.is_active ? '0' : '1');
        fd.append('_method', 'PATCH');
        try {
            const res = await axios.post(`/admin/recursos/${item.id}`, fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setItems(prev => prev.map(i => i.id === item.id ? res.data : i));
        } catch {
            alert('Error al cambiar estado');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm(f => ({ ...f, image_file: file }));
        setImagePreview(URL.createObjectURL(file));
    };

    // ── Dark card style consistent with AdminDashboard ────────────────────────
    const MC = 'bg-slate-800/60 border border-slate-700/60 rounded-2xl';

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-3">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="text-teal-400" size={18} />
                    <h2 className="text-base font-bold text-slate-100">Biblioteca</h2>
                    <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/20">
                        {items.length}
                    </span>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors shadow-lg shadow-teal-900/40"
                >
                    <Plus size={13} /> Nuevo
                </button>
            </div>

            {/* Filter tabs */}
            <div className="flex p-1 bg-slate-900/60 rounded-xl border border-slate-700/40">
                {[['all', 'Todos'], ['recurso', 'Recursos'], ['protocolo', 'Protocolos']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilter(v)}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            filter === v ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'
                        }`}>
                        {l}
                    </button>
                ))}
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className={`${MC} p-10 text-center`}>
                    <BookOpen size={28} className="mx-auto mb-3 text-slate-600" />
                    <p className="text-sm text-slate-500">Sin elementos. Crea el primero.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map(item => {
                        const IconComp = getIcon(item);
                        const gradient = getGradient(item);
                        return (
                            <div key={item.id}
                                className={`${MC} p-3.5 flex items-center gap-3 transition-opacity ${!item.is_active ? 'opacity-40' : ''}`}>
                                {/* Gradient swatch */}
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-md`}>
                                    <IconComp size={17} className="text-white" />
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                        <span className="font-bold text-sm text-slate-100 truncate">{item.title}</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                            item.item_type === 'protocolo'
                                                ? 'bg-red-500/15 text-red-400'
                                                : 'bg-teal-500/15 text-teal-400'
                                        }`}>
                                            {item.item_type === 'protocolo' ? 'Protocolo' : 'Recurso'}
                                        </span>
                                        <span className="text-[10px] font-medium text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded-full border border-slate-700/50">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{item.description}</p>
                                </div>
                                {/* Actions */}
                                <div className="flex items-center gap-1 shrink-0">
                                    <button onClick={() => toggleActive(item)}
                                        title={item.is_active ? 'Desactivar' : 'Activar'}
                                        className={`p-1.5 rounded-lg transition-colors ${
                                            item.is_active
                                                ? 'text-teal-400 hover:bg-teal-500/15'
                                                : 'text-slate-600 hover:bg-slate-700'
                                        }`}>
                                        {item.is_active ? <Eye size={13} /> : <EyeOff size={13} />}
                                    </button>
                                    <button onClick={() => openEdit(item)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                                        <Edit2 size={13} />
                                    </button>
                                    <button onClick={() => setDeleteConfirm(item.id)}
                                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/15 transition-colors">
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Delete confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="font-bold text-white text-base mb-2">¿Eliminar elemento?</h3>
                        <p className="text-slate-400 text-sm mb-5">Esta acción no se puede deshacer y eliminará los archivos asociados.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">
                                Cancelar
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create / Edit modal */}
            {showModal && (
                <ResourceFormModal
                    form={form}
                    setForm={setForm}
                    editItem={editItem}
                    imagePreview={imagePreview}
                    saving={saving}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    onImageChange={handleImageChange}
                />
            )}
        </div>
    );
}

// ─── Form modal helpers (defined outside to prevent re-mount on every render) ─
const MODAL_INP = 'w-full px-3 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm';

function Field({ label, required, children }) {
    return (
        <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                {label}{required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}

// ─── Form modal ───────────────────────────────────────────────────────────────

function ResourceFormModal({ form, setForm, editItem, imagePreview, saving, onClose, onSave, onImageChange }) {
    const isProtocol  = form.item_type === 'protocolo';
    const isColorBg   = form.background_type === 'color';
    const IconPreview = ICON_MAP[form.icon_name] || Brain;

    const inp = MODAL_INP;

    return (
        <div className="fixed inset-0 z-[55] flex items-stretch justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Drawer panel */}
            <div className="relative h-full w-full max-w-md bg-slate-900 border-l border-slate-700/60 shadow-2xl flex flex-col overflow-hidden">

                {/* Sticky header */}
                <div className="shrink-0 sticky top-0 z-10 bg-slate-900 border-b border-slate-800 px-5 py-4 flex items-center justify-between">
                    <h2 className="font-bold text-white text-sm">
                        {editItem ? 'Editar elemento' : 'Nuevo elemento'}
                    </h2>
                    <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <X size={15} />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

                    {/* Type toggle */}
                    <div className="flex p-1 bg-slate-800 rounded-xl border border-slate-700">
                        <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, item_type: 'recurso', tag: 'Nuevo' }))}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                                !isProtocol ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            Recurso
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, item_type: 'protocolo', tag: 'Activo' }))}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                                isProtocol ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            Protocolo
                        </button>
                    </div>

                    {/* Protocol type */}
                    {isProtocol && (
                        <Field label="Tipo de protocolo" required>
                            <select
                                value={form.protocol_type}
                                onChange={e => setForm(f => ({ ...f, protocol_type: e.target.value }))}
                                className={inp}
                            >
                                {Object.entries(PROTOCOL_TYPE_CONFIG).map(([v, c]) => (
                                    <option key={v} value={v}>{c.label}</option>
                                ))}
                            </select>
                            {/* Live preview strip */}
                            {form.protocol_type && (
                                <div className={`mt-2 h-10 rounded-xl bg-gradient-to-br ${PROTOCOL_TYPE_CONFIG[form.protocol_type]?.gradient} flex items-center px-3 gap-2`}>
                                    {React.createElement(ICON_MAP[PROTOCOL_TYPE_CONFIG[form.protocol_type]?.iconName] || Shield, { size: 16, className: 'text-white/80' })}
                                    <span className="text-white/80 text-xs font-bold">{PROTOCOL_TYPE_CONFIG[form.protocol_type]?.label}</span>
                                </div>
                            )}
                        </Field>
                    )}

                    {/* Title */}
                    <Field label="Título" required>
                        <input
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="Ej: Bienestar Emocional"
                            className={inp}
                        />
                    </Field>

                    {/* Description */}
                    <Field label="Descripción" required>
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="Breve descripción del contenido..."
                            className={`${inp} resize-none`}
                        />
                    </Field>

                    {/* Tag */}
                    <Field label="Etiqueta" required>
                        <select
                            value={form.tag}
                            onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                            className={inp}
                        >
                            {(isProtocol ? TAG_OPTS_PROTOCOLO : TAG_OPTS_RECURSO).map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </Field>

                    {/* ── Resource-specific ────────────────────────────── */}
                    {!isProtocol && (
                        <>
                            {/* Background type toggle */}
                            <Field label="Tipo de fondo">
                                <div className="flex p-1 bg-slate-800 rounded-xl border border-slate-700">
                                    <button
                                        type="button"
                                        onClick={() => setForm(f => ({ ...f, background_type: 'color' }))}
                                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                            isColorBg ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        <Palette size={11} /> Color
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setForm(f => ({ ...f, background_type: 'image' }))}
                                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                            !isColorBg ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        <ImageIcon size={11} /> Imagen
                                    </button>
                                </div>
                            </Field>

                            {/* Color bg → gradient + icon pickers */}
                            {isColorBg && (
                                <>
                                    <Field label="Degradado de fondo">
                                        <div className="grid grid-cols-4 gap-2">
                                            {GRADIENT_OPTIONS.map(g => (
                                                <button
                                                    key={g.value}
                                                    type="button"
                                                    title={g.label}
                                                    onClick={() => setForm(f => ({ ...f, background_value: g.value }))}
                                                    className={`h-10 rounded-xl bg-gradient-to-br ${g.value} transition-all ${
                                                        form.background_value === g.value
                                                            ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-900 scale-105'
                                                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </Field>

                                    <Field label="Ícono">
                                        <div className="grid grid-cols-7 gap-1.5">
                                            {ICON_OPTIONS.map(({ value, label }) => {
                                                const IC = ICON_MAP[value];
                                                return (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        title={label}
                                                        onClick={() => setForm(f => ({ ...f, icon_name: value }))}
                                                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                                                            form.icon_name === value
                                                                ? `bg-gradient-to-br ${form.background_value} text-white shadow-lg scale-110`
                                                                : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-200 hover:scale-105'
                                                        }`}
                                                    >
                                                        {IC && <IC size={15} />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </Field>

                                    {/* Live card preview */}
                                    <div className="rounded-xl overflow-hidden border border-slate-700/60">
                                        <div className={`h-20 bg-gradient-to-br ${form.background_value} relative flex items-end p-2.5`}>
                                            <IconPreview size={40} className="absolute top-2 right-2 opacity-20 text-white" />
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">{form.tag || 'Etiqueta'}</span>
                                        </div>
                                        <div className="bg-slate-800 p-2.5">
                                            <p className="font-bold text-white text-sm truncate">{form.title || 'Título del recurso'}</p>
                                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{form.description || 'Descripción breve...'}</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Image bg → upload */}
                            {!isColorBg && (
                                <Field label="Imagen de fondo">
                                    <label className="cursor-pointer block">
                                        <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
                                        {imagePreview ? (
                                            <div className="relative h-36 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 group">
                                                <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-bold flex items-center gap-1.5">
                                                        <Upload size={13} /> Cambiar imagen
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-24 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-teal-600 hover:text-teal-400 transition-colors gap-1">
                                                <Upload size={18} />
                                                <span className="text-xs">Subir imagen (máx. 2 MB)</span>
                                            </div>
                                        )}
                                    </label>
                                </Field>
                            )}
                        </>
                    )}

                    {/* ── Protocol-specific: file upload ───────────────── */}
                    {isProtocol && (
                        <Field label="Archivo del protocolo (PDF / DOC)">
                            <label className="cursor-pointer block">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={e => setForm(f => ({ ...f, protocol_file: e.target.files[0] || null }))}
                                    className="hidden"
                                />
                                <div className={`h-16 border-2 border-dashed rounded-xl flex items-center justify-center gap-2 transition-colors ${
                                    form.protocol_file
                                        ? 'border-teal-600 bg-teal-600/10 text-teal-400'
                                        : 'border-slate-700 text-slate-500 hover:border-teal-600 hover:text-teal-400'
                                }`}>
                                    <Upload size={15} />
                                    <span className="text-xs font-medium">
                                        {form.protocol_file
                                            ? form.protocol_file.name
                                            : editItem?.file_path
                                                ? 'Reemplazar archivo actual'
                                                : 'Subir protocolo (PDF / DOC)'}
                                    </span>
                                </div>
                                {editItem?.file_path && !form.protocol_file && (
                                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                        <FileText size={10} /> Archivo guardado — sube uno nuevo para reemplazarlo
                                    </p>
                                )}
                            </label>
                        </Field>
                    )}

                    {/* Sort order + Active toggle */}
                    <div className="flex items-end gap-3">
                        <Field label="Orden de aparición">
                            <input
                                type="number"
                                min={0}
                                value={form.sort_order}
                                onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                                className={`${inp} w-24`}
                            />
                        </Field>
                        <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                            className={`mb-0 flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                                form.is_active
                                    ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
                                    : 'bg-slate-800 border-slate-700 text-slate-500'
                            }`}
                        >
                            {form.is_active ? <Eye size={13} /> : <EyeOff size={13} />}
                            {form.is_active ? 'Visible' : 'Oculto'}
                        </button>
                    </div>

                </div>

                {/* Sticky footer */}
                <div className="shrink-0 sticky bottom-0 bg-slate-900 border-t border-slate-800 px-5 py-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSave}
                        disabled={saving || !form.title.trim() || !form.description.trim()}
                        className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {saving ? 'Guardando…' : editItem ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
    );
}
