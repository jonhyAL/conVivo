<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArcaneCode</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <meta http-equiv="refresh" content="3;url={{ route('dashboard') }}" />
</head>
<body class="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans text-slate-600">
    
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[120px] animate-pulse opacity-60"></div>
        <div class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-200/40 rounded-full blur-[120px] animate-pulse opacity-60" style="animation-delay: 2s;"></div>
    </div>

    <div class="z-10 text-center">
        <div class="mb-8 relative inline-block">
            <div class="absolute inset-0 bg-teal-400 blur-2xl opacity-20 animate-pulse"></div>
            <img src="{{ asset('images/logos/logo-unico.png') }}" alt="ArcaneCode" class="w-32 h-32 relative z-10 mx-auto">
        </div>
        
        <h1 class="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            ArcaneCode
        </h1>
        
        <div class="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 max-w-sm mx-auto">
            <p class="text-slate-300 mb-4">Redirigiendo a tu panel...</p>
            <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div class="bg-teal-500 h-full w-0 animate-[load_3s_ease-in-out_forwards]"></div>
            </div>
            <a href="{{ route('dashboard') }}" class="mt-6 block text-sm text-teal-400 hover:text-teal-300 transition">
                Click aquí si no eres redirigido
            </a>
        </div>
    </div>

    <style>
        @keyframes load {
            0% { w: 0%; }
            100% { w: 100%; }
        }
    </style>
</body>
</html>

