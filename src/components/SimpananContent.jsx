export default function SimpananContent() {
  return (
    <div className="animate-fadeInUp">
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-dark">
            💰 Manajemen Simpanan Anggota
          </h2>
          <p className="text-[13px] text-light mt-0.5">
            Mengelola simpanan pokok, wajib, dan sukarela anggota
          </p>
        </div>
        <button className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all">
          + Tambah Simpanan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="text-[28px] mb-3">💎</div>
          <div className="text-[28px] font-extrabold text-dark font-serif">
            Rp 248 jt
          </div>
          <div className="text-xs text-light font-medium mt-1">
            Total Simpanan Pokok
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold to-gold-light"></div>
          <div className="text-[28px] mb-3">📅</div>
          <div className="text-[28px] font-extrabold text-dark font-serif">
            Rp 148 jt
          </div>
          <div className="text-xs text-light font-medium mt-1">
            Total Simpanan Wajib
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-blue-400"></div>
          <div className="text-[28px] mb-3">🏦</div>
          <div className="text-[28px] font-extrabold text-dark font-serif">
            Rp 86 jt
          </div>
          <div className="text-xs text-light font-medium mt-1">
            Total Simpanan Sukarela
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-light text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari nama atau nomor anggota..."
            className="w-full bg-white border border-border rounded-xl py-2.5 pr-4 pl-10 text-[13.5px] text-dark outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400/10 transition-all"
          />
        </div>
        <select className="border border-border rounded-xl py-2.5 px-3 text-[13px] text-dark bg-white outline-none focus:border-blue-400 cursor-pointer">
          <option>Semua Jenis</option>
          <option>Simpanan Pokok</option>
          <option>Simpanan Wajib</option>
          <option>Simpanan Sukarela</option>
        </select>
      </div>

      {/* Tabel Data */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-dark">
            Daftar Simpanan Anggota
          </h3>
          <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
            ⬇ Export Laporan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  No. Anggota
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Nama
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Simpanan Pokok
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Simpanan Wajib
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Simpanan Sukarela
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Total Simpanan
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px] px-4 py-3 text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Baris 1 */}
              <tr className="hover:bg-blue-50 border-b border-blue-50 last:border-none transition-colors">
                <td className="px-4 py-3 text-dark font-medium">#A001</td>
                <td className="px-4 py-3 text-dark">Budi Santoso</td>
                <td className="px-4 py-3 text-dark">Rp 1.000.000</td>
                <td className="px-4 py-3 text-dark">Rp 600.000</td>
                <td className="px-4 py-3 text-dark">Rp 500.000</td>
                <td className="px-4 py-3 text-dark font-bold text-blue-700">
                  Rp 2.100.000
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
                    Riwayat
                  </button>
                  <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
                    Edit
                  </button>
                </td>
              </tr>
              {/* Baris 2 */}
              <tr className="hover:bg-blue-50 border-b border-blue-50 last:border-none transition-colors">
                <td className="px-4 py-3 text-dark font-medium">#A002</td>
                <td className="px-4 py-3 text-dark">Siti Rahayu</td>
                <td className="px-4 py-3 text-dark">Rp 1.000.000</td>
                <td className="px-4 py-3 text-dark">Rp 500.000</td>
                <td className="px-4 py-3 text-dark">Rp 250.000</td>
                <td className="px-4 py-3 text-dark font-bold text-blue-700">
                  Rp 1.750.000
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
                    Riwayat
                  </button>
                  <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
                    Edit
                  </button>
                </td>
              </tr>
              {/* Baris 3 */}
              <tr className="hover:bg-blue-50 border-b border-blue-50 last:border-none transition-colors">
                <td className="px-4 py-3 text-dark font-medium">#A003</td>
                <td className="px-4 py-3 text-dark">Ahmad Fauzi</td>
                <td className="px-4 py-3 text-dark">Rp 1.000.000</td>
                <td className="px-4 py-3 text-dark">Rp 700.000</td>
                <td className="px-4 py-3 text-dark">Rp 1.000.000</td>
                <td className="px-4 py-3 text-dark font-bold text-blue-700">
                  Rp 2.700.000
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
                    Riwayat
                  </button>
                  <button className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
