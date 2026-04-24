<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Laporan::latest()->get(); 

         return response()->json([
            'success' => true,
            'message' => 'List Laporan',
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
            'jenis_laporan' => 'required|string|max:100',
            'isi_laporan' => 'required|string|max:100'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $laporan = Laporan::create([
            'jenis_laporan' => $request->jenis_laporan,
            'isi_laporan' => $request->isi_laporan
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil dibuat',
            'data' => $laporan
        ], 201);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Laporan $laporan)
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail Laporan',
            'data' => $laporan 
            ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Laporan $laporan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Laporan $laporan)
    {
         $validator = Validator::make($request->all(),[
            'jenis_laporan' => 'required|string|max:100',
            'isi_laporan' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $laporan->update($request->only([
            'jenis_laporan',
            'isi_laporan'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Laporan Berhasil di UPDATE',
            'data' => $laporan
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laporan $laporan)
    {
        $laporan->delete();

        return response()->json([
            'success' => true, 
            'message' => 'Laporan Berhasil di Hapus'

        ], 200);
    }
}
