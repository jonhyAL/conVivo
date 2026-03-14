<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Especialista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EspecialistaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $especialistas = Especialista::withCount('citas')->paginate(10);
        return view('admin.especialistas.index', compact('especialistas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.especialistas.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'especialidad' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
            'icon_class' => 'nullable|string|max:50',
            'localidad' => 'required|in:Nezahualcóyotl,Puebla',
            'activo' => 'nullable'
        ]);

        $data = [
            'nombre' => $validated['nombre'],
            'especialidad' => $validated['especialidad'],
            'descripcion' => $validated['descripcion'] ?? null,
            'icon_class' => $validated['icon_class'] ?? 'Stethoscope',
            'localidad' => $validated['localidad'],
            'activo' => $request->input('activo') == '1' ? 1 : 0
        ];

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('especialistas', 'public');
        }

        $especialista = Especialista::create($data);

        // Si es petición AJAX, devolver JSON
        if (request()->wantsJson() || request()->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Especialista creado exitosamente',
                'especialista' => $especialista
            ]);
        }

        return redirect()->route('admin.especialistas.index')
            ->with('success', 'Especialista creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Especialista $especialista)
    {
        // Si es petición AJAX, devolver JSON
        if (request()->wantsJson() || request()->ajax()) {
            $especialista->loadCount(['horarios', 'citas']);
            $especialista->load(['horarios', 'citas.horario']);
            return response()->json($especialista);
        }
        
        $especialista->load(['horarios', 'citas']);
        return view('admin.especialistas.show', compact('especialista'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Especialista $especialista)
    {
        return view('admin.especialistas.edit', compact('especialista'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Especialista $especialista)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'especialidad' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
            'icon_class' => 'nullable|string|max:50',
            'localidad' => 'required|in:Nezahualcóyotl,Puebla',
            'activo' => 'nullable'
        ]);

        // Manejar el campo activo explícitamente
        $data = [
            'nombre' => $validated['nombre'],
            'especialidad' => $validated['especialidad'],
            'descripcion' => $validated['descripcion'] ?? null,
            'icon_class' => $validated['icon_class'] ?? 'Stethoscope',
            'localidad' => $validated['localidad'],
            'activo' => $request->input('activo') == '1' ? 1 : 0
        ];

        if ($request->hasFile('foto')) {
            // Eliminar foto anterior
            if ($especialista->foto) {
                Storage::disk('public')->delete($especialista->foto);
            }
            $data['foto'] = $request->file('foto')->store('especialistas', 'public');
        }

        $especialista->update($data);

        // Si es petición AJAX, devolver JSON
        if (request()->wantsJson() || request()->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Especialista actualizado exitosamente',
                'especialista' => $especialista->fresh()
            ]);
        }

        return redirect()->route('admin.especialistas.index')
            ->with('success', 'Especialista actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Especialista $especialista)
    {
        // Eliminar foto si existe
        if ($especialista->foto) {
            Storage::disk('public')->delete($especialista->foto);
        }

        $especialista->delete();

        // Si es petición AJAX, devolver JSON
        if (request()->wantsJson() || request()->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Especialista eliminado exitosamente'
            ]);
        }

        return redirect()->route('admin.especialistas.index')
            ->with('success', 'Especialista eliminado exitosamente');
    }
}
