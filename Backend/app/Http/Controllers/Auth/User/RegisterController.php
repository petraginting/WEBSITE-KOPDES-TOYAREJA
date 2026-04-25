<?php

namespace App\Http\Controllers\Auth\User;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\OtpCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    private function formatNomorHp($nomor)
    {
        // 1. Hilangkan karakter selain angka (spasi, strip, dll)
        $nomor = preg_replace('/[^0-9]/', '', $nomor);

        // 2. Jika nomor diawali '08', ubah menjadi '628'
        if (strpos($nomor, '0') === 0) {
            $nomor = '62' . substr($nomor, 1);
        } 
        // 3. Jika nomor diawali '+62', ubah menjadi '62'
        elseif (strpos($nomor, '62') !== 0) {
            // Jika tidak diawali 0 atau 62 (misal langsung 812), tambahkan 62
            $nomor = '62' . $nomor;
        }

        return $nomor;
    }

    public function sendOtpRegister(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string',
            'no_hp' => 'required|unique:users,no_hp',
            'password' => 'required|min:8',
            'jenis_kelamin' => 'required|in:laki-laki,perempuan'
        ]);

        $no_hp = $this->formatNomorHp($request->no_hp);
        $otp = rand(100000, 999999);

        // Simpan data pendaftaran sementara di Cache (berlaku 10 menit)
        // Gunakan no_hp sebagai kunci unik
        Cache::put('reg_' . $request->no_hp, [
            'data' => $request->all(),
            'otp' => $otp
        ], now()->addMinutes(10));

        // Logika untuk mengirim OTP ke database
        OtpCode::updateOrCreate(
            ['no_hp' => $no_hp],
            ['otp_code' => $otp, 'valid_until' => now()->addMinutes(5)]
        );

        // Kirim OTP via API Fonnte ke WhatsApp
        $response = Http::withoutVerifying()->withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])->post('https://api.fonnte.com/send', [ 
            'target'  => $no_hp,
            'message' => "Kode OTP Koperasi Anda: $otp. Rahasiakan kode ini. Berlaku 5 menit.",
        ]);

    
        if ($response->successful()) {
            return response()->json([
                'success' => true,  
                'message' => 'OTP berhasil dikirim ke WhatsApp Anda.'
            ], 200);
        }

        return response()->json([
            'success' => false, 
            'message' => 'Gagal mengirim OTP. Silakan coba lagi.'
        ], 500);
    }

    public function register(Request $request)
    {
        
        $request->validate([
            'no_hp' => 'required',
            'otp_code' => 'required|digits:6'
        ]);

        $tempData = Cache::get('reg_' . $request->no_hp);

        $no_hp = $this->formatNomorHp($request->no_hp);    
        $otpRecord = OtpCode::where('no_hp', $no_hp)
                            ->where('otp_code', $request->otp_code)
                            ->first();

        if (!$tempData) {
            return response()->json([
                'success' => false, 
                'message' => 'Data pendaftaran tidak ditemukan.'
            ], 422);
        }

        // Cek apakah OTP ditemukan
        if (!$otpRecord) {
            return response()->json(['message' => 'Kode OTP salah.'], 422);
        }

        // Cek apakah OTP sudah kadaluwarsa
        if (now()->gt($otpRecord->valid_until)) {
            return response()->json(['message' => 'Kode OTP sudah kadaluwarsa.'], 422);
        }


        $userData = $tempData['data'];

        DB::transaction(function () use ($userData) {
            // 1. Simpan ke tabel Users
            $user = User::create([
                'username' => $userData['no_hp'], // Gunakan no_hp sebagai username
                'no_hp' => $userData['no_hp'],
                'password' => Hash::make($userData['password']),
            ]);

            // 2. Simpan ke tabel Anggota
            $user->anggota()->create([
                'nama_lengkap' => $userData['nama_lengkap'],
                'jenis_kelamin' => $userData['jenis_kelamin'],
                'alamat' => $userData['alamat'] ?? '', // Jika alamat tidak wajib, bisa diisi dengan string kosong
            ]);
        });

        // tandaki user sudah verifikasi nomor HP (jika alurnya verifikasi akun)
        $user = User::where('no_hp', $request->no_hp)->first();
        if ($user) {
            $user->update(['no_hp_verified_at' => now()]);
        }

        // Hapus data pendaftaran sementara dan OTP setelah berhasil registrasi
        Cache::forget('reg_' . $request->no_hp);
        $otpRecord->delete();

        return response()->json([
                'success' => true, 
                'message' => 'Registrasi berhasil! Silakan login dengan NIK dan password Anda.'
            ], 201);
    }
}