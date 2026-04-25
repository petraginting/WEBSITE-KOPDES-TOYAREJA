<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AnggotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function semuaAnggota()
    {
        $data = Anggota::with('user')
                        ->whereHas('user', function($query) {
                            $query->where('role', 'anggota');
                        })
                        ->get();

        return response()->json([
            'success' => true,
            'message' => 'List Anggota',
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

    }

    /**
     * Display the specified resource.
     */
   public function show(Anggota $anggota)
    {
        // Cek apakah anggota ini memiliki role 'anggota' di tabel user
        if ($anggota->user->role !== 'anggota') {
            return response()->json([
                'success' => false,
                'message' => 'Data bukan merupakan anggota.'
            ], 403);
        }

        // Load relasi user agar ikut tampil dalam response
        $anggota->load('user');

        return response()->json([
            'success' => true,
            'message' => 'Detail anggota ditemukan',
            'data'    => $anggota
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Anggota $anggota)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDataAnggota(Request $request, Anggota $anggota)
    {
        $request->validate([
            'nama_lengkap'       => 'sometimes|string|max:255',
            'no_registrasi'      => 'sometimes|string|unique:anggotas,no_registrasi,' . $anggota->id,
            'nik'                => 'sometimes|string|size:16|unique:anggotas,nik,' . $anggota->id,
            'jenis_kelamin'      => 'sometimes|in:laki-laki,perempuan',
            'tanggal_lahir'      => 'sometimes|date',
            'alamat'             => 'sometimes|string',
            'pekerjaan'          => 'sometimes|string',
            'tanggal_bergabung'  => 'sometimes|date',
            'status_keanggotaan' => 'sometimes|in:aktif,tidak_aktif',
        ]);

        // Mengambil data yang hanya dikirim di request
        $dataUpdate = $request->only([
            'nama_lengkap', 'no_registrasi', 'nik', 'jenis_kelamin', 
            'tanggal_lahir', 'alamat', 'pekerjaan', 'tanggal_bergabung', 
            'status_keanggotaan'
        ]);

        // Proses simpan ke database
        $anggota->update($dataUpdate);

        return response()->json([
            'success' => true,
            'message' => 'Data anggota berhasil diperbarui',
            'data'    => $anggota->load('user')
        ], 200);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anggota $anggota)
    {
    
    }
}
