<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    public function index()
    {
        $entries = \App\Models\JournalEntry::where('user_id', \Illuminate\Support\Facades\Auth::id())
                                ->orderBy('created_at', 'desc')
                                ->get();
        return view('journal.index', compact('entries'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'mood' => 'nullable|string',
            'background' => 'nullable|string',
        ]);

        \App\Models\JournalEntry::create([
            'user_id' => \Illuminate\Support\Facades\Auth::id(),
            'title' => $request->title ?? 'Entrada del ' . now()->format('d/m/Y'),
            'content' => $request->content,
            'mood' => $request->mood,
            'background' => $request->background ?? 'default',
        ]);

        return redirect()->route('journal.index')->with('success', 'Entrada guardada correctamente.');
    }

    public function show($id)
    {
        $entry = \App\Models\JournalEntry::where('user_id', \Illuminate\Support\Facades\Auth::id())
                    ->findOrFail($id);
        
        $entries = \App\Models\JournalEntry::where('user_id', \Illuminate\Support\Facades\Auth::id())
                                ->orderBy('created_at', 'desc')
                                ->get();
                                
        return view('journal.index', compact('entries', 'entry'));
    }

    public function update(Request $request, $id)
    {
        $entry = \App\Models\JournalEntry::where('user_id', \Illuminate\Support\Facades\Auth::id())
                    ->findOrFail($id);

        $request->validate([
            'content' => 'required',
            'mood' => 'nullable|string',
            'background' => 'nullable|string',
        ]);

        $entry->update([
            'title' => $request->title ?? $entry->title,
            'content' => $request->content,
            'mood' => $request->mood,
            'background' => $request->background ?? $entry->background,
        ]);

        return redirect()->route('journal.index')->with('success', 'Entrada actualizada correctamente.');
    }

    public function destroy($id)
    {
        $entry = \App\Models\JournalEntry::where('user_id', \Illuminate\Support\Facades\Auth::id())
                    ->findOrFail($id);
        
        $entry->delete();

        return redirect()->route('journal.index')->with('success', 'Entrada eliminada correctamente.');
    }
}
