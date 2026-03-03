<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\View::share('date', date('Y'));
        
        Gate::define('admin', function ($user) {
            return $user->email === 'leamsi.osoris@gmail.com'; // Or generic admin check
        });
    }
}
