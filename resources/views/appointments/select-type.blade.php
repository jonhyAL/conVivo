<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Citas - ArcaneCode</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-50">
    @php
        $historial = \App\Models\Cita::where('user_id', auth()->id())
                        ->with(['horario.especialista'])
                        ->latest()
                        ->get();
        $especialidades = \App\Models\Especialista::where('activo', true)->distinct()->pluck('especialidad');
        $errors = $errors->all();
    @endphp
    
    <div id="user-appointments-root" 
         data-historial="{{ json_encode($historial) }}"
         data-especialidades="{{ json_encode($especialidades) }}"
         data-errors="{{ json_encode($errors) }}"
         data-user="{{ json_encode(auth()->user()) }}">
    </div>
</body>
</html>

