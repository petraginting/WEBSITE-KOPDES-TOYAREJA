import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE BARU UNTUK FITUR EDIT (CRUD) ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // READ: Fungsi memanggil API Backend (Laravel)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // UNTUK NANTI: Endpoint untuk mengambil data profil pengguna yang sedang login
        // const response = await api.get('/user/profile');
        // setProfile(response.data.data);
        // setFormData(response.data.data); // Sinkronisasi form data

        // --- DATA DUMMY SEMENTARA SESUAI DESAIN ---
        setTimeout(() => {
          const dummyData = {
            nama_lengkap: "Andi Pratama",
            member_sejak: "April 2026",
            email: "andi.pratama@email.com",
            no_hp: "+62 812-3456-7890",
            alamat: "Jl. Raya Toyareja No. 45, Cilacap, Jawa Tengah",
            total_transaksi: 0,
            poin_rewards: 0,
          };
          setProfile(dummyData);
          setFormData(dummyData); // Isi form awal dengan data asli
          setIsLoading(false);
        }, 600); // Simulasi loading
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handler saat form input diketik
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATE: Fungsi menyimpan perubahan ke Backend
  const handleSave = async () => {
    try {
      // UNTUK NANTI: Kirim data baru ke backend
      // await api.put('/user/profile/update', formData);

      setProfile(formData); // Perbarui tampilan UI
      setIsEditing(false); // Matikan mode edit
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      // Simulasi sukses jika API mati
      setProfile(formData);
      setIsEditing(false);
      alert("Profil berhasil diperbarui! (Simulasi)");
    }
  };

  // Kumpulan Ikon SVG
  const Icons = {
    User: (
      <svg
        className="w-8 h-8 text-[#2563eb]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    UserSmall: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    Email: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    Phone: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    Location: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    Edit: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[450px] bg-white min-h-screen relative pb-24">
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b border-gray-100">
          <h1 className="text-[22px] font-bold text-[#1e293b] tracking-tight">
            Profile
          </h1>
        </div>

        <div className="px-5 mt-5">
          {isLoading ? (
            <div className="animate-pulse flex flex-col gap-5">
              <div className="h-48 bg-gray-200 rounded-[20px] w-full"></div>
              <div className="h-64 bg-gray-200 rounded-[20px] w-full"></div>
            </div>
          ) : (
            <>
              {/* 1. KARTU IDENTITAS (BIRU) */}
              <div className="bg-[#2563eb] rounded-[20px] p-6 flex flex-col items-center text-center shadow-[0_8px_20px_rgba(37,99,235,0.2)] mb-6 transition-all">
                <div className="w-[84px] h-[84px] bg-white rounded-full flex items-center justify-center mb-4 shadow-inner">
                  {Icons.User}
                </div>
                <h2 className="text-white font-bold text-[20px] mb-0.5">
                  {profile.nama_lengkap}
                </h2>
                <p className="text-blue-100 text-[13px]">
                  Member sejak {profile.member_sejak}
                </p>
              </div>

              {/* 2. KARTU INFORMASI PRIBADI */}
              <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6 transition-all">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-gray-900 text-[16px]">
                    Informasi Pribadi
                  </h3>

                  {/* TOMBOL EDIT / SIMPAN */}
                  <button
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                      isEditing
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "text-[#2563eb] bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    {!isEditing && (
                      <div className="bg-white text-blue-500 p-0.5 rounded-sm shadow-sm">
                        {Icons.Edit}
                      </div>
                    )}
                    <span className="font-semibold text-[13px]">
                      {isEditing ? "Simpan" : "Edit"}
                    </span>
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Row Nama */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      {Icons.UserSmall}
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Nama Lengkap
                      </span>
                      {isEditing ? (
                        <input
                          name="nama_lengkap"
                          value={formData.nama_lengkap}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[14px] outline-none focus:border-blue-500 font-medium"
                        />
                      ) : (
                        <span className="text-gray-900 font-bold text-[14px]">
                          {profile.nama_lengkap}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row Email (Biasanya email tidak bisa diubah langsung, jadi dibiarkan statis) */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      {Icons.Email}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Email
                      </span>
                      <span className="text-gray-900 font-bold text-[14px]">
                        {profile.email}
                      </span>
                    </div>
                  </div>

                  {/* Row No HP */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      {Icons.Phone}
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Nomor Telepon
                      </span>
                      {isEditing ? (
                        <input
                          name="no_hp"
                          type="text"
                          value={formData.no_hp}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[14px] outline-none focus:border-blue-500 font-medium"
                        />
                      ) : (
                        <span className="text-gray-900 font-bold text-[14px]">
                          {profile.no_hp}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row Alamat */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      {Icons.Location}
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Alamat
                      </span>
                      {isEditing ? (
                        <textarea
                          name="alamat"
                          rows="2"
                          value={formData.alamat}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[14px] outline-none focus:border-blue-500 font-medium leading-snug resize-none"
                        />
                      ) : (
                        <span className="text-gray-900 font-bold text-[14px] leading-snug">
                          {profile.alamat}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. STATISTIK AKUN */}
              <div>
                <h3 className="font-bold text-[#1e293b] text-[16px] mb-3 px-1">
                  Statistik Akun
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f0f5ff] rounded-[16px] p-4 flex flex-col items-center justify-center border border-blue-50">
                    <span className="text-[#2563eb] font-bold text-[28px] leading-none mb-1">
                      {profile.total_transaksi}
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium">
                      Total Transaksi
                    </span>
                  </div>

                  <div className="bg-[#fffcf0] rounded-[16px] p-4 flex flex-col items-center justify-center border border-yellow-50">
                    <span className="text-[#d97706] font-bold text-[28px] leading-none mb-1">
                      {profile.poin_rewards}
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium">
                      Poin Rewards
                    </span>
                  </div>
                </div>
              </div>

              {/* Tombol Logout */}
              <div className="mt-8 mb-4">
                <button
                  onClick={() => {
                    if (window.confirm("Yakin ingin keluar?"))
                      window.location.href = "/";
                  }}
                  className="w-full bg-red-50 text-red-600 font-bold text-[15px] py-3.5 rounded-xl hover:bg-red-100 transition-colors"
                >
                  Keluar Akun
                </button>
              </div>
            </>
          )}
        </div>

        {/* Panggil Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
