import api from "./axios";

export const createNotification = async(payload) => {
    try {
        const res = await api.post('/admin/notifikasi/add', payload)

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


export const semuaDataNotification = async() => {
    try {
        const res = await api.get('/admin/notifikasi')
        return res.data.data
    } catch (error) {
        console.error(error);
        throw new Error(
            error.response?.data?.message || "Terjadi kesalahan server"
        );
    }
}


export const updateNotification = async(id, payload) => {
    try {
        const res = await api.put(`/admin/notifikasi/update/${id}`, payload)

        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data.data;
    } catch (error) {
        console.error(error);
        throw new Error(
            error.response?.data?.message || "Gagal update notofikasi"
        );
    }
}