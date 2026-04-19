<?php

namespace App\Http\Controllers;

use App\Models\Detail_pesanan;
use App\Models\Pesanan;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DetailPesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Detail_pesanan::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'List Detail Pesanan',
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
        'pesanan_id' => 'required|exists:pesanans,id',
        'product_id' => 'required|exists:products,id',
        'jumlah' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $product = Product::findOrFail($validated['product_id']);

        // hitung subtotal
        $subtotal = $product->harga * $validated['jumlah'];

        $detail = Detail_pesanan::create([
            'pesanan_id' => $validated['pesanan_id'],
            'product_id' => $product->id,
            'jumlah' => $validated['jumlah'],
            'subtotal' => $subtotal
        ]);

        // update total harga pesanan
        $pesanan = Pesanan::findOrFail($validated['pesanan_id']);
        $pesanan->total_harga += $subtotal;
        $pesanan->save();

        return response()->json([
            'success' => true,
            'data' => $detail
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($pesanan_id)
    {
        $details = Detail_pesanan::with('product')
                    ->where('pesanan_id', $pesanan_id)
                    ->get();

        return response()->json([
            'success' => true,
            'data' => $details
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Detail_pesanan $detail_pesanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Detail_pesanan $detail_pesanan)
    {
        $validator = Validator::make($request->all(),[
            'kuantitas' => 'sometimes|integer|min:1|max:100',
            'satuan_harga' => 'sometimes|numeric|min:0'
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $detail_pesanan->update($request->only([
            'kuantitas',
            'satuan_harga'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Detail Pesanan Berhasil di Update ',
            'data' => $detail_pesanan
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $detail = Detail_pesanan::find($id);

        if (!$detail) {
            return response()->json([
                'success' => false,
                'message' => 'Item tidak ditemukan'
            ], 404);
        }

        // kurangi total pesanan
        $pesanan = $detail->pesanan;
        $pesanan->total_harga -= $detail->subtotal;
        $pesanan->save();

        $detail->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item berhasil dihapus'
        ]);
    }
}
