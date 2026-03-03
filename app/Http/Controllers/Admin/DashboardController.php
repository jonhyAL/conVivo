<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Report;
use App\Models\Especialista;
use App\Models\Cita;
use App\Models\SOSAlert;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch stats
        $stats = [
            'users_count' => User::count(),
            'new_users_today' => User::whereDate('created_at', today())->count(),
            'reports_count' => Report::count(),
            'reports_pending' => Report::where('estado', 'pendiente')->count(),
            'specialists_count' => Especialista::count(),
            'specialists_active' => Especialista::where('activo', true)->count(),
            'appointments_count' => Cita::count(),
            'appointments_confirmed' => Cita::where('estado', 'confirmada')->count(),
            // Citas hoy count (simple query if possible, or loaded with citas)
            'appointments_today' => Cita::whereHas('horario', function($q) {
                $q->whereDate('fecha', today());
            })->count()
        ];

        // Fetch recent SOS Alerts with user info
        $sosAlerts = SOSAlert::with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        // Data for Lists
        // Eager load moods and journals for calculation (optimizing N+1)
        $users = User::with(['familyMembers', 'dailyMoods', 'journalEntries'])
            ->latest()
            ->take(100)
            ->get(); 
        
        // Calculate Mood Stats
        $lowMoodUsersCount = 0;
        
        // Append mood score to users
        $users->each(function($user) use (&$lowMoodUsersCount) {
            $score = $user->getAverageMoodScore();
            $user->mood_score = $score;
            
            // Count if mood is low (e.g., below 2.5)
            if ($score !== null && $score < 2.5) {
                $lowMoodUsersCount++;
            }
        });

        // Add to stats
        $stats['users_low_mood'] = $lowMoodUsersCount;
        
        $reports = Report::latest()->take(50)->get();
        $specialists = Especialista::withCount('citas')->get();
        $appointments = Cita::with(['especialista', 'horario', 'user'])->latest()->take(50)->get();
        
        // Chart Data (Users last 7 days)
        $usersChart = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $usersChart[] = [
                'date' => $date->format('d/m'),
                'count' => User::whereDate('created_at', $date)->count()
            ];
        }

        return view('admin.dashboard', compact(
            'stats', 
            'sosAlerts', 
            'users', 
            'reports', 
            'specialists', 
            'appointments',
            'usersChart'
        ));
    }

    public function toggleAlertStatus(SOSAlert $sosAlert)
    {
        // Check current status using 'status' column (created as 'pending' in SOSController)
        // Toggle between 'pending' and 'resolved'
        $newStatus = ($sosAlert->status === 'resolved' || $sosAlert->status === 'resuelto') ? 'pending' : 'resolved';
        
        $sosAlert->status = $newStatus;
        $sosAlert->save();
        
        return response()->json([
            'success' => true, 
            'new_status' => $newStatus
        ]);
    }

    public function deleteAlert(SOSAlert $sosAlert)
    {
        $sosAlert->delete();
        return response()->json(['success' => true]);
    }
}
