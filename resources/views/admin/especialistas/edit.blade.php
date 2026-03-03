<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Especialista - Admin</title>
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

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
            <a href="{{ route('admin.especialistas.index') }}" class="text-blue-600 hover:text-blue-800 flex items-center mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Volver a Especialistas
            </a>
            <h2 class="text-3xl font-bold text-gray-900">Editar Especialista</h2>
            <p class="text-gray-600 mt-1">Actualiza la información del especialista</p>
        </div>

        <!-- Formulario -->
        <form action="{{ route('admin.especialistas.update', $especialista) }}" method="POST" enctype="multipart/form-data" class="bg-white rounded-xl shadow-lg p-8">
            @csrf
            @method('PUT')

            <div class="space-y-6">
                <!-- Foto Actual -->
                @if($especialista->foto)
                <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img src="{{ asset('storage/' . $especialista->foto) }}" alt="{{ $especialista->nombre }}" class="w-20 h-20 rounded-full object-cover">
                    <div>
                        <p class="text-sm font-semibold text-gray-700">Foto Actual</p>
                        <p class="text-xs text-gray-500">Sube una nueva imagen para reemplazarla</p>
                    </div>
                </div>
                @endif

                <!-- Nombre -->
                <div>
                    <label for="nombre" class="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre Completo <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="nombre" id="nombre" value="{{ old('nombre', $especialista->nombre) }}" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors @error('nombre') border-red-500 @enderror">
                    @error('nombre')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Especialidad -->
                <div>
                    <label for="especialidad" class="block text-sm font-semibold text-gray-700 mb-2">
                        Especialidad <span class="text-red-500">*</span>
                    </label>
                    <select name="especialidad" id="especialidad" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors @error('especialidad') border-red-500 @enderror">
                        <option value="">Selecciona una especialidad</option>
                        <option value="Psicología" {{ old('especialidad', $especialista->especialidad) == 'Psicología' ? 'selected' : '' }}>Psicología</option>
                        <option value="Psiquiatría" {{ old('especialidad', $especialista->especialidad) == 'Psiquiatría' ? 'selected' : '' }}>Psiquiatría</option>
                        <option value="Terapia Familiar" {{ old('especialidad', $especialista->especialidad) == 'Terapia Familiar' ? 'selected' : '' }}>Terapia Familiar</option>
                        <option value="Terapia Infantil" {{ old('especialidad', $especialista->especialidad) == 'Terapia Infantil' ? 'selected' : '' }}>Terapia Infantil</option>
                        <option value="Apoyo Emocional" {{ old('especialidad', $especialista->especialidad) == 'Apoyo Emocional' ? 'selected' : '' }}>Apoyo Emocional</option>
                    </select>
                    @error('especialidad')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Localidad -->
                <div>
                    <label for="localidad" class="block text-sm font-semibold text-gray-700 mb-2">
                        Localidad <span class="text-red-500">*</span>
                    </label>
                    <select name="localidad" id="localidad" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors @error('localidad') border-red-500 @enderror">
                        <option value="">Selecciona una localidad</option>
                        <option value="Nezahualcóyotl" {{ old('localidad', $especialista->localidad) == 'Nezahualcóyotl' ? 'selected' : '' }}>Nezahualcóyotl</option>
                        <option value="Puebla" {{ old('localidad', $especialista->localidad) == 'Puebla' ? 'selected' : '' }}>Puebla</option>
                    </select>
                    @error('localidad')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Descripción -->
                <div>
                    <label for="descripcion" class="block text-sm font-semibold text-gray-700 mb-2">
                        Descripción / Perfil Profesional
                    </label>
                    <textarea name="descripcion" id="descripcion" rows="4"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors @error('descripcion') border-red-500 @enderror">{{ old('descripcion', $especialista->descripcion) }}</textarea>
                    <p class="text-sm text-gray-500 mt-1">Describe la experiencia y enfoque del especialista</p>
                    @error('descripcion')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Foto -->
                <div>
                    <label for="foto" class="block text-sm font-semibold text-gray-700 mb-2">
                        Nueva Foto de Perfil
                    </label>
                    <input type="file" name="foto" id="foto" accept="image/*"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors @error('foto') border-red-500 @enderror">
                    <p class="text-sm text-gray-500 mt-1">Formato: JPG, PNG. Tamaño máximo: 2MB. Dejar vacío para mantener la actual.</p>
                    @error('foto')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Estado Activo -->
                <div class="flex items-center">
                    <input type="checkbox" name="activo" id="activo" value="1" {{ old('activo', $especialista->activo) ? 'checked' : '' }}
                        class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                    <label for="activo" class="ml-3 text-sm font-semibold text-gray-700">
                        Especialista Activo
                    </label>
                </div>
            </div>

            <!-- Botones -->
            <div class="mt-8 flex justify-end space-x-4">
                <a href="{{ route('admin.especialistas.index') }}" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
                    Cancelar
                </a>
                <button type="submit" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    Actualizar Especialista
                </button>
            </div>
        </form>

        <!-- Botón de Eliminar Separado -->
        <form action="{{ route('admin.especialistas.destroy', $especialista) }}" method="POST" class="mt-8 pt-8 border-t" onsubmit="return confirm('¿Estás seguro de eliminar este especialista? Esta acción no se puede deshacer.');">
            @csrf
            @method('DELETE')
            <button type="submit" class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors">
                Eliminar Especialista
            </button>
        </form>
    </div>
</body>
</html>

