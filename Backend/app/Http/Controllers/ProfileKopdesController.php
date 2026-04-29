<?php

namespace App\Http\Controllers;

use App\Models\ProfileKopdes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileKopdesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!Auth::user()->role === 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak'
            ], 403);
        }

        $profile = ProfileKopdes::first();
        return response()->json([
            'success' => true,
            'data' => $profile
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProfileKopdes $profileKopdes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProfileKopdes $profileKopdes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Validasi input
        $data = $request->validate([
            'nama_koperasi' => 'required|string',
            'singkatan' => 'nullable|string',
            'email' => 'nullable|email',
            // tambahkan field lainnya...
        ]);

        // Paksa ID tetap 1 agar tidak pernah ada baris ke-2
        $profile = ProfileKopdes::updateOrCreate(
            ['id' => 1], 
            $data
        );

        return response()->json([
            'success' => true,
            'message' => 'Profil koperasi berhasil diperbarui',
            'data' => $profile
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProfileKopdes $profileKopdes)
    {
        //
    }
}
