
// User Resources Mount
if (document.getElementById('user-resources-root')) {
    const root = createRoot(document.getElementById('user-resources-root'));
    root.render(
        <React.StrictMode>
            <Resources />
        </React.StrictMode>
    );
}

// User Profile Mount
if (document.getElementById('user-profile-root')) {
    const element = document.getElementById('user-profile-root');
    const root = createRoot(element);
    const user = JSON.parse(element.dataset.user || '{}');
    root.render(
        <React.StrictMode>
            <Profile user={user} />
        </React.StrictMode>
    );
}

// User Appointments Mount
if (document.getElementById('user-appointments-root')) {
    const element = document.getElementById('user-appointments-root');
    const root = createRoot(element);
    const historial = JSON.parse(element.dataset.historial || '[]');
    const especialidades = JSON.parse(element.dataset.especialidades || '[]');
    const errors = JSON.parse(element.dataset.errors || '[]');
    root.render(
        <React.StrictMode>
            <Appointments historial={historial} especialidades={especialidades} errors={errors} />
        </React.StrictMode>
    );
}
