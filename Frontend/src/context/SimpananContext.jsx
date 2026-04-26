import { createContext, useContext, useEffect, useState } from "react";
import { lihatSemuaSimpananAnggota } from "../api/auth/simpanan";

const SimpananContext = createContext();

export const SimpananProvider = ({ children }) => {
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

    useEffect(() => {
        fetchSimpanan();
    }, []);

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
                loading
            }}
        >
            {children}
        </SimpananContext.Provider>
    );
};

export const useSimpanan = () => useContext(SimpananContext);