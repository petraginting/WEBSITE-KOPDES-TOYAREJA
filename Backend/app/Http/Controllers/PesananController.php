<?php

namespace App\Http\Controllers;

use App\Models\Detail_pesanan;
use App\Models\Keranjang;
use App\Models\Pesanan;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function semuaPesananUser()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak, Anda bukan admin',
            ], 403);
        }

        $data = Pesanan::with(['details.product', 'user.anggota'])->latest()->get();

        return response()->json([
            'success'=>true,
            'message'=> 'List Pesanan',
            'data' => $data
        ], 200);
    }

    public function pesananUser()
    {
        $data = Pesanan::with([
                'details.product', 'user.anggota'
            ])->where('user_id', Auth::user()->id)->get();

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
    public function checkout(Request $request)
    {
        $request->validate([
            'keranjang_id' => 'required|array',
            'keranjang_id.*' => 'exists:keranjangs,id',
            'metode_pembayaran' => 'required|string|in:qris,cod',
            'alamat_pengiriman' => 'required|string|max:255',

            'bukti_pembayaran' => [
                'required_if:metode_pembayaran,qris',
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:2048'
            ]
        ]);

        return DB::transaction(function () use ($request) {
            $user = Auth::user();

            $items = Keranjang::whereIn('id', $request->keranjang_id)
                               ->where('user_id', $user->id)
                               ->get();
            
            if ($items->isEmpty()) {
                return response()->json(['message' => 'Barang belum dipilih'], 400);
            }

            // Cek apakah jumlah yang ditemukan sama dengan jumlah yang dikirim
            // Jika berbeda, berarti user mencoba mengakses ID keranjang milik orang lain
            if ($items->count() !== count($request->keranjang_id)) {
                return response()->json(['message' => 'Akses ditolak atau data tidak valid'], 403);
            }

            // Logika upload file (Hanya jalan jika ada file yang dikirim)
            $path = null;
            
            if ($request->hasFile('bukti_pembayaran')) {
                $file = $request->file('bukti_pembayaran');
                $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('bukti_pembayaran', $filename, 'public');
            }

            // Hitung Total Harga
            $totalHarga = $items->sum(function($item) {
                return $item->product->harga * $item->kuantitas;
            });

            
            // Tambah poin setiap kelipatan Rp50.000
            if ($totalHarga >= 50000) {
                $tambahPoin = floor($totalHarga / 50000);
                $user->anggota->increment('poin', $tambahPoin);
            }

            // Simpan Pesanan (Header)
            $pesanan = Pesanan::create([
                'user_id'           => $user->id,
                'total_harga'       => $totalHarga,
                'metode_pembayaran' => $request->metode_pembayaran,
                'bukti_pembayaran'  => $path, // Simpan path gambar
                'status_pesanan'    => ($request->metode_pembayaran === 'cod') ? 'diproses' : 'pending',
                'alamat_pengiriman' => $request->alamat_pengiriman
            ]);

            // 6. Simpan Detail Pesanan
            foreach ($items as $item) {
                Detail_pesanan::create([
                    'pesanan_id' => $pesanan->id,
                    'product_id'  => $item->product_id,
                    'jumlah'      => $item->kuantitas,
                    'harga_satuan'=> $item->product->harga,
                    'subtotal'    => $item->product->harga * $item->kuantitas
                ]);

                // Update Stok Produk
                $product = Product::find($item->product_id);
                if ($product->stok < $item->kuantitas) {
                    // Jika stok tidak mencukupi, rollback transaksi dan kembalikan error
                    throw new \Exception("Stok produk '{$product->nama_produk}' tidak mencukupi.");
                }
                $product->decrement('stok', $item->kuantitas);

                // Hapus Item dari Keranjang
                $item->delete();
            }

            return response()->json([
                'success' => true,
                'message' => 'Pesanan berhasil dibuat',
                'data' => $pesanan->load('details.product')
            ], 201);

        });

        
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $pesanan = Pesanan::with(['details.product', 'user.anggota'])->find($id);

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
   public function updateStatus(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak'
            ], 403);
        }

        $pesanan = Pesanan::findOrFail($id);

        $request->validate([
            'status_pesanan' => 'required|in:pending,diproses,selesai,dibatalkan'
        ]);

        $pesanan->update([
            'status_pesanan' => $request->status_pesanan
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status pesanan diperbarui',
            'data' => $pesanan
         ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pesanan = Pesanan::findOrFail($id);

        if ($pesanan->status_pesanan === 'selesai') {
            $pesanan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pesanan dihapus'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Pesanan tidak dapat dihapus'
        ]);
    }
}
