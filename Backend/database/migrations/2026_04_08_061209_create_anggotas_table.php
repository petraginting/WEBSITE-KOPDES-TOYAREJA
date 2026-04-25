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
        Schema::create('anggotas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('nama_lengkap');
            $table->string('no_registrasi')->nullable()->unique();
            $table->string('nik', 16)->nullable()->unique();
            $table->enum('jenis_kelamin', ['laki-laki', 'perempuan'])->nullable();
            $table->timestamp('tanggal_lahir')->nullable();
            $table->text('alamat')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->timestamp('tanggal_bergabung')->nullable();
            $table->enum('status_keanggotaan', ['aktif', 'tidak_aktif'])->nullable();

            $table->bigInteger('total_simpanan')->default(0);
            $table->integer('poin')->default(0);

            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggotas');
    }
};
