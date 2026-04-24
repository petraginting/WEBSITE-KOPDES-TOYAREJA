<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifikasis', function (Blueprint $table) {
            $table->id();
            $table->enum('tipe_notifikasi', ['info', 'promo', 'produk']);
            $table->enum('target', ['semua', 'aktif', 'anggota']);
            $table->string('judul_notifikasi');
            $table->string('isi_pesan');
            $table->timestamp('tanggal_berlaku');
            $table->enum('status', ['aktif', 'expired']);

            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifikasis');
    }
};
