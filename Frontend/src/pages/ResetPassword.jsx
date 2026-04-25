import React from 'react'
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [new_password, setNewPassword] = React.useState("");

    const handleVerify = (e) => {
        e.preventDefault();
        // Panggil API untuk reset kata sandi
        import("../api/auth/forgot-password.js")
            .then(({ forgotPasswordReset }) => {
                return forgotPasswordReset({ new_password: new_password });
            })
            .then(() => {

                alert("Kata sandi berhasil direset. Silakan login dengan kata sandi baru.");
                navigate("/login")
            })
            .catch((error) => {
                // Tampilkan pesan error jika verifikasi gagal
                alert(error.message || "Reset kata sandi gagal. Silakan coba lagi.");
            });
    }
    return (
        <div>
            <h1>Halaman Reset Kata Sandi</h1>
            {/* Tambahkan form untuk memasukkan kata sandi baru dan tombol untuk mereset */}
            <form onSubmit={handleVerify}>
                <input
                    type="text"
                    placeholder="Masukkan Kata Sandi Baru"
                    value={new_password}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Reset Kata Sandi</button>
            </form>
        </div>
    )
}

export default ResetPassword
