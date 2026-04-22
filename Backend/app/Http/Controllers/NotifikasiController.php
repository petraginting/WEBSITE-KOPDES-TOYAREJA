<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotifikasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Notifikasi::latest()->get();

        return response()->json([
            'success' => 'true',
            'message' => 'List Notifikasi',
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
        $validator = Validator::make($request->all(),[
            'judul' => 'required|string|max:150',
            'isi_pesanan' => 'required|string|max:500',
            'tipe_notifikasi' => 'required|in:info,warning,promo,system'

        ]);

        if ($validator->fails()) {
            
        return response()->json([
            'success' => false,
            'message' => 'Validation Error',
            'errors' => $validator->errors()
        ], 422);
            
        }

         $notifikasi = Notifikasi::create([
            'judul' => $request->judul,
            'isi_pesan' => $request->isi_pesan,
            'tipe_notifikasi' => $request->tipe_notifikasi
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Notifikasi berhasil dibuat',
            'data' => $notifikasi
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notifikasi $notifikasi)
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail Notifikasi',
            'data' => $notifikasi
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notifikasi $notifikasi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notifikasi $notifikasi)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'sometimes|string|max:150',
            'isi_pesan' => 'sometimes|string|max:500',
            'tipe_notifikasi' => 'sometimes|in:info,warning,promo,system'
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

         $notifikasi->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Notifikasi berhasil diupdate',
            'data' => $notifikasi
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notifikasi $notifikasi)
    {
        $notifikasi->delate();
        return response()->json([
            'success' => true,
            'message' => 'Notifikasi berhasil dihapus'
        ], 200); 
    }
}
