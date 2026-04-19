<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\Product;
use Illuminate\Auth\Events\Failed;
use Illuminate\Database\Query\Grammars\PostgresGrammar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Pesanan::latest()->get();

        return response()->json([
            'success'=>true,
            'message'=> 'List Pesanan',
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
            'metode_pembayaran' => 'required|string|max:50',
            'status_pesanan' => 'required|in:tunggu,proses,selesai,batal',
            'alamat_pengiriman' => 'required|string|max:255'
        ]);

        if ($validator->fails()){ 
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $pesanan = Pesanan::create([
            'metode_pembayaran' => $validated['metode_pembayaran'],
            'status_pesanan' => $validated['status_pesanan'],
            'alamat_pengiriman' => $validated['alamat_pengiriman'],
            'total_harga' => 0 // awal 0
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dibuat',
            'data' => $pesanan
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $pesanan = Pesanan::with('details.product')->find($id);

        if (!$pesanan) {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $pesanan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesanan $pesanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $id)
    {
        $pesanan = Pesanan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status_pesanan' => 'sometimes|in:tunggu,proses,selesai,batal',
            'alamat_pengiriman' => 'sometimes|string|max:255'
        ]);

        if ($validator->fails()){ 
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $pesanan->update($validated);

        return response()->json([
            'success' => true,
            'data' => $pesanan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pesanan = Pesanan::findOrFail($id);
        $pesanan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesanan dihapus'
        ]);
    }
}
