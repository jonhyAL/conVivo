<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Admin\EspecialistaController;
use App\Http\Controllers\Admin\HorarioController;
use App\Http\Controllers\Admin\RecursoProtocoloController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;

// Public Pages
Route::view('/nosotros', 'public.about')->name('public.about');
Route::view('/servicios', 'public.services')->name('public.services');
Route::view('/contacto', 'public.contact')->name('public.contact');
Route::post('/contacto/enviar', [App\Http\Controllers\ContactController::class, 'store'])->name('contacts.store');

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

// Rutas de reportes
Route::get('/reportes', [ReportController::class, 'index'])->name('reports.create');
Route::post('/reportes', [ReportController::class, 'store'])->name('reports.store');

// Ruta de recursos y protocolos

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::post('/contacts/{id}/toggle-read', [App\Http\Controllers\ContactController::class, 'toggleRead'])->name('contacts.toggle');
    Route::delete('/contacts/{id}', [App\Http\Controllers\ContactController::class, 'destroy'])->name('contacts.destroy');
});

// Rutas de citas/consultas (protegidas por auth)
Route::middleware('auth')->prefix('citas')->name('appointments.')->group(function () {
    Route::get('/agendar', [AppointmentController::class, 'selectType'])->name('select-type');
    Route::post('/calendario', [AppointmentController::class, 'showCalendar'])->name('calendar');
    Route::post('/seleccionar-horario', [AppointmentController::class, 'selectTime'])->name('select-time');
    Route::post('/confirmar', [AppointmentController::class, 'submitPersonalInfo'])->name('personal-info');
});

// Rutas de autenticación
Route::middleware('guest')->group(function () {
    // Login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
    
    // Register
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [RegisterController::class, 'register']);
    
    // OAuth
    Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirectToProvider'])->name('socialite.redirect');
    Route::get('/auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback'])->name('socialite.callback');
});

// Rutas protegidas
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/mood', [DashboardController::class, 'storeMood'])->name('dashboard.mood');

    // Recursos y protocolos (Inertia SPA)
    Route::get('/recursos-protocolos', function () {
        $recursos   = \App\Models\RecursoProtocolo::where('item_type', 'recurso')
            ->where('is_active', true)->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
        $protocolos = \App\Models\RecursoProtocolo::where('item_type', 'protocolo')
            ->where('is_active', true)->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
        return \Inertia\Inertia::render('Resources', [
            'user'       => auth()->user(),
            'recursos'   => $recursos->values()->toArray(),
            'protocolos' => $protocolos->values()->toArray(),
        ]);
    })->name('resources');

    // Rutas de Perfil
    Route::prefix('perfil')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('index');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password');
        Route::post('/photo', [ProfileController::class, 'updatePhoto'])->name('photo');
        
        // Family Members
        Route::post('/family', [ProfileController::class, 'storeFamilyMember'])->name('family.store');
        Route::put('/family/{id}', [ProfileController::class, 'updateFamilyMember'])->name('family.update');
        Route::delete('/family/{id}', [ProfileController::class, 'deleteFamilyMember'])->name('family.delete');
    });
    
    // Diario Personal
    // Protocol file download (auth-protected)
    Route::get('/protocolos/{recurso}/descargar', [RecursoProtocoloController::class, 'download'])->name('protocolo.download');

    Route::prefix('diario')->name('journal.')->group(function () {
        Route::get('/', [\App\Http\Controllers\JournalController::class, 'index'])->name('index');
        Route::post('/', [\App\Http\Controllers\JournalController::class, 'store'])->name('store');
        Route::get('/{id}', [\App\Http\Controllers\JournalController::class, 'show'])->name('show');
        Route::put('/{id}', [\App\Http\Controllers\JournalController::class, 'update'])->name('update');
        Route::delete('/{id}', [\App\Http\Controllers\JournalController::class, 'destroy'])->name('destroy');
    });

    // Ruta SOS / Pánico (Discreto)
    Route::get('/system-check', function () {
        return view('panic.safe');
    })->name('sos.safe');
    Route::post('/system-check/alert', [App\Http\Controllers\SOSController::class, 'store'])->name('sos.store');
    
    // Rutas de Chat
    Route::prefix('chat')->name('chat.')->group(function () {
        Route::get('/conversations', [\App\Http\Controllers\ChatController::class, 'getConversations'])->name('conversations');
        Route::get('/messages/{userId}', [\App\Http\Controllers\ChatController::class, 'getMessages'])->name('messages');
        Route::post('/messages', [\App\Http\Controllers\ChatController::class, 'sendMessage'])->name('send');
    });
});

// Rutas de administrador
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // CRUD de especialistas
    Route::resource('especialistas', EspecialistaController::class);
    
    // Gestión de horarios
    Route::get('/especialistas/{especialista}/horarios', [HorarioController::class, 'index']);
    Route::post('/horarios', [HorarioController::class, 'store']);
    Route::delete('/horarios/{horario}', [HorarioController::class, 'destroy']);
    
    // Gestión de usuarios
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->except(['create', 'show', 'edit', 'index']);
    
    // SOS Alerts
    Route::put('/sos/{sosAlert}/status', [\App\Http\Controllers\Admin\DashboardController::class, 'toggleAlertStatus']);
    Route::delete('/sos/{sosAlert}', [\App\Http\Controllers\Admin\DashboardController::class, 'deleteAlert']);

    // Gestión de reportes
    Route::get('/reportes/{report}', [ReportController::class, 'show']);
    Route::put('/reportes/{report}/estado', [ReportController::class, 'updateStatus']);

    // Recursos y protocolos CRUD
    Route::apiResource('recursos', RecursoProtocoloController::class)
        ->parameters(['recursos' => 'recurso']);
});
