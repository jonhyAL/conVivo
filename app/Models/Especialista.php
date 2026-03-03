<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Especialista extends Model
{
    protected $fillable = [
        'nombre',
        'especialidad',
        'descripcion',
        'foto',
        'localidad',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function horarios()
    {
        return $this->hasMany(Horario::class);
    }

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    public function horariosDisponibles()
    {
        return $this->hasMany(Horario::class)->where('disponible', true);
    }
}
