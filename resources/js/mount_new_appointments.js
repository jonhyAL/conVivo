// User Calendar Mount
if (document.getElementById('user-appointment-calendar-root')) {
    const element = document.getElementById('user-appointment-calendar-root');
    const root = createRoot(element);
    const especialistas = JSON.parse(element.dataset.especialistas || '[]');
    const sessionData = JSON.parse(element.dataset.session || '{}');
    root.render(
        <React.StrictMode>
            <AppointmentCalendar especialistas={especialistas} sessionData={sessionData} />
        </React.StrictMode>
    );
}

// User Personal Info Mount
if (document.getElementById('user-appointment-info-root')) {
    const element = document.getElementById('user-appointment-info-root');
    const root = createRoot(element);
    const horario = JSON.parse(element.dataset.horario || '{}');
    const user = JSON.parse(element.dataset.user || '{}');
    const oldInput = JSON.parse(element.dataset.old || '{}');
    const errors = JSON.parse(element.dataset.errors || '{}');
    root.render(
        <React.StrictMode>
            <AppointmentPersonalInfo horario={horario} user={user} oldInput={oldInput} errors={errors} />
        </React.StrictMode>
    );
}

// User Appointment Success Mount
if (document.getElementById('user-appointment-success-root')) {
    const element = document.getElementById('user-appointment-success-root');
    const root = createRoot(element);
    const cita = JSON.parse(element.dataset.cita || '{}');
    root.render(
        <React.StrictMode>
            <AppointmentSuccess cita={cita} />
        </React.StrictMode>
    );
}
