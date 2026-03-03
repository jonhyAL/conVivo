<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Cita;
use App\Models\Report;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Ensure relationships exist in User model before calling
        // Fallback to empty collections if relations not fully set up to prevent crash while dev
        $appointments = $user->citas ? $user->citas()->orderBy('created_at', 'desc')->get() : collect([]);
        $reports = $user->reports ? $user->reports()->orderBy('created_at', 'desc')->get() : collect([]);
        
        // Mock courses matching resources.blade.php categories
        $courses = [
            [
                'title' => 'Matemáticas: Álgebra',
                'description' => 'Guía completa de álgebra y ejercicios prácticos.',
                'progress' => 45,
                'color' => 'bg-blue-600', 
                'url' => route('resources')
            ],
            [
                'title' => 'Ciencias: Laboratorio',
                'description' => 'Simulaciones virtuales de física y química.',
                'progress' => 10,
                'color' => 'bg-cyan-600',
                'url' => route('resources')
            ],
            [
                'title' => 'Español: Redacción',
                'description' => 'Taller de escritura y ortografía.',
                'progress' => 60,
                'color' => 'bg-orange-600',
                'url' => route('resources')
            ]
        ];

        // Check if daily mood is logged (Check-in explicit)
        $hasMoodToday = \App\Models\DailyMood::where('user_id', $user->id)
            ->whereDate('created_at', today())
            ->exists();

        // Get mood data for chart (Last 7 days)
        // Combine DailyMood (1-5) and JournalEntry (mapped string->int)
        $startDate = now()->subDays(6)->startOfDay();

        $dailyMoods = \App\Models\DailyMood::where('user_id', $user->id)
            ->where('created_at', '>=', $startDate)
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->created_at->format('Y-m-d'),
                    'value' => $item->mood_level,
                    'source' => 'checkin'
                ];
            });

        $journalMoods = \App\Models\JournalEntry::where('user_id', $user->id)
            ->whereNotNull('mood')
            ->where('created_at', '>=', $startDate)
            ->get()
            ->map(function ($item) {
                // Map emojis and text to values (1-5)
                $moodMap = [
                    'feliz' => 5, 'bien' => 4, 'neutral' => 3, 'triste' => 2, 'enojado' => 1, 'ansioso' => 1,
                    '😊' => 5, '😎' => 5,
                    '🤔' => 3, '😴' => 3,
                    '😔' => 2,
                    '😡' => 1, '😰' => 1, '😭' => 1
                ];
                $val = isset($moodMap[$item->mood]) ? $moodMap[$item->mood] : 3;
                return [
                    'date' => $item->created_at->format('Y-m-d'),
                    'value' => $val,
                    'source' => 'journal'
                ];
            });

        // Merge and Average by Date
        $moodData = $dailyMoods->concat($journalMoods)
            ->groupBy('date')
            ->map(function ($group) {
                return [
                    'date' => \Carbon\Carbon::parse($group[0]['date'])->format('d/m'),
                    'value' => round($group->avg('value'), 1) // Round to 1 decimal
                ];
            })
            ->sortBy(function ($item, $key) {
                return \Carbon\Carbon::createFromFormat('d/m', $item['date'])->timestamp;
            })
            ->values();

        return view('dashboard', compact('user', 'appointments', 'reports', 'courses', 'hasMoodToday', 'moodData'));
    }

    public function storeMood(Request $request)
    {
        $request->validate([
            'mood' => 'required|integer|min:1|max:5',
        ]);

        // Prevent duplicates for today
        $exists = \App\Models\DailyMood::where('user_id', Auth::id())
            ->whereDate('created_at', today())
            ->exists();

        if (!$exists) {
            \App\Models\DailyMood::create([
                'user_id' => Auth::id(),
                'mood_level' => $request->mood,
            ]);
        }

        return redirect()->route('dashboard');
    }
}
