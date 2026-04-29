<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileKopdes extends Model
{
    //
    protected $fillable = [
        'nama_koperasi',
        'singkatan',
        'slogan',
        'slogan',
        'status',
        'tanggal_berdiri',
        'no_badan_hukum',
        'ketua_koperasi',
        'alamat',
        'no_telepon',
        'no_wa',
        'email',
        'sosmed',
        'deskripsi',
    ];

    protected $casts = [
        'tanggal_berdiri' => 'datetime:Y-m-d'
    ];
}
