import { api } from "../api";

var noHp = sessionStorage.getItem('no_hp'); // Variabel global untuk menyimpan nomor telepon selama proses OTP

export const registerSendOtp = async ({ nama_lengkap, no_hp, jenis_kelamin, password }) => {
    try {
        const response = await api.post('/auth/register/send-otp', {
            nama_lengkap: nama_lengkap,
            no_hp: no_hp,
            jenis_kelamin: jenis_kelamin,
            password: password,
        });

        if (response.data.success) {
            sessionStorage.setItem("no_hp", no_hp)
            return response.data;

        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal mengirim OTP. Silakan coba lagi.");
        
    }
}


export const registerVerifyOtp = async ({ otp }) => {
    try {
        const response = await api.post('/auth/register/verify-otp', {
            no_hp: noHp,
            otp_code: otp,
        });

        if (response.data.success) {
            sessionStorage.removeItem('no_hp')
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal memverifikasi OTP. Silakan coba lagi.");
    }
}