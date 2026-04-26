import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import InputField from "../components/InputField";
import llogin from "../assets/Kopdes.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation)
      return alert("Password tidak cocok!");

    setIsLoading(true);
    try {
      await api.post("/reset-password", formData);
      alert("Password berhasil diubah! Silakan login.");
      navigate("/");
    } catch (error) {
      console.error("Reset Gagal:", error);
      alert("Gagal mereset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const LockIcon = (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clipRule="evenodd"
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
        <h1 className="text-center justify-center text-[32px] font-black text-black tracking-wide mb-1 drop-shadow-md">
          RESET PASSWORD
        </h1>
        <p className="text-gray-800 text-[17px] mb-8">
          Masukkan password baru Anda
        </p>

        <div className="w-full bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleReset}>
            <InputField
              label="Password Baru"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password Baru"
              icon={LockIcon}
            />
            <div className="mb-6"></div>
            <InputField
              label="Konfirmasi Password Baru"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Konfirmasi Password Baru"
              icon={LockIcon}
            />

            <div className="mt-8 mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3b66f5] hover:bg-blue-700 text-white font-bold text-[17px] py-3.5 px-4 rounded-xl disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : "Reset Password"}
              </button>
            </div>

            <Link
              to="/"
              className="w-full flex justify-center bg-white border border-gray-400 text-black font-bold text-[15px] py-3.5 px-4 rounded-xl mb-6 hover:bg-gray-50"
            >
              Kembali ke Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
