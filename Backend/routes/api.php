 <?php

use App\Http\Controllers\AnggotaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SimpananController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController as AuthOtpController;
use App\Http\Controllers\Auth\User\RegisterController;
use App\Http\Controllers\ProfileKopdesController;

// Auth user (default Laravel)
Route::get('/user', function (Request $request) {
    return   $request->user();
})->middleware('auth:sanctum');



// Product
Route::apiResource('products', ProductController::class)->middleware('auth:sanctum');

// Admin
Route::prefix('admin')->group(function () {
    
    Route::get('/anggota', [AnggotaController::class, 'semuaAnggota'])->middleware('auth:sanctum');
    Route::get('/anggota/{anggota}', [AnggotaController::class, 'show'])->middleware('auth:sanctum');
    Route::put('/anggota/add', [AnggotaController::class, 'tambahAnggota'])->middleware('auth:sanctum');
    Route::put('/anggota/update/{anggota}', [AnggotaController::class, 'updateDataAnggota'])->middleware('auth:sanctum');
    

    Route::put('/profil-kopdes/update', [ProfileKopdesController::class, 'updateDataProfile'])->middleware('auth:sanctum');
    Route::get('/profil-kopdes', [ProfileKopdesController::class, 'index'])->middleware('auth:sanctum');


    Route::post('/products/add', [ProductController::class, 'store'])->middleware('auth:sanctum');
    Route::get('/forcast', [ProductController::class, 'getForcastingStok'])->middleware('auth:sanctum');
    Route::put('/products/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum');


    Route::get('/pesanan', [PesananController::class, 'semuaPesananUser'])->middleware('auth:sanctum');
    Route::put('/pesanan/update-status/{id}', [PesananController::class, 'updateStatus'])->middleware('auth:sanctum');

    // Notifikasi
    Route::prefix('notifikasi')->group(function () {
        Route::get('/', [NotifikasiController::class, 'index'])->middleware('auth:sanctum');
        Route::post('/add', [NotifikasiController::class, 'store'])->middleware('auth:sanctum');
        Route::put('/update/{notifikasi}', [NotifikasiController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('/delete/{notifikasi}', [NotifikasiController::class, 'destroy'])->middleware('auth:sanctum');
    });
});

// Pesanan & detail (optional public kalau mau)
Route::prefix('pesanan')->group(function () {
    Route::post('/checkout', [PesananController::class, 'checkout'])->middleware('auth:sanctum');
    Route::get('/{pesanan}', [PesananController::class, 'show'])->middleware('auth:sanctum');
    Route::get('/', [PesananController::class, 'pesananUser'])->middleware('auth:sanctum');
    Route::delete('/{pesanan}', [PesananController::class, 'destroy'])->middleware('auth:sanctum');
});


// Keranjang
Route::prefix('keranjang')->group(function () {
    Route::get('/', [KeranjangController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/add', [KeranjangController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{keranjang}', [KeranjangController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{keranjang}', [KeranjangController::class, 'destroy'])->middleware('auth:sanctum');
});

// Simpanan
Route::post('/simpanan/add', [SimpananController::class, 'store'])->middleware('auth:sanctum');
Route::put('/simpanan/{simpanan}', [SimpananController::class, 'update'])->middleware('auth:sanctum');
Route::get('/simpanan', [SimpananController::class, 'index'])->middleware('auth:sanctum');


// user
Route::get('/user', [AnggotaController::class, 'user'])->middleware('auth:sanctum');


Route::prefix('auth')->group(function () {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register/send-otp', [RegisterController::class, 'sendOtpRegister']);
    Route::post('/register/verify-otp', [RegisterController::class, 'register']);
    
    Route::post('/resend-otp', [AuthOtpController::class, 'resendOtp']);

    Route::post('/forgot-password/reset', [AuthOtpController::class, 'updatePassword']);
    Route::post('/forgot-password/send-otp', [AuthOtpController::class, 'sendOtpForgotPassword']);
    Route::post('/forgot-password/verify-otp', [AuthOtpController::class, 'verifyOtpForgotPassword']);

    // Protected routes (memerlukan token)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user-profile', [LoginController::class, 'getUserProfile']);
        Route::post('/logout', [LoginController::class, 'logout']);
    });
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