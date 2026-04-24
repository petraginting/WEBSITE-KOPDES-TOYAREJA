<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail_pesanan extends Model
{
    protected $fillable = [
        'pesanan_id',
        'product_id',
        'jumlah',
        'harga_satuan',
        'subtotal'
    ];

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
