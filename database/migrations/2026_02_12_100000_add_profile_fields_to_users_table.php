<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('photo_path')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('location')->nullable();
            $table->boolean('location_enabled')->default(false);
        });
        
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('relationship'); // Padre, Madre, Hijo, etc.
            $table->string('phone_number');
            $table->boolean('is_primary_contact')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('family_members');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['photo_path', 'birthdate', 'phone_number', 'location', 'location_enabled']);
        });
    }
};
