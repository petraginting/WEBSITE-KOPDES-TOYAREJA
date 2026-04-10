export default function PesananContent() {
  return (
    <div className="animate-fadeInUp">
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-dark">
            📦 Manajemen Pesanan
          </h2>
          <p className="text-[13px] text-light mt-0.5">
            Pantau dan kelola status pesanan anggota
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCardPesanan
          icon="⏳"
          value="5"
          label="Menunggu Proses"
          colorClass="from-gold to-gold-light"
        />
        <StatCardPesanan
          icon="🔄"
          value="12"
          label="Sedang Diproses"
          colorClass="from-blue-500 to-blue-400"
        />
        <StatCardPesanan
          icon="✅"
          value="98"
          label="Selesai"
          colorClass="from-blue-600 to-blue-400"
        />
        <StatCardPesanan
          icon="❌"
          value="12"
          label="Dibatalkan"
          colorClass="from-purple-500 to-purple-400"
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
            className="w-full bg-white border border-border rounded-xl py-2.5 pr-4 pl-10 text-[13.5px] text-dark outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400/10 transition-all"
          />
        </div>
        <select className="border border-border rounded-xl py-2.5 px-3 text-[13px] text-dark bg-white outline-none focus:border-blue-400 cursor-pointer">
          <option>Semua Status</option>
          <option>Menunggu</option>
          <option>Diproses</option>
          <option>Selesai</option>
          <option>Dibatalkan</option>
        </select>
      </div>

      {/* Tabel Data */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-dark">
            Daftar Semua Pesanan
          </h3>
          <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
            ⬇ Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  No. Pesanan
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Anggota
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Produk
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Qty
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Total
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Tanggal
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Status
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                orderId="#ORD-127"
                name="Budi Santoso"
                product="Beras Organik 5kg"
                qty="2"
                total="Rp 130.000"
                date="07/03/2026"
                status="Diproses"
                statusType="gold"
              />
              <TableRow
                orderId="#ORD-126"
                name="Dewi Lestari"
                product="Minyak Goreng 1L"
                qty="3"
                total="Rp 46.500"
                date="06/03/2026"
                status="Selesai"
                statusType="green"
              />
              <TableRow
                orderId="#ORD-125"
                name="Hendra Wijaya"
                product="Gula Pasir 1kg"
                qty="1"
                total="Rp 14.000"
                date="06/03/2026"
                status="Selesai"
                statusType="green"
              />
              <TableRow
                orderId="#ORD-124"
                name="Rina Marlina"
                product="Tepung Terigu 1kg"
                qty="2"
                total="Rp 28.000"
                date="05/03/2026"
                status="Dibatalkan"
                statusType="red"
              />
              <TableRow
                orderId="#ORD-123"
                name="Wahyu Pratama"
                product="Sabun Cuci 400ml"
                qty="1"
                total="Rp 8.500"
                date="05/03/2026"
                status="Selesai"
                statusType="green"
              />
              <TableRow
                orderId="#ORD-122"
                name="Ahmad Fauzi"
                product="Pupuk Organik 1L"
                qty="5"
                total="Rp 125.000"
                date="04/03/2026"
                status="Diproses"
                statusType="gold"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- SUB-KOMPONEN (Hanya dipakai di file ini agar kode lebih rapi) ---

function StatCardPesanan({ icon, value, label, colorClass }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${colorClass}`}
      ></div>
      <div className="text-[28px] mb-3">{icon}</div>
      <div className="text-[28px] font-extrabold text-dark font-serif">
        {value}
      </div>
      <div className="text-xs text-light font-medium mt-1">{label}</div>
    </div>
  );
}

function TableRow({
  orderId,
  name,
  product,
  qty,
  total,
  date,
  status,
  statusType,
}) {
  // Menentukan warna badge berdasarkan status (sesuai CSS asli)
  let badgeClass = "";
  if (statusType === "green") badgeClass = "bg-blue-100 text-blue-700";
  if (statusType === "gold") badgeClass = "bg-[#fef3cd] text-[#854d0e]";
  if (statusType === "red") badgeClass = "bg-[#fee2e2] text-[#991b1b]";

  return (
    <tr className="hover:bg-blue-50 border-b border-blue-50 last:border-none transition-colors">
      <td className="px-4 py-3 text-dark font-bold">{orderId}</td>
      <td className="px-4 py-3 text-dark">{name}</td>
      <td className="px-4 py-3 text-dark">{product}</td>
      <td className="px-4 py-3 text-dark">{qty}</td>
      <td className="px-4 py-3 text-dark">{total}</td>
      <td className="px-4 py-3 text-dark">{date}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold before:content-['●'] before:text-[8px] ${badgeClass}`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
          Detail
        </button>
      </td>
    </tr>
  );
}
