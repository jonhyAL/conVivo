<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Mi Perfil - ArcaneCode</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-50">
    <div id="user-profile-root" 
         data-user="{{ json_encode($user) }}"
         data-success="{{ session('status') }}"
         data-errors="{{ json_encode($errors->all()) }}">
    </div>
</body>
</html>
