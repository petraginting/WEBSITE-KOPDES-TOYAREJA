import { useState } from "react";
import Modal from "./Modal";

export default function AnggotaContent() {
  // 1. State Utama untuk Data
  const [members, setMembers] = useState([
    {
      id: 1,
      nomorRegistrasi: "01",
      nomorAnggota: "#A001",
      namaLengkap: "Budi Santoso",
      nomorKTP: "3201234567890001",
      nomorTelepon: "081234567890",
      tanggalLahir: "1985-04-15",
      alamatLengkap: "Jl. Merdeka No.12, Desa Makmur",
      jenisKelamin: "Laki-laki",
      pekerjaan: "Petani",
      tanggalBergabung: "2020-01-01",
      status: "Aktif",
    },
    {
      id: 2,
      nomorRegistrasi: "02",
      nomorAnggota: "#A002",
      namaLengkap: "Siti Rahayu",
      nomorKTP: "3201234567890002",
      nomorTelepon: "087654321098",
      tanggalLahir: "1988-08-20",
      alamatLengkap: "Jl. Raya No.5, Desa Makmur",
      jenisKelamin: "Perempuan",
      pekerjaan: "Pedagang",
      tanggalBergabung: "2020-03-15",
      status: "Non-Aktif",
    },
  ]);

  // 2. State untuk Kontrol UI
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // 3. State untuk Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  // 4. State untuk Form Input
  const initialFormState = {
    namaLengkap: "",
    nomorRegistrasi: "",
    nomorKTP: "",
    nomorTelepon: "",
    tanggalLahir: "",
    alamatLengkap: "",
    jenisKelamin: "Laki-laki",
    pekerjaan: "",
    tanggalBergabung: "",
    status: "Aktif", // Default form
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- LOGIKA SEARCH & FILTER ---
  const filteredMembers = members.filter((member) => {
    // Cek Search (Nama, No. Anggota, atau No. Telepon)
    const matchSearch =
      member.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nomorAnggota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nomorTelepon.includes(searchTerm);

    // Cek Filter Status
    const matchStatus =
      filterStatus === "Semua Status" || member.status === filterStatus;

    return matchSearch && matchStatus;
  });

  // --- FUNGSI CRUD ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (isEditing) {
      setMembers(
        members.map((m) => (m.id === formData.id ? { ...formData } : m)),
      );
    } else {
      const newMember = {
        ...formData,
        id: Date.now(),
        nomorAnggota: `#A${String(members.length + 1).padStart(3, "0")}`,
      };
      setMembers([...members, newMember]);
    }
    closeFormModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const openEditModal = (member) => {
    setIsEditing(true);
    setFormData(member);
    setIsFormModalOpen(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setFormData(initialFormState);
  };

  const openDetailModal = (member) => {
    setSelectedMember(member);
    setIsModalDetailOpen(true);
  };

  return (
    <div className="animate-fadeInUp">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all flex items-center gap-[6px]"
        >
          + Tambah Anggota Baru
        </button>
      </div>

      {/* ── SEARCH & FILTER ── */}
      <div className="flex items-center gap-[12px] mb-[20px]">
        <div className="relative flex-1">
          <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-light text-[14px]">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, nomor anggota, atau telepon..."
            className="w-full bg-white border border-border rounded-[12px] py-[10px] pr-[16px] pl-[40px] text-[13.5px] text-dark outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-border rounded-[12px] px-[12px] py-[8px] text-[13px] text-dark bg-white outline-none focus:border-blue-400 cursor-pointer"
        >
          <option value="Semua Status">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Non-Aktif">Non-Aktif</option>
        </select>
        <button className="bg-blue-50 text-blue-700 border border-border px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:bg-blue-100 transition-all flex items-center gap-[6px]">
          Filter
        </button>
      </div>

      {/* ── TABEL DATA ── */}
      <div className="bg-white border border-border rounded-[20px] overflow-hidden shadow-sm">
        <div className="px-[24px] py-[20px] border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-dark">
            Daftar Anggota ({filteredMembers.length} anggota)
          </h3>
          <button className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100 transition-all">
            ⬇ Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px]">
                <th className="px-[16px] py-[12px] text-left">No. Anggota</th>
                <th className="px-[16px] py-[12px] text-left">
                  No. Registrasi
                </th>
                <th className="px-[16px] py-[12px] text-left">Nama Lengkap</th>
                <th className="px-[16px] py-[12px] text-left">Alamat</th>
                <th className="px-[16px] py-[12px] text-left">No. Telepon</th>
                <th className="px-[16px] py-[12px] text-left">
                  Tgl. Bergabung
                </th>
                <th className="px-[16px] py-[12px] text-left">Status</th>
                <th className="px-[16px] py-[12px] text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-blue-50 transition-colors border-b border-blue-50 last:border-none"
                  >
                    <td className="px-[16px] py-[13px] text-dark font-bold">
                      {member.nomorAnggota}
                    </td>
                    <td className="px-[16px] py-[13px] text-dark">
                      {member.nomorRegistrasi}
                    </td>
                    <td className="px-[16px] py-[13px] text-dark">
                      {member.namaLengkap}
                    </td>
                    <td className="px-[16px] py-[13px] text-dark truncate max-w-[150px]">
                      {member.alamatLengkap}
                    </td>
                    <td className="px-[16px] py-[13px] text-dark">
                      {member.nomorTelepon}
                    </td>
                    <td className="px-[16px] py-[13px] text-dark">
                      {member.tanggalBergabung}
                    </td>
                    <td className="px-[16px] py-[13px]">
                      <span
                        className={`inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[20px] text-[11px] font-semibold before:content-['●'] before:text-[8px] ${
                          member.status === "Aktif"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-[#f3f4f6] text-[#6b7280]"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-[16px] py-[13px] flex gap-[6px]">
                      <button
                        onClick={() => openDetailModal(member)}
                        className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => openEditModal(member)}
                        className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-[#fecaca]"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-light">
                    Data tidak ditemukan...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Asli dari HTML */}
        <div className="px-[24px] py-[16px] border-t border-border flex justify-between items-center text-[13px] text-light">
          <span>
            Menampilkan 1–{filteredMembers.length} dari {members.length} anggota
          </span>
          <div className="flex gap-[6px]">
            <button className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100">
              ← Prev
            </button>
            <button className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold">
              1
            </button>
            <button className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100">
              2
            </button>
            <button className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100">
              3
            </button>
            <button className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════ MODAL FORM (CREATE/UPDATE) ════════════════════════ */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        title={isEditing ? "✏️ Edit Data Anggota" : "👤 Tambah Anggota Baru"}
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
              {isEditing ? "💾 Simpan Perubahan" : "💾 Simpan Anggota"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Nama Lengkap
            </label>
            <input
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleInputChange}
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Nomor Registrasi
            </label>
            <input
              name="nomorRegistrasi"
              value={formData.nomorRegistrasi}
              onChange={handleInputChange}
              type="text"
              placeholder="Contoh: 01"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Nomor KTP
            </label>
            <input
              name="nomorKTP"
              value={formData.nomorKTP}
              onChange={handleInputChange}
              type="text"
              placeholder="16 digit NIK"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              No. Telepon
            </label>
            <input
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={handleInputChange}
              type="text"
              placeholder="08xx-xxxx-xxxx"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Tanggal Lahir
            </label>
            <input
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleInputChange}
              type="date"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
        </div>
        <div className="mb-[16px]">
          <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
            Alamat Lengkap
          </label>
          <textarea
            name="alamatLengkap"
            value={formData.alamatLengkap}
            onChange={handleInputChange}
            placeholder="Jl. ... No. ..., Desa ..., Kecamatan ..."
            className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white min-h-[80px] resize-y"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Jenis Kelamin
            </label>
            <select
              name="jenisKelamin"
              value={formData.jenisKelamin}
              onChange={handleInputChange}
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white cursor-pointer"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Pekerjaan
            </label>
            <input
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleInputChange}
              type="text"
              placeholder="Petani / Pedagang / dll"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Tanggal Bergabung
            </label>
            <input
              name="tanggalBergabung"
              value={formData.tanggalBergabung}
              onChange={handleInputChange}
              type="date"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Status Keanggotaan
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 bg-white cursor-pointer"
            >
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* ════════════════════════ MODAL DETAIL LENGKAP ════════════════════════ */}
      <Modal
        isOpen={isModalDetailOpen}
        onClose={() => setIsModalDetailOpen(false)}
        title={
          selectedMember
            ? `👤 Detail Anggota — ${selectedMember.nomorAnggota}`
            : ""
        }
        footer={
          <>
            <button
              onClick={() => setIsModalDetailOpen(false)}
              className="bg-blue-50 text-blue-700 border border-border px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:bg-blue-100"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                setIsModalDetailOpen(false);
                openEditModal(selectedMember);
              }}
              className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all"
            >
              ✏️ Edit Data
            </button>
          </>
        }
      >
        {selectedMember && (
          <>
            <div className="bg-blue-50 rounded-[12px] p-[20px] mb-[20px] flex items-center gap-[16px]">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-blue-500 to-blue-400 rounded-[14px] flex items-center justify-center text-[28px] text-white shadow-sm">
                👤
              </div>
              <div>
                <div className="text-[18px] font-bold text-dark">
                  {selectedMember.namaLengkap}
                </div>
                <div className="text-[12px] text-light mt-[2px]">
                  No. Registrasi: {selectedMember.nomorRegistrasi}
                </div>
                <span
                  className={`inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[20px] text-[11px] font-semibold before:content-['●'] before:text-[8px] mt-[6px] ${
                    selectedMember.status === "Aktif"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-[#f3f4f6] text-[#6b7280]"
                  }`}
                >
                  {selectedMember.status}
                </span>
              </div>
            </div>

            <table className="w-full text-[13.5px]">
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px] w-[40%]">
                    Alamat Lengkap
                  </td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedMember.alamatLengkap || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">No. Telepon</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedMember.nomorTelepon || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">No. KTP</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedMember.nomorKTP || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Jenis Kelamin</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedMember.jenisKelamin || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Tanggal Lahir</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedMember.tanggalLahir || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Pekerjaan</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedMember.pekerjaan || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Tgl. Bergabung</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedMember.tanggalBergabung || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Total Simpanan</td>
                  <td className="py-[8px]">
                    <strong className="text-blue-600">Rp 2.100.000</strong>{" "}
                    <span className="text-[10px] text-light">(Dummy)</span>
                  </td>
                </tr>
                <tr>
                  <td className="text-light py-[8px]">Total Pesanan</td>
                  <td className="py-[8px] text-dark font-medium">
                    18 pesanan{" "}
                    <span className="text-[10px] text-light">(Dummy)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </Modal>
    </div>
  );
}
