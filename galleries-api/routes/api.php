<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\UserController;

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

Route::post('register', [AuthController::class, 'register'])->middleware('guest:api');
Route::post('login', [AuthController::class, 'login'])->middleware('guest:api');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::post('me', [AuthController::class, 'me'])->middleware('auth:api');
Route::post('refresh', [AuthController::class, 'refresh']);

Route::get('galleries/search', [GalleryController::class, 'search'])->middleware('auth:api');
Route::get('galleries/user/{id}/search', [GalleryController::class, 'searchUser'])->middleware('auth:api');
Route::get('galleries/user/{id}', [GalleryController::class, 'indexUser'])->middleware('auth:api');
Route::resource('galleries', GalleryController::class)->middleware('auth:api');

Route::get('user/{id}', [UserController::class, 'show'])->middleware('auth:api');
