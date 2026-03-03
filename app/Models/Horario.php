<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    protected $fillable = [
        'especialista_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'disponible'
    ];

    protected $casts = [
        'fecha' => 'date',
        'disponible' => 'boolean',
    ];

    public function especialista()
    {
        return $this->belongsTo(Especialista::class);
    }

    public function cita()
    {
        return $this->hasOne(Cita::class);
    }
}
