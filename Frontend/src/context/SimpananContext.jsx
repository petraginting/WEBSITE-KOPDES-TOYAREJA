import { createContext, useContext, useEffect, useState } from "react";
import { lihatSemuaSimpananAnggota, updateSimpanan } from "../api/auth/simpanan";
import { useAuth } from "./AuthContext";

const SimpananContext = createContext();

export const SimpananProvider = ({ children }) => {
    const { user } = useAuth()

    const [simpananData, setSimpananData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSimpanan = async () => {
        try {
            const data = await lihatSemuaSimpananAnggota();
            setSimpananData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpdateSimpanan = async (id, payload) => {
        try {
            const data = await updateSimpanan(id, payload);

            setSimpananData(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, ...data.data } : item
                )
            );
            alert('Berhasil update data simpanan')

            // return data;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Gagal update anggota");
        }
    };

    useEffect(() => {
        if (user) {
            fetchSimpanan();
        }
    }, [user]);

    // 🔥 hitung total di sini (bukan di component)
    const totalPokok = simpananData.reduce((sum, i) => sum + (i.jumlah_pokok || 0), 0);
    const totalWajib = simpananData.reduce((sum, i) => sum + (i.jumlah_wajib || 0), 0);
    const totalSukarela = simpananData.reduce((sum, i) => sum + (i.jumlah_sukarela || 0), 0);

    return (
        <SimpananContext.Provider
            value={{
                simpananData,
                totalPokok,
                totalWajib,
                totalSukarela,
                fetchSimpanan,
                fetchUpdateSimpanan,
                loading
            }}
        >
            {children}
        </SimpananContext.Provider>
    );
};

export const useSimpanan = () => useContext(SimpananContext);