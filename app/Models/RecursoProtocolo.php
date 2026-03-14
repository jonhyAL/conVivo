<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecursoProtocolo extends Model
{
    protected $table = 'recursos_protocolos';

    protected $fillable = [
        'item_type',
        'protocol_type',
        'title',
        'description',
        'tag',
        'background_type',
        'background_value',
        'image_path',
        'icon_name',
        'file_path',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active'   => 'boolean',
        'sort_order'  => 'integer',
    ];
}
