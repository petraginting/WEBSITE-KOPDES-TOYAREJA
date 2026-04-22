<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
     protected $fillable = [
        'nama_produk',
        'unit',
        'harga',
        'kategori',
        'stok',
        'gambar'
    ];

    protected $table = 'products';

      public function details(): HasMany
    {
        return $this->hasMany(Detail_pesanan::class);
    }
}
