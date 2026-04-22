import { useState } from "react";
import { List_pesanan } from "../dataset/data.pesanan";

export default function PesananContent() {
  const [pesananList, setPesananList] = useState(List_pesanan);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  // --- LOGIKA CRUD ---

  // Update Status
  const handleUpdateStatus = (id, newStatus) => {
    const updated = pesananList.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item,
    );
    setPesananList(updated);
  };

  // Hapus Pesanan
  const handleHapusPesanan = (id) => {
    if (window.confirm("Hapus data pesanan ini?")) {
      setPesananList(pesananList.filter((item) => item.id !== id));
    }
  };

  //  FILTER & SEARCH
  const filteredPesanan = pesananList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase());

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
    <div className="animate-fadeInUp">
      {/* Stats Grid - Sekarang Dinamis */}
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

      {/* Search & Filter */}
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
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPesanan.map((order) => (
                <TableRow
                  key={order.id}
                  data={order}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleHapusPesanan}
                />
              ))}
            </tbody>
          </table>
          {filteredPesanan.length === 0 && (
            <div className="p-10 text-center text-light italic">
              Pesanan tidak ditemukan...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//  SUB-KOMPONEN

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

function TableRow({ data, onUpdateStatus, onDelete }) {
  // Formatter uang
  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  // Mapping gaya badge
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
      <td className="px-4 py-3 flex gap-2">
        {/* Dropdown sederhana untuk ganti status */}
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
        <button
          onClick={() => onDelete(data.id)}
          className="text-red-500 hover:bg-red-50 p-1 rounded transition-all"
          title="Hapus"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
