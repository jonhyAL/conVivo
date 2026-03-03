<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Horario;
use Illuminate\Http\Request;

class HorarioController extends Controller
{
    // Obtener horarios de un especialista
    public function index($especialistaId)
    {
        $horarios = Horario::where('especialista_id', $especialistaId)
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->get();
        
        return response()->json($horarios);
    }

    // Crear nuevo horario
    public function store(Request $request)
    {
        $validated = $request->validate([
            'especialista_id' => 'required|exists:especialistas,id',
            'fecha' => 'required|date|after_or_equal:today',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio'
        ]);

        // Verificar que no exista conflicto de horarios
        $conflicto = Horario::where('especialista_id', $validated['especialista_id'])
            ->where('fecha', $validated['fecha'])
            ->where(function($q) use ($validated) {
                $q->whereBetween('hora_inicio', [$validated['hora_inicio'], $validated['hora_fin']])
                  ->orWhereBetween('hora_fin', [$validated['hora_inicio'], $validated['hora_fin']])
                  ->orWhere(function($q2) use ($validated) {
                      $q2->where('hora_inicio', '<=', $validated['hora_inicio'])
                         ->where('hora_fin', '>=', $validated['hora_fin']);
                  });
            })
            ->exists();

        if ($conflicto) {
            return response()->json([
                'success' => false,
                'message' => 'Ya existe un horario en ese rango de tiempo'
            ], 422);
        }

        $validated['disponible'] = true;
        $horario = Horario::create($validated);

        return response()->json([
            'success' => true,
            'horario' => $horario
        ]);
    }

    // Eliminar horario
    public function destroy($id)
    {
        $horario = Horario::findOrFail($id);
        
        // Verificar que no tenga citas asignadas
        if ($horario->cita) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede eliminar un horario con cita asignada'
            ], 422);
        }

        $horario->delete();

        return response()->json(['success' => true]);
    }
}
