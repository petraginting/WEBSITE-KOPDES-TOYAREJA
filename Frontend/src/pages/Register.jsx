import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import InputField from "../components/InputField";
import llogin from "../assets/Kopdes.png";

export default function Register() {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    no_hp: "",
    nik: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword)
      return alert("Password tidak cocok!");

    setIsLoading(true);
    try {
      const response = await api.post("/auth/register/send-otp", {
        nama_lengkap: formData.nama_lengkap,
        no_hp: formData.no_hp,
        nik: formData.nik,
        password: formData.password,
        password_confirmation: confirmPassword,
      });

      if (response?.data) {
        sessionStorage.setItem("no_hp", formData.no_hp);
        alert("Registrasi Berhasil! Silakan cek OTP Anda.");
        navigate("/verify");
      } else {
        console.log(response?.data);
        alert(response?.data);
      }
    } catch (error) {
      console.error("Registrasi Gagal:", error.response?.data?.message);
      alert(error.response?.data || "Terjadi kesalahan saat registrasi");
    } finally {
      setIsLoading(false);
    }
  };

  const UserIcon = (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
  const LockIcon = (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clipRule="evenodd"
      />
    </svg>
  );
  const PhoneIcon = (
    <svg
      className="w-5 h-5 fill-none stroke-current"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10 px-5 pb-10">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <div className="w-32 h-32 mb-6 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-white p-1">
          <img
            src={llogin}
            alt="Logo KOPDES"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <h1 className="text-[32px] font-black text-black tracking-wide mb-6 drop-shadow-md">
          REGISTRASI
        </h1>

        <div className="w-full bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleRegister}>
            <InputField
              label="Nama Lengkap"
              name="nama_lengkap"
              type="text"
              value={formData.nama_lengkap}
              onChange={handleChange}
              placeholder="Masukkan Nama Lengkap"
              icon={UserIcon}
            />
            <InputField
              label="NIK"
              name="nik"
              type="text"
              value={formData.nik}
              onChange={handleChange}
              placeholder="Masukkan NIK anda"
              icon={UserIcon}
            />
            <InputField
              label="No HP"
              name="no_hp"
              type="text"
              value={formData.no_hp}
              onChange={handleChange}
              placeholder="08XXXXXXXXX"
              icon={PhoneIcon}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={13}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan Password"
              icon={LockIcon}
            />
            <InputField
              label="Konfirmasi Password"
              name="password_confirmation"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi Password"
              icon={LockIcon}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b66f5] hover:bg-blue-700 text-white font-bold text-[17px] py-3.5 px-4 rounded-xl mt-3 mb-5 disabled:opacity-50"
            >
              {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
            </button>

            <p className="text-center text-[13px] text-gray-600">
              Sudah punya akun?{" "}
              <Link to="/" className="text-[#3b66f5] font-bold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
