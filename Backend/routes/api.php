<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CrateController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\WalletController;

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
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::group([
    'middleware' => ['jwt.verify', 'role:user'],
    'prefix' => 'user',  
], function() {
    Route::apiResource('lootbox', Cratecontroller::class)->only([
        'index', 'show'
    ]);
    Route::post('/lootbox/buy', [CrateController::class, 'buy'])->name('lootbox.buy');
    Route::apiResource('inventory', InventoryController::class)->only(['index', 'show']);
    Route::post('/wallet/connect', [WalletController::class, 'connect'])->name('wallet.connect');
});

Route::group([
    'middleware' => ['jwt.verify', 'role:admin'],
    'prefix' => 'admin',    
], function() {
    Route::apiResource('crates', Cratecontroller::class);
    Route::apiResource('equipment', EquipmentController::class);
});

Route::any('{any}', function(){
    return response()->json([
    	'status' => 'error',
        'message' => 'Resource not found'], 404);
})->where('any', '.*');;
