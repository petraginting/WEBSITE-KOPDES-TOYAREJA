import { useState } from "react";
import Modal from "./Modal";

export default function AnggotaContent() {
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const data = [
    {
      nomorRegistrasi: 1,
      namaLengkap: "Budi Santoso",
      nomorKTP: "123344455667788",
      nomorTelepon: "081234567890",
      tanggalLahir: "",
      alamatLengkap: "",
      jenisKelamin: "",
      pekerjaan: "",
      tanggalBergabung: "",
    },
  ];

  return (
    <div className="animate-fadeInUp">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-dark">
            👥 Manajemen Data Anggota
          </h2>
          <p className="text-[13px] text-light mt-[2px]">
            Mengelola data anggota koperasi Anda
          </p>
        </div>
        <button
          onClick={() => setIsModalTambahOpen(true)}
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
            placeholder="Cari nama, nomor anggota, atau telepon..."
            className="w-full bg-white border border-border rounded-[12px] py-[10px] pr-[16px] pl-[40px] text-[13.5px] text-dark outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all"
          />
        </div>
        <select className="border border-border rounded-[12px] px-[12px] py-[8px] text-[13px] text-dark bg-white outline-none focus:border-blue-400 cursor-pointer">
          <option>Semua Status</option>
          <option>Aktif</option>
          <option>Non-Aktif</option>
        </select>
        <button className="bg-blue-50 text-blue-700 border border-border px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:bg-blue-100 transition-all flex items-center gap-[6px]">
          Filter
        </button>
      </div>

      {/* ── TABEL DATA ── */}
      <div className="bg-white border border-border rounded-[20px] overflow-hidden">
        <div className="px-[24px] py-[20px] border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-dark">
            Daftar Anggota (248 anggota)
          </h3>
          <button className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100 transition-all">
            ⬇ Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  No. Anggota
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  No.Registrasi
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  Nama Lengkap
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  Alamat
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  No. Telepon
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  Tgl. Bergabung
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  Status
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-[12px] tracking-[0.3px] px-[16px] py-[12px] text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="px-[16px] py-[13px] border-b border-blue-50 text-dark font-bold">
                  #A001
                </td>
                <td className="px-[16px] py-[13px] border-b border-blue-50 text-dark">
                  01
                </td>
                <td className="px-[16px] py-[13px] border-b border-blue-50 text-dark">
                  Budi Santoso
                </td>
                <td className="px-[16px] py-[13px] border-b border-blue-50 text-dark">
                  Jl. Merdeka No.12, Desa Makmur
                </td>
                <td className="px-[16px] py-[13px] border-b border-blue-50 text-dark">
                  081234567890
                </td>
                <td className="px-[16px] py-[13px] border-b border-blue-50 text-dark">
                  01/01/2020
                </td>
                <td className="px-[16px] py-[13px] border-b border-blue-50">
                  <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[20px] text-[11px] font-semibold bg-blue-100 text-blue-700 before:content-['●'] before:text-[8px]">
                    Aktif
                  </span>
                </td>
                <td className="px-[16px] py-[13px] border-b border-blue-50 flex gap-[6px]">
                  <button
                    onClick={() => setIsModalDetailOpen(true)}
                    className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100 transition-all"
                  >
                    Detail
                  </button>
                  <button className="bg-blue-50 text-blue-700 border border-border px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-blue-100 transition-all">
                    Edit
                  </button>
                  <button className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] px-[12px] py-[6px] rounded-[12px] text-[12px] font-semibold hover:bg-[#fecaca] transition-all">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ════════════════════════ MODAL TAMBAH ANGGOTA ════════════════════════ */}
      <Modal
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
        title="👤 Tambah Anggota Baru"
        footer={
          <>
            <button
              onClick={() => setIsModalTambahOpen(false)}
              className="bg-blue-50 text-blue-700 border border-border px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:bg-blue-100 transition-all"
            >
              Batal
            </button>
            <button
              onClick={() => setIsModalTambahOpen(false)}
              className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all"
            >
              💾 Simpan Anggota
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
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark"
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Nomor Registrasi
            </label>
            <input
              type="text"
              placeholder="Masukkan nomor registrasi"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Nomor KTP
            </label>
            <input
              type="text"
              placeholder="16 digit NIK"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              No. Telepon
            </label>
            <input
              type="text"
              placeholder="08xx-xxxx-xxxx"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark"
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark"
            />
          </div>
        </div>
        <div className="mb-[16px]">
          <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
            Alamat Lengkap
          </label>
          <textarea
            placeholder="Jl. ... No. ..., Desa ..., Kecamatan ..."
            className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark min-h-[80px] resize-y"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Jenis Kelamin
            </label>
            <select className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark cursor-pointer">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
              Pekerjaan
            </label>
            <input
              type="text"
              placeholder="Petani / Pedagang / dll"
              className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark"
            />
          </div>
        </div>
        <div className="mb-[16px]">
          <label className="block text-[12.5px] font-semibold text-mid mb-[6px]">
            Tanggal Bergabung
          </label>
          <input
            type="date"
            className="w-full border border-border rounded-[12px] px-[13px] py-[9px] text-[13.5px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all bg-white text-dark"
          />
        </div>
      </Modal>

      {/* ════════════════════════ MODAL DETAIL ANGGOTA ════════════════════════ */}
      <Modal
        isOpen={isModalDetailOpen}
        onClose={() => setIsModalDetailOpen(false)}
        title="👤 Detail Anggota — #A001"
        footer={
          <>
            <button
              onClick={() => setIsModalDetailOpen(false)}
              className="bg-blue-50 text-blue-700 border border-border px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:bg-blue-100 transition-all"
            >
              Tutup
            </button>
            <button
              onClick={() => setIsModalDetailOpen(false)}
              className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-[18px] py-[9px] rounded-[12px] text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all"
            >
              ✏️ Edit Data
            </button>
          </>
        }
      >
        <div className="bg-blue-50 rounded-[12px] p-[20px] mb-[20px] flex items-center gap-[16px]">
          <div className="w-[60px] h-[60px] bg-gradient-to-br from-blue-500 to-blue-400 rounded-[14px] flex items-center justify-center text-[28px] text-white shadow-sm">
            👤
          </div>
          <div>
            <div className="text-[18px] font-bold text-dark">Budi Santoso</div>
            <div className="text-[12px] text-light mt-[2px]">
              No. Anggota: #A001
            </div>
            <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-[20px] text-[11px] font-semibold bg-blue-100 text-blue-700 before:content-['●'] before:text-[8px] mt-[6px]">
              Aktif
            </span>
          </div>
        </div>

        <table className="w-full text-[13.5px]">
          <tbody>
            <tr>
              <td className="text-light py-[8px] w-[40%]">Alamat</td>
              <td className="py-[8px] text-dark font-medium">
                Jl. Merdeka No.12, Desa Makmur
              </td>
            </tr>
            <tr>
              <td className="text-light py-[8px]">No. Telepon</td>
              <td className="py-[8px] text-dark font-medium">081234567890</td>
            </tr>
            <tr>
              <td className="text-light py-[8px]">No. KTP</td>
              <td className="py-[8px] text-dark font-medium">
                3201234567890001
              </td>
            </tr>
            <tr>
              <td className="text-light py-[8px]">Tgl. Lahir</td>
              <td className="py-[8px] text-dark font-medium">15 April 1985</td>
            </tr>
            <tr>
              <td className="text-light py-[8px]">Pekerjaan</td>
              <td className="py-[8px] text-dark font-medium">Petani</td>
            </tr>
            <tr>
              <td className="text-light py-[8px]">Tgl. Bergabung</td>
              <td className="py-[8px] text-dark font-medium">
                01 Januari 2020
              </td>
            </tr>
            <tr>
              <td className="text-light py-[8px]">Total Simpanan</td>
              <td className="py-[8px]">
                <strong className="text-blue-600">Rp 2.100.000</strong>
              </td>
            </tr>
            <tr>
              <td className="text-light py-[8px]">Total Pesanan</td>
              <td className="py-[8px] text-dark font-medium">18 pesanan</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
}
