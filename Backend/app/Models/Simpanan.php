<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Simpanan extends Model
{
     protected $fillable = [
        'jenis_simpanan',
        'jumlah_transaksi'
    ];
}
