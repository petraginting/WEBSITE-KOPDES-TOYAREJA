<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    protected $fillable = [
        'tipe_notifikasi',
        'target',
        'judul_notifikasi',
        'isi_pesan',
        'tanggal_berlaku',
        'status'
    ];

    protected $casts = [
        'tanggal_berlaku' => 'datetime:Y-m-d H:i:s'
    ];
}
