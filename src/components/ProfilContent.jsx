import { useState } from "react";
import { createPortal } from "react-dom";

export default function ProfilContent() {
  // 1. STATE UNTUK DATA PROFIL
  const [profileData, setProfileData] = useState({
    foto: "/src/assets/Kopdes.png", // Ditambahkan untuk menyimpan path/URL foto
    nama: "Koperasi Desa Toyareja",
    slogan: "KOPDES TOYAREJA, Melayani dengan Hati, Membangun Desa Bersama",
    status: "Aktif",
    tanggalBerdiri: "15 Juni 2025",
    singkatan: "KOPDES TOYAREJA",
    noBadanHukum: "1234/BH/KWK.13-14/VI/2015",
    ketua: "H. Suparman, S.Ag",
    alamat: "Jl. Desa Makmur No.1, Kec Toyareja",
    telepon: "(021) 987-6543",
    whatsapp: "0812-3456-7890",
    email: "kopdes.makmur@email.com",
    deskripsi:
      "Koperasi Desa Toyareja adalah koperasi yang didirikan untuk meningkatkan kesejahteraan masyarakat desa melalui kegiatan ekonomi bersama. Kami menyediakan berbagai layanan mulai dari simpan pinjam, penjualan produk kebutuhan sehari-hari, hingga pemasaran hasil produksi anggota.",
  });

  // 2. STATE UNTUK MODAL & FORM
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(profileData);

  // 3. HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler khusus untuk membaca file foto yang diupload
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, foto: imageUrl });
    }
  };

  const handleBukaModal = () => {
    setFormData(profileData); // Sinkronkan form dengan data terbaru
    setIsModalOpen(true);
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    setProfileData(formData); // Timpa data lama dengan data baru dari form
    setIsModalOpen(false);
    alert("Profil koperasi berhasil diperbarui!");
  };

  return (
    <div className="animate-fadeInUp">
      {/* Profil Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white mb-5 flex gap-6 shadow-md justify-between">
        <div className="flex items-center gap-6">
          <div className="w-[100px] h-[100px] bg-white rounded-2xl flex items-center justify-center text-[40px] flex-shrink-0 overflow-hidden">
            {/* Gambar Profil dinamis dari state */}
            <img
              src={profileData.foto}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-serif text-[26px] mb-1 font-bold">
              {profileData.nama}
            </h2>
            <p className="text-white/70 text-sm">{profileData.slogan}</p>
            <div className="flex items-center gap-2.5 mt-3">
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[11px] font-bold before:content-['●'] before:mr-1 before:text-[8px]">
                {profileData.status}
              </span>
              <span className="text-xs text-white/70">
                Berdiri sejak {profileData.tanggalBerdiri}
              </span>
            </div>
          </div>
        </div>
        {/* tombol edit */}
        <div className="flex items-start justify-end mb-6">
          <button
            onClick={handleBukaModal}
            className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] shadow-sm transition-all"
          >
            ✏️ Edit Profil
          </button>
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
                    {profileData.nama}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Singkatan</td>
                  <td className="py-2.5 text-dark">{profileData.singkatan}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">No. Badan Hukum</td>
                  <td className="py-2.5 text-dark">
                    {profileData.noBadanHukum}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Ketua</td>
                  <td className="py-2.5 text-dark">{profileData.ketua}</td>
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
                  <td className="py-2.5 text-dark">{profileData.alamat}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Telepon</td>
                  <td className="py-2.5 text-dark">{profileData.telepon}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">WhatsApp</td>
                  <td className="py-2.5 text-dark">{profileData.whatsapp}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2.5 text-light">Email</td>
                  <td className="py-2.5 text-dark">{profileData.email}</td>
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
            {profileData.deskripsi}
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

      {/* MODAL EDIT PROFIL */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto pt-10 pb-10 backdrop-blur-sm bg-black/40">
            <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-2xl p-6 relative animate-scaleIn my-auto">
              <div className="flex justify-between items-center mb-5 border-b pb-3">
                <h3 className="text-lg font-extrabold text-dark">
                  ✏️ Edit Profil Koperasi
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-xl text-gray-400 hover:text-dark"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleSimpan}
                className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* INPUT FOTO DITAMBAHKAN DI SINI */}
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-dark block mb-1">
                      Logo / Foto Koperasi
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-gray-200 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <img
                          src={formData.foto}
                          alt="preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      Nama Koperasi
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      Singkatan
                    </label>
                    <input
                      type="text"
                      name="singkatan"
                      value={formData.singkatan}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-dark block mb-1">
                      Slogan / Tagline
                    </label>
                    <input
                      type="text"
                      name="slogan"
                      value={formData.slogan}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      Tanggal Berdiri
                    </label>
                    <input
                      type="text"
                      name="tanggalBerdiri"
                      value={formData.tanggalBerdiri}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      No. Badan Hukum
                    </label>
                    <input
                      type="text"
                      name="noBadanHukum"
                      value={formData.noBadanHukum}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      Ketua Koperasi
                    </label>
                    <input
                      type="text"
                      name="ketua"
                      value={formData.ketua}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-dark block mb-1">
                      Alamat
                    </label>
                    <textarea
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      Telepon
                    </label>
                    <input
                      type="text"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-dark block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-dark block mb-1">
                      Deskripsi Koperasi
                    </label>
                    <textarea
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 bg-gray-100 rounded-lg font-bold text-sm text-dark hover:bg-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 shadow-md"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
