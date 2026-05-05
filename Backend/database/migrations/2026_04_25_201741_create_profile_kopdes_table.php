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
        Schema::create('profile_kopdes', function (Blueprint $table) {
            $table->id();
            $table->string('nama_koperasi');
            $table->string('singkatan')->nullable();
            $table->text('slogan')->nullable();
            $table->enum('status', ['aktif', 'non-aktif'])->default('aktif');
            $table->string('tanggal_berdiri')->nullable();
            $table->string('no_badan_hukum')->nullable();
            $table->string('ketua_koperasi')->nullable();
            $table->text('alamat')->nullable();
            $table->string('no_telepon', 15)->nullable();
            $table->string('no_wa', 15)->nullable();
            $table->string('email')->nullable();
            $table->string('sosmed')->nullable(); // Menggunakan JSON untuk link sosial media
            $table->text('deskripsi')->nullable();
            $table->string('logo')->nullable(); // Tambahan untuk logo koperasi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_kopdes');
    }
};
