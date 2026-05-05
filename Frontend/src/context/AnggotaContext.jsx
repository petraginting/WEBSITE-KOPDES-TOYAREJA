import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "./AuthContext";

const AnggotaContext = createContext();

export const AnggotaProvider = ({ children }) => {
    const { user } = useAuth()
    const [paymentMethod, setPaymentMethod] = useState(null);
    

    const [anggotaList, setAnggotaList] = useState([]);
    const [selectedAnggota, setSelectedAnggota] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔥 GET ALL
    const fetchAnggota = async () => {
        setLoading(true);
        try {
            const res = await api.get("/admin/anggota");
            setAnggotaList(res.data.data);

        } catch (err) {
            console.error("Fetch anggota gagal:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 GET DETAIL
    const getAnggotaById = async (id) => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/anggota/${id}`);
            setSelectedAnggota(res.data.data);

        } catch (err) {
            console.error("Detail anggota gagal:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 TAMBAH
    const tambahAnggota = async (no_hp) => {
        try {
            const res = await api.put("/admin/anggota/add", {
                no_hp: no_hp
            });

            if (res.data.success) {
                await fetchAnggota()
                return res.data;
            }

            alert(res.data.message)

        } catch (err) {
            throw new Error(err.response?.data?.message || "Gagal tambah anggota");
        }
    };

    // 🔥 UPDATE
    const updateAnggota = async (id, payload) => {
        try {
            const res = await api.put(`/admin/anggota/update/${id}`, payload);

            setAnggotaList(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, ...res.data.data } : item
                )
            );
            alert('Berhasil update data anggota')

            return res.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Gagal update anggota");
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchAnggota();
        }
    }, [user]);

    const cek_metode_pembayaran = (metode) => {
        setPaymentMethod(metode)
    }

    return (
        <AnggotaContext.Provider
            value={{
                cek_metode_pembayaran,
                paymentMethod,
                anggotaList,
                selectedAnggota,
                loading,
                fetchAnggota,
                getAnggotaById,
                tambahAnggota,
                updateAnggota,
            }}
        >
            {children}
        </AnggotaContext.Provider>
    );
};

export const useAnggota = () => useContext(AnggotaContext);