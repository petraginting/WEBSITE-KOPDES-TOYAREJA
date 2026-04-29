import { uploadFoto } from "../utilities/uploadFoto";
import api from "./axios";

export const updateProfileKopdes = async(payload) => {
    try {

        const formData = uploadFoto(payload, 'logo')        

        // 🔥 penting: spoof method
        formData.append("_method", "PUT");

        const res = await api.post(
            "/admin/profil-kopdes/update",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data.data;
    } catch (error) {
        console.error(error);
        throw new Error(
            error.response?.data?.message || "Terjadi kesalahan server"
        );
    }
}

export const lihatProfileKopdes = async() => {
    try {
        const res = await api.get('/admin/profil-kopdes')

        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data.data;
    } catch (error) {
        console.error(error);
        throw new Error(
            error.response?.data?.message || "Terjadi kesalahan server"
        );
    }
}