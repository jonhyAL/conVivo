import React, { useState } from 'react';
import { Search, Mail, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function ContactsTable({ contacts = [] }) {
    const [list, setList] = useState(contacts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // all, unread, read
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Filter logic
    const handleDelete = async () => {
        if (!selectedMessage) return;
        try {
            await window.axios.delete(`/admin/contacts/${selectedMessage.id}`);
            const newList = list.filter(c => c.id !== selectedMessage.id);
            setList(newList);
            setSelectedMessage(null);
            setDeleteConfirm(false);
        } catch (error) {
            console.error('Error deleting message:', error);
            setDeleteConfirm(false);
            alert('Error al eliminar mensaje');
        }
    };
    
    // Use list instead of contacts prop which is static initial state
    const filteredContacts = list.filter(contact => {
        const matchesSearch = 
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filterStatus === 'all') return matchesSearch;
        if (filterStatus === 'unread') return matchesSearch && !contact.is_read;
        if (filterStatus === 'read') return matchesSearch && contact.is_read;
        return matchesSearch;
    });

    const handleReadToggle = async (id, currentStatus) => {
        try {
            await window.axios.post(`/admin/contacts/${id}/toggle-read`);
            setList(list.map(c => 
                c.id === id ? { ...c, is_read: !currentStatus } : c
            ));
            
            if (selectedMessage && selectedMessage.id === id) {
                setSelectedMessage({ ...selectedMessage, is_read: !currentStatus });
            }
        } catch (error) {
            console.error('Error toggling read status:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800/50 p-6 rounded-2xl border border-white/5 backdrop-blur-xl">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Mail className="w-6 h-6 text-purple-400" />
                        Buzón de Contacto
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {contacts.filter(c => !c.is_read).length} mensajes sin leer
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar mensaje..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-900/50 border border-white/10 text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:border-purple-500 w-full sm:w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List View */}
                <div className="lg:col-span-1 bg-gray-800/50 rounded-2xl border border-white/5 backdrop-blur-xl overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-white/5 flex gap-2">
                        <button 
                            onClick={() => setFilterStatus('all')}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filterStatus === 'all' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                        >
                            Todos
                        </button>
                        <button 
                            onClick={() => setFilterStatus('unread')}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filterStatus === 'unread' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                        >
                            No leídos
                        </button>
                    </div>
                    
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {filteredContacts.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                No se encontraron mensajes
                            </div>
                        ) : (
                            filteredContacts.map(contact => (
                                <button
                                    key={contact.id}
                                    onClick={() => setSelectedMessage(contact)}
                                    className={`w-full text-left p-4 rounded-xl transition-all border ${
                                        selectedMessage?.id === contact.id 
                                        ? 'bg-purple-600/20 border-purple-500/50' 
                                        : 'bg-gray-900/30 border-transparent hover:bg-gray-800/80 hover:border-white/10'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`font-bold truncate pr-2 ${!contact.is_read ? 'text-white' : 'text-gray-400'}`}>
                                            {contact.name}
                                        </span>
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                            {new Date(contact.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300 truncate font-medium mb-1">
                                        {contact.subject}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {contact.message}
                                    </p>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2 bg-gray-800/50 rounded-2xl border border-white/5 backdrop-blur-xl overflow-hidden flex flex-col h-[600px]">
                    {selectedMessage ? (
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-white/5 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{selectedMessage.subject}</h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <span className="bg-gray-700/50 px-2 py-1 rounded text-gray-300">{selectedMessage.email}</span>
                                        <span>•</span>
                                        <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleReadToggle(selectedMessage.id, selectedMessage.is_read)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" 
                                        title="Marcar como leído/no leído"
                                    >
                                        {selectedMessage.is_read ? <CheckCircle className="w-5 h-5 text-green-500" /> : <CheckCircle className="w-5 h-5" />}
                                    </button>
                                    <button 
                                        onClick={() => setDeleteConfirm(true)}
                                        className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors" 
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 p-8 overflow-y-auto">
                                <div className="prose prose-invert max-w-none">
                                    <p className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/5 bg-gray-900/30">
                                <a 
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    Responder por correo
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
                            <Mail className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg">Selecciona un mensaje para ver el contenido</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete confirmation overlay */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="font-bold text-white text-base mb-2">¿Eliminar mensaje?</h3>
                        <p className="text-slate-400 text-sm mb-5">Esta acción no se puede deshacer.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(false)}
                                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">
                                Cancelar
                            </button>
                            <button onClick={handleDelete}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}