import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import llogin from "../assets/Kopdes.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e) => {
    // Memaksa hanya input angka
    setPhone(e.target.value.replace(/\D/g, ""));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (phone.length < 10) return alert("Masukkan nomor HP yang valid.");

    setIsLoading(true);
    try {
      await api.post("/forgot-password", { phone_number: phone });
      alert("OTP telah dikirim!");
      navigate("/forgot-password/verify");
    } catch (error) {
      console.error("Gagal mengirim OTP:", error);
      alert("Gagal mengirim OTP. Pastikan nomor terdaftar.");
    } finally {
      setIsLoading(false);
    }
  };

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
          LUPA PASSWORD
        </h1>
        <p className="text-gray-800 text-[17px] mb-8">
          Masukkan Nomor Handphone anda
        </p>

        <div className="w-full bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleSendOTP}>
            <div className="mb-6">
              <label className="block text-[15px] font-semibold text-black mb-2">
                Nomor Handphone
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={phone}
                maxLength={13}
                onChange={handlePhoneChange}
                className="w-full text-center py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 bg-white placeholder-gray-500 text-lg tracking-widest"
                placeholder="08XXXXXXXXX"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b66f5] hover:bg-blue-700 text-white font-normal text-[17px] py-3.5 px-4 rounded-xl mb-12 disabled:opacity-50"
            >
              {isLoading ? "Mengirim..." : "Send OTP"}
            </button>

            <Link
              to="/"
              className="w-full flex justify-center bg-white border border-gray-400 text-black font-bold text-[17px] py-3.5 px-4 rounded-xl mb-6 hover:bg-gray-50"
            >
              Kembali ke Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
