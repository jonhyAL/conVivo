import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to fly to selected location
function MapController({ center, zoom = 16 }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, {
                duration: 1.5
            });
        }
    }, [center, zoom, map]);
    return null;
}

export default function SOSMap({ alerts: initialAlerts }) {
    const [alerts, setAlerts] = useState(initialAlerts || []);
    const [selectedAlert, setSelectedAlert] = useState(null);

    useEffect(() => {
        if(initialAlerts) setAlerts(initialAlerts);
    }, [initialAlerts]);

    // Default center (San Salvador roughly)
    const defaultCenter = [13.6929, -89.2182];

    const handleAlertClick = (alert) => {
        if (alert.latitude && alert.longitude) {
            setSelectedAlert(alert);
        }
    };

    const toggleStatus = async (alertId) => {
        try {
            const response = await axios.put(`/admin/sos/${alertId}/status`);
            if (response.data.success) {
                setAlerts(prev => prev.map(a => 
                    a.id === alertId ? { ...a, status: response.data.new_status } : a
                ));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const deleteAlert = async (alertId) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta alerta?')) return;
        
        try {
            await axios.delete(`/admin/sos/${alertId}`);
            setAlerts(prev => prev.filter(a => a.id !== alertId));
            if (selectedAlert && selectedAlert.id === alertId) {
                setSelectedAlert(null);
            }
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    const getStatusLabel = (status) => 
        (status === 'resolved' || status === 'resuelto') ? 'Resuelto' : 'Pendiente';

    const getStatusColor = (status) => 
        (status === 'resolved' || status === 'resuelto') 
            ? 'bg-green-500/20 text-green-300 border-green-500/20' 
            : 'bg-red-500/20 text-red-300 border-red-500/20';

    return (
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl h-full flex flex-col">
            <h4 className="text-lg font-medium text-white mb-3 shrink-0">Alertas SOS Recientes</h4>
            
            <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                {/* Map Section */}
                <div className="h-52 shrink-0 lg:h-auto lg:flex-[2] w-full rounded-lg overflow-hidden border border-white/10 z-0 relative">
                    <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapController center={selectedAlert ? [selectedAlert.latitude, selectedAlert.longitude] : null} />

                        {alerts.map((alert) => {
                            if (!alert.latitude || !alert.longitude) return null;
                            const isSelected = selectedAlert && selectedAlert.id === alert.id;
                            
                            return (
                                <Marker 
                                    key={alert.id} 
                                    position={[alert.latitude, alert.longitude]}
                                    eventHandlers={{ click: () => handleAlertClick(alert) }}
                                >
                                    <Popup>
                                        <div className="text-gray-900 min-w-[200px]">
                                            <strong className="block text-lg mb-2 border-b pb-1">
                                                {isSelected ? "📍 Selección" : "SOS Alerta"}
                                            </strong>
                                            <p className="m-0 text-sm"><strong>Usuario:</strong> {alert.user?.name || 'Anon'}</p>
                                            <p className="m-0 text-sm">IPV: {alert.ip_address}</p>
                                            <p className="m-0 text-sm"><strong>Estado:</strong> {getStatusLabel(alert.status)}</p>
                                            
                                            <div className="mt-3 flex gap-2">
                                                <button 
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleStatus(alert.id);
                                                    }}
                                                >
                                                    Cambiar Estado
                                                </button>
                                                <button 
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteAlert(alert.id);
                                                    }}
                                                >
                                                    Eliminar
                                                </button>
                                                <a 
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${alert.latitude},${alert.longitude}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline text-sm pt-1"
                                                >
                                                    Maps
                                                </a>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
                
                {/* Scrollable list */}
                <div className="flex-1 min-h-0 lg:flex-[1] space-y-3 overflow-y-auto pr-1">
                    {alerts.length === 0 && <p className="text-gray-400">Sin alertas.</p>}
                    {alerts.map(alert => {
                        const isSelected = selectedAlert && selectedAlert.id === alert.id;
                        return (
                            <div 
                                key={alert.id} 
                                onClick={() => handleAlertClick(alert)}
                                className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-all ${
                                    isSelected ? 'bg-blue-500/20 border-blue-500/50 ring-1 ring-blue-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                <div>
                                     <p className="text-white font-medium">{alert.user?.name || 'Desconocido'}</p>
                                     <p className="text-xs text-gray-400">{new Date(alert.created_at).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleStatus(alert.id);
                                    }}
                                    className={`px-2 py-1 text-xs rounded border uppercase font-bold transition-colors mr-2 ${getStatusColor(alert.status)} hover:opacity-80`}
                                >
                                    {getStatusLabel(alert.status)}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteAlert(alert.id);
                                    }}
                                    className="px-2 py-1 text-xs rounded border border-red-500/30 text-red-500 hover:bg-red-500/20"
                                >
                                    🗑️
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
