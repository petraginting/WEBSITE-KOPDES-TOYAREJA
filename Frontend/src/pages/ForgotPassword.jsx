import React from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [noHp, setNoHp] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Panggil API untuk mengirim OTP ke nomor telepon
        import("../api/auth/forgot-password.js")
            .then(({ forgotPasswordSendOtp }) => {
                return forgotPasswordSendOtp({ no_hp: noHp });
            })
            .then(() => {
                // Jika OTP berhasil dikirim, arahkan ke halaman verifikasi OTP
                alert("OTP berhasil dikirim. Silakan cek WA untuk kode OTP.");
                navigate("/forgot-password/verify-otp");
            })
            .catch((error) => {
                // Tampilkan pesan error jika pengiriman OTP gagal
                alert(error.message || "Gagal mengirim OTP. Silakan coba lagi.");
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="no_hp">Nomor Telepon:</label>
                <input
                    type="text"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                />
                <button type="submit">Kirim OTP</button>
            </form>
        </div>
    )
}

export default ForgotPassword
