<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pesanan extends Model
{
    //
        protected $fillable = [
        'user_id',
        'total_harga',
        'metode_pembayaran',
        'bukti_pembayaran',
        'status_pesanan',
        'alamat_pengiriman'
    ];


    public function details(): HasMany
    {
        return $this->hasMany(Detail_pesanan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
