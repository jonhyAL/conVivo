<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RecursoProtocolo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecursoProtocoloController extends Controller
{
    /** GET /admin/recursos — list all (admin) */
    public function index()
    {
        return response()->json(
            RecursoProtocolo::orderBy('sort_order')->orderBy('created_at', 'desc')->get()
        );
    }

    /** POST /admin/recursos */
    public function store(Request $request)
    {
        $data = $request->validate([
            'item_type'        => 'required|in:recurso,protocolo',
            'protocol_type'    => 'nullable|string|max:100',
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'tag'              => 'required|string|max:50',
            'background_type'  => 'nullable|in:color,image',
            'background_value' => 'nullable|string|max:255',
            'icon_name'        => 'nullable|string|max:100',
            'image_file'       => 'nullable|image|max:2048',
            'protocol_file'    => 'nullable|file|mimes:pdf,doc,docx|max:20480',
            'is_active'        => 'nullable',
            'sort_order'       => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('image_file')) {
            $data['image_path'] = $request->file('image_file')->store('recursos/images', 'public');
        }
        if ($request->hasFile('protocol_file')) {
            $data['file_path'] = $request->file('protocol_file')->store('protocolos', 'public');
        }

        unset($data['image_file'], $data['protocol_file']);
        $data['is_active'] = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);
        $data['sort_order'] = (int) $request->input('sort_order', 0);

        $item = RecursoProtocolo::create($data);
        return response()->json($item->fresh(), 201);
    }

    /** PATCH /admin/recursos/{recurso} */
    public function update(Request $request, RecursoProtocolo $recurso)
    {
        $data = $request->validate([
            'item_type'        => 'required|in:recurso,protocolo',
            'protocol_type'    => 'nullable|string|max:100',
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'tag'              => 'required|string|max:50',
            'background_type'  => 'nullable|in:color,image',
            'background_value' => 'nullable|string|max:255',
            'icon_name'        => 'nullable|string|max:100',
            'image_file'       => 'nullable|image|max:2048',
            'protocol_file'    => 'nullable|file|mimes:pdf,doc,docx|max:20480',
            'is_active'        => 'nullable',
            'sort_order'       => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('image_file')) {
            if ($recurso->image_path) Storage::disk('public')->delete($recurso->image_path);
            $data['image_path'] = $request->file('image_file')->store('recursos/images', 'public');
        }
        if ($request->hasFile('protocol_file')) {
            if ($recurso->file_path) Storage::disk('public')->delete($recurso->file_path);
            $data['file_path'] = $request->file('protocol_file')->store('protocolos', 'public');
        }

        unset($data['image_file'], $data['protocol_file']);
        $data['is_active'] = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);
        $data['sort_order'] = (int) $request->input('sort_order', 0);

        $recurso->update($data);
        return response()->json($recurso->fresh());
    }

    /** DELETE /admin/recursos/{recurso} */
    public function destroy(RecursoProtocolo $recurso)
    {
        if ($recurso->image_path) Storage::disk('public')->delete($recurso->image_path);
        if ($recurso->file_path)  Storage::disk('public')->delete($recurso->file_path);
        $recurso->delete();
        return response()->json(['ok' => true]);
    }

    /** GET /protocolos/{recurso}/descargar — auth-protected download */
    public function download(RecursoProtocolo $recurso)
    {
        abort_if(
            $recurso->item_type !== 'protocolo' || !$recurso->is_active || !$recurso->file_path,
            404
        );
        return Storage::disk('public')->download($recurso->file_path, $recurso->title . '.pdf');
    }
}
