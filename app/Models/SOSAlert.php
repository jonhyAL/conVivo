<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SOSAlert extends Model
{
    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'ip_address',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
