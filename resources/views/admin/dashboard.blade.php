<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Panel de Administración - conVivo</title>
    <link rel="icon" href="{{ asset('images/logos/logo-unico.png') }}" type="image/png">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin=""/>
</head>
<body class="bg-black text-white antialiased">
    
    <!-- React Root -->
    <div id="admin-dashboard-root" class="h-screen w-screen overflow-hidden"></div>

    <!-- Data Injection -->
    <script>
        window.adminData = {
            currentUser: @json(auth()->user()),
            stats: @json($stats),
            sosAlerts: @json($sosAlerts),
            users: @json($users),
            reports: @json($reports),
            specialists: @json($specialists),
            appointments: @json($appointments),
            usersChart: @json($usersChart),
            contacts: @json($contacts),
            recursos: @json($recursos)
        };
    </script>
</body>
</html>
