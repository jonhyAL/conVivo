<!-- Navbar con barra superior integrada -->
<nav x-data="{ open: false }" class="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-teal-900/30 shadow-sm dark:shadow-none text-slate-800 dark:text-slate-200 transition-colors duration-300">
    <!-- Barra superior con líneas de ayuda -->
    <div class="bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200 dark:border-white/5 py-2 transition-colors duration-300">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-center space-x-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
                <a href="tel:991" class="flex items-center space-x-2 px-4 py-1.5 bg-white dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full transition-colors duration-200 border border-slate-200 dark:border-slate-700 shadow-sm group">
                    <svg class="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:text-teal-500 dark:group-hover:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span class="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">991</span>
                </a>
                <a href="tel:988" class="flex items-center space-x-2 px-4 py-1.5 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full transition-all duration-200 border border-slate-200 dark:border-slate-700 shadow-sm group">
                    <svg class="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:text-teal-500 dark:group-hover:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span class="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">988</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Barra de navegación principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <a href="{{ route('welcome') }}" class="flex-shrink-0 group">
                <img src="{{ asset('images/logos/logo-fullblack.png') }}" alt="conVivo" class="h-25 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-md dark:hidden">
                <img src="{{ asset('images/logos/logo-fullwhite.png') }}" alt="conVivo" class="h-25 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-md hidden dark:block">
            </a>

            <!-- Navigation Links - Desktop (PUBLIC) -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="{{ route('public.about') }}" class="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm font-semibold drop-shadow-sm">
                    Nosotros
                </a>
                <a href="{{ route('public.services') }}" class="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm font-semibold drop-shadow-sm">
                    Servicios
                </a>
                <a href="{{ route('public.contact') }}" class="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm font-semibold drop-shadow-sm">
                    Contacto
                </a>
            </div>

            <!-- Search & Auth -->
            <div class="flex items-center space-x-4">
                
                <!-- Theme Toggle -->
                <button id="theme-toggle" type="button" class="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700">
                    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </button>

                <!-- Search -->
                <div class="hidden lg:block relative group">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        class="w-64 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all group-hover:bg-white dark:group-hover:bg-slate-900/50"
                    >
                    <svg class="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <!-- Auth Buttons -->
                @auth
                    <a href="{{ auth()->user()->is_admin ? route('admin.dashboard') : route('dashboard') }}" 
                       class="hidden md:inline-block px-5 py-2.5 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold transition-all border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                        Mi perfil
                    </a>
                    <form method="POST" action="{{ route('logout') }}" class="hidden md:inline">
                        @csrf
                        <button type="submit" class="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-800 dark:to-teal-700 hover:from-teal-500 hover:to-teal-400 dark:hover:from-teal-700 dark:hover:to-teal-600 text-white border border-teal-500/30 dark:border-teal-600/30 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg dark:shadow-black/30">
                            Cerrar Sesión

                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" 
                       class="hidden md:inline-block px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-sm font-semibold transition-all shadow-lg dark:shadow-black/30 border border-slate-200 dark:border-slate-700">
                        Iniciar Sesión
                    </a>
                    <a href="{{ route('register') }}" 
                       class="hidden md:inline-block px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-800 dark:to-teal-700 hover:from-teal-500 hover:to-teal-400 dark:hover:from-teal-700 dark:hover:to-teal-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg dark:shadow-black/30 border border-teal-500/30 dark:border-teal-600/30">
                        Registrarse
                    </a>
                @endauth



                <!-- Mobile menu button -->
                <button @click="open = !open" type="button" class="relative md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none h-10 w-10 flex items-center justify-center">
                    <svg class="w-6 h-6 transition-all duration-300 absolute" 
                        :class="{'opacity-0 scale-75': open, 'opacity-100 scale-100': !open}" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <svg class="w-6 h-6 transition-all duration-300 absolute" 
                        :class="{'opacity-100 scale-100': open, 'opacity-0 scale-75': !open}" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile menu -->
    <div 
        x-show="open" 
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl absolute w-full left-0 shadow-lg dark:shadow-black/50 overflow-hidden"
    >
        <div class="px-4 py-4 space-y-3">
             <a href="{{ route('public.about') }}" class="block text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-medium py-3 px-4 rounded-xl">
                Nosotros
            </a>
            <a href="{{ route('public.services') }}" class="block text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-medium py-3 px-4 rounded-xl">
                Servicios
            </a>
            <a href="{{ route('public.contact') }}" class="block text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-medium py-3 px-4 rounded-xl">
                Contacto
            </a>

            @guest
                <div class="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                    <a href="{{ route('login') }}" class="block px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm text-center font-medium border border-slate-200 dark:border-slate-700 transition-colors">
                        Iniciar Sesión
                    </a>
                    <a href="{{ route('register') }}" class="block px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold rounded-xl text-sm text-center shadow-md transition-all">
                        Registrarse
                    </a>
                </div>
            @else
                <div class="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                    <a href="{{ auth()->user()->is_admin ? route('admin.dashboard') : route('dashboard') }}" class="block px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm text-center font-medium border border-slate-200 dark:border-slate-700 transition-colors">
                        Mi Perfil
                    </a>
                    <form method="POST" action="{{ route('logout') }}" class="block">
                        @csrf
                        <button type="submit" class="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-semibold rounded-xl text-sm text-center border border-red-200 dark:border-red-900/30 transition-colors">
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            @endguest
        </div>
    </div>
</nav>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Theme Toggle Elements
        const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        
        // Mobile Menu Elements removed since Alpine.js handles it now
        // const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        // const mobileMenu = document.getElementById('mobile-menu');

        // Initial Theme Check
        const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
            document.documentElement.classList.add('dark');
            if(lightIcon) lightIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if(darkIcon) darkIcon.classList.remove('hidden');
        }

        // Theme Toggle Handler
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', function() {
                // Toggle icons
                darkIcon.classList.toggle('hidden');
                lightIcon.classList.toggle('hidden');

                // Toggle class and storage
                if (localStorage.theme === 'dark') {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                }
            });
        }

        // Mobile Menu Handler (Alpine.js does this now)
        /*
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
        */
    });
</script>
