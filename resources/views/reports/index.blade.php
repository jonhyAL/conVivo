<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reportes - conVivo</title>
    <script>if(localStorage.panelTheme==='dark'){document.documentElement.classList.add('dark');}</script>
    <link rel="icon" href="{{ asset('images/logos/logo-unico.png') }}" type="image/png">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <style>
         [x-cloak] { display: none !important; }
         .pb-safe { padding-bottom: max(5rem, env(safe-area-inset-bottom)); }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-600 dark:text-slate-300 pb-24 relative selection:bg-teal-500/30" x-data="{ activeTab: 'list' }">
    <div id="mobile-header-root" data-user="{{ json_encode(auth()->user()) }}"></div>


    <!-- Main Content -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-4">
        
        <!-- Global Success Alert -->
        @if(session('success'))
        <div class="mb-6 bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center shadow-lg animate-bounce-in">
            <span class="mr-3 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></span>
            <div>
                <h3 class="text-teal-900 font-bold text-sm">¡Reporte Enviado!</h3>
                <p class="text-teal-700 text-xs">{{ session('success') }}</p>
            </div>
        </div>
        @endif

        <!-- Header & Tabs -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <div class="mb-4 md:mb-0 text-center md:text-left">
                <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start">
                    <span class="bg-gradient-to-br from-teal-500 to-teal-700 text-white p-2 rounded-lg mr-3 shadow-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
                    </span> 
                    <span class="text-slate-900 dark:text-slate-100">Mis Reportes</span>
                </h1>
            </div>

            <!-- Tab Switcher -->
            <div class="flex p-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
                <button 
                    @click="activeTab = 'list'" 
                    :class="activeTab === 'list' ? 'bg-slate-800 dark:bg-teal-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
                    class="flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform"
                >
                    Historial
                </button>
                <button 
                    @click="activeTab = 'create'" 
                    :class="activeTab === 'create' ? 'bg-slate-800 dark:bg-teal-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
                    class="flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform"
                >
                    + Nuevo
                </button>
            </div>
        </div>

        <!-- LIST VIEW -->
        <div x-show="activeTab === 'list'" 
             x-transition:enter="transition ease-out duration-300" 
             x-transition:enter-start="opacity-0 translate-y-2" 
             x-transition:enter-end="opacity-100 translate-y-0">
            
            <div class="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300">
                @if(isset($reports) && $reports->count() > 0)
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 text-xs uppercase border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th class="px-5 py-3 font-semibold">Tipo</th>
                                    <th class="px-5 py-3 font-semibold">Fecha</th>
                                    <th class="px-5 py-3 font-semibold">Estado</th>
                                    <th class="px-5 py-3 font-semibold text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                @foreach($reports as $report)
                                <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition duration-150">
                                    <td class="px-5 py-4">
                                        <div class="font-bold text-slate-700 dark:text-slate-200 capitalize">{{ str_replace('_', ' ', $report->tipo_incidente) }}</div>
                                        <div class="text-xs text-slate-400 dark:text-slate-500">ID: #{{ $report->id }}</div>
                                    </td>
                                    <td class="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">{{ $report->created_at->format('d M, Y') }}</td>
                                    <td class="px-5 py-4">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            @if($report->estado == 'pendiente') bg-yellow-100 text-yellow-800
                                            @elseif($report->estado == 'en_revision') bg-blue-100 text-blue-800
                                            @elseif($report->estado == 'resuelto') bg-green-100 text-green-800
                                            @else bg-gray-100 text-gray-800 @endif">
                                            {{ ucfirst(str_replace('_', ' ', $report->estado)) }}
                                        </span>
                                    </td>
                                    <td class="px-5 py-4 text-right">
                                        <div class="relative" x-data="{ open: false }">
                                            <button @click="open = !open" class="text-slate-400 hover:text-slate-600">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="p-12 text-center flex flex-col items-center justify-center dark:text-slate-300">
                        <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 class="text-slate-800 dark:text-white font-bold text-lg mb-1">Sin reportes registrados</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mb-6 mx-auto">Tus reportes aparecerán aquí. Si sucede algo, estamos aquí para ayudarte.</p>
                        <button @click="activeTab = 'create'" class="px-6 py-2.5 bg-slate-800 dark:bg-teal-600 hover:bg-slate-700 dark:hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-sm">
                            Crear Reporte
                        </button>
                    </div>
                @endif
            </div>

            <!-- Additional Help Info -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50 rounded-xl p-4 flex items-center space-x-4 backdrop-blur-sm">
                    <div class="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg text-teal-600 dark:text-teal-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h4 class="font-bold text-teal-900 dark:text-teal-100 text-sm">¿Cómo funciona?</h4>
                        <p class="text-xs text-teal-700 dark:text-teal-300/80 mt-1">Los reportes son anónimos y revisados por el equipo de orientación escolar en un plazo de 24 horas.</p>
                    </div>
                </div>
                <div class="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50 rounded-xl p-4 flex items-center space-x-4 backdrop-blur-sm">
                    <div class="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg text-teal-600 dark:text-teal-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                        <h4 class="font-bold text-teal-900 dark:text-teal-100 text-sm">Tu privacidad</h4>
                        <p class="text-xs text-teal-700 dark:text-teal-300/80 mt-1">Nadie, excepto la dirección, puede ver tu identidad si eliges compartirla. Tu seguridad es primero.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CREATE VIEW -->
        <div x-show="activeTab === 'create'" x-cloak 
             x-transition:enter="transition ease-out duration-300" 
             x-transition:enter-start="opacity-0 translate-y-2" 
             x-transition:enter-end="opacity-100 translate-y-0">

            <!-- Form Card -->
            <div class="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-300">
                <div class="bg-slate-50 dark:bg-slate-900/80 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 class="font-bold text-slate-800 dark:text-slate-100">Nuevo Reporte</h2>
                    <span class="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Anónimo</span>
                </div>

                <div class="p-6">
                    @if ($errors->any())
                        <div class="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-sm shadow-sm">
                            <ul class="list-disc list-inside space-y-1">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('reports.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                        @csrf
                        <!-- Tipo de Incidente -->
                        <div>
                            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                Tipo de Incidente <span class="text-red-500">*</span>
                            </label>
                            <select name="tipo_incidente" required class="w-full px-4 py-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm font-medium">
                                <option value="" selected disabled>Selecciona una categoría...</option>
                                <option value="acoso_sexual">Acoso Sexual</option>
                                <option value="bullying">Bullying / Acoso Escolar</option>
                                <option value="abuso_autoridad">Abuso de Autoridad</option>
                                <option value="injusticia_academica">Injusticia Académica</option>
                                <option value="otro">Otro Motivo</option>
                            </select>
                        </div>

                        <!-- Descripción -->
                        <div>
                            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                Detalle de lo sucedido <span class="text-red-500">*</span>
                            </label>
                            <textarea name="descripcion" rows="5" required class="w-full px-4 py-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all resize-none text-sm" placeholder="Escribe aquí los detalles. Recuerda mencionar fechas, horas y lugares si es posible..."></textarea>
                        </div>

                                                <!-- Evidencia (Nuevo) -->
                        <div>
                            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                Evidencia / Archivos <span class="text-slate-500 normal-case font-normal">(opcional)</span>
                            </label>
                            <div class="relative group">
                                <input type="file" name="archivos[]" multiple class="block w-full text-sm text-slate-500 dark:text-slate-400
                                    file:mr-4 file:py-3 file:px-6
                                    file:rounded-xl file:border-0
                                    file:text-sm file:font-bold
                                    file:bg-slate-100 dark:file:bg-slate-800 file:text-slate-700 dark:file:text-slate-300
                                    hover:file:bg-slate-200 dark:hover:file:bg-slate-700
                                    cursor-pointer border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950/50 transition-all"
                                />
                                <p class="text-[10px] text-slate-500 mt-2">
                                    Puedes adjuntar capturas, fotos o documentos. 
                                    <span class="text-teal-600 font-bold">Tip: Mantén Ctrl (o Cmd) presionado para seleccionar varios archivos a la vez.</span>
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Grupo <span class="text-slate-500 normal-case font-normal">(opcional)</span></label>
                                <input type="text" name="grupo" class="w-full px-4 py-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:border-teal-500 outline-none text-sm">
                            </div>
                            <div>
                                 <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Agresor <span class="text-slate-500 normal-case font-normal">(opcional)</span></label>
                                 <input type="text" name="nombre_agresor" class="w-full px-4 py-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:border-teal-500 outline-none text-sm">
                            </div>
                        </div>

                        <!-- Botón Enviar -->
                        <div class="pt-2">
                            <button type="submit" class="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> Enviar Reporte Seguro
                            </button>
                            <p class="text-center text-slate-500 text-[10px] mt-3">
                                Información encriptada de extremo a extremo (E2EE).
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Emergency Numbers -->
            <div class="mt-8">
                <p class="text-slate-500 text-center text-xs font-bold uppercase mb-4">Ayuda Externa Inmediata</p>
                <div class="grid grid-cols-2 gap-3">
                     <a href="tel:911" class="flex flex-col items-center p-3 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span class="text-red-600 font-bold text-sm mt-1">911</span>
                        <span class="text-[10px] text-red-500">Emergencias</span>
                    </a>
                    <a href="tel:988" class="flex flex-col items-center p-3 bg-teal-50 border border-teal-100 rounded-xl hover:bg-teal-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <span class="text-teal-600 font-bold text-sm mt-1">988</span>
                        <span class="text-[10px] text-teal-500">Crisis Mental</span>
                    </a>
                </div>
            </div>
        </div>

    </div>

    <!-- Fixed Bottom Navigation (React) -->
    <div id="bottom-nav-root" data-active="reports" x-ignore></div>
</body>
</html>









