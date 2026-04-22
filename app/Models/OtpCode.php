<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtpCode extends Model
{
    // 
    protected $fillable = [
        'no_hp',
        'otp_code',
        'valid_until'
    ];

    protected $table = 'otp_codes';
}
