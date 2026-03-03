<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $especialista->nombre }} - Admin</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                        Panel de Administración
                    </h1>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="{{ route('admin.dashboard') }}" class="text-gray-700 hover:text-blue-600">Dashboard</a>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="text-gray-700 hover:text-red-600">Cerrar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
            <a href="{{ route('admin.especialistas.index') }}" class="text-blue-600 hover:text-blue-800 flex items-center mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Volver a Especialistas
            </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Información del Especialista -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <div class="text-center">
                        @if($especialista->foto)
                            <img src="{{ asset('storage/' . $especialista->foto) }}" alt="{{ $especialista->nombre }}" class="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100">
                        @else
                            <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-700 to-cyan-700 flex items-center justify-center text-5xl text-white mx-auto mb-4">
                                {{ substr($especialista->nombre, 0, 1) }}
                            </div>
                        @endif
                        
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ $especialista->nombre }}</h2>
                        <p class="text-gray-600 mb-4">{{ $especialista->especialidad }}</p>
                        
                        <div class="flex justify-center space-x-2 mb-6">
                            @if($especialista->activo)
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Activo
                                </span>
                            @else
                                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Inactivo
                                </span>
                            @endif
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {{ $especialista->localidad }}
                            </span>
                        </div>

                        <div class="pt-6 border-t border-gray-200">
                            <div class="flex justify-center space-x-4">
                                <a href="{{ route('admin.especialistas.edit', $especialista) }}" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                                    Editar
                                </a>
                            </div>
                        </div>
                    </div>

                    @if($especialista->descripcion)
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <h3 class="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
                        <p class="text-gray-600 text-sm">{{ $especialista->descripcion }}</p>
                    </div>
                    @endif

                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <div class="space-y-3">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Total de Citas</span>
                                <span class="font-semibold text-gray-900">{{ $especialista->citas->count() }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Horarios Registrados</span>
                                <span class="font-semibold text-gray-900">{{ $especialista->horarios->count() }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Citas y Horarios -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Últimas Citas -->
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h3 class="text-xl font-bold text-gray-900 mb-6">Últimas Citas</h3>
                    
                    @if($especialista->citas->count() > 0)
                        <div class="space-y-4">
                            @foreach($especialista->citas->take(5) as $cita)
                            <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <p class="font-semibold text-gray-900">{{ $cita->nombre_cliente }}</p>
                                        <p class="text-sm text-gray-600">{{ $cita->email_cliente }} • {{ $cita->telefono_cliente }}</p>
                                        <p class="text-sm text-gray-500 mt-1">{{ $cita->tipo_consulta }}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm font-semibold text-gray-700">{{ $cita->horario->fecha->format('d/m/Y') }}</p>
                                        <p class="text-sm text-gray-600">{{ \Carbon\Carbon::parse($cita->horario->hora_inicio)->format('H:i') }}</p>
                                        @if($cita->estado === 'confirmada')
                                            <span class="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Confirmada</span>
                                        @elseif($cita->estado === 'pendiente')
                                            <span class="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>
                                        @elseif($cita->estado === 'cancelada')
                                            <span class="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelada</span>
                                        @else
                                            <span class="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Completada</span>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    @else
                        <div class="text-center py-8 text-gray-500">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p class="mt-2">No hay citas registradas</p>
                        </div>
                    @endif
                </div>

                <!-- Horarios -->
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-gray-900">Horarios Disponibles</h3>
                        <button class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-colors">
                            + Agregar Horario
                        </button>
                    </div>
                    
                    @if($especialista->horarios->count() > 0)
                        <div class="space-y-3">
                            @php
                                $horariosPorFecha = $especialista->horarios->sortBy('fecha')->groupBy(function($horario) {
                                    return $horario->fecha->format('Y-m-d');
                                });
                            @endphp
                            
                            @foreach($horariosPorFecha->take(7) as $fecha => $horarios)
                            <div class="border border-gray-200 rounded-lg p-4">
                                <h4 class="font-semibold text-gray-800 mb-3">
                                    {{ \Carbon\Carbon::parse($fecha)->locale('es')->isoFormat('dddd, D [de] MMMM') }}
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    @foreach($horarios as $horario)
                                        <span class="px-3 py-1 text-sm rounded-lg {{ $horario->disponible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600' }}">
                                            {{ \Carbon\Carbon::parse($horario->hora_inicio)->format('H:i') }} - {{ \Carbon\Carbon::parse($horario->hora_fin)->format('H:i') }}
                                            @if(!$horario->disponible)
                                                <span class="text-xs">(Ocupado)</span>
                                            @endif
                                        </span>
                                    @endforeach
                                </div>
                            </div>
                            @endforeach
                        </div>
                    @else
                        <div class="text-center py-8 text-gray-500">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p class="mt-2">No hay horarios configurados</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</body>
</html>

