// 1. Format untuk tampilan di Tabel & Stats (Contoh: Rp 1.000.000)
export const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

// 2. Format untuk di dalam Input saat mengetik (Contoh: 1.000.000)
export const formatInputRupiah = (angka) => {
  if (angka === 0 || !angka) return "";
  const numberString = angka.toString().replace(/[^0-9]/g, "");
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};