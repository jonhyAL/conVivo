<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Modificar la columna metodo_pago para incluir 'gratuito'
        DB::statement("ALTER TABLE citas MODIFY COLUMN metodo_pago ENUM('tarjeta', 'paypal', 'sitio', 'gratuito') NOT NULL");
        
        // Modificar la columna estado_pago para incluir 'no_requerido'
        DB::statement("ALTER TABLE citas MODIFY COLUMN estado_pago ENUM('pendiente', 'pagado', 'cancelado', 'no_requerido') DEFAULT 'pendiente'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revertir los cambios
        DB::statement("ALTER TABLE citas MODIFY COLUMN metodo_pago ENUM('tarjeta', 'paypal', 'sitio') NOT NULL");
        DB::statement("ALTER TABLE citas MODIFY COLUMN estado_pago ENUM('pendiente', 'pagado', 'cancelado') DEFAULT 'pendiente'");
    }
};
