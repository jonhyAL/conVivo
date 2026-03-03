<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cita;
use App\Models\Especialista;
use App\Models\Horario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    // Paso 1: Mostrar tipos de consulta
    public function selectType()
    {
        return view('appointments.select-type');
    }

    // Paso 2: Mostrar calendario y horarios disponibles
    public function showCalendar(Request $request)
    {
        $request->validate([
            'tipo_consulta' => 'required|string',
            'descripcion' => 'required|string',
            'localidad' => 'required|in:Nezahualcóyotl,Puebla'
        ]);

        // Guardar datos en sesión
        session([
            'appointment' => [
                'tipo_consulta' => $request->tipo_consulta,
                'descripcion' => $request->descripcion,
                'localidad' => $request->localidad
            ]
        ]);

        // Obtener especialistas según el tipo de consulta y localidad
        $especialistas = Especialista::where('especialidad', $request->tipo_consulta)
            ->where('localidad', $request->localidad)
            ->where('activo', true)
            ->with(['horariosDisponibles' => function($query) {
                $query->where('fecha', '>=', now()->format('Y-m-d'))
                      ->orderBy('fecha')
                      ->orderBy('hora_inicio');
            }])
            ->get();

        return view('appointments.calendar', compact('especialistas'));
    }

    // Paso 3: Guardar selección de horario y mostrar formulario personal
    public function selectTime(Request $request)
    {
        $request->validate([
            'horario_id' => 'required|exists:horarios,id',
            'especialista_id' => 'required|exists:especialistas,id'
        ]);

        $horario = Horario::with('especialista')->findOrFail($request->horario_id);
        
        // Verificar que el horario esté disponible
        if (!$horario->disponible) {
            return back()->with('error', 'Este horario ya no está disponible');
        }

        // Actualizar sesión
        $appointment = session('appointment', []);
        $appointment['horario_id'] = $request->horario_id;
        $appointment['especialista_id'] = $request->especialista_id;
        session(['appointment' => $appointment]);

        return view('appointments.personal-info', compact('horario'));
    }

    // Paso 3: Guardar información personal y crear cita (gratuita)
    public function submitPersonalInfo(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email',
            'telefono' => 'required|string'
        ]);

        $appointment = session('appointment');
        
        if (!$appointment) {
            return redirect()->route('appointments.select-type')
                ->with('error', 'Sesión expirada, por favor inicia nuevamente');
        }

        // Validar que tengamos todos los datos necesarios
        $requiredFields = ['tipo_consulta', 'descripcion', 'localidad', 'horario_id', 'especialista_id'];
        foreach ($requiredFields as $field) {
            if (!isset($appointment[$field])) {
                return redirect()->route('appointments.select-type')
                    ->with('error', 'Faltan datos necesarios. Por favor inicia el proceso nuevamente.');
            }
        }

        DB::beginTransaction();
        try {
            // Crear la cita (gratuita)
            $cita = Cita::create([
                'especialista_id' => $appointment['especialista_id'],
                'horario_id' => $appointment['horario_id'],
                'user_id' => auth()->id(),
                'nombre_cliente' => $request->nombre,
                'email_cliente' => $request->email,
                'telefono_cliente' => $request->telefono,
                'tipo_consulta' => $appointment['tipo_consulta'],
                'descripcion_problema' => $appointment['descripcion'],
                'localidad' => $appointment['localidad'],
                'metodo_pago' => 'gratuito',
                'monto' => 0.00,
                'estado_pago' => 'no_requerido',
                'estado' => 'confirmada'
            ]);

            // Marcar el horario como no disponible
            Horario::where('id', $appointment['horario_id'])->update(['disponible' => false]);

            DB::commit();

            // Limpiar sesión
            session()->forget('appointment');

            // Aquí se enviaría el correo de confirmación
            // Mail::to($cita->email_cliente)->send(new AppointmentConfirmation($cita));

            return view('appointments.success', compact('cita'));

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Hubo un error al procesar tu cita: ' . $e->getMessage());
        }
    }
}
