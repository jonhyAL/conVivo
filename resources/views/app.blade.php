<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>conVivo</title>
    <script>if(localStorage.panelTheme==='dark'){document.documentElement.classList.add('dark');}</script>
    <link rel="icon" href="{{ asset('images/logos/logo-unico.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ asset('images/logos/logo-unico.png') }}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-600 dark:text-slate-300">
    @inertia
</body>
</html>
