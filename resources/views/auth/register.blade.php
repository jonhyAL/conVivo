<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Cuenta - conVivo</title>
    <link rel="icon" href="{{ asset('images/logos/logo-unico.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ asset('images/logos/logo-unico.png') }}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <script>
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-600 dark:text-slate-300 relative transition-colors duration-300">
    <!-- Theme Toggle -->
    <div class="absolute top-4 right-4 z-50">
        <button id="theme-toggle" type="button" class="text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg text-sm p-2.5 transition-colors">
            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
    </div>

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
        <div class="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"></div>
        
        <!-- Animated Blobs (Brighter for visibility) -->
        <div class="hidden md:block absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/40 dark:bg-teal-500/20 rounded-full blur-[120px] animate-float transition-colors duration-300"></div>
        <div class="hidden md:block absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-[140px] animate-float transition-colors duration-300" style="animation-delay: -5s;"></div>
        <div class="hidden md:block absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-indigo-200/30 dark:bg-indigo-500/15 rounded-full blur-[100px] animate-float transition-colors duration-300" style="animation-delay: -2s;"></div>
        
        <!-- Tech Grid Pattern (Adapted from Hero) -->
        <div class="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] dark:opacity-100 pointer-events-none transition-colors"></div>

        <!-- Digital Decomposition Elements (Breathing Effect) -->
        <div class="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
             <div class="absolute top-[10%] left-[5%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style="animation-duration: 4s; animation-delay: 0s;"></div>
             <div class="absolute top-[20%] left-[8%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 animate-pulse" style="animation-duration: 5s; animation-delay: 1.5s;"></div>
             
             <div class="absolute top-[10%] right-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style="animation-duration: 3s; animation-delay: 2s;"></div>
             
             <div class="absolute bottom-[20%] left-[10%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style="animation-duration: 6s; animation-delay: 0.5s;"></div>
             <div class="absolute bottom-[10%] right-[20%] w-16 h-16 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 animate-pulse" style="animation-duration: 4.5s; animation-delay: 3s;"></div>

             <!-- Floating squares -->
             <div class="absolute top-[20%] left-[50%] w-4 h-4 bg-teal-500/40 dark:bg-teal-300/30 rounded-sm animate-pulse" style="animation-duration: 2s; animation-delay: 0.2s;"></div>
             <div class="absolute bottom-[30%] left-[25%] w-2 h-2 bg-teal-500/60 dark:bg-teal-300/50 rounded-sm animate-pulse" style="animation-duration: 3s; animation-delay: 1s;"></div>
             <div class="absolute top-[25%] right-[20%] w-3 h-3 bg-teal-500/50 dark:bg-teal-300/40 rounded-sm animate-pulse" style="animation-duration: 2.5s; animation-delay: 1.8s;"></div>
        </div>
    </div>

    <!-- Contenedor principal -->
    <div class="relative w-full max-w-6xl z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Lado izquierdo: Logo -->
            <div class="hidden lg:flex flex-col items-center justify-center p-8 text-center order-2 lg:order-1">
                 <a href="/" class="relative mb-8 group block">
                    <div class="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <img src="{{ asset('images/logos/logo-unico.png') }}" alt="conVivo" class="relative w-48 h-48 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                </a>

                <h2 class="text-5xl font-bold text-slate-800 dark:text-white tracking-tight leading-tight mb-6 transition-colors duration-300">
                    Únete a la <br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 dark:from-teal-200 dark:via-cyan-200 dark:to-blue-200">
                        comunidad.
                    </span>
                </h2>
                
                <p class="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed max-w-md transition-colors duration-300">
                    Crea tu cuenta y forma parte de una red comprometida con la prevención y el apoyo.
                </p>

                <!-- Decoración extra -->
                <div class="mt-8 flex gap-2">
                    <div class="w-12 h-2 rounded-full bg-teal-500/20"></div>
                    <div class="w-2 h-2 rounded-full bg-teal-500/50"></div>
                    <div class="w-2 h-2 rounded-full bg-teal-500/50"></div>
                </div>
            </div>

            <!-- Lado derecho: Formulario -->
            <div class="w-full">
                <!-- Título móvil -->
                <div class="lg:hidden flex flex-col items-center mb-8">
                    <a href="/">
                        <img src="{{ asset('images/logos/logo-unico.png') }}" alt="conVivo" class="w-24 h-24 object-contain mb-4 drop-shadow-lg">
                    </a>
                </div>

                <!-- Card de registro -->
                <div class="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 p-8 lg:p-12 relative overflow-hidden transition-colors duration-300">

                    @if ($errors->any())
                        <div class="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl text-sm shadow-sm">
                            <ul class="list-disc list-inside space-y-1">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <!-- Name -->
                        <div class="mb-5">
                            <label for="name" class="block text-slate-600 dark:text-slate-300 text-sm font-bold mb-2 ml-1 transition-colors duration-300">
                                Nombre completo
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value="{{ old('name') }}"
                                required
                                class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm"
                                placeholder="Juan Pérez"
                            >
                        </div>

                        <!-- Email -->
                        <div class="mb-5">
                            <label for="email" class="block text-slate-600 dark:text-slate-300 text-sm font-bold mb-2 ml-1 transition-colors duration-300">
                                Correo electrónico
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value="{{ old('email') }}"
                                required
                                class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm"
                                placeholder="tu@email.com"
                            >
                        </div>

                        <!-- Password -->
                        <div class="mb-5">
                            <label for="password" class="block text-slate-600 dark:text-slate-300 text-sm font-bold mb-2 ml-1 transition-colors duration-300">
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm"
                                placeholder="Mínimo 8 caracteres"
                            >
                        </div>

                        <!-- Password Confirmation -->
                        <div class="mb-6">
                            <label for="password_confirmation" class="block text-slate-600 dark:text-slate-300 text-sm font-bold mb-2 ml-1 transition-colors duration-300">
                                Confirmar contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password_confirmation" 
                                name="password_confirmation" 
                                required
                                class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm"
                                placeholder="Repite tu contraseña"
                            >
                        </div>

                        <!-- Submit button -->
                        <button 
                            type="submit"
                            class="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-600/40 hover:-translate-y-0.5 border border-teal-500/30"
                        >
                            Crear Cuenta
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="relative my-8">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-slate-200 dark:border-slate-600"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-4 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-medium rounded-full transition-colors duration-300">O regístrate con</span>
                        </div>
                    </div>

                    <!-- OAuth Buttons -->
                    <div class="space-y-3">
                        <!-- Google -->
                        <a 
                            href="{{ route('socialite.redirect', 'google') }}"
                            class="flex items-center justify-center w-full bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-white font-medium py-3 rounded-xl transition-all duration-200 group shadow-sm hover:shadow-md"
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
                            class="flex items-center justify-center w-full bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-white font-medium py-3 rounded-xl transition-all duration-200 group shadow-sm hover:shadow-md"
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

                    <!-- Login link -->
                    <div class="mt-8 text-center">
                        <p class="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                            ¿Ya tienes cuenta? 
                            <a href="{{ route('login') }}" class="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 font-bold transition-colors">
                                Inicia sesión aquí
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 text-center text-slate-500 dark:text-slate-400 text-xs text-opacity-70 transition-colors duration-300">
            <p>&copy; 2026 conVivo. Todos los derechos reservados.</p>
        </div>
    </div>
    
    <!-- Theme Toggle Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const themeToggleBtn = document.getElementById('theme-toggle');
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            const lightIcon = document.getElementById('theme-toggle-light-icon');
    
            // Initial Icon State
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                lightIcon.classList.remove('hidden');
            } else {
                darkIcon.classList.remove('hidden');
            }
    
            // Toggle Theme
            themeToggleBtn.addEventListener('click', function() {
                darkIcon.classList.toggle('hidden');
                lightIcon.classList.toggle('hidden');
    
                if (localStorage.theme === 'dark') {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                }
            });
        });
    </script>
</body>
</html>

