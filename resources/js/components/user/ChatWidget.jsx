import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, ArrowLeft, MoreVertical, Paperclip, Smile } from 'lucide-react';
import axios from 'axios';

export default function ChatWidget({ currentUser }) {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch conversations (admins/specialists)
    useEffect(() => {
        fetchConversations();
        const interval = setInterval(fetchConversations, 10000); // Poll every 10s for new list updates
        return () => clearInterval(interval);
    }, []);

    // Poll messages when a conversation is open
    useEffect(() => {
        if (!selectedUser) return;
        
        fetchMessages(selectedUser.id);
        const interval = setInterval(() => fetchMessages(selectedUser.id), 3000); // Poll every 3s for chat
        return () => clearInterval(interval);
    }, [selectedUser]);

    // Scroll to bottom
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
            // Check if we need to update state to avoid re-renders if same data? 
            // For now, just set it. React handles shallow comparison but arrays are new ref.
            // Ideally, check length or last ID.
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        const tempMessage = {
            id: Date.now(), // Temp ID
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
            fetchMessages(selectedUser.id); // Refresh to get real ID and timestamp
            fetchConversations(); // Update last message in list
        } catch (error) {
            console.error('Error sending message:', error);
            // Remove temp message?
        }
    };

    const filteredConversations = conversations.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl h-[70vh] sm:h-[600px] flex flex-col relative z-20 mx-4 sm:mx-0 mb-24 sm:mb-0">
            {/* Header / Search */}
            {!selectedUser ? (
                <>
                     <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                        <div className="relative mb-4">
                            <input 
                                type="text" 
                                placeholder="Buscar especialista o tutor..." 
                                className="w-full bg-slate-800 text-slate-200 placeholder-slate-500 rounded-xl py-3 pl-10 pr-4 border border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="text-slate-500 absolute left-3 top-3.5" size={20} />
                        </div>
                        
                        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                            <button className="px-4 py-1.5 bg-teal-900/30 text-teal-400 text-sm font-medium rounded-full border border-teal-500/20 whitespace-nowrap">Admins</button>
                            <button className="px-4 py-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-sm font-medium rounded-full border border-transparent hover:border-slate-700 transition whitespace-nowrap">Especialistas</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map(conv => (
                                <div 
                                    key={conv.id}
                                    onClick={() => setSelectedUser(conv)}
                                    className="block hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 cursor-pointer"
                                >
                                    <div className="flex items-center p-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-200 font-bold border border-white/10 uppercase">
                                                {conv.name.substring(0, 2)}
                                            </div>
                                            {conv.unread_count > 0 && (
                                                <span className="absolute top-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-slate-900"></span>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-sm font-bold text-slate-100 truncate">{conv.name}</h3>
                                                <span className="text-xs text-slate-500 font-medium">{conv.last_message_time}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className={`text-sm truncate font-medium ${conv.unread_count > 0 ? 'text-slate-100' : 'text-slate-400'}`}>
                                                    {conv.last_message || 'Inicia una conversación...'}
                                                </p>
                                                {conv.unread_count > 0 && (
                                                    <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 bg-teal-600 text-white text-[10px] font-bold rounded-full min-w-[18px]">
                                                        {conv.unread_count}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center opacity-50">
                                <p className="text-sm text-slate-600">No se encontraron contactos disponibles.</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* Chat View Header */}
                    <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setSelectedUser(null)}
                                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-200 font-bold border border-white/10 uppercase text-sm">
                                {selectedUser.name.substring(0, 2)}
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-100">{selectedUser.name}</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    <span className="text-xs text-slate-400">En línea</span>
                                </div>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/30">
                        {messages.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-slate-500 text-sm">Este es el comienzo de tu historial de mensajes con {selectedUser.name}.</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => {
                                const isMe = msg.sender_id === currentUser.id;
                                return (
                                    <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`
                                            max-w-[75%] px-4 py-2 rounded-2xl text-sm 
                                            ${isMe 
                                                ? 'bg-teal-600 text-white rounded-tr-none' 
                                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}
                                        `}>
                                            <p>{msg.content}</p>
                                            <span className={`text-[10px] block mt-1 ${isMe ? 'text-teal-200/70' : 'text-slate-500'}`}>
                                                {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Enviando...'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-slate-900 border-t border-slate-800">
                        <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                            <button type="button" className="p-2 text-slate-500 hover:text-teal-400 transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="w-full bg-slate-800 text-slate-200 placeholder-slate-500 rounded-xl py-2.5 pl-4 pr-10 border border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
                                />
                                <button type="button" className="absolute right-3 top-2.5 text-slate-500 hover:text-teal-400 transition-colors">
                                    <Smile size={20} />
                                </button>
                            </div>
                            <button 
                                type="submit" 
                                disabled={!newMessage.trim()}
                                className="p-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-900/20"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}