import { useState, useEffect } from "react";
// Pastikan path import API ini sesuai dengan folder Anda (seperti di VerifyRegist sebelumnya)
import { api } from "../api/api";
import { getAllUserOrders } from "../api/orders";
import { formatIDR } from "../utilities/produkUtils";
import ModalDetail from "./admin/pesanan/ModalDetail";

export default function PesananContent() {
  // 1. STATE UNTUK API & MODAL
  const [pesananList, setPesananList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState(null); // State untuk Modal Detail

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const fetchDataPesanan = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUserOrders();
      setPesananList(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      alert("Gagal memuat data pesanan dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPesanan();
  }, []);


  // 3. LOGIKA CRUD KE BACKEND

  // Update Status API
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/admin/pesanan/update-status/${id}`, { status_pesanan: newStatus });

      // Jika berhasil di backend, update tampilan di frontend
      const updated = pesananList.map((item) =>
        item.id === id ? { ...item, status_pesanan: newStatus } : item,
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
    const name = item.user?.anggota?.nama_lengkap || "";
    const orderId = item.id || "";

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Semua Status" || item.status_pesanan.toLowerCase() === statusFilter.toLowerCase();


    return matchesSearch && matchesStatus;
  });

  // HITUNG STATS OTOMATIS
  const stats = {
    pending: pesananList.filter((p) => p.status_pesanan === "pending").length,
    diproses: pesananList.filter((p) => p.status_pesanan === "diproses").length,
    selesai: pesananList.filter((p) => p.status_pesanan === "selesai").length,
    batal: pesananList.filter((p) => p.status_pesanan === "dibatalkan").length,
  };

  return (
    <div className="animate-fadeInUp relative">
      {/* --- KODE STATS & SEARCH TETAP SAMA --- */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCardPesanan
          icon="⏳"
          value={stats.pending}
          label="Pending"
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
          <option>Pending</option>
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
                  Jumlah Produk
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Total
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Metode Pembayaran
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Status
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-center">
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
        <ModalDetail
          data={selectedPesanan}
          onClose={() => setSelectedPesanan(null)}
          statusStyles={statusStyles}
        />
      )}
    </div>
  );
}

const statusStyles = {
  selesai: "bg-emerald-100 text-emerald-700",
  diproses: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  dibatalkan: "bg-red-100 text-red-700",
};

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

  return (
    <tr className="hover:bg-blue-50/50 border-b border-border last:border-none transition-colors">
      <td className="px-4 py-3 text-dark font-bold">{data.id}</td>
      <td className="px-4 py-3 text-dark">{data.user?.anggota?.nama_lengkap}</td>
      <td className="px-4 py-3 text-dark">{data.details?.length}</td>
      <td className="px-4 py-3 text-dark font-medium">
        {formatIDR(data.total_harga)}
      </td>
      <td className="px-4 py-3 text-dark">{data.metode_pembayaran}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusStyles[data.status_pesanan]}`}
        >
          ● {data.status_pesanan}
        </span>
      </td>
      <td className="px-4 py-3 flex gap-2 justify-center items-center">
        <select
          className="text-[11px] border rounded p-1 outline-none"
          value={data.status_pesanan}
          onChange={(e) => onUpdateStatus(data.id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
          <option value="dibatalkan">Batal</option>
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
