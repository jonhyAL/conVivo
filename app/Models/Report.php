<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'user_id',
        'tipo_incidente',
        'descripcion',
        'grupo',
        'nombre_agresor',
        'archivos',
        'estado'
    ];

    protected $casts = [
        'archivos' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
