<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Seleccionar Fecha y Hora - Agendar Consulta</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-50">
    <div id="user-appointment-calendar-root" 
         data-especialistas="{{ json_encode($especialistas) }}"
         data-session="{{ json_encode(session('appointment')) }}">
    </div>
</body>
</html>
