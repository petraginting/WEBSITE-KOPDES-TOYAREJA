import { api } from "../api";


export const forgotPasswordSendOtp = async (no_hp) => {
    try {
        const response = await api.post('/auth/forgot-password/send-otp', {
            no_hp: no_hp,
        });

        if (response.data.success) {
            sessionStorage.setItem('forgot_password_no_hp', no_hp); // Simpan nomor telepon untuk digunakan saat verifikasi OTP
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal mengirim OTP. Silakan coba lagi.");
    }
}

export const forgotPasswordVerifyOtp = async (otp) => {
    const noHp = sessionStorage.getItem('forgot_password_no_hp'); // Ambil nomor telepon dari sessionStorage
    try {
        const response = await api.post('/auth/forgot-password/verify-otp', {
            no_hp: noHp,
            otp_code: otp,
        });

        if (response.data.success) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal memverifikasi OTP. Silakan coba lagi.");
    }
}

export const forgotPasswordReset = async (new_password) => {
    const noHp = sessionStorage.getItem('forgot_password_no_hp'); // Ambil nomor telepon dari sessionStorage
    try {
        const response = await api.post('/auth/forgot-password/reset', {
            no_hp: noHp,
            new_password: new_password,
        });

        if (response.data.success) {
            sessionStorage.removeItem('forgot_password_no_hp'); // Hapus nomor telepon dari sessionStorage
            return response.data;
        } else {
            throw new Error(response.data.message);
        }   
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal mereset password. Silakan coba lagi.");
    }
}
