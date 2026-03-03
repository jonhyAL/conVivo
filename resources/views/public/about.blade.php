<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nosotros - ArcaneCode</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="min-h-screen bg-gray-50 font-sans text-slate-900">
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/40 rounded-full blur-[120px] animate-pulse opacity-60"></div>
        <div class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[120px] animate-pulse opacity-60" style="animation-delay: 2s;"></div>
    </div>

    @include('components.navbar')

    <div id="about-react"></div>

    <!-- Footer Placeholder (Using simple footer if component not ready or reusing footer component if standard) -->
    <footer class="bg-slate-900 border-t border-slate-800 pt-16 pb-8 z-10 relative">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <p class="text-slate-500">© 2026 ArcaneCode. Todos los derechos reservados.</p>
        </div>
    </footer>
</body>
</html>