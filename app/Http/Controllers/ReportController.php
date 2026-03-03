<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Report;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::where('user_id', auth()->id())->latest()->get();
        return view('reports.index', compact('reports'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipo_incidente' => 'required|in:acoso_sexual,bullying,abuso_autoridad,injusticia_academica,otro',
            'descripcion' => 'required|string|min:10',
            'grupo' => 'nullable|string|max:255',
            'nombre_agresor' => 'nullable|string|max:255',
            'archivos' => 'nullable',
            'archivos.*' => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:10240', // 10MB max
        ]);

        $rutasArchivos = [];
        
        if ($request->hasFile('archivos')) {
            $files = $request->file('archivos');
            if (!is_array($files)) {
                $files = [$files];
            }

            foreach ($files as $archivo) {
                $path = $archivo->store('reportes', 'public');
                $rutasArchivos[] = $path;
            }
        }

        $report = Report::create([
            'user_id' => auth()->id(),
            'tipo_incidente' => $validated['tipo_incidente'],
            'descripcion' => $validated['descripcion'],
            'grupo' => $validated['grupo'] ?? null,
            'nombre_agresor' => $validated['nombre_agresor'] ?? null,
            'archivos' => $rutasArchivos,
            'estado' => 'pendiente'
        ]);

        return redirect()->route('reports.create')->with('success', 'Tu reporte ha sido enviado exitosamente. El equipo estará revisando tu caso y se tomará acción lo antes posible.');
    }

    // Para admin
    public function show($id)
    {
        $report = Report::findOrFail($id);
        return response()->json($report);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,en_revision,resuelto,rechazado'
        ]);

        $report = Report::findOrFail($id);
        $report->estado = $request->estado;
        $report->save();

        return response()->json([
            'success' => true,
            'message' => 'Estado actualizado exitosamente'
        ]);
    }
}
