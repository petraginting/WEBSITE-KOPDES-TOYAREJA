<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OtpCode;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OtpController extends Controller
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

    public function sendOtpForgotPassword(Request $request)
    {
        $request->validate([
            'no_hp' => 'required'
        ]);

        $no_hp = $this->formatNomorHp($request->no_hp);

        // Cek apakah nomor HP sudah terdaftar
        if (!User::where('no_hp', $request->no_hp)->exists()) {
            return response()->json(['message' => 'Nomor HP tidak terdaftar.'], 404);
        }

        // Hapus OTP lama yang masih valid untuk nomor HP ini
        OtpCode::where('no_hp', $no_hp)->delete();

        // Generate kode OTP baru
        $otp_code = rand(100000, 999999);

        // Logika untuk mengirim OTP ke database
        OtpCode::updateOrCreate(
            ['no_hp' => $no_hp],
            ['otp_code' => $otp_code, 'valid_until' => now()->addMinutes(2)]
        );

        // Kirim OTP via API Fonnte ke WhatsApp
        $response = Http::withoutVerifying()->withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])->post('https://api.fonnte.com/send', [ 
            'target'  => $no_hp,
            'message' => "Kode OTP Koperasi Anda: $otp_code. Rahasiakan kode ini. Berlaku 2 menit.",
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

    public function verifyOtpForgotPassword(Request $request)
    {
        $request->validate([
            'no_hp' => 'required',
            'otp_code' => 'required|digits:6',
        ]);

        $no_hp = $this->formatNomorHp($request->no_hp);
        $otpRecord = OtpCode::where('no_hp', $no_hp)
                            ->where('otp_code', $request->otp_code)
                            ->first();

        // Cek apakah OTP ditemukan
        if (!$otpRecord) {
            return response()->json(['message' => 'Kode OTP salah.'], 422);
        }

        // Cek apakah OTP sudah kadaluwarsa
        if (now()->gt($otpRecord->valid_until)) {
            return response()->json(['message' => 'Kode OTP sudah kadaluwarsa.'], 422);
        }

        return response()->json([
            'success' => true,  
            'message' => 'Kode OTP berhasil diverifikasi.'
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'no_hp' => 'required',
            'new_password' => 'required|min:6',
        ]);

        $no_hp = $this->formatNomorHp($request->no_hp);

        // Update password pengguna
        $user = User::where('no_hp', $request->no_hp)->first();
        $user->update(['password' => Hash::make($request->new_password)]);

        // Hapus session OTP yang sudah diverifikasi dan OTP yang sudah digunakan
        OtpCode::where('no_hp', $no_hp)->delete();


        return response()->json([
            'success' => true,  
            'message' => 'Password berhasil diperbarui.'
        ], 200);
    }


    public function resendOtp(Request $request)
    {
        $request->validate([
            'no_hp' => 'required'
        ]);

        $no_hp = $this->formatNomorHp($request->no_hp);

        // Cek apakah nomor HP sudah terdaftar
        if (!User::where('no_hp', $request->no_hp)->exists()) {
            return response()->json(['message' => 'Nomor HP tidak terdaftar.'], 404);
        }

        // Hapus OTP lama yang masih valid untuk nomor HP ini
        OtpCode::where('no_hp', $no_hp)->delete();

        // Generate kode OTP baru
        $otp_code = rand(100000, 999999);

        // Logika untuk mengirim OTP ke database
        OtpCode::updateOrCreate(
            ['no_hp' => $no_hp],
            ['otp_code' => $otp_code, 'valid_until' => now()->addMinutes(2)]
        );

        // Kirim OTP via API Fonnte ke WhatsApp
        $response = Http::withoutVerifying()->withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])->post('https://api.fonnte.com/send', [ 
            'target'  => $no_hp,
            'message' => "Kode OTP Koperasi Anda: $otp_code. Rahasiakan kode ini. Berlaku 2 menit.",
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
}
