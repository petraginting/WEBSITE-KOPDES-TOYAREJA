// utilities/produkUtils.js

// Memformat angka ke Rupiah untuk tampilan
export const formatIDR = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};


export const deleteProduk = (produkList, produkId) => {
  return produkList.filter((produk) => produk.id !== produkId);
};

export const produkToFormData = (produk) => {
  // Ambil angka saja dari string harga (misal "Rp 65.000" jadi "65000")
  return {
    gambar: produk.gambar,
    nama_produk: produk.nama,
    kategori: produk.kategori,
    harga: produk.harga,
    stok: produk.stok,
    unit: produk.unit,
  };
};


export const getDefaultFormData = () => {
  return {
    nama_produk: "",
    kategori: "",
    harga: 0,
    stok: 0,
    unit: "",
    gambar: null,
  };
};

export const baseURL = "http://localhost:8000/storage/";

