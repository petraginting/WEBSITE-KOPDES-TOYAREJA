 <?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SimpananController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\DetailPesananController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController as AuthOtpController;
use App\Http\Controllers\Auth\User\RegisterController;

// Auth user (default Laravel)
Route::get('/user', function (Request $request) {
    return   $request->user();
})->middleware('auth:sanctum');



// Product
Route::apiResource('products', ProductController::class);

// Pesanan & detail (optional public kalau mau)
Route::apiResource('pesanan', PesananController::class);

// Notifikasi & laporan
Route::apiResource('notifikasi', NotifikasiController::class);
Route::apiResource('laporan', LaporanController::class);

// Keranjang
Route::apiResource('keranjang', KeranjangController::class);

// Simpanan
Route::apiResource('simpanan', SimpananController::class);

// Auth (register)
Route::apiResource('anggota', AnggotaController::class);


Route::prefix('auth')->group(function () {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register/send-otp', [RegisterController::class, 'sendOtpRegister']);
    Route::post('/register/verify-otp', [RegisterController::class, 'register']);

    Route::post('forgot-password/update', [AuthOtpController::class, 'updatePassword']);
    Route::post('forgot-password/send-otp', [AuthOtpController::class, 'sendOtpForgotPassword']);
    Route::post('forgot-password/verify-otp', [AuthOtpController::class, 'verifyOtpForgotPassword']);
});



// Route::middleware(['auth:sanctum'])->group(function () {

//     // contoh: hanya admin/anggota login yang bisa akses
//     Route::apiResource('products', ProductController::class);
//     Route::apiResource('pesanan', PesananController::class);
//     Route::apiResource('keranjang', KeranjangController::class);
//     Route::apiResource('simpanan', SimpananController::class);
//     Route::apiResource('laporan', LaporanController::class);
//     Route::apiResource('notifikasi', NotifikasiController::class);
        // Route::apiResource('admin', AdminController::class);
        // Route::apiResource('anggota', AnggotaController::class);

// });