import './bootstrap';
import { createRoot } from 'react-dom/client';
import React from 'react';

// Helper for dynamic component loading
const loadComponent = (id, componentImport, getProps = () => ({})) => {
    const init = () => {
        const element = document.getElementById(id);
        if (!element) return;

        componentImport().then(({ default: Component }) => {
            const root = createRoot(element);
            const props = getProps(element);
            
            root.render(
                <React.StrictMode>
                    <Component {...props} />
                </React.StrictMode>
            );
        }).catch(err => console.error(`Failed to load component for ${id}:`, err));
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
};

/**
 * Public Components
 */
const publicComponents = {
    'welcome-react': () => import('./components/Welcome'),
    'about-react': () => import('./components/About'),
    'services-react': () => import('./components/Services'),
    'contact-react': () => import('./components/Contact'),
    'hero-react': () => import('./components/HeroReact')
};

Object.entries(publicComponents).forEach(([id, importer]) => {
    loadComponent(id, importer);
});

/**
 * Dashboards
 */
// Admin Dashboard
loadComponent('admin-dashboard-root', 
    () => import('./components/admin/AdminDashboard'),
    () => window.adminData || {}
);

// User Dashboard
loadComponent('user-dashboard-root', 
    () => import('./components/user/UserDashboard'),
    () => window.userData || {}
);

/**
 * User Features
 */
// Resources
loadComponent('user-resources-root', 
    () => import('./components/user/Resources'),
    (el) => ({
        user: JSON.parse(el.dataset.user || '{}')
    })
);

// Profile
loadComponent('user-profile-root', 
    () => import('./components/user/Profile'),
    (el) => ({
        user: JSON.parse(el.dataset.user || '{}'),
        success: el.dataset.success || null,
        serverErrors: JSON.parse(el.dataset.errors || '[]')
    })
);

// Appointments List
loadComponent('user-appointments-root', 
    () => import('./components/user/Appointments'),
    (el) => ({
        historial: JSON.parse(el.dataset.historial || '[]'),
        especialidades: JSON.parse(el.dataset.especialidades || '[]'),
        errors: JSON.parse(el.dataset.errors || '[]'),
        user: JSON.parse(el.dataset.user || '{}')
    })
);

// Appointment Calendar
loadComponent('user-appointment-calendar-root', 
    () => import('./components/user/AppointmentCalendar'),
    (el) => ({
        especialistas: JSON.parse(el.dataset.especialistas || '[]'),
        sessionData: JSON.parse(el.dataset.session || '{}')
    })
);

// Appointment Personal Info
loadComponent('user-appointment-personal-info-root', 
    () => import('./components/user/AppointmentPersonalInfo'),
    (el) => ({
        horario: JSON.parse(el.dataset.horario || '{}'),
        user: JSON.parse(el.dataset.user || '{}'),
        oldInput: JSON.parse(el.dataset.oldInput || '{}'),
        errors: JSON.parse(el.dataset.errors || '{}')
    })
);

// Appointment Success
loadComponent('user-appointment-success-root', 
    () => import('./components/user/AppointmentSuccess'),
    (el) => ({
        cita: JSON.parse(el.dataset.cita || '{}')
    })
);

// Standalone Bottom Nav (for Blade pages)
loadComponent('bottom-nav-root',
    () => import('./components/user/BottomNav'),
    (el) => ({
        active: el.dataset.active || 'dashboard'
    })
);

// Standalone Mobile Header (for Blade pages)
loadComponent('mobile-header-root',
    () => import('./components/user/MobileHeader'),
    (el) => ({
        user: JSON.parse(el.dataset.user || '{}')
    })
);
