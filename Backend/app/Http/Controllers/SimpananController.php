<?php

namespace App\Http\Controllers;

use App\Models\Simpanan;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Mime\Message;

class SimpananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Simpanan::latest()->get();

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
        $request->validate([
            'jenis_simpanan' => 'required|in:pokok,wajib,sukarela',
            'jumlah' => 'required|interger|min:1'
        ]);

        if ($request->jumlah !== 50000 && $request->jenis_simpanan === 'pokok') {
            return response()->json([
                'success' => false,
                'message' => 'Simpanan pokok minimal dan maksimal Rp50.000'
            ]);
        } 
        
        if ($request->jumlah !== 5000 && $request->jenis_simpanan === 'wajib') {
            return response()->json([
                'success' => false,
                'message' => 'Simpanan wajib minimal dan maksimal Rp5.000'
            ]);
        } 

        if ($request->jumlah < 5000 && $request->jenis_simpanan === 'sukarela') {
            return response()->json([
                'success' => false,
                'message' => 'Simpanan sukarela minimal Rp5.000'
            ]);
        }

        $user = Auth::user();

        



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
        $validator = Validator::make($request->all(), [
            'jenis_simpanan' => 'sometimes|string|max:100',
            'jumlah_transaksi' => 'sometimes|string|min:0'
        ]);

        if ($validator->fails()){ 
            return response()->json([
                'success' => false, 
                'message' => 'Validation Error', 
                'errors' => $validator->errors()
            ], 422);
        }

        $simpanan->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Data Berhasil Di Update',
            'data' => $simpanan
        ], 200);
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
