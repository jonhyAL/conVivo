<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - ArcaneCode</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="min-h-screen bg-gray-50 font-sans text-slate-900">
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/40 rounded-full blur-[120px] animate-pulse opacity-60"></div>
        <div class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[120px] animate-pulse opacity-60" style="animation-delay: 2s;"></div>
    </div>

    @include('components.navbar')

    <div id="contact-react"></div>
</body>
</html>