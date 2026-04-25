import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import llogin from "../assets/Kopdes.png";

export default function VerifyRegist() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto focus ke input selanjutnya
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    const noHp = sessionStorage.getItem("no_hp");

    if (otpCode.length < 6) return alert("Masukkan 6 digit OTP");

    setIsLoading(true);
    try {
      await api.post("/auth/register/verify-otp", {
        no_hp: noHp,
        otp_code: otpCode,
      });

      navigate("/login");
    } catch (error) {
      console.error("OTP Salah:", error);
      alert("Kode OTP tidak valid atau kadaluarsa.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const noHp = sessionStorage.getItem("no_hp");

    if (!noHp)
      return alert("Nomor HP tidak ditemukan, silakan register ulang.");

    setIsLoading(true);
    try {
      // Sesuaikan endpoint ini dengan API backend Anda
      await api.post("/auth/register/resend-otp", {
        no_hp: noHp,
      });
      alert("Kode OTP baru telah dikirim!");

      // Opsional: Anda bisa menambahkan logika untuk mereset timer 28s di sini
    } catch (error) {
      console.error("Gagal mengirim ulang OTP:", error);
      alert("Gagal mengirim ulang OTP. Silakan coba lagi.");
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
          VERIFIKASI OTP
        </h1>
        <p className="text-gray-800 text-[15px] text-center mb-8">
          Masukkan kode OTP <br /> Email
        </p>

        <div className="w-full bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleVerify}>
            <div className="flex justify-between gap-2 mb-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-gray-400 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
                />
              ))}
            </div>

            <p className="text-center text-[15px] text-black mb-6">
              Kode berlaku dalam <span className="font-bold">28s</span>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b66f5] hover:bg-blue-700 text-white font-normal text-[17px] py-3.5 px-4 rounded-xl mb-4 disabled:opacity-50"
            >
              {isLoading ? "Memverifikasi..." : "Verifikasi OTP"}
            </button>

            <Link
              to="/"
              className="w-full flex justify-center bg-white border border-gray-400 text-black font-bold text-[15px] py-3.5 px-4 rounded-xl mb-6 hover:bg-gray-50"
            >
              Kembali ke Login
            </Link>

            <div className="text-center mb-4">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-black font-bold text-[15px] hover:underline disabled:opacity-50"
              >
                Kirim Ulang OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
