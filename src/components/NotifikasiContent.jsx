export default function NotifikasiContent() {
  return (
    <div className="animate-fadeInUp">
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-dark">
            🔔 Notifikasi & Promosi
          </h2>
          <p className="text-[13px] text-light mt-0.5">
            Kirim informasi dan promo kepada anggota
          </p>
        </div>
        <button className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all">
          + Buat Notifikasi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Kolom Kiri: Daftar Notifikasi Aktif */}
        <div>
          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm mb-5">
            <div className="p-5 border-b border-border">
              <h3 className="text-[15px] font-bold text-dark">
                📢 Notifikasi Aktif
              </h3>
            </div>
            <div className="p-6">
              <NotifCard
                icon="🎉"
                iconBg="bg-blue-100"
                title="Produk Baru: Beras Organik Premium"
                message="Beras organik dari petani lokal kini tersedia di koperasi. Kualitas terjamin!"
                badges={[
                  { label: "Aktif", color: "green" },
                  { label: "Semua Anggota", color: "blue" },
                ]}
                date="05/03/2026"
              />
              <NotifCard
                icon="💸"
                iconBg="bg-[#fef3cd]"
                title="Promo Ramadan: Diskon 10%"
                message="Dapatkan diskon 10% untuk pembelian sembako selama bulan Ramadan!"
                badges={[
                  { label: "Promo", color: "gold" },
                  { label: "Semua Anggota", color: "blue" },
                ]}
                date="01/03/2026"
              />
              <NotifCard
                icon="📅"
                iconBg="bg-blue-50"
                title="Pengingat Simpanan Wajib Bulan Maret"
                message="Jangan lupa membayar simpanan wajib bulan Maret sebelum tanggal 10!"
                badges={[
                  { label: "Aktif", color: "green" },
                  { label: "Pengingat", color: "gold" },
                ]}
                date="01/03/2026"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Statistik & Riwayat */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm h-fit">
          <div className="p-5 border-b border-border">
            <h3 className="text-[15px] font-bold text-dark">
              📊 Statistik Notifikasi
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3.5 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                <div className="text-[28px] font-extrabold font-serif text-blue-700">
                  12
                </div>
                <div className="text-xs text-light mt-1">
                  Total Notifikasi Terkirim
                </div>
              </div>
              <div className="bg-[#fef3cd] rounded-xl p-4 text-center border border-[#fde047]">
                <div className="text-[28px] font-extrabold font-serif text-[#854d0e]">
                  3
                </div>
                <div className="text-xs text-light mt-1">Notifikasi Aktif</div>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-mid mb-3.5">
              Riwayat Notifikasi Terakhir
            </h4>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="bg-blue-50 text-mid font-semibold text-xs px-3 py-2.5 text-left">
                      Judul
                    </th>
                    <th className="bg-blue-50 text-mid font-semibold text-xs px-3 py-2.5 text-left">
                      Tipe
                    </th>
                    <th className="bg-blue-50 text-mid font-semibold text-xs px-3 py-2.5 text-left">
                      Tanggal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2.5 text-dark">
                      Produk Baru: Beras
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold before:content-['●'] before:mr-1 before:text-[6px]">
                        Produk
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-dark">05/03/2026</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2.5 text-dark">Promo Ramadan</td>
                    <td className="px-3 py-2.5">
                      <span className="bg-[#fef3cd] text-[#854d0e] px-2 py-0.5 rounded-full text-[10px] font-bold before:content-['●'] before:mr-1 before:text-[6px]">
                        Promo
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-dark">01/03/2026</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2.5 text-dark">Simpanan Wajib</td>
                    <td className="px-3 py-2.5">
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold before:content-['●'] before:mr-1 before:text-[6px]">
                        Info
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-dark">01/03/2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-komponen untuk Kartu Notifikasi
function NotifCard({ icon, iconBg, title, message, badges, date }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 mb-3 flex gap-3.5 transition-all hover:shadow-sm">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sm text-dark">{title}</div>
        <div className="text-[12.5px] text-light mt-0.5 leading-relaxed">
          {message}
        </div>
        <div className="flex gap-2 mt-2.5">
          {badges.map((badge, idx) => {
            let badgeStyle = "bg-blue-50 text-blue-700 border border-blue-200";
            if (badge.color === "green")
              badgeStyle = "bg-blue-100 text-blue-700";
            if (badge.color === "gold")
              badgeStyle = "bg-[#fef3cd] text-[#854d0e]";

            return (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold before:content-['●'] before:mr-1 before:text-[6px] flex items-center ${badgeStyle}`}
              >
                {badge.label}
              </span>
            );
          })}
        </div>
        <div className="text-[11px] text-light mt-2.5">Dikirim: {date}</div>
      </div>
    </div>
  );
}
