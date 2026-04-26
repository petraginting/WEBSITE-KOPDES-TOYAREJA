import { useEffect, useState } from "react";
import Modal from "./Modal";
import { tambahSimpanan, updateSimpanan } from "../api/auth/simpanan";
import { useSimpanan } from "../context/SimpananContext";

// --- Fungsi Penolong ---

// 1. Format untuk tampilan di Tabel & Stats (Contoh: Rp 1.000.000)
const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

// 2. Format untuk di dalam Input saat mengetik (Contoh: 1.000.000)
const formatInputRupiah = (angka) => {
  if (angka === 0 || !angka) return "";
  const numberString = angka.toString().replace(/[^0-9]/g, "");
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function SimpananContent() {
  const { simpananData, fetchSimpanan } = useSimpanan();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    no_registrasi: "",
    nama_lengkap: "",
    jumlah_pokok: 0,
    jumlah_wajib: 0,
    jumlah_sukarela: 0,
  });


  useEffect(() => {
    fetchSimpanan();
  }, [fetchSimpanan]);

  // --- HANDLER SIMPAN ---
  const handleSave = async () => {
    try {
      if (isEditing) {
        const response = await updateSimpanan(id, formData);
        if (response.success) {
          alert("Simpanan Berhasil diupdate!");
          // fetchData(); // Refresh data tabel
          closeFormModal();
        } else {
          alert(response.message)
        }
      } else {

        const response = await tambahSimpanan(formData);
        if (response.success) {
          alert("Simpanan Berhasil!");
          // fetchData(); // Refresh data tabel
          closeFormModal();
        }
      }
    } catch (err) {
      alert(err.message); // Menampilkan pesan error dari backend (misal: "Akses ditolak")
    }
  };

  // --- LOGIKA PERHITUNGAN & FILTER ---
  // Perbaikan hitung total (sesuaikan dengan nama field di DB)
  const totalPokok = simpananData.reduce((sum, item) => sum + (item.jumlah_pokok || 0), 0);
  const totalWajib = simpananData.reduce((sum, item) => sum + (item.jumlah_wajib || 0), 0);
  const totalSukarela = simpananData.reduce((sum, item) => sum + (item.jumlah_sukarela || 0), 0);


  const filteredData = simpananData.filter(
    (item) =>
      item.user?.anggota?.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.anggota?.no_registrasi.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- FUNGSI HANDLER ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Jika input jumlah uang, hilangkan titik formatan dan ubah ke angka
    if (name.startsWith("jumlah_")) {
      const rawValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: Number(rawValue) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openAddModal = () => {
    setIsEditing(false); // Set false untuk tambah data
    setFormData({ no_registrasi: "", jumlah_pokok: 0, jumlah_wajib: 0, jumlah_sukarela: 0 });
    setIsFormModalOpen(true);
  };

  const openEditModal = (data) => {
    setIsEditing(true); // Set true untuk edit
    setFormData(data);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };



  // const handleDelete = (id) => {
  //   if (
  //     window.confirm("Apakah Anda yakin ingin menghapus data simpanan ini?")
  //   ) {
  //     setSimpananData(simpananData.filter((s) => s.id !== id));
  //   }
  // };

  return (
    <div className="animate-fadeInUp">
      {/*  HEADER */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all"
        >
          + Tambah Simpanan
        </button>
      </div>
      {/* STATS GRID  */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="text-[28px] mb-3">💎</div>
          <div className="text-[24px] font-extrabold text-dark font-serif">
            {formatRupiah(totalPokok)}
          </div>
          <div className="text-xs text-light font-medium mt-1">
            Total Simpanan Pokok
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-500 to-orange-400"></div>
          <div className="text-[28px] mb-3">📅</div>
          <div className="text-[24px] font-extrabold text-dark font-serif">
            {formatRupiah(totalWajib)}
          </div>
          <div className="text-xs text-light font-medium mt-1">
            Total Simpanan Wajib
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-blue-400"></div>
          <div className="text-[28px] mb-3">🏦</div>
          <div className="text-[24px] font-extrabold text-dark font-serif">
            {formatRupiah(totalSukarela)}
          </div>
          <div className="text-xs text-light font-medium mt-1">
            Total Simpanan Sukarela
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER  */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-light text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama atau nomor anggota..."
            className="w-full bg-white border border-border rounded-xl py-2.5 pr-4 pl-10 text-[13.5px] text-dark outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400/10 transition-all"
          />
        </div>
      </div>

      {/* TABEL DATA  */}
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
              <tr className="bg-blue-50 text-mid font-semibold text-xs tracking-[0.3px]">
                <th className="px-4 py-3 text-left">No. Anggota</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Pokok</th>
                <th className="px-4 py-3 text-left">Wajib</th>
                <th className="px-4 py-3 text-left">Sukarela</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const totalRow =
                    item.jumlah_pokok +
                    item.jumlah_wajib +
                    item.jumlah_sukarela;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50 border-b border-blue-50 last:border-none transition-colors"
                    >
                      <td className="px-4 py-3 text-dark font-medium">
                        {item.user?.anggota?.no_registrasi}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {item.user?.anggota?.nama_lengkap}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {formatRupiah(item.jumlah_pokok)}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {formatRupiah(item.jumlah_wajib)}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {formatRupiah(item.jumlah_sukarela)}
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-700">
                        {formatRupiah(totalRow)}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => { openEditModal(item), setId(item.id) }}
                          className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          // onClick={() => handleDelete(item.id)}
                          className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#fecaca] transition-all"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-light">
                    Data simpanan tidak ditemukan...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/*  MODAL FORM (TAMBAH/EDIT)  */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        title={isEditing ? "✏️ Edit Simpanan" : "💰 Tambah Simpanan"}
        footer={
          <>
            <button
              onClick={closeFormModal}
              className="bg-blue-50 text-blue-700 border border-border px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:bg-blue-100"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold shadow-md hover:-translate-y-[1px]"
            >
              {isEditing ? "Simpan Perubahan" : "Simpan Data"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              No. Registrasi
            </label>
            <input
              name="no_registrasi"
              value={formData.no_registrasi}
              onChange={handleInputChange}
              type="text"
              placeholder="01"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Nama Lengkap
            </label>
            <input
              name="nama_lengkap"
              value={formData.nama_lengkap}
              onChange={handleInputChange}
              type="text"
              placeholder="Budi Santoso"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>

          <div className="col-span-full space-y-[16px]">
            <div>
              <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
                Simpanan Pokok (Rp)
              </label>
              <input
                name="jumlah_pokok"
                value={formatInputRupiah(formData.jumlah_pokok)}
                onChange={handleInputChange}
                type="text"
                placeholder="0"
                className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
                Simpanan Wajib (Rp)
              </label>
              <input
                name="jumlah_wajib"
                value={formatInputRupiah(formData.jumlah_wajib)}
                onChange={handleInputChange}
                type="text"
                placeholder="0"
                className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
                Simpanan Sukarela (Rp)
              </label>
              <input
                name="jumlah_sukarela"
                value={formatInputRupiah(formData.jumlah_sukarela)}
                onChange={handleInputChange}
                type="text"
                placeholder="0"
                className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
