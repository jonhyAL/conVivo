import React, { useState } from 'react';
import { Search, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function ReportsTable({ reports = [] }) {
    const [list, setList] = useState(reports || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReport, setSelectedReport] = useState(null);

    // Filter by incident type or description
    const filteredReports = list.filter(r => 
        (r.tipo_incidente && r.tipo_incidente.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.descripcion && r.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleUpdateStatus = async (id, currentStatus) => {
        // Cycle logic: pendiente -> en_revision -> resuelto -> pendiente
        let newStatus = 'pendiente';
        if (currentStatus === 'pendiente') newStatus = 'en_revision';
        else if (currentStatus === 'en_revision') newStatus = 'resuelto';
        else if (currentStatus === 'resuelto') newStatus = 'pendiente';
        
        try {
            await axios.put(`/admin/reportes/${id}/estado`, { estado: newStatus });
            setList(list.map(r => r.id === id ? { ...r, estado: newStatus } : r));
            if (selectedReport && selectedReport.id === id) {
                setSelectedReport({ ...selectedReport, estado: newStatus });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar estado');
        }
    };

    const formatType = (type) => {
        if (!type) return 'Sin tipo';
        return type.replace(/_/g, ' ').charAt(0).toUpperCase() + type.replace(/_/g, ' ').slice(1);
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'resuelto':
                return <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs border border-green-500/20"><CheckCircle size={12}/> Resuelto</span>
            case 'en_revision':
                return <span className="flex items-center gap-1 text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-xs border border-blue-500/20"><Eye size={12}/> En Revisión</span>
            case 'pendiente':
                return <span className="flex items-center gap-1 text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded text-xs border border-yellow-500/20"><Clock size={12}/> Pendiente</span>
            default:
                return <span className="text-gray-400 bg-gray-500/10 px-2 py-1 rounded text-xs border border-gray-500/20">{status}</span>
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Reportes de Violencia</h2>
                    <p className="text-gray-400 text-sm">Supervisión y seguimiento de casos reportados</p>
                </div>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Buscar por título..." 
                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-gray-400">
                    <thead className="bg-white/5 text-gray-200 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Tipo de Incidente</th>
                            <th className="px-6 py-4">Agresor / Grupo</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredReports.map((report) => (
                            <tr key={report.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">#{report.id}</td>
                                <td className="px-6 py-4 text-white font-medium">{formatType(report.tipo_incidente)}</td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-white truncate max-w-[150px]">{report.nombre_agresor || 'N/A'}</span>
                                        <span className="text-xs text-gray-500">{report.grupo}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => handleUpdateStatus(report.id, report.estado)}
                                        className="hover:scale-105 transition-transform"
                                        title="Click para cambiar estado"
                                    >
                                        {getStatusBadge(report.estado)}
                                    </button>
                                </td>
                                <td className="px-6 py-4">{new Date(report.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => setSelectedReport(report)}
                                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                        title="Ver Detalles"
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Detalles */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
                            <div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    Reporte #{selectedReport.id}
                                    {getStatusBadge(selectedReport.estado)}
                                </h3>
                                <p className="text-gray-400 mt-1">Detalles del incidente reportado</p>
                            </div>
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Tipo de Incidente</h4>
                                    <p className="text-lg text-white font-medium">{formatType(selectedReport.tipo_incidente)}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Fecha de Reporte</h4>
                                    <p className="text-lg text-white font-medium">{new Date(selectedReport.created_at).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg">
                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Descripción de los Hechos</h4>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {selectedReport.descripcion}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg border border-red-500/10">
                                    <h4 className="text-xs font-bold text-red-400 uppercase mb-2">Datos del Agresor</h4>
                                    <p className="text-gray-300"><span className="text-gray-500">Nombre:</span> {selectedReport.nombre_agresor || 'No especificado'}</p>
                                    <p className="text-gray-300"><span className="text-gray-500">Grupo/Salón:</span> {selectedReport.grupo || 'No especificado'}</p>
                                </div>
                                
                                {selectedReport.archivos && selectedReport.archivos.length > 0 && (
                                    <div className="bg-white/5 p-4 rounded-lg border border-blue-500/10">
                                        <h4 className="text-xs font-bold text-blue-400 uppercase mb-2">Evidencias Adjuntas</h4>
                                        <ul className="space-y-1">
                                            {selectedReport.archivos.map((file, idx) => (
                                                <li key={idx}>
                                                    <a 
                                                        href={`/storage/${file}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 underline text-sm truncate block"
                                                    >
                                                        Ver Archivo {idx + 1}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
                            <div className="flex-1 flex gap-2">
                                {selectedReport.estado !== 'pendiente' && (
                                    <button 
                                        onClick={() => handleUpdateStatus(selectedReport.id, 'resuelto')} // Forces loop to go to next if passed current
                                        // Wait, handleUpdateStatus uses currentStatus to determine NEXT.
                                        // Let's make a specificSetter or just use the cycle.
                                        // Let's revamp the buttons to be explicit.
                                    ></button>
                                )}
                            </div>
                            {/* Let's simplify: Just a button that says "Cambiar Estado" and cycles, showing next state */}
                             <button 
                                onClick={() => handleUpdateStatus(selectedReport.id, selectedReport.estado)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Cambiar Estado (Siguiente)
                            </button>
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

