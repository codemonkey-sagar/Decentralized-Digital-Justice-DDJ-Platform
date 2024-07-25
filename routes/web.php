<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobListingController;
use App\Http\Controllers\ProposalController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('index');
// });

Route::prefix('')->group(function () {
    Route::get('', [HomeController::class, 'index']);
});
Route::get('/proposal/create', [ProposalController::class, 'create'])->name('proposal.create');
Route::post('/proposal/store', [ProposalController::class, 'store'])->name('proposal.store');


Route::resource('job_listings', JobListingController::class);
Route::get('/joblisting/create', [JobListingController::class, 'create'])->name('job_listings.index');
Route::post('/joblisting/store', [JobListingController::class, 'store'])->name('job_listings.store');
