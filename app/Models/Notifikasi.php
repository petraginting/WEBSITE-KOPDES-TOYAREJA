<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    protected $fillable = [
        'judul',
        'isi_pesan',
        'tipe_notifikasi'
    ];
}
