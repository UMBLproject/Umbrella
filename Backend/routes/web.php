<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MintController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/metadata/{id}', [MintController::class, 'getMetadata'])->name('metadata');

Route::view('/{any}', 'index')->where('any', '.*');