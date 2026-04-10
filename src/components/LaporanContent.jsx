export default function LaporanContent() {
  return (
    <div className="animate-fadeInUp">
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-dark">
            📋 Laporan Koperasi
          </h2>
          <p className="text-[13px] text-light mt-0.5">
            Laporan transaksi, simpanan, dan data anggota
          </p>
        </div>
        <div className="flex gap-2.5">
          <select className="border border-border rounded-xl py-2 px-3 text-[13px] text-dark bg-white outline-none focus:border-blue-400 cursor-pointer">
            <option>Maret 2026</option>
            <option>Februari 2026</option>
            <option>Januari 2026</option>
          </select>
          <button className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all">
            ⬇ Download PDF
          </button>
        </div>
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-border rounded-xl p-8 text-center shadow-sm">
          <div className="text-2xl font-extrabold font-serif text-blue-700">
            Rp 56 jt
          </div>
          <div className="text-xs text-light mt-1">
            Total Penjualan Bulan Ini
          </div>
        </div>
        <div className="bg-white border border-border rounded-xl p-8 text-center shadow-sm">
          <div className="text-2xl font-extrabold font-serif text-blue-700">
            127
          </div>
          <div className="text-xs text-light mt-1">Jumlah Transaksi</div>
        </div>
        <div className="bg-white border border-border rounded-xl p-8 text-center shadow-sm">
          <div className="text-2xl font-extrabold font-serif text-blue-700">
            Rp 482 jt
          </div>
          <div className="text-xs text-light mt-1">Total Simpanan Anggota</div>
        </div>
      </div>

      {/* Tabel Laporan Transaksi */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm mb-5">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-dark">
            💳 Laporan Transaksi Penjualan
          </h3>
          <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
            ⬇ Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  No. Transaksi
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Anggota
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Produk
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Jumlah
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Total
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 border-b border-blue-50">
                <td className="px-4 py-3 text-dark">#TRX-001</td>
                <td className="px-4 py-3 text-dark">Budi Santoso</td>
                <td className="px-4 py-3 text-dark">Beras Organik 5kg</td>
                <td className="px-4 py-3 text-dark">2</td>
                <td className="px-4 py-3 text-dark font-bold">Rp 130.000</td>
                <td className="px-4 py-3 text-dark">07/03/2026</td>
              </tr>
              {/* Kamu bisa tambahkan baris data lainnya di sini */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Laporan Simpanan */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-dark">
            💰 Laporan Simpanan Anggota — Maret 2026
          </h3>
          <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
            ⬇ Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  No. Anggota
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Nama
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Jenis Simpanan
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Jumlah
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 border-b border-blue-50">
                <td className="px-4 py-3 text-dark">#A001</td>
                <td className="px-4 py-3 text-dark">Budi Santoso</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[11px] font-bold before:content-['●'] before:mr-1 before:text-[8px]">
                    Simpanan Wajib
                  </span>
                </td>
                <td className="px-4 py-3 text-dark">Rp 50.000</td>
                <td className="px-4 py-3 text-dark">01/03/2026</td>
              </tr>
              {/* Kamu bisa tambahkan baris data lainnya di sini */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
