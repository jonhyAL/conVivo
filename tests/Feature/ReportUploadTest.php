<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Tests\TestCase;
use App\Models\User;
use App\Models\Report;

class ReportUploadTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        
        // Setup SQLite in-memory DB manually
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            // Add columns that might be needed by User model if accessed
            $table->string('avatar')->nullable();
            $table->boolean('is_admin')->default(false);
            $table->string('google_id')->nullable();
            $table->string('github_id')->nullable();
            $table->string('avatar_original')->nullable();
        });

        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->enum('tipo_incidente', ['acoso_sexual', 'bullying', 'abuso_autoridad', 'injusticia_academica', 'otro']);
            $table->text('descripcion');
            $table->string('grupo')->nullable();
            $table->string('nombre_agresor')->nullable();
            $table->json('archivos')->nullable(); 
            $table->enum('estado', ['pendiente', 'en_revision', 'resuelto', 'rechazado'])->default('pendiente');
            $table->timestamps();
        });
    }

    public function test_user_can_upload_multiple_files_in_report()
    {
        Storage::fake('public');

        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $file1 = UploadedFile::fake()->create('evidence1.jpg');
        $file2 = UploadedFile::fake()->create('evidence2.jpg');
        $file3 = UploadedFile::fake()->create('document.pdf');

        $response = $this->actingAs($user)->post(route('reports.store'), [
            'tipo_incidente' => 'bullying',
            'descripcion' => 'This is a test description longer than 10 chars',
            'archivos' => [
                $file1,
                $file2,
                $file3,
            ]
        ]);

        if ($response->status() !== 302) {
             // If validation fails, dump errors
             dump($response->exception);
             if(session('errors')) dump(session('errors')->all());
        }

        $response->assertRedirect(route('reports.create'));
        
        $report = Report::first();
        $this->assertNotNull($report, "Report was not created");
        
        // This is the CRITICAL assertion
        $this->assertCount(3, $report->archivos, "Expected 3 files, found: " . count($report->archivos ?? []));
    }
}
