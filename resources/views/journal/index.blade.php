<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Diario - ArcaneCode</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <style>
         [x-cloak] { display: none !important; }
         .pb-safe { padding-bottom: max(5rem, env(safe-area-inset-bottom)); }
         .journal-font { font-family: 'Courier New', Courier, monospace; }
         
         .bg-pattern-default { background-color: #ffffff; background-image: radial-gradient(#e5e7eb 1px, transparent 1px); background-size: 20px 20px; }
        .bg-pattern-calm { background: linear-gradient(135deg, #f80000 0%, #ff6767 100%); }
        .bg-pattern-warm { background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%); }
        .bg-pattern-dark { background-color: #0f172a; color: #e2e8f0; } /* Matches slate-900 */
        .bg-pattern-nature { background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%); }
        .bg-pattern-lavender { background: linear-gradient(135deg, #e9d5ff 0%, #faf5ff 100%); }
        .bg-pattern-rose { background: linear-gradient(135deg, #fbcfe8 0%, #fdf2f8 100%); }
        .bg-pattern-sunset { background: linear-gradient(135deg, #fed7aa 0%, #ffedd5 100%); }
        .bg-pattern-midnight { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: #e2e8f0; }
        .bg-pattern-forest { background: linear-gradient(135deg, #022c22 0%, #14532d 100%); color: #d1fae5; }
        .bg-pattern-coffee { background: linear-gradient(135deg, #271c19 0%, #431407 100%); color: #ffedd5; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen font-sans text-slate-800 pb-24 relative" 
      x-data="{ 
          activeTab: '{{ (request('tab') === 'write' || isset($entry)) ? 'write' : 'list' }}',
          currentBackground: '{{ isset($entry) ? $entry->background : 'default' }}',
          selectedMood: '{{ isset($entry) ? $entry->mood : '' }}',
          toggleBackground(bg) { this.currentBackground = bg; },
          get isDark() { return ['dark', 'calm', 'midnight', 'forest', 'coffee'].includes(this.currentBackground); }
      }">
    <div id="mobile-header-root" data-user="{{ json_encode(auth()->user()) }}"></div>
    
    <!-- Background Decoration -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 right-0 w-80 h-80 bg-teal-100/40 rounded-full blur-[80px]"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-[80px]"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-4">
        
        <!-- Header & Tabs -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <div class="mb-4 md:mb-0 text-center md:text-left text-slate-900">
                <h1 class="text-2xl font-bold flex items-center justify-center md:justify-start">
                    <span class="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-2 rounded-lg mr-3 shadow-lg text-lg">✍️</span> 
                    <span>Mi Diario</span>
                </h1>
            </div>

            <!-- Tab Switcher -->
            <div class="flex p-1 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
                <button 
                    @click="activeTab = 'list'" 
                    :class="activeTab === 'list' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'"
                    class="flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform"
                >
                    Entradas
                </button>
                <button 
                    @click="if('{{ isset($entry) }}') { window.location.href = '{{ route('journal.index', ['tab' => 'write']) }}'; } else { activeTab = 'write'; }" 
                    :class="activeTab === 'write' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'"
                    class="flex-1 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform"
                >
                    Escribir
                </button>
            </div>
        </div>

        <!-- LIST TAB -->
        <div x-show="activeTab === 'list'" 
             x-transition:enter="transition ease-out duration-300"
             class="space-y-4">
            
             <div class="mb-4 text-center">
                <div class="inline-flex items-center bg-yellow-100/80 backdrop-blur-md text-yellow-800 px-3 py-1 rounded-full text-xs font-medium border border-yellow-200">
                    <span class="mr-1">🔒</span>
                    100% privado y encriptado
                </div>
            </div>

            @if(isset($entries) && $entries->count() > 0)
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    @foreach($entries as $histEntry)
                    @php
                        $borderClass = match($histEntry->background ?? 'default') {
                            'warm' => 'border-amber-200 bg-amber-50/50',
                            'rose' => 'border-pink-300 bg-pink-50/50',
                            'lavender' => 'border-purple-300 bg-purple-50/50',
                            'nature' => 'border-emerald-300 bg-emerald-50/50',
                            'sunset' => 'border-orange-300 bg-orange-50/50',
                            'calm' => 'border-red-500 bg-red-50/50',
                            'forest' => 'border-green-800 bg-green-50/50',
                            'midnight' => 'border-indigo-900 bg-indigo-50/50',
                            'coffee' => 'border-yellow-900 bg-yellow-50/50',
                            'dark' => 'border-slate-800 bg-slate-100',
                            default => 'border-slate-200 bg-white',
                        };
                    @endphp
                    <div class="relative group">
                        <a href="{{ route('journal.show', $histEntry->id) }}" class="block p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all {{ $borderClass }}">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">{{ $histEntry->created_at->format('d M, Y') }}</span>
                                @if($histEntry->mood)
                                    <span class="text-xl group-hover:scale-110 transition-transform">{{ $histEntry->mood }}</span>
                                @endif
                            </div>
                            <h3 class="font-bold text-slate-700 mb-1 truncate group-hover:text-pink-600 transition-colors">{{ $histEntry->title }}</h3>
                            <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">{{ Str::limit($histEntry->content, 100) }}</p>
                        </a>
                        <form action="{{ route('journal.destroy', $histEntry->id) }}" method="POST" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200" onclick="return confirm('¿Estás seguro de querer eliminar esta entrada?')">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </form>
                    </div>
                    @endforeach
                </div>
            @else
                <div class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                    <div class="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-4xl">📝</span>
                    </div>
                    <h3 class="font-bold text-slate-800 text-lg">Tu historia comienza hoy</h3>
                    <p class="text-slate-500 text-sm mt-2 max-w-xs mx-auto mb-6">Este es un espacio seguro para tus pensamientos. Nadie más puede leer lo que escribes.</p>
                    <button @click="activeTab = 'write'" class="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5">
                        Empezar a escribir
                    </button>
                </div>
            @endif
        </div>

        <!-- WRITE TAB -->
        <div x-show="activeTab === 'write'" x-cloak 
             x-transition:enter="transition ease-out duration-300">
            
            <form action="{{ isset($entry) ? route('journal.update', $entry->id) : route('journal.store') }}" method="POST" class="h-full">
                @csrf
                @if(isset($entry))
                    @method('PUT')
                @endif

                <!-- Paper Container -->
                <div :class="currentBackground != 'default' ? 'bg-pattern-' + currentBackground : 'bg-pattern-default'" 
                     class="rounded-3xl shadow-xl overflow-hidden border transition-colors duration-500 min-h-[60vh] flex flex-col relative"
                     :class="isDark ? 'border-slate-700' : 'border-slate-200'">
                    
                    <!-- Paper Header (Tools) -->
                    <div class="p-4 border-b flex flex-wrap items-center justify-between gap-4 transition-colors duration-500"
                         :class="isDark ? 'bg-black/20 border-white/10' : 'bg-white/50 border-slate-200/50'">
                        
                        <!-- Mood Selector -->
                        <div class="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
                            <span class="text-xs font-bold uppercase tracking-wide opacity-70" :class="isDark ? 'text-white' : 'text-slate-500'">Ánimo:</span>
                            @foreach(['😊', '😔', '😡', '😰', '😴', '😎', '🤔', '😭'] as $mood)
                                <label class="cursor-pointer group relative">
                                    <input type="radio" name="mood" value="{{ $mood }}" x-model="selectedMood" class="peer sr-only">
                                    <span class="text-2xl opacity-50 peer-checked:opacity-100 transition-opacity hover:opacity-100 hover:scale-110 transform inline-block">{{ $mood }}</span>
                                    <span class="absolute -bottom-1 left-1/2 w-1 h-1 bg-current rounded-full opacity-0 peer-checked:opacity-100 transform -translate-x-1/2" :class="isDark ? 'bg-white' : 'bg-slate-800'"></span>
                                </label>
                            @endforeach
                        </div>

                        <!-- Theme Toggle (Expanded) -->
                        <div class="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
                            <span class="text-xs font-bold uppercase tracking-wide opacity-70 mr-1 hidden sm:block" :class="isDark ? 'text-white' : 'text-slate-500'">Papel:</span>
                            
                            <!-- Light Themes -->
                            <button type="button" @click="toggleBackground('default')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'default' ? 'ring-2 ring-blue-400' : ''" style="background: white;" title="Clásico"></button>
                            <button type="button" @click="toggleBackground('warm')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'warm' ? 'ring-2 ring-amber-400' : ''" style="background: #fef3c7;" title="Cálido"></button>
                            <button type="button" @click="toggleBackground('rose')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'rose' ? 'ring-2 ring-pink-400' : ''" style="background: #fbcfe8;" title="Rosa"></button>
                            <button type="button" @click="toggleBackground('lavender')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'lavender' ? 'ring-2 ring-purple-400' : ''" style="background: #e9d5ff;" title="Lavanda"></button>
                            <button type="button" @click="toggleBackground('nature')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'nature' ? 'ring-2 ring-green-400' : ''" style="background: #dcfce7;" title="Naturaleza"></button>
                            <button type="button" @click="toggleBackground('sunset')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'sunset' ? 'ring-2 ring-orange-400' : ''" style="background: #fed7aa;" title="Atardecer"></button>
                            
                            <div class="w-px h-6 bg-slate-300 mx-1"></div>

                            <!-- Dark Themes -->
                            <button type="button" @click="toggleBackground('calm')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'calm' ? 'ring-2 ring-white' : ''" style="background: #ef4444;" title="Intenso"></button>
                            <button type="button" @click="toggleBackground('forest')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'forest' ? 'ring-2 ring-white' : ''" style="background: #022c22;" title="Bosque"></button>
                            <button type="button" @click="toggleBackground('midnight')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'midnight' ? 'ring-2 ring-white' : ''" style="background: #1e1b4b;" title="Medianoche"></button>
                            <button type="button" @click="toggleBackground('coffee')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'coffee' ? 'ring-2 ring-white' : ''" style="background: #431407;" title="Café"></button>
                            <button type="button" @click="toggleBackground('dark')" class="w-6 h-6 rounded-full border flex-shrink-0 shadow-sm hover:scale-125 transition-transform" :class="currentBackground == 'dark' ? 'ring-2 ring-white' : ''" style="background: #0f172a;" title="Oscuro"></button>
                        </div>
                        
                        <input type="hidden" name="background" :value="currentBackground">
                    </div>

                    <!-- Title Input -->
                    <div class="px-6 pt-6">
                        <input type="text" 
                               name="title" 
                               value="{{ isset($entry) ? $entry->title : '' }}"
                               placeholder="Título de hoy..." 
                               class="w-full bg-transparent text-2xl font-bold placeholder-opacity-50 outline-none border-b border-dashed border-transparent focus:border-opacity-30 transition-all pb-2"
                               :class="isDark ? 'text-white placeholder-white/30 focus:border-white' : 'text-slate-800 placeholder-slate-400 focus:border-slate-400'"
                               required>
                    </div>

                    <!-- Content Textarea -->
                    <div class="flex-1 px-6 py-4 relative">
                        <textarea 
                            name="content" 
                            placeholder="Escribe lo que sientes..." 
                            class="w-full h-full min-h-[400px] bg-transparent resize-none outline-none leading-relaxed journal-font text-lg"
                            :class="isDark ? 'text-slate-200 placeholder-white/20' : 'text-slate-700 placeholder-slate-400'" 
                            required>{{ isset($entry) ? $entry->content : '' }}</textarea>
                    </div>

                    <!-- Footer Actions -->
                    <div class="p-4 border-t flex justify-end items-center gap-4 transition-colors duration-500 backdrop-blur-sm"
                         :class="isDark ? 'bg-black/30 border-white/10' : 'bg-white/80 border-slate-200'">
                        
                        @if(isset($entry))
                           <a href="{{ route('journal.index') }}" class="text-sm font-medium hover:underline opacity-70" :class="isDark ? 'text-white' : 'text-slate-600'">Cancelar</a>
                        @endif

                        <button type="submit" class="flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold shadow-lg transform active:scale-95 transition-all"
                                :class="isDark ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-none' : 'bg-slate-900 text-white hover:bg-slate-800'">
                            <span>💾</span>
                            <span>Guardar</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>

    </div>

    <!-- Fixed Bottom Navigation (React) -->
    <div id="bottom-nav-root" data-active="journal" x-ignore></div>
</body>
</html>







