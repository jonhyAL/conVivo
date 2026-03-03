<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyMood extends Model
{
    protected $fillable = ['user_id', 'mood_level'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
