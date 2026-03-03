<!-- Navbar con barra superior integrada -->
<nav class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-teal-900/30 shadow-lg shadow-black/20 text-slate-200 transition-all duration-300">
    <!-- Barra superior con líneas de ayuda -->
    <div class="bg-slate-950/80 backdrop-blur-sm border-b border-white/5 py-2">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-center space-x-3 text-slate-300 text-sm font-medium">
                <a href="tel:991" class="flex items-center space-x-2 px-4 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-all duration-200 border border-slate-700 shadow-sm group">
                    <svg class="w-4 h-4 text-teal-400 group-hover:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span class="group-hover:text-white transition-colors">991</span>
                </a>
                <a href="tel:988" class="flex items-center space-x-2 px-4 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-all duration-200 border border-slate-700 shadow-sm group">
                    <svg class="w-4 h-4 text-teal-400 group-hover:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span class="group-hover:text-white transition-colors">988</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Barra de navegación principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <a href="{{ route('welcome') }}" class="flex-shrink-0 group">
                <img src="{{ asset('images/logos/logo-fullwhite.png') }}" alt="ArcaneCode" class="h-25 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            </a>

            <!-- Navigation Links - Desktop (PUBLIC) -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="{{ route('public.about') }}" class="text-slate-300 hover:text-teal-400 transition-colors text-sm font-semibold drop-shadow-sm">
                    Nosotros
                </a>
                <a href="{{ route('public.services') }}" class="text-slate-300 hover:text-teal-400 transition-colors text-sm font-semibold drop-shadow-sm">
                    Servicios
                </a>
                <a href="{{ route('public.contact') }}" class="text-slate-300 hover:text-teal-400 transition-colors text-sm font-semibold drop-shadow-sm">
                    Contacto
                </a>
            </div>

            <!-- Search & Auth -->
            <div class="flex items-center space-x-4">
                <!-- Search -->
                <div class="hidden lg:block relative group">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        class="w-64 bg-slate-950/50 border border-slate-700/50 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all group-hover:bg-slate-900/50"
                    >
                    <svg class="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <!-- Auth Buttons -->
                @auth
                    <a href="{{ auth()->user()->is_admin ? route('admin.dashboard') : route('dashboard') }}" 
                       class="hidden md:inline-block px-5 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 rounded-xl text-sm font-semibold transition-all border border-slate-700 backdrop-blur-sm">
                        Mi perfil
                    </a>
                    <form method="POST" action="{{ route('logout') }}" class="hidden md:inline">
                        @csrf
                        <button type="submit" class="px-5 py-2.5 bg-gradient-to-r from-teal-800 to-teal-700 hover:from-teal-700 hover:to-teal-600 text-white border border-teal-600/30 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg shadow-black/30">
                            Cerrar Sesión

                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" 
                       class="hidden md:inline-block px-5 py-2.5 bg-slate-800 text-slate-200 hover:bg-slate-700 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-black/30 border border-slate-700">
                        Iniciar Sesión
                    </a>
                    <a href="{{ route('register') }}" 
                       class="hidden md:inline-block px-5 py-2.5 bg-gradient-to-r from-teal-800 to-teal-700 hover:from-teal-700 hover:to-teal-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-black/30 border border-teal-600/30">
                        Registrarse
                    </a>
                @endauth



                <!-- Mobile menu button -->
                <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
        <div class="px-4 py-4 space-y-3">
            <a href="{{ route('public.about') }}" class="block text-slate-700 hover:text-teal-600 transition-colors text-sm font-medium py-2">
                Nosotros
            </a>
            <a href="{{ route('public.services') }}" class="block text-slate-700 hover:text-teal-600 transition-colors text-sm font-medium py-2">
                Servicios
            </a>
            <a href="{{ route('public.contact') }}" class="block text-slate-700 hover:text-teal-600 transition-colors text-sm font-medium py-2">
                Contacto
            </a>
            


            @guest
                <a href="{{ route('login') }}" class="block px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm text-center font-medium">
                    Iniciar Sesión
                </a>
                <a href="{{ route('register') }}" class="block px-4 py-3 bg-gray-900 text-white font-semibold rounded-xl text-sm text-center">
                    Registrarse
                </a>
            @endguest
        </div>
    </div>
</nav>

<script>
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Help dropdown
    const helpDropdownBtn = document.getElementById('help-dropdown-btn');
    const helpDropdown = document.getElementById('help-dropdown');
    
    if (helpDropdownBtn && helpDropdown) {
        helpDropdownBtn.addEventListener('click', () => {
            helpDropdown.classList.toggle('hidden');
        });
        
        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!helpDropdownBtn.contains(e.target) && !helpDropdown.contains(e.target)) {
                helpDropdown.classList.add('hidden');
            }
        });
    }
</script>
