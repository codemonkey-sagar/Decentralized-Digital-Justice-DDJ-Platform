<?php

use Illuminate\Support\Facades\Route;
use Modules\Video\Http\Controllers\VideoController;

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

// Route::prefix('video')->group(function () {
//     Route::get('/', [VideoController::class, 'index'])->name('video.index');
//     Route::get('/create', [VideoController::class, 'create'])->name('video.create');
//     Route::post('/store', [VideoController::class, 'store'])->name('video.store');
//     Route::get('/{id}', [VideoController::class, 'show'])->name('video.show');
// });


Route::group(['middleware' => ['web']], function () {
    Route::prefix('video')->group(function () {
        Route::get('/', [VideoController::class, 'index'])->name('video.index');
        Route::get('/create', [VideoController::class, 'create'])->name('video.create');
        Route::post('/store', [VideoController::class, 'store'])->name('video.store');
        Route::post('/storehash', [VideoController::class, 'storehash'])->name('video.storehash');
        Route::get('/{id}', [VideoController::class, 'show'])->name('video.show');
    });
});
