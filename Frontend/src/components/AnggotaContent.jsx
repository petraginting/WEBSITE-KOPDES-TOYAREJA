import { useState } from "react";
import Modal from "./Modal";
import { useAnggota } from "../context/AnggotaContext";

export default function AnggotaContent() {

  const {
    anggotaList,
    getAnggotaById,
    selectedAnggota,
    tambahAnggota,
    updateAnggota
  } = useAnggota();

  const members = anggotaList

  // 2. State untuk Kontrol UI
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    jenisKelamin: "",
    pekerjaan: "",
    tanggalBergabung: "",
    status: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const normalizedMembers = members.map((item) => ({
    id: item.id,
    namaLengkap: item.nama_lengkap,
    nomorRegistrasi: item.no_registrasi,
    nomorKTP: item.nik,
    jenisKelamin: item.jenis_kelamin,
    nomorTelepon: item.user?.no_hp || "-",
    alamatLengkap: item.alamat || "-",
    tanggalLahir: item.tanggal_lahir || "-",
    tanggalBergabung: item.tanggal_bergabung || "-",
    status: item.status_keanggotaan === 'aktif' ? "Aktif" : "Tidak-Aktif",
  }));


  // LOGIKA SEARCH & FILTER
  const filteredMembers = normalizedMembers.filter((member) => {
    // Cek Search (Nama, No. Anggota, atau No. Telepon)
    const matchSearch =
      member.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nomorRegistrasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nomorTelepon.includes(searchTerm);

    // Cek Filter Status
    const matchStatus =
      filterStatus === "Semua Status" ||
      member.status.toLowerCase() === filterStatus.toLowerCase();

    return matchSearch && matchStatus;
  });

  //  FUNGSI CRUD
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateAnggota(formData.id, {
          nama_lengkap: formData.namaLengkap,
          no_registrasi: formData.nomorRegistrasi,
          alamat: formData.alamatLengkap,
          status_keanggotaan: formData.status
        })
      } else {
        await tambahAnggota(formData.nomorTelepon);
      }

      closeFormModal();
    } catch (error) {
      alert(error.message);
    }
  };

  // const handleDelete = (id) => {
  //   if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
  //     setMembers(members.filter((m) => m.id !== id));
  //   }
  // };

  const openEditModal = (member) => {
    setIsEditing(true);
    setFormData({ ...member });
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

  const openDetailModal = async (id) => {
    await getAnggotaById(id)
    setIsModalDetailOpen(true);
  };

  return (
    <div className="animate-fadeInUp">
      {/* HEADER  */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all flex items-center gap-[6px]"
        >
          + Tambah Anggota Baru
        </button>
      </div>

      {/*  SEARCH & FILTER */}
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
          <option value="Tidak-Aktif">Tidak-Aktif</option>
        </select>
        <button className="bg-blue-50 text-blue-700 border border-border px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:bg-blue-100 transition-all flex items-center gap-[6px]">
          Filter
        </button>
      </div>

      {/* TABEL DATA */}
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
                        className={`inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[20px] text-[11px] font-semibold before:content-['●'] before:text-[8px] ${member.status === "Aktif"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-[#f3f4f6] text-[#6b7280]"
                          }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-[16px] py-[13px] flex gap-[6px]">
                      <button
                        onClick={() => openDetailModal(member.id)}
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
                        // onClick={() => handleDelete(member.id)}
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
                    Data anggota kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

      {/*  MODAL FORM (CREATE/UPDATE) */}
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
              {isEditing ? "💾 Simpan Perubahan" : "💾 Tambah Anggota"}
            </button>
          </>
        }
      >
        {!isEditing ?
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
          : (
            <>
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
                    maxLength={16}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
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
                    <option value="aktif">Aktif</option>
                    <option value="tidak_aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
            </>
          )}
      </Modal>


      {/*  MODAL DETAIL LENGKAP  */}
      <Modal
        isOpen={isModalDetailOpen}
        onClose={() => setIsModalDetailOpen(false)}
        title={
          selectedAnggota
            ? `👤 Detail Anggota — ${selectedAnggota.no_registrasi}`
            : ""
        }

      >
        {selectedAnggota && (
          <>
            <div className="bg-blue-50 rounded-[12px] p-[20px] mb-[20px] flex items-center gap-[16px]">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-blue-500 to-blue-400 rounded-[14px] flex items-center justify-center text-[28px] text-white shadow-sm">
                👤
              </div>
              <div>
                <div className="text-[18px] font-bold text-dark">
                  {selectedAnggota.nama_lengkap}
                </div>
                <div className="text-[12px] text-light mt-[2px]">
                  No. Registrasi: {selectedAnggota.no_registrasi}
                </div>
                <span
                  className={`inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[20px] text-[11px] font-semibold before:content-['●'] before:text-[8px] mt-[6px] ${selectedAnggota.status === "Aktif"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                >
                  {selectedAnggota.status_keanggotaan}
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
                    {selectedAnggota.alamat || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">No. Telepon</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedAnggota.user?.no_hp || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">No. KTP</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedAnggota.nik || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Jenis Kelamin</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedAnggota.jenis_kelamin || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Tanggal Lahir</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedAnggota.tanggal_lahir || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Pekerjaan</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedAnggota.pekerjaan || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Tgl. Bergabung</td>
                  <td className="py-[8px] text-dark font-medium">
                    {selectedAnggota.tanggal_bergabung || "-"}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Total Simpanan</td>
                  <td className="py-[8px]">
                    <strong className="text-blue-600">Rp {selectedAnggota.total_simpanan}</strong>{" "}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="text-light py-[8px]">Total Poin</td>
                  <td className="py-[8px]">
                    <strong className="text-blue-500">{selectedAnggota.poin}</strong>
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
