import { api } from "../api";

export const tambahSimpanan = async(formData) => {
    try {
        const response = await api.post('/simpanan/add', formData)

        if (response.data.success) {
            return response.data
        } else {
            throw new Error(response.data.message);
        }

    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal tambah simpanan. Silakan coba lagi.");
    }
}

export const updateSimpanan = async(id, formData) => {
    try {
        const response = await api.put(`/simpanan/${id}`, formData)

        if (response.data.success) {
            return response.data
        } else {
            throw new Error(response.data.message);
        }

    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal tambah simpanan. Silakan coba lagi.");
    }
}

export const lihatSemuaSimpananAnggota = async() => {
    try {
        const response = await api.get('/simpanan')

        if (response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Gagal menampilkan simpanan. Silakan coba lagi.");
        
    }
}