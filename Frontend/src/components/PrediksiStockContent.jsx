import { useEffect, useState } from "react";
import api from "../api/axios";
import { getActivePrediksi, mapData } from "../utilities/forcast";

export default function PrediksiStockContent() {
  // 1. Ubah nama variabel state agar sesuai konteks Stok
  const [stokList, setStokList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Prediksi 7 hari");

  // --- FILTER & SEARCH ---
  const filteredStok = stokList.filter((item) => {
    const prediksi = getActivePrediksi(item, statusFilter);

    const matchesSearch = item.namaBarang
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesStatus = true;

    if (prediksi.sisaHari === null) {
      matchesStatus = true; // Aman
    } else if (statusFilter === "Prediksi 7 hari") {
      matchesStatus = prediksi.sisaHari <= 7;
    } else if (statusFilter === "Prediksi 30 hari") {
      matchesStatus = prediksi.sisaHari <= 30;
    }

    return matchesSearch && matchesStatus;
  });

  const fetchDataForcast = async () => {
    try {
      const res = await api.get('/admin/forcast')

      const mapped = mapData(res.data.data)
      setStokList(mapped)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDataForcast()
  }, [])

  return (
    <div className="animate-fadeInUp">
      {/* Search & Filter */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-light text-sm">
            🔍
          </span>
          {/* 4. Ubah teks placeholder */}
          <input
            type="text"
            placeholder="Cari nama barang koperasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-border rounded-xl py-2.5 pr-4 pl-10 text-[13.5px] outline-none focus:border-blue-400 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border rounded-xl py-2.5 px-3 text-[13px] text-dark bg-white outline-none cursor-pointer"
        >
          <option>Prediksi 7 hari</option>
          <option>Prediksi 30 hari</option>
        </select>
      </div>

      {/* Tabel Data */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh] relative">
          <table className="w-full border-collapse text-[13.5px]">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left border-b border-border">
                  Gambar
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left border-b border-border">
                  Nama Barang
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left border-b border-border">
                  Sisa Stok
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left border-b border-border">
                  Sisa Hari
                </th>
              </tr>
            </thead>

            {/* 5. TAMBAHKAN TBODY UNTUK MERENDER DATA */}
            <tbody>
              {filteredStok.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <img
                      src={item.gambar}
                      alt={item.namaBarang}
                      className="w-10 h-10 rounded-md object-cover border border-gray-200"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-dark">
                    {item.namaBarang}
                  </td>
                  <td className="px-4 py-3 text-dark">
                    {statusFilter === "Prediksi 7 hari" ?
                      (item.prediksi7?.sisaStok)
                      : (item.prediksi30?.sisaStok)
                    } unit</td>
                  <td className="px-4 py-3">
                    {/* Logika warna dinamis menggunakan Tailwind berdasarkan sisa hari */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.sisaHari <= 7
                        ? "bg-red-100 text-red-600"
                        : item.sisaHari <= 30
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                        }`}
                    >
                      {statusFilter === "Prediksi 7 hari" ?
                        (item.prediksi7?.sisaHari === null
                          ? "Aman"
                          : `${item.prediksi7?.sisaHari} Hari`)
                        : (item.prediksi30?.sisaHari === null
                          ? "Aman"
                          : `${item.prediksi30?.sisaHari} Hari`)
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 6. Ubah pesan data kosong */}
          {filteredStok.length === 0 && (
            <div className="p-10 text-center text-light italic">
              Data stok tidak ditemukan...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
