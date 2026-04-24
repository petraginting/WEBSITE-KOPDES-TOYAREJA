<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KeranjangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'List Keranjang ',
            'data' => Auth::user()->keranjang
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
<<<<<<< Updated upstream
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'kuantitas' => 'required|integer|min:1|max:1000'
        ]);

        $user = Auth::user();
        $productId = $request->product_id;
        $kuantitas = $request->kuantitas;

        // Cek stok produk terlebih dahulu
        $product = Product::find($productId);
        if ($product->stok < $kuantitas) {
            return response()->json(['message' => 'Stok tidak mencukupi'], 400);
        }

        // Cek apakah produk sudah ada di keranjang user tersebut
        $keranjang = Keranjang::where('user_id', $user->id)
                              ->where('product_id', $productId)
                              ->first();

        if ($keranjang) {
            // Jika sudah ada, update kuantitasnya
            $keranjang->kuantitas += $kuantitas;
            $keranjang->save();
        } else {
            // Jika belum ada, buat data baru di keranjang
            Keranjang::create([
                'user_id' => $user->id,
                'product_id' => $productId,
                'kuantitas' => $kuantitas
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan ke keranjang',
=======
        $validator =Validator::make($request->sll(),[
            'kuantitas' => 'required|integer|min:1|max:1000'
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'success' => false, 
                'message' => 'Validation Errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $keranjang = Keranjang::create([
            'kuantitas' => $request->kuantitas
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Item berhasil ditambahkan ke keranjang',
            'data' => $keranjang
>>>>>>> Stashed changes
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Keranjang $keranjang)
    {
<<<<<<< Updated upstream
        
=======
        return response()->json([
            'success' => true,
            'message' => 'Item dikeranjang berhasil ditampilkan',
            'data' => $keranjang
        ], 201);
>>>>>>> Stashed changes
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Keranjang $keranjang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Keranjang $keranjang)
    {
<<<<<<< Updated upstream
        $request->validate([
            'kuantitas' => 'required|integer|min:1|max:1000'
        ]);

        // Pastikan item keranjang yang akan diupdate milik user yang sedang login
        if ($keranjang->user_id !== Auth::id()) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk mengupdate item ini'], 403);
        }

        // Cek stok produk terlebih dahulu
        $product = Product::find($keranjang->product_id);
        if ($product->stok < $request->kuantitas) {
            return response()->json(['message' => 'Stok tidak mencukupi'], 400);
        }

        // jika user ingin mengurangkan kuantitas, pastikan tidak boleh kurang dari 0 yang ada di keranjang
        if ($request->kuantitas < 0) {
            return response()->json(['message' => 'Kuantitas tidak boleh negatif'], 400);
=======
        $validator = Validator::make($request->all(), [
            'kuantitas' => 'sometimes|integer|min:1|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
>>>>>>> Stashed changes
        }

        $keranjang->update($request->only(['kuantitas']));

        return response()->json([
            'success' => true,
<<<<<<< Updated upstream
            'message' => 'Kuantitas berhasil diupdate',
=======
            'message' => 'Keranjang berhasil diupdate',
>>>>>>> Stashed changes
            'data' => $keranjang
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Keranjang $keranjang)
    {
<<<<<<< Updated upstream
        $user = Auth::user();

        // Pastikan item keranjang yang akan dihapus milik user yang sedang login
        if ($keranjang->user_id !== $user->id) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk menghapus item ini'], 403);
        }

=======
>>>>>>> Stashed changes
        $keranjang->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item Keranjang berhasil dihapus'
        ], 200);
    }
}
