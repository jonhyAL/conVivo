<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - conVivo</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-300 relative">
    <!-- Efecto de Fondo Moderno (Dark Liquid Glass) -->
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
    </style>
    
    <!-- Background Gradients -->
    <div class="fixed inset-0 pointer-events-none z-0">
        <!-- Main Dark Background -->
        <div class="absolute inset-0 bg-slate-950"></div>
        
        <!-- Animated Blobs (Brighter for visibility) -->
        <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] animate-float"></div>
        <div class="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] animate-float" style="animation-delay: -5s;"></div>
        <div class="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-indigo-500/15 rounded-full blur-[100px] animate-float" style="animation-delay: -2s;"></div>
        
        <!-- Grid Pattern Overlay -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
    </div>

    <!-- Contenedor principal -->
    <div class="relative w-full max-w-6xl z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Lado izquierdo: Logo -->
            <div class="hidden lg:flex flex-col items-center justify-center p-8">
                <img src="{{ asset('images/logos/logo-unico.png') }}" alt="conVivo" class="w-48 h-48 object-contain drop-shadow-xl transform hover:scale-110 transition-transform duration-500">
                <h2 class="mt-8 text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent text-center drop-shadow-sm">
                    Bienvenido de vuelta
                </h2>
                <p class="mt-4 text-slate-400 text-center max-w-md text-lg font-light leading-relaxed">
                    Accede a tu cuenta para continuar protegiendo y apoyando a quienes más lo necesitan.
                </p>
            </div>

            <!-- Lado derecho: Formulario -->
            <div class="w-full">
                <!-- Título móvil -->
                <div class="lg:hidden flex flex-col items-center mb-8">
                    <img src="{{ asset('images/logos/logo-unico.png') }}" alt="conVivo" class="w-24 h-24 object-contain mb-4 drop-shadow-lg">
                </div>

                <!-- Card de login (LIGHT THEME) -->
                <div class="bg-white rounded-[2.5rem] shadow-2xl shadow-black/50 p-8 lg:p-12 relative overflow-hidden">
                    
                    @if ($errors->any())
                        <div class="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl text-sm shadow-sm flex items-center">
                            <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {{ $errors->first() }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <!-- Email -->
                        <div class="mb-5">
                            <label for="email" class="block text-slate-600 text-sm font-bold mb-2 ml-1">
                                Correo electrónico
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value="{{ old('email') }}"
                                required
                                class="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-400 shadow-sm"
                                placeholder="tu@email.com"
                            >
                        </div>

                        <!-- Password -->
                        <div class="mb-6">
                            <label for="password" class="block text-slate-600 text-sm font-bold mb-2 ml-1">
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                class="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-400 shadow-sm"
                                placeholder="••••••••"
                            >
                        </div>

                        <!-- Remember me -->
                        <div class="flex items-center justify-between mb-6">
                            <label class="flex items-center cursor-pointer group">
                                <input type="checkbox" name="remember" class="w-4 h-4 rounded border-slate-300 bg-slate-100 text-teal-600 focus:ring-teal-500">
                                <span class="ml-2 text-sm text-slate-500 group-hover:text-slate-700 transition">Recordarme</span>
                            </label>
                            <a href="#" class="text-sm text-teal-600 hover:text-teal-700 font-medium transition">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <!-- Submit button -->
                        <button 
                            type="submit"
                            class="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-600/40 hover:-translate-y-0.5 border border-teal-500/30"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="relative my-8">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-slate-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-4 bg-white text-slate-400 font-medium rounded-full">O continuar con</span>
                        </div>
                    </div>

                    <!-- OAuth Buttons -->
                    <div class="space-y-3">
                        <!-- Google -->
                        <a 
                            href="{{ route('socialite.redirect', 'google') }}"
                            class="flex items-center justify-center w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 font-medium py-3 rounded-xl transition-all duration-200 group shadow-sm hover:shadow-md"
                        >
                            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1818182,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                            </svg>
                            Continuar con Google
                        </a>

                        <!-- Microsoft -->
                        <a 
                            href="{{ route('socialite.redirect', 'microsoft') }}"
                            class="flex items-center justify-center w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 font-medium py-3 rounded-xl transition-all duration-200 group shadow-sm hover:shadow-md"
                        >
                            <svg class="w-5 h-5 mr-3" viewBox="0 0 23 23">
                                <path fill="#f35325" d="M0 0h11v11H0z"/>
                                <path fill="#81bc06" d="M12 0h11v11H12z"/>
                                <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                                <path fill="#ffba08" d="M12 12h11v11H12z"/>
                            </svg>
                            Continuar con Microsoft
                        </a>
                    </div>

                    <!-- Register link -->
                    <div class="mt-8 text-center">
                        <p class="text-slate-500 text-sm">
                            ¿No tienes cuenta? 
                            <a href="{{ route('register') }}" class="text-teal-600 hover:text-teal-500 font-bold transition-colors">
                                Regístrate aquí
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 text-center text-slate-500 text-xs">
            <p>&copy; 2026 conVivo. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>

