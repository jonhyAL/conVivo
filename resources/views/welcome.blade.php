<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>conVivo - Tu voz importa</title>
    <link rel="icon" href="{{ asset('images/logos/logo-unico.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ asset('images/logos/logo-unico.png') }}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
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
    <style>
        @keyframes waveFloat {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.02); }
        }
        @keyframes waveSlide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        .wave-animate { animation: waveFloat 8s ease-in-out infinite; }
        .wave-slide { animation: waveSlide 15s linear infinite; }
    </style>
</head>
<body class="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
    <!-- Efectos de fondo Liquid Glass (Optimizados) -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <!-- Blobs: Usamos transform (wave-animate) en lugar de opacity (pulse) para mejor rendimiento -->
        <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-200/40 dark:bg-teal-900/20 rounded-full blur-[100px] wave-animate transition-colors duration-500"></div>
        <div class="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-[100px] wave-animate transition-colors duration-500" style="animation-delay: -4s;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-[80px] wave-animate transition-colors duration-500" style="animation-delay: -2s;"></div>
    </div>

    @include('components.navbar')

    <!-- Welcome SPA (React) -->
    <div id="welcome-react"></div>

    @include('components.footer')
</body>
</html>