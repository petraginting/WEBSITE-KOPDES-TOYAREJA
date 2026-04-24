<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NotifikasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Notifikasi::where('status', 'aktif')->where('tanggal_berlaku', '<', now())->update(['status' => 'expired']);

        $data = Notifikasi::latest()->get();

        return response()->json([
            'success' => true,
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
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak, Anda bukan admin',
            ], 403);
        }

        $validator = Validator::make($request->all(),[
            'tipe_notifikasi' => 'required|in:info,promo,produk',
            'target' => 'required|in:semua,aktif,anggota',
            'judul_notifikasi' => 'required|string|max:255',
            'isi_pesan' => 'required|string',
            'tanggal_berlaku' => 'required|date_format:Y-m-d H:i:s'
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);   
        }

        $tanggalBerlaku = Carbon::parse($request->tanggal_berlaku);
        $status = $tanggalBerlaku->isFuture() ? 'aktif' : 'expired';

        $notifikasi = Notifikasi::create([
            'tipe_notifikasi' => $request->tipe_notifikasi,
            'target' => $request->target,
            'judul_notifikasi' => $request->judul_notifikasi,
            'isi_pesan' => $request->isi_pesan,
            'tanggal_berlaku' => $request->tanggal_berlaku,
            'status' => $status
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

        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak, Anda bukan admin',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'tipe_notifikasi' => 'sometimes|in:info,promo,produk',
            'target' => 'sometimes|in:semua,aktif,anggota',
            'judul_notifikasi' => 'sometimes|string|max:255',
            'isi_pesanan' => 'sometimes|string',
            'tanggal_berlaku' => 'sometimes|date_format:Y-m-d H:i:s'
        ]);

        if ($validator->fails()) { 
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }


        // Ambil semua input
        $data = $request->all();

        // LOGIKA TAMBAHAN: Jika tanggal_berlaku ikut diupdate, hitung ulang statusnya
        if ($request->has('tanggal_berlaku')) {
            $tanggalBerlaku = \Carbon\Carbon::parse($request->tanggal_berlaku);
            $data['status'] = $tanggalBerlaku->isFuture() ? 'aktif' : 'expired';
        }

        $notifikasi->update($data);

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
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak, Anda bukan admin',
            ], 403);
        }

        $notifikasi->delate();
        return response()->json([
            'success' => true,
            'message' => 'Notifikasi berhasil dihapus'
        ], 200); 
    }
}
