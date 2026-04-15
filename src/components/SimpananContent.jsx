import { useState } from "react";
import Modal from "./Modal";

// --- HELPER FUNCTIONS ---

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
  // --- STATE UTAMA ---
  const [simpananData, setSimpananData] = useState([
    {
      id: 1,
      nomorAnggota: "#A001",
      namaLengkap: "Budi Santoso",
      simpananPokok: 1000000,
      simpananWajib: 600000,
      simpananSukarela: 500000,
    },
    {
      id: 2,
      nomorAnggota: "#A002",
      namaLengkap: "Siti Rahayu",
      simpananPokok: 1000000,
      simpananWajib: 500000,
      simpananSukarela: 250000,
    },
    {
      id: 3,
      nomorAnggota: "#A003",
      namaLengkap: "Ahmad Fauzi",
      simpananPokok: 1000000,
      simpananWajib: 700000,
      simpananSukarela: 1000000,
    },
  ]);

  // --- STATE UI & FORM ---
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const initialFormState = {
    nomorAnggota: "",
    namaLengkap: "",
    simpananPokok: 0,
    simpananWajib: 0,
    simpananSukarela: 0,
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- LOGIKA PERHITUNGAN & FILTER ---
  const totalPokok = simpananData.reduce(
    (sum, item) => sum + item.simpananPokok,
    0,
  );
  const totalWajib = simpananData.reduce(
    (sum, item) => sum + item.simpananWajib,
    0,
  );
  const totalSukarela = simpananData.reduce(
    (sum, item) => sum + item.simpananSukarela,
    0,
  );

  const filteredData = simpananData.filter(
    (item) =>
      item.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomorAnggota.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- FUNGSI HANDLER ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Jika input adalah bagian simpanan (uang)
    if (name.startsWith("simpanan")) {
      const rawValue = value.replace(/[^0-9]/g, ""); // Hanya ambil angka murni
      setFormData({ ...formData, [name]: Number(rawValue) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setIsFormModalOpen(true);
  };

  const openEditModal = (data) => {
    setIsEditing(true);
    setFormData(data);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setFormData(initialFormState);
  };

  const handleSave = () => {
    if (isEditing) {
      setSimpananData(
        simpananData.map((s) => (s.id === formData.id ? { ...formData } : s)),
      );
    } else {
      const newData = {
        ...formData,
        id: Date.now(),
        // Memberikan nomor default jika kosong
        nomorAnggota:
          formData.nomorAnggota ||
          `#A${String(simpananData.length + 1).padStart(3, "0")}`,
      };
      setSimpananData([...simpananData, newData]);
    }
    closeFormModal();
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus data simpanan ini?")
    ) {
      setSimpananData(simpananData.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="animate-fadeInUp">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all"
        >
          + Tambah Simpanan
        </button>
      </div>

      {/* ── STATS GRID ── */}
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

      {/* ── SEARCH & FILTER ── */}
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

      {/* ── TABEL DATA ── */}
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
                    item.simpananPokok +
                    item.simpananWajib +
                    item.simpananSukarela;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50 border-b border-blue-50 last:border-none transition-colors"
                    >
                      <td className="px-4 py-3 text-dark font-medium">
                        {item.nomorAnggota}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {item.namaLengkap}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {formatRupiah(item.simpananPokok)}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {formatRupiah(item.simpananWajib)}
                      </td>
                      <td className="px-4 py-3 text-dark">
                        {formatRupiah(item.simpananSukarela)}
                      </td>
                      <td className="px-4 py-3 text-dark font-bold text-blue-700">
                        {formatRupiah(totalRow)}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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

      {/* ── MODAL FORM (TAMBAH/EDIT) ── */}
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
              No. Anggota
            </label>
            <input
              name="nomorAnggota"
              value={formData.nomorAnggota}
              onChange={handleInputChange}
              type="text"
              placeholder="#A001"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Nama Lengkap
            </label>
            <input
              name="namaLengkap"
              value={formData.namaLengkap}
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
                name="simpananPokok"
                value={formatInputRupiah(formData.simpananPokok)}
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
                name="simpananWajib"
                value={formatInputRupiah(formData.simpananWajib)}
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
                name="simpananSukarela"
                value={formatInputRupiah(formData.simpananSukarela)}
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
