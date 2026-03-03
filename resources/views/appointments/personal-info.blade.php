<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Confirmar Datos - Agendar Consulta</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-50">
    <div id="user-appointment-personal-info-root" 
         data-horario="{{ json_encode($horario) }}"
         data-user="{{ json_encode(auth()->user()) }}"
         data-old-input="{{ json_encode(session()->getOldInput()) }}"
         data-errors="{{ json_encode($errors->getMessages()) }}">
    </div>
</body>
</html>
