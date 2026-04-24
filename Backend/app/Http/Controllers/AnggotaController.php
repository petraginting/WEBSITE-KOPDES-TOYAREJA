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
    public function index()
    {
        $data = Anggota::latest()->get();

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
         $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:anggotas,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

         $anggota = Anggota::create([
            'name' => $request->name,
            'email' => $request->email,
            // tetap hash walau ada cast
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Anggota berhasil dibuat',
            'data' => $anggota
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Anggota $anggota)
    {
        return response()->json([
            'success' => true,
            'message' => 'detail anggota',
            'data' => $anggota
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
    public function update(Request $request, Anggota $anggota)
    {
         $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:anggotas,email,' . $anggota->id,
            'password' => 'nullable|string|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }
         $data = $request->only(['name', 'email']);

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $anggota->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Anggota berhasil diupdate',
            'data' => $anggota
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anggota $anggota)
    {
        $anggota->delete();

        return response()->json([
            'success' => true,
            'message' => 'anggota berhasil dihapus'
        ], 200);
    }
}
