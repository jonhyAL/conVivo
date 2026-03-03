<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArcaneCode - Tu voz importa</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <style>
        @keyframes waveFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes waveSlide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        @keyframes ripple {
            0% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.05); opacity: 0.3; }
            100% { transform: scale(1); opacity: 0.6; }
        }
        .wave-animate { animation: waveFloat 3s ease-in-out infinite; }
        .wave-slide { animation: waveSlide 15s linear infinite; }
        .ripple-effect { animation: ripple 4s ease-in-out infinite; }
    </style>
</head>
<body class="min-h-screen bg-gray-50 font-sans text-slate-900">
    <!-- Efectos de fondo Liquid Glass (Ajustados para fondo claro) -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/40 rounded-full blur-[120px] animate-pulse opacity-60"></div>
        <div class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[120px] animate-pulse opacity-60" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px]"></div>
    </div>

    @include('components.navbar')

    <!-- Welcome SPA (React) -->
    <div id="welcome-react"></div>

    @include('components.footer')
</body>
</html>