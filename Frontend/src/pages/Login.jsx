import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import InputField from "../components/InputField";
import llogin from "../assets/Kopdes.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Sesuaikan '/login' dengan route API Laravel Anda
      const response = await api.post("/login", formData);
      console.log("Login Sukses:", response.data);
      // Simpan token ke localStorage jika ada: localStorage.setItem('token', response.data.token);
      alert("Login Berhasil!");
      // navigate('/dashboard-pelanggan');
    } catch (error) {
      console.error("Login Gagal:", error);
      alert("Login gagal, periksa username atau password.");
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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-5 px-5">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <div className="w-32 h-32 mb-6 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-white p-1">
          <img
            src={llogin}
            alt="Logo KOPDES"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <h1 className="text-center justify-center text-[32px] font-black text-black tracking-wide mb-1 drop-shadow-md">
          SELAMAT DATANG
        </h1>
        <p className="text-gray-800 text-[17px] mb-8">Masuk ke akun anda</p>

        <div className="w-full bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleLogin}>
            <InputField
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan Username"
              icon={UserIcon}
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

            <div className="flex justify-end mb-6 mt-1">
              <Link
                to="/forgot-password"
                className="text-[13px] font-bold text-black hover:text-blue-600"
              >
                Lupa Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b66f5] hover:bg-blue-700 text-white font-bold text-[17px] py-3.5 px-4 rounded-xl mb-3 disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>

            <Link
              to="/register"
              className="w-full flex justify-center bg-white border border-gray-400 text-black font-bold text-[17px] py-3.5 px-4 rounded-xl hover:bg-gray-50"
            >
              Registrasi
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
