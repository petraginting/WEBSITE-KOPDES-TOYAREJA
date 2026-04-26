<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'list of products',
            'data' => $products
        ], 200);    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak, Anda bukan admin',
            ], 403);
        }
        
        $validator = Validator::make($request->all(), [
            'nama_produk' => 'required|string|max:255', 
            'unit' => 'required|string|max:50',
            'harga' => 'required|numeric|min:0',
            'kategori' => 'required|string|max:100', 
            'stok' => 'required|integer|min:0',
            'gambar' => 'nullable|url'
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ],422);
        }

        $product = Product::create([
            'nama_produk' => $request->nama_produk,
            'unit' => $request->unit,
            'harga' => $request->harga,
            'kategori' => $request->kategori,
            'stok' => $request->stok,
            'gambar' => $request->gambar
        ]); 

        return Response()->json([
            'success'=> true, 
            'message' => 'Product Created',
            'data' => $product
        ], 201);    
    }

    /**
     * Display the specified resource.
     */
    // SHOW PRODUCT LEK
    public function show($id)
    {
        $product = Product::find($id); 

        if(!$product) { 
            return response()->json([
                'success' => false, 
                'message' =>'Product Not Found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'detail pesanan berhasil diambil',
            'data' => $product
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak, Anda bukan admin',
            ], 403);
        }
        
        $product = Product::find($id);
        if(!$product) { 
            return response()->json([
                'success' => false,
                'message' => 'Product Not Found'
            ], 404); 
        }
        // VALIDASI
        $validator = Validator::make($request->all(), [
            'nama_produk' => 'sometimes|string|max:255',
            'unit' => 'sometimes|string|max:50',
            'harga' => 'sometimes|numeric|min:0',
            'kategori' => 'sometimes|string|max:100',
            'stok' => 'sometimes|integer|min:0',
            'gambar' => 'nullable|sometimes|url'
        ]);

        if($validator->fails()) { 
            return response()->json([
            'success' => false,
            'message' => $validator->errors()
            ], 422);
        }

        $data = $validator->validate();

        $product->update($data);

        return response()-> json([
            'success' => true,
            'message' => 'Product Update ',
            'data' => $product
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak, Anda bukan admin',
            ], 403);
        }

        $product = Product::find($product); 

        if (!$product) { 
            return response()-> json([
                'succes' => false,
                'message' => 'Product Not Found'
            ], 404);
        }
        $product ->delete();

        return response()->json([
            'success' => true, 
            'message' => 'Product Delete '
        ], 200);
    }
}
