import React from 'react'
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState("");

    const handleVerify = (e) => {
        e.preventDefault();
        // Panggil API untuk memverifikasi OTP
        import("../api/auth/register.js")
            .then(({ registerVerifyOtp }) => {
                return registerVerifyOtp({ otp: otp });
            })
            .then(() => {
                // Jika verifikasi berhasil, arahkan ke halaman dashboard atau tampilkan pesan sukses
                alert("OTP berhasil diverifikasi. Selamat datang!");
                navigate("/login")
            })
            .catch((error) => {
                // Tampilkan pesan error jika verifikasi gagal
                alert(error.message || "Verifikasi OTP gagal. Silakan coba lagi.");
            });
    }
    return (
        <div>
            <h1>Halaman Verifikasi OTP</h1>
            {/* Tambahkan form untuk memasukkan OTP dan tombol untuk memverifikasi */}
            <form onSubmit={handleVerify}>
                <input
                    type="text"
                    placeholder="Masukkan OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button type="submit">Verifikasi</button>
            </form>
        </div>
    )
}

export default VerifyOtp
