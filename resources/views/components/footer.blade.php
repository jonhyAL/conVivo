<!-- Footer -->
<footer class="bg-slate-900/90 backdrop-blur-2xl border-t border-slate-800 text-slate-300 mt-20 relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Logo y descripción -->
            <div class="col-span-1 md:col-span-2">
                <div class="flex items-center mb-4">
                    <img src="{{ asset('images/logos/logo-fullwhite.png') }}" alt="conVivo" class="h-12 w-auto opacity-80 hover:opacity-100 transition duration-300">
                </div>
                <p class="text-slate-400 text-sm mb-4 max-w-md font-light">
                    Solución integral SaaS para la gestión de la convivencia escolar, salud mental y seguridad en instituciones educativas privadas.
                </p>
                <p class="text-slate-500 text-xs">
                    Potenciando comunidades educativas seguras y resilientes.
                </p>
            </div>

            <!-- Enlaces Rápidos -->
            <div>
                <h3 class="text-lg font-bold mb-4 text-slate-200">Nuestra Solución</h3>
                <ul class="space-y-2">
                    <li>
                        <a href="{{ route('welcome') }}" class="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('public.about') }}" class="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                            Sobre Nosotros
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('public.services') }}" class="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                            Servicios
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('public.contact') }}" class="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                            Contacto
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Contacto de emergencia -->
            <div>
                <h3 class="text-lg font-bold mb-4 text-slate-200">Emergencias</h3>
                <div class="space-y-3">
                    <a href="tel:991" class="flex items-center space-x-2 text-slate-400 hover:text-red-400 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span class="font-semibold text-sm">Línea 991</span>
                    </a>
                    <a href="tel:988" class="flex items-center space-x-2 text-slate-400 hover:text-red-400 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span class="font-semibold text-sm">Línea 988</span>
                    </a>
                    <p class="text-slate-500 text-xs mt-3">
                        Disponibles 24/7 para emergencias
                    </p>
                </div>
            </div>
        </div>

        <!-- Línea divisoria -->
        <div class="border-t border-slate-800 mt-8 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p class="text-slate-500 text-sm">
                    © {{ date('Y') }} conVivo. Todos los derechos reservados.
                </p>
                <div class="flex space-x-6">
                    <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
                        Privacidad
                    </a>
                    <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
                        Términos
                    </a>
                    <a href="#" class="text-white/60 hover:text-white transition-colors text-sm">
                        Contacto
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>
