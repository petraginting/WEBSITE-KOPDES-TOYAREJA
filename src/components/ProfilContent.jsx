export default function ProfilContent() {
  return (
    <div className="animate-fadeInUp">
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-dark">
            🏢 Profil & Informasi Koperasi
          </h2>
          <p className="text-[13px] text-light mt-0.5">
            Mengelola informasi yang ditampilkan di website
          </p>
        </div>
        <button className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] shadow-sm transition-all">
          ✏️ Edit Profil
        </button>
      </div>

      {/* Profil Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white mb-5 flex items-center gap-6 shadow-md">
        <div className="w-[100px] h-[100px] bg-white rounded-2xl flex items-center justify-center text-[40px] flex-shrink-0">
          <img
            src="/src/assets/Gambar/Kopdes.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="font-serif text-[26px] mb-1 font-bold">
            Koperasi Desa Toyareja
          </h2>
          <p className="text-white/70 text-sm">
            KOPDES TOYAREJA, Melayani dengan Hati, Membangun Desa Bersama
          </p>
          <div className="flex items-center gap-2.5 mt-3">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[11px] font-bold before:content-['●'] before:mr-1 before:text-[8px]">
              Aktif
            </span>
            <span className="text-xs text-white/70">
              Berdiri sejak 15 Juni 2025
            </span>
          </div>
        </div>
      </div>

      {/* Informasi Grid */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border">
            <h3 className="text-[15px] font-bold text-dark">
              📍 Informasi Umum
            </h3>
          </div>
          <div className="p-6">
            <table className="w-full text-[13.5px]">
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light w-[40%]">Nama Koperasi</td>
                  <td className="py-2.5 font-semibold text-dark">
                    Koperasi Desa Toyareja
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Singkatan</td>
                  <td className="py-2.5 text-dark">KOPDES TOYAREJA</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">No. Badan Hukum</td>
                  <td className="py-2.5 text-dark">
                    1234/BH/KWK.13-14/VI/2015
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Ketua</td>
                  <td className="py-2.5 text-dark">H. Suparman, S.Ag</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border">
            <h3 className="text-[15px] font-bold text-dark">
              📞 Kontak & Lokasi
            </h3>
          </div>
          <div className="p-6">
            <table className="w-full text-[13.5px]">
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light w-[35%]">Alamat</td>
                  <td className="py-2.5 text-dark">
                    Jl. Desa Makmur No.1, Kec Toyareja
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Telepon</td>
                  <td className="py-2.5 text-dark">(021) 987-6543</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">WhatsApp</td>
                  <td className="py-2.5 text-dark">0812-3456-7890</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Email</td>
                  <td className="py-2.5 text-dark">kopdes.makmur@email.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Deskripsi & Layanan */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border">
          <h3 className="text-[15px] font-bold text-dark">
            📝 Deskripsi & Layanan Koperasi
          </h3>
        </div>
        <div className="p-6">
          <p className="text-[14px] text-mid leading-[1.8] mb-4">
            Koperasi Desa Toyareja adalah koperasi yang didirikan untuk
            meningkatkan kesejahteraan masyarakat desa melalui kegiatan ekonomi
            bersama. Kami menyediakan berbagai layanan mulai dari simpan pinjam,
            penjualan produk kebutuhan sehari-hari, hingga pemasaran hasil
            produksi anggota.
          </p>
          <div className="grid grid-cols-3 gap-[18px]">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-2xl mb-2">🏦</div>
              <div className="font-bold text-[14px] mb-1">Simpan Pinjam</div>
              <div className="text-xs text-light">
                Layanan simpanan dan pinjaman dengan bunga ringan untuk anggota
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-2xl mb-2">🛒</div>
              <div className="font-bold text-[14px] mb-1">Toko Koperasi</div>
              <div className="text-xs text-light">
                Penjualan berbagai kebutuhan pokok dengan harga terjangkau
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-2xl mb-2">🌱</div>
              <div className="font-bold text-[14px] mb-1">Usaha Pertanian</div>
              <div className="text-xs text-light">
                Dukungan sarana pertanian dan pemasaran hasil panen anggota
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
