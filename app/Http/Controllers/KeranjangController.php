<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KeranjangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Keranjang::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'List Keranjang ',
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
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Keranjang $keranjang)
    {
        return response()->json([
            'success' => true,
            'message' => 'Item dikeranjang berhasil ditampilkan',
            'data' => $keranjang
        ], 201);
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
        $validator = Validator::make($request->all(), [
            'kuantitas' => 'sometimes|integer|min:1|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $keranjang->update($request->only(['kuantitas']));

        return response()->json([
            'success' => true,
            'message' => 'Keranjang berhasil diupdate',
            'data' => $keranjang
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Keranjang $keranjang)
    {
        $keranjang->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item Keranjang berhasil dihapus'
        ], 200);
    }
}
