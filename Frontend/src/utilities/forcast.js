const extractHari = (hari_habis) => {
  if (hari_habis.includes("Habis dalam")) {
    const match = hari_habis.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }
  return null;
}

export const mapData = (apiData) => {
  return apiData.map((item, index) => {
    const w = item.prediksi_7_hari;
    const m = item.prediksi_30_hari;

    return {
      id: index,
      namaBarang: item.nama_barang,
      prediksi7: {
        sisaStok: w.sisa_stok,
        sisaHari: extractHari(w.hari_habis),
      },
      prediksi30: {
        sisaStok: m.sisa_stok,
        sisaHari: extractHari(m.hari_habis),
      },
      gambar: "/images/default.png",
    };
  });
}

export const getActivePrediksi = (item, statusFilter) => {
  if (statusFilter === "Prediksi 30 hari") {
    return item.prediksi30;
  }
  return item.prediksi7;
};