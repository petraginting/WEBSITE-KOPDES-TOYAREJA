<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pesanan extends Model
{
    //
        protected $fillable = [
        'product_id',
        'jumlah',
        'total_harga',
        'metode_pembayaran',
        'status_pesanan',
        'alamat_pengiriman'
    ];


    public function details(): HasMany
    {
        return $this->hasMany(Detail_pesanan::class);
    }
}
