<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nosotros - conVivo</title>
    <link rel="icon" href="{{ asset('images/logos/logo-unico.png') }}" type="image/png">
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-500">
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 dark:bg-teal-900/10 rounded-full blur-[120px] animate-pulse opacity-40"></div>
        <div class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px] animate-pulse opacity-40" style="animation-delay: 2s;"></div>
    </div>

    @include('components.navbar')

    <div id="about-react"></div>

    @include('components.footer')
</body>
</html>