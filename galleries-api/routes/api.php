<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('galleries/search', [GalleryController::class, 'search'])->middleware('api');
Route::get('galleries/search-user', [GalleryController::class, 'searchUser'])->middleware('api');
Route::get('galleries/user/{id}', [GalleryController::class, 'indexUser'])->middleware('api');
Route::resource('galleries', GalleryController::class)->middleware('api');

Route::get('user/{id}', [UserController::class, 'show'])->middleware('api');
