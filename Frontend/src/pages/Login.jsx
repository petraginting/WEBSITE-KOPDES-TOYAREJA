import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import llogin from "../assets/Kopdes.png";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // 🔥 REDIRECT kalau sudah login
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.username, formData.password);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 Jangan render apa-apa saat loading auth
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

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

        <h1 className="text-[32px] font-black mb-1">SELAMAT DATANG</h1>
        <p className="text-gray-800 text-[17px] mb-8">
          Masuk ke akun anda
        </p>

        <div className="w-full bg-white rounded-[28px] shadow p-6 sm:p-8">
          <form onSubmit={handleLogin}>
            <InputField
              label="Nomor Telepon"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan nomor hp anda"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan Password"
            />

            <div className="flex justify-end mb-6 mt-1">
              <Link
                to="/forgot-password"
                className="text-[13px] font-bold hover:text-blue-600"
              >
                Lupa Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b66f5] text-white font-bold py-3.5 rounded-xl mb-3 disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>

            <Link
              to="/register"
              className="w-full flex justify-center border py-3.5 rounded-xl"
            >
              Registrasi
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}