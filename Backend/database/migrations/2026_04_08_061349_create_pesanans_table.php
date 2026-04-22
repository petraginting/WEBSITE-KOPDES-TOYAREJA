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
        Schema::create('pesanans', function (Blueprint $table) {
            $table->id();

            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
            $table->integer('total_harga');
            $table->string('metode_pembayaran');
            $table->string('status_pesanan');
            $table->string('alamat_pengiriman');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};
