<?php

namespace App\Http\Controllers;

use App\Models\ProfileKopdes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
    public function updateDataProfile(Request $request)
    {
        // Validasi input
        $data = $request->validate([
            'nama_koperasi' => 'sometimes|string',
            'singkatan' => 'nullable|string',
            'email' => 'nullable|email',
            'slogan' => 'nullable|string',
            'status' => 'nullable|in:aktif,non-aktif',
            'tanggal_berdiri' => 'nullable|string',
            'no_badan_hukum' => 'nullable|string',
            'ketua_koperasi' => 'nullable|string',
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string',
            'no_wa' => 'nullable|string',
            'sosmed' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'logo' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $profile = ProfileKopdes::firstOrCreate(['id' => 1]);

        if ($request->hasFile('logo')) {
            if ($profile->logo) {
                Storage::disk('public')->delete($profile->logo);
            }

            $data['logo'] =  $request->file('logo')->store('logo_koperasi', 'public');
        }

        // 🔥 ini penting: update manual, bukan mass blind
        foreach ($data as $key => $value) {
            $profile->$key = $value;
        }

        $profile->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil koperasi berhasil diperbarui',
            'data' => $profile
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProfileKopdes $profileKopdes)
    {
        //
    }
}
