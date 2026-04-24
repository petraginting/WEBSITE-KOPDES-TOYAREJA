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
Route::apiResource('products', ProductController::class)->middleware('auth:sanctum');

// Pesanan & detail (optional public kalau mau)
Route::prefix('pesanan')->group(function () {
    Route::get('/', [PesananController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/checkout', [PesananController::class, 'checkout'])->middleware('auth:sanctum');
    Route::get('/{pesanan}', [PesananController::class, 'show'])->middleware('auth:sanctum');
    Route::delete('/{pesanan}', [PesananController::class, 'destroy'])->middleware('auth:sanctum');
    Route::put('/{pesanan}/update-status', [PesananController::class, 'updateStatus'])->middleware('auth:sanctum');
});

// Notifikasi
Route::prefix('notifikasi')->group(function () {
    Route::get('/', [NotifikasiController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/add', [NotifikasiController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/update/{notifikasi}', [NotifikasiController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/delete/{notifikasi}', [NotifikasiController::class, 'destroy'])->middleware('auth:sanctum');
});

// Keranjang
Route::prefix('keranjang')->group(function () {
    Route::get('/', [KeranjangController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/add', [KeranjangController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{keranjang}', [KeranjangController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{keranjang}', [KeranjangController::class, 'destroy'])->middleware('auth:sanctum');
});

// Simpanan
Route::apiResource('simpanan', SimpananController::class);

// Auth (register)
Route::apiResource('anggota', AnggotaController::class);


Route::prefix('auth')->group(function () {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register/send-otp', [RegisterController::class, 'sendOtpRegister']);
    Route::post('/register/verify-otp', [RegisterController::class, 'register']);

    Route::post('forgot-password/reset', [AuthOtpController::class, 'updatePassword']);
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