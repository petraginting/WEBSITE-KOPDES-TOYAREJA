import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import {
  User,
  VenusAndMars,
  Mail,
  Phone,
  MapPin,
  Edit2,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getUserOrders } from "../api/orders";
import PreviewFoto from "../components/profile/PreviewFoto";

export default function Profile() {
  const { profile, loading } = useAuth()

  const { logout } = useAuth();
  const foto = localStorage.getItem('userAvatar')


  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Gagal mengambil data riwayat:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, foto_profil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsEditing(false);

      if (formData.foto_profil) {
        localStorage.setItem("userAvatar", formData.foto_profil);
        window.dispatchEvent(new Event("avatarUpdated"));
      }

      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      setIsEditing(false);
      alert("Terjadi kesalahan saat menyimpan profil.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[450px] bg-white min-h-screen relative pb-24">
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-[22px] font-bold text-[#1e293b] tracking-tight">
            Profile
          </h1>
          <button
            onClick={() => {
              if (window.confirm("Yakin ingin keluar dari akun?")) {
                logout();
              }
            }}
            className="text-gray-800 hover:text-red-600 transition-colors"
            title="Keluar Akun"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="px-5 mt-5">
          {loading ? (
            <div className="animate-pulse flex flex-col gap-5">
              <div className="h-48 bg-gray-200 rounded-[20px] w-full"></div>
              <div className="h-64 bg-gray-200 rounded-[20px] w-full"></div>
            </div>
          ) : (
            <>
              {/* KARTU IDENTITAS */}
              <div className="bg-[#2563eb] rounded-[20px] p-6 flex flex-col items-center text-center shadow-[0_8px_20px_rgba(37,99,235,0.2)] mb-6">
                <div
                  onClick={() => {
                    if (foto) setIsPreviewOpen(true);
                  }}
                  className="w-[84px] h-[84px] bg-white rounded-full flex items-center justify-center mb-4 shadow-inner overflow-hidden border-2 border-white cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {foto ? (
                    <img
                      src={foto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-[#2563eb]" />
                  )}
                </div>
                <h2 className="text-white font-bold text-[20px] mb-0.5">
                  {profile.nama_lengkap}
                </h2>
              </div>

              {/* INFORMASI PRIBADI */}
              <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-gray-900 text-[16px]">
                    Informasi Pribadi
                  </h3>
                  <button
                    onClick={() => {
                      setFormData(profile);
                      setImagePreview(foto);
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-[#2563eb] bg-blue-50 hover:bg-blue-100"
                  >
                    <div className="bg-white text-blue-500 p-0.5 rounded-sm shadow-sm">
                      <Edit2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-[13px]">Edit</span>
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Nama Lengkap
                      </span>
                      <span className="text-gray-900 font-bold text-[14px]">
                        {profile.nama_lengkap}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      <VenusAndMars className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Jenis Kelamin
                      </span>
                      <span className="text-gray-900 font-bold text-[14px]">
                        {profile.jenis_kelamin}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Nomor Telepon
                      </span>
                      <span className="text-gray-900 font-bold text-[14px]">
                        {profile.user?.no_hp}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center text-[#2563eb] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[12px] font-medium mb-0.5">
                        Alamat
                      </span>
                      <span className="text-gray-900 font-bold text-[14px] leading-snug">
                        {profile.alamat}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STATISTIK AKUN */}
              <div>
                <h3 className="font-bold text-[#1e293b] text-[16px] mb-3 px-1">
                  Statistik Akun
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f0f5ff] rounded-[16px] p-4 flex flex-col items-center justify-center border border-blue-50">
                    <span className="text-[#2563eb] font-bold text-[28px] leading-none mb-1">
                      {orders.length}
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium">
                      Total Transaksi
                    </span>
                  </div>

                  <div className="bg-[#fffcf0] rounded-[16px] p-4 flex flex-col items-center justify-center border border-yellow-50">
                    <span className="text-[#d97706] font-bold text-[28px] leading-none mb-1">
                      {profile.poin}
                    </span>
                    <span className="text-gray-500 text-[12px] font-medium">
                      Poin Rewards
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <BottomNav />

        {/* MODAL EDIT PROFIL */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-900">Edit Profil</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="hover:bg-gray-100 p-1 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    name="nama_lengkap"
                    value={formData.nama_lengkap || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Jenis Kelamin
                  </label>
                  <div className="relative">
                    <select
                      name="jenis_kelamin"
                      value={formData.jenis_kelamin || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Nomor Telepon
                  </label>
                  <input
                    name="no_hp"
                    type="text"
                    value={formData.no_hp || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Alamat
                  </label>
                  <input
                    name="alamat"
                    type="text"
                    value={formData.alamat || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Foto Profile
                  </label>
                  <div className="border border-gray-300 rounded-lg p-1 text-center hover:bg-gray-50 transition-colors relative cursor-pointer overflow-hidden h-[100px] flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full object-contain z-0"
                      />
                    ) : (
                      <span className="text-sm text-gray-500 z-0">
                        Ketuk untuk pilih Foto
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-[#2563eb] text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-md"
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL PREVIEW FOTO BESAR */}
        {isPreviewOpen && foto && (
          <PreviewFoto
            foto={foto}
            setIsPreviewOpen={setIsPreviewOpen}
          />
        )}
      </div>
    </div>
  );
}
