import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, ArrowLeft, MoreVertical, Paperclip, Smile, MessageCircle } from 'lucide-react';
import axios from 'axios';

export default function ChatWidget({ currentUser }) {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchConversations();
        const interval = setInterval(fetchConversations, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!selectedUser) return;
        fetchMessages(selectedUser.id);
        const interval = setInterval(() => fetchMessages(selectedUser.id), 3000);
        return () => clearInterval(interval);
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const response = await axios.get('/chat/conversations');
            setConversations(response.data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const response = await axios.get(`/chat/messages/${userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        const tempMessage = {
            id: Date.now(),
            sender_id: currentUser.id,
            receiver_id: selectedUser.id,
            content: newMessage,
            created_at: new Date().toISOString(),
            isTemp: true
        };

        setMessages([...messages, tempMessage]);
        setNewMessage('');

        try {
            await axios.post('/chat/messages', {
                receiver_id: selectedUser.id,
                content: tempMessage.content
            });
            fetchMessages(selectedUser.id);
            fetchConversations();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* ── CONVERSATION LIST ── */
    if (!selectedUser) {
        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors">

                {/* Search bar */}
                <div className="px-4 pt-4 pb-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/60 transition-colors">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl py-2.5 pl-9 pr-4 border-0 focus:ring-2 focus:ring-teal-500/30 focus:outline-none transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Conversation list */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 transition-colors">
                    {filteredConversations.length > 0 ? (
                        filteredConversations.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedUser(conv)}
                                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white dark:hover:bg-slate-800/50 transition-colors text-left"
                            >
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm uppercase shadow-md">
                                        {conv.name.substring(0, 2)}
                                    </div>
                                    {conv.unread_count > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-slate-50 dark:border-slate-950 text-white text-[9px] font-black flex items-center justify-center">
                                            {conv.unread_count > 9 ? '9+' : conv.unread_count}
                                        </span>
                                    )}
                                </div>
                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className={`text-sm font-bold truncate transition-colors ${conv.unread_count > 0 ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                                            {conv.name}
                                        </span>
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 ml-2">{conv.last_message_time}</span>
                                    </div>
                                    <p className={`text-xs truncate transition-colors ${conv.unread_count > 0 ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-400 dark:text-slate-500'}`}>
                                        {conv.last_message || 'Inicia una conversación...'}
                                    </p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 opacity-50">
                            <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <Search className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">No se encontraron contactos.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /* ── CHAT VIEW ── */
    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors">

            {/* Chat contact header */}
            <div className="shrink-0 flex items-center gap-3 px-4 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/60 transition-colors">
                <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow">
                    {selectedUser.name.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{selectedUser.name}</p>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">En línea</span>
                    </div>
                </div>
                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl transition">
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
                        <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500"><MessageCircle size={26} /></div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-[180px]">Comienza tu conversación con {selectedUser.name}</p>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isMe = msg.sender_id === currentUser.id;
                        return (
                            <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                                    isMe
                                        ? 'bg-teal-500 text-white rounded-tr-sm shadow-teal-500/20'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-100 dark:border-slate-700/60'
                                }`}>
                                    <p className="leading-relaxed">{msg.content}</p>
                                    <span className={`text-[10px] block mt-1 ${isMe ? 'text-teal-100/80 text-right' : 'text-slate-400 dark:text-slate-500'}`}>
                                        {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="shrink-0 px-4 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800/60 transition-colors">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 border border-transparent focus-within:border-teal-500/50 focus-within:bg-white dark:focus-within:bg-slate-700 transition-all">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="flex-1 bg-transparent py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                        />
                        <button type="button" className="text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition ml-2">
                            <Smile size={18} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="w-11 h-11 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-teal-500/25 shrink-0"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
