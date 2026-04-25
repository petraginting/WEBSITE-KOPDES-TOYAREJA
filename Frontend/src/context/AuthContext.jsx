import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // 1. Sinkronisasi Token & Axios Header
    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            fetchUser();
        } else {
            delete api.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    // 2. Ambil Data User Profil (Gunakan info dari login atau endpoint /me)
    const fetchUser = async () => {
        try {
            // Ganti endpoint ini sesuai backend Anda (misal: /auth/me atau /user)
            const response = await api.get("/auth/user-profile");
            setUser(response.data.data);
        } catch (error) {
            console.error("Gagal ambil profil:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    // 3. Fungsi Login
    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', {
                username: username,
                password: password,
                device_name: "Web App"
            });

            if (response.data.success) {
                // Simpan token ke state (useEffect akan menangani localStorage & headers)
                setToken(response.data.data.token);
                setUser(response.data.data.user);
                alert(response.data.message)
                return response.data;
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login Gagal");
        }
    };

    // 4. Fungsi Logout
    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {/* Jangan tampilkan app sebelum loading token selesai */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
