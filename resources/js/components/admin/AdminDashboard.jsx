import React, { useState } from 'react';
import Sidebar from './Sidebar';
import StatsCards from './StatsCards';
import ChartsSection from './ChartsSection';
import UsersTable from './UsersTable';
import SpecialistsTable from './SpecialistsTable';
import ReportsTable from './ReportsTable';
import AppointmentsTable from './AppointmentsTable';
import SOSMap from './SOSMap';
import ChatWidget from '../user/ChatWidget'; // Import ChatWidget

export default function AdminDashboard({ 
    currentUser,
    stats = {}, 
    sosAlerts = [], 
    users = [], 
    reports = [], 
    specialists = [], 
    appointments = [], 
    usersChart = [] 
}) {
    // Debug checks
    if (!stats || Object.keys(stats).length === 0) {
        console.warn('AdminDashboard: Stats data is missing or empty', stats);
    }

    const [activeSection, setActiveSection] = useState('inicio');
    const [riskFilter, setRiskFilter] = useState(false);

    const handleRiskClick = () => {
        setRiskFilter(true);
        setActiveSection('usuarios');
    };

    // Error Boundary Fallback for content
    const safeRender = (Component, props) => {
        try {
            return <Component {...props} />;
        } catch (error) {
            console.error('Component Render Error:', error);
            return <div className="p-4 text-red-500">Error loading section. Check console.</div>;
        }
    };


    const renderSection = () => {
        switch(activeSection) {
            case 'inicio':
                return (
                    <div className="space-y-6">
                        <StatsCards stats={stats} onRiskClick={handleRiskClick} />
                        <ChartsSection usersChart={usersChart} stats={stats} />
                        <SOSMap alerts={sosAlerts} />
                    </div>
                );
            case 'citas':
                return <AppointmentsTable appointments={appointments} />;
            case 'especialistas':
                // Pass appointments to specialists table for the details view
                return <SpecialistsTable specialists={specialists} appointments={appointments} />;
            case 'usuarios':
                return <UsersTable users={users} initialFilterRisk={riskFilter} onClearFilter={() => setRiskFilter(false)} />;
            case 'reportes':
                return <ReportsTable reports={reports} />;
            case 'chat':
                return (
                    <div className="h-[600px]">
                        <ChatWidget currentUser={currentUser} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-black text-gray-100 font-sans overflow-hidden">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900/50 relative">
                {/* Background effects similar to Auth pages */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-3xl font-medium text-white mb-6 capitalize">
                        {activeSection}
                    </h3>

                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl">
                        {renderSection()}
                    </div>
                </div>
            </main>
        </div>
    );
}
