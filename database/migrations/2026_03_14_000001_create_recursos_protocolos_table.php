<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recursos_protocolos', function (Blueprint $table) {
            $table->id();
            $table->enum('item_type', ['recurso', 'protocolo']);
            $table->string('protocol_type')->nullable(); // seguridad, crisis, institucional, orientacion, proteccion, convivencia, acoso
            $table->string('title');
            $table->text('description');
            $table->string('tag')->default('Nuevo'); // Nuevo, Esencial, Recomendado, Popular, Activo, Vigente...
            $table->enum('background_type', ['color', 'image'])->default('color'); // for recursos
            $table->string('background_value')->nullable(); // gradient class string
            $table->string('image_path')->nullable(); // uploaded background image path
            $table->string('icon_name')->nullable(); // Lucide icon name, for color backgrounds
            $table->string('file_path')->nullable(); // uploaded protocol PDF path
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recursos_protocolos');
    }
};
