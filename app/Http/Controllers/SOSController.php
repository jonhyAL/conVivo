<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SOSController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        \App\Models\SOSAlert::create([
            'user_id' => \Illuminate\Support\Facades\Auth::id(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'ip_address' => $request->ip(),
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Alerta recibida'], 200);
    }
}
