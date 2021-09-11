<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CrateController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RarityController;
use App\Http\Controllers\MintController;
use App\Http\Controllers\LoginHistoryController;

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
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
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
    Route::post('/equipment/switch/{equipment}', [EquipmentController::class, 'switch'])->name('equipment.switch');
    Route::post('/wallet/connect', [WalletController::class, 'connect'])->name('wallet.connect');
});

Route::group([
    'middleware' => ['jwt.verify', 'role:admin'],
    'prefix' => 'admin',    
], function() {
    Route::apiResource('crates', Cratecontroller::class);
    Route::apiResource('equipment', EquipmentController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class)->only(['index']);
    Route::apiResource('rarities', RarityController::class)->only(['index']);
    Route::post('/mint', [MintController::class, 'mint'])->name('mint');
    Route::get('/token/{id}', [MintController::class, 'getTokenInfo'])->name('token.info');
    Route::get('/usercount', [UserController::class, 'count'])->name('user.count');
    Route::get('/cratecount', [CrateController::class, 'count'])->name('crate.count');
    Route::get('/objectcount', [EquipmentController::class, 'count'])->name('equipment.count');
    Route::get('/logincount', [LoginHistoryController::class, 'count'])->name('login.count');
});

Route::any('{any}', function(){
    return response()->json([
    	'status' => 'error',
        'message' => 'Resource not found'], 404);
})->where('any', '.*');;
