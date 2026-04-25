import { useState, useEffect } from "react";
// Pastikan path import API ini sesuai dengan folder Anda (seperti di VerifyRegist sebelumnya)
import { api } from "../api/axios";

export default function PesananContent() {
  // 1. STATE UNTUK API & MODAL
  const [pesananList, setPesananList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState(null); // State untuk Modal Detail

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  // 2. MENGAMBIL DATA DARI BACKEND (READ)
  useEffect(() => {
    fetchDataPesanan();
  }, []);

  const fetchDataPesanan = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/pesanan");
      setPesananList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      alert("Gagal memuat data pesanan dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. LOGIKA CRUD KE BACKEND

  // Update Status API
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/pesanan/${id}/status`, { status: newStatus });

      // Jika berhasil di backend, update tampilan di frontend
      const updated = pesananList.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      );
      setPesananList(updated);
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("Terjadi kesalahan saat mengubah status.");
    }
  };

  // Hapus Pesanan API
  const handleHapusPesanan = async (id) => {
    if (window.confirm("Hapus data pesanan ini secara permanen?")) {
      try {
        await api.delete(`/pesanan/${id}`);

        // Update tampilan frontend setelah berhasil dihapus di backend
        setPesananList(pesananList.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  // FILTER & SEARCH
  const filteredPesanan = pesananList.filter((item) => {
    // Tambahkan pengaman (opsional) jika data dari backend ada yang null
    const name = item.name || "";
    const orderId = item.orderId || "";

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Semua Status" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // HITUNG STATS OTOMATIS
  const stats = {
    menunggu: pesananList.filter((p) => p.status === "Menunggu").length,
    diproses: pesananList.filter((p) => p.status === "Diproses").length,
    selesai: pesananList.filter((p) => p.status === "Selesai").length,
    batal: pesananList.filter((p) => p.status === "Dibatalkan").length,
  };

  return (
    <div className="animate-fadeInUp relative">
      {/* --- KODE STATS & SEARCH TETAP SAMA --- */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCardPesanan
          icon="⏳"
          value={stats.menunggu}
          label="Menunggu"
          colorClass="from-amber-500 to-amber-300"
        />
        <StatCardPesanan
          icon="🔄"
          value={stats.diproses}
          label="Diproses"
          colorClass="from-blue-500 to-blue-400"
        />
        <StatCardPesanan
          icon="✅"
          value={stats.selesai}
          label="Selesai"
          colorClass="from-emerald-600 to-emerald-400"
        />
        <StatCardPesanan
          icon="❌"
          value={stats.batal}
          label="Dibatalkan"
          colorClass="from-red-500 to-red-400"
        />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-light text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari nomor pesanan atau nama anggota..."
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
          <option>Semua Status</option>
          <option>Menunggu</option>
          <option>Diproses</option>
          <option>Selesai</option>
          <option>Dibatalkan</option>
        </select>
      </div>

      {/* Tabel Data */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              {/* --- BAGIAN THEAD SAMA --- */}
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  No. Pesanan
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Anggota
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Produk
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Qty
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Total
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Status
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center p-10 text-gray-500">
                    Memuat data dari server...
                  </td>
                </tr>
              ) : (
                filteredPesanan.map((order) => (
                  <TableRow
                    key={order.id}
                    data={order}
                    onUpdateStatus={handleUpdateStatus}
                    onDelete={handleHapusPesanan}
                    // 4. Kirim fungsi klik detail ke TableRow
                    onDetailClick={() => setSelectedPesanan(order)}
                  />
                ))
              )}
            </tbody>
          </table>
          {!isLoading && filteredPesanan.length === 0 && (
            <div className="p-10 text-center text-light italic">
              Pesanan tidak ditemukan...
            </div>
          )}
        </div>
      </div>

      {/* 5. TAMPILKAN MODAL JIKA ADA PESANAN YANG DIPILIH */}
      {selectedPesanan && (
        <DetailModal
          data={selectedPesanan}
          onClose={() => setSelectedPesanan(null)}
        />
      )}
    </div>
  );
}

// --- SUB-KOMPONEN ---

function StatCardPesanan({ icon, value, label, colorClass }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 shadow-sm">
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${colorClass}`}
      ></div>
      <div className="text-[24px] mb-2">{icon}</div>
      <div className="text-[24px] font-extrabold text-dark">{value}</div>
      <div className="text-xs text-light font-medium">{label}</div>
    </div>
  );
}

// Tambahkan prop onDetailClick di sini
function TableRow({ data, onUpdateStatus, onDelete, onDetailClick }) {
  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  const statusStyles = {
    Selesai: "bg-emerald-100 text-emerald-700",
    Diproses: "bg-blue-100 text-blue-700",
    Menunggu: "bg-amber-100 text-amber-700",
    Dibatalkan: "bg-red-100 text-red-700",
  };

  return (
    <tr className="hover:bg-blue-50/50 border-b border-border last:border-none transition-colors">
      <td className="px-4 py-3 text-dark font-bold">{data.orderId}</td>
      <td className="px-4 py-3 text-dark">{data.name}</td>
      <td className="px-4 py-3 text-dark">{data.product}</td>
      <td className="px-4 py-3 text-dark">{data.qty}</td>
      <td className="px-4 py-3 text-dark font-medium">
        {formatIDR(data.total)}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusStyles[data.status]}`}
        >
          ● {data.status}
        </span>
      </td>
      <td className="px-4 py-3 flex gap-2 justify-center items-center">
        <select
          className="text-[11px] border rounded p-1 outline-none"
          value={data.status}
          onChange={(e) => onUpdateStatus(data.id, e.target.value)}
        >
          <option value="Menunggu">Menunggu</option>
          <option value="Diproses">Diproses</option>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Batal</option>
        </select>

        {/* Tombol Detail Ditambahkan di Sini */}
        <button
          onClick={onDetailClick}
          className="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition-all flex items-center justify-center"
          title="Lihat Detail"
        >
          👁️
        </button>

        <button
          onClick={() => onDelete(data.id)}
          className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-all flex items-center justify-center"
          title="Hapus"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}

// 6. KOMPONEN BARU: MODAL DETAIL
function DetailModal({ data, onClose }) {
  // State untuk menyimpan daftar item dari tabel detail_pesanan
  const [detailItems, setDetailItems] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  // Fetch data detail pesanan saat modal dibuka
  useEffect(() => {
    const fetchDetailPesanan = async () => {
      setIsLoadingDetails(true);
      try {
        // Sesuaikan endpoint ini dengan route 'show' di web.php / api.php Laravel Anda
        // Contoh: Route::get('/detail-pesanan/{pesanan_id}', [DetailPesananController::class, 'show']);
        const response = await api.get(`/detail-pesanan/${data.id}`);

        // Mengambil array dari response JSON Laravel: 'data' => $details
        setDetailItems(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil detail pesanan:", error);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    if (data && data.id) {
      fetchDetailPesanan();
    }
  }, [data]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-fadeInUp p-6 max-h-[90vh] flex flex-col">
        {/* HEADER MODAL */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-dark">Detail Pesanan</h2>
            <p className="text-sm text-gray-500">#{data.orderId || data.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-red-50 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center text-2xl transition-all"
          >
            ×
          </button>
        </div>

        {/* INFO PELANGGAN */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <p className="text-gray-500 mb-1">Nama Anggota</p>
            <p className="font-semibold text-dark">{data.name}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Status Pesanan</p>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
              {data.status}
            </span>
          </div>
        </div>

        {/* TABEL ITEM PRODUK (Dari DetailPesananController) */}
        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 sticky top-0 shadow-sm">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b">
                  Produk
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b text-center">
                  Harga Satuan
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b text-center">
                  Jumlah
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingDetails ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    <span className="animate-pulse">
                      Memuat daftar produk...
                    </span>
                  </td>
                </tr>
              ) : detailItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    Tidak ada produk dalam pesanan ini.
                  </td>
                </tr>
              ) : (
                detailItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    {/* Sesuaikan item.product.nama dengan nama kolom di tabel Product Anda */}
                    <td className="py-3 px-4 font-medium text-dark">
                      {item.product?.nama ||
                        item.product?.name ||
                        "Produk Tidak Diketahui"}
                    </td>
                    {/* Asumsi harga didapat dari harga produk dibagi jumlah atau langsung dari relasi */}
                    <td className="py-3 px-4 text-center text-gray-600">
                      {formatIDR(item.subtotal / item.jumlah)}
                    </td>
                    <td className="py-3 px-4 text-center font-medium">
                      {item.jumlah}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-blue-600">
                      {formatIDR(item.subtotal)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER TOTAL */}
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-gray-500 font-medium">Total Keseluruhan</span>
          <span className="text-2xl font-bold text-dark">
            {formatIDR(data.total_harga || data.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
