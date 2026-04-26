<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use App\Models\Simpanan;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Mime\Message;

class SimpananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Simpanan::with('user.anggota')->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Simpanan',
            'data' => $data
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $user = Auth::user();

        // if ($user->role !== 'admin') {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Akses ditolak'
        //     ], 403);
        // }

        $request->validate([
            'no_registrasi' => 'required|string|exists:anggotas,no_registrasi',
            'nama_lengkap' => 'required|string',
            'jumlah_pokok' => 'required|integer|min:0',
            'jumlah_wajib' => 'required|integer|min:0',
            'jumlah_sukarela' => 'required|integer|min:0'
        ]);

        if ($request->jumlah_pokok != 50000 && $request->jumlah_pokok != 0) {
            return response()->json([
                'success' => false,
                'message' => 'Simpanan pokok minimal dan maksimal Rp50.000'
            ], 422);
        } 
        
        if ($request->jumlah_wajib != 5000 && $request->jumlah_wajib != 0) {
            return response()->json([
                'success' => false,
                'message' => 'Simpanan wajib minimal dan maksimal Rp5.000'
            ], 422);
        } 

        if ($request->jumlah_sukarela < 5000 && $request->jumlah_sukarela != 0) {
            return response()->json([
                'success' => false,
                'message' => 'Simpanan sukarela minimal Rp5.000'
            ], 422);
        }

        $totalSimpanan = $request->jumlah_pokok + $request->jumlah_wajib + $request->jumlah_sukarela;

        $anggota = Anggota::where('no_registrasi', $request->no_registrasi)->first();

        if (!$anggota) {
            return response()->json([
                'success' => false,
                'message' => 'Anggota tidak terdaftar.'
            ], 404);
        } 

        return DB::transaction(function () use ($request, $totalSimpanan, $anggota) {
            $simpanan = Simpanan::create([
                'user_id' => $anggota->user_id,
                'nama_lengkap' => $request->nama_lengkap,
                'jumlah_pokok' => $request->jumlah_pokok,
                'jumlah_wajib' => $request->jumlah_wajib,
                'jumlah_sukarela' => $request->jumlah_sukarela,
                'total' => $totalSimpanan
            ]);

            $anggota->increment('total_simpanan', $totalSimpanan);

            return response()->json([
                'success' => true,
                'message' => "Simpanan anggota berhasil dibuat.",
                'data' => $simpanan
            ], 201);
        });

    }


    /**
     * Display the specified resource.
     */
    public function show(Simpanan $simpanan)
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail Simpanan',
            'data' => $simpanan
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Simpanan $simpanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Simpanan $simpanan)
    {
        $user = Auth::user();
        if ($user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak'
            ], 403);
        }

        // 2. Validasi (Sama dengan store untuk konsistensi nominal)
        $request->validate([
            'jumlah_pokok' => 'sometimes|integer|in:0,50000',
            'jumlah_wajib' => 'sometimes|integer|in:0,5000',
            'jumlah_sukarela' => 'sometimes|integer|min:0',
        ]);

        return DB::transaction(function () use ($request, $simpanan) {
            $oldTotal = $simpanan->total;

            // Update data simpanan
            $simpanan->fill($request->all());
            
            // Hitung total baru jika ada perubahan angka
            $simpanan->total = $simpanan->jumlah_pokok + $simpanan->jumlah_wajib + $simpanan->jumlah_sukarela;
            $simpanan->save();

            // 3. Sinkronisasi Saldo Anggota
            // Kurangi total lama, tambah total baru
            $anggota = Anggota::where('user_id', $simpanan->user_id)->first();
            if ($anggota) {
                $anggota->decrement('total_simpanan', $oldTotal);
                $anggota->increment('total_simpanan', $simpanan->total);
            }

            return response()->json([
                'success' => true,
                'message' => 'Data Berhasil Di Update dan Saldo Anggota Disinkronkan',
                'data' => $simpanan
            ], 200);
        });
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Simpanan $simpanan)
    {
        $simpanan->delete();

        return response()->json ([
            'success' => true,
            'message' => 'Data Berhasil di Hapus'
        ], 200);
    }
}
