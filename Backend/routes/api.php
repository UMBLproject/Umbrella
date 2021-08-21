<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login'])->name('login');

// Route::group([
//     'middleware' => ['jwt.verify', 'role:admin'],
//     'prefix' => 'admin',    
// ], function() {
//     Route::apiResource('locations', LocationController::class);
//     Route::apiResource('users', UserController::class);
//     Route::apiResource('groups', GroupController::class);
// });

Route::any('{any}', function(){
    return response()->json([
    	'status' => 'error',
        'message' => 'Resource not found'], 404);
})->where('any', '.*');;
