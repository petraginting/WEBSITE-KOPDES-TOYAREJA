import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      alert("Username atau password salah!\nGunakan: admin / admin123");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-cream">
      <div className="login-bg-shape-1"></div>
      <div className="login-bg-shape-2"></div>

      <div className="bg-[#f3f4f6]/80 backdrop-blur-xl border border-white/10 rounded-[20px] p-12 w-[420px] shadow-2xl relative z-10 animate-fadeInUp">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white">
            {/*gambar Kopdes.png*/}
            <img
              src="/src/assets/Kopdes.png"
              alt="kopdes"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-black">
            <div className="font-serif text-xl font-bold">KOPDES TOYAREJA</div>
            <div className="text-[11px] tracking-[1.5px] uppercase">
              Sistem Manajemen Koperasi
            </div>
          </div>
        </div>

        <h2 className="text-black text-[26px] font-bold mb-1.5">
          Selamat Datang
        </h2>
        <p className="text-black text-sm mb-8">
          Masuk ke panel administrasi koperasi desa
        </p>

        <div className="mb-5">
          <label className="block text-black text-[13px] font-medium mb-2 tracking-wide">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/10 border border-black/40 rounded-xl px-4 py-3 text-black text-sm outline-none focus:border-blue-400 focus:bg-white/20 focus:ring-3 focus:ring-blue-400/20 transition-all"
          />
        </div>

        <div className="mb-5">
          <label className="block text-black text-[13px] font-medium mb-2 tracking-wide">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full bg-white/10 border border-black/40 rounded-xl px-4 py-3 text-black text-sm outline-none focus:border-blue-400 focus:bg-white/20 focus:ring-3 focus:ring-blue-400/20 transition-all"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-br from-blue-700 to-blue-500 text-white rounded-xl p-3.5 text-[15px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all mt-2"
        >
          Masuk ke Dashboard
        </button>
      </div>
    </div>
  );
}
