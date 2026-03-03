<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo_incidente', ['acoso_sexual', 'bullying', 'abuso_autoridad', 'injusticia_academica']);
            $table->text('descripcion');
            $table->string('grupo')->nullable();
            $table->string('nombre_agresor')->nullable();
            $table->json('archivos')->nullable(); // Para almacenar rutas de archivos/imágenes
            $table->enum('estado', ['pendiente', 'en_revision', 'resuelto', 'rechazado'])->default('pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
