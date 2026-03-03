<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Cita extends Model
{
    protected $fillable = [
        'especialista_id',
        'horario_id',
        'user_id',
        'nombre_cliente',
        'email_cliente',
        'telefono_cliente',
        'tipo_consulta',
        'descripcion_problema',
        'localidad',
        'metodo_pago',
        'monto',
        'estado_pago',
        'transaction_id',
        'estado'
    ];

    protected $casts = [
        'monto' => 'decimal:2',
    ];

    public function especialista()
    {
        return $this->belongsTo(Especialista::class);
    }

    public function horario()
    {
        return $this->belongsTo(Horario::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted()
    {
        static::created(function ($cita) {
            // Marcar horario como no disponible
            $cita->horario()->update(['disponible' => false]);
        });
    }
}
