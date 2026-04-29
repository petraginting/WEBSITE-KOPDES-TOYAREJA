import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔥 INIT APP (jalan sekali saja)
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                // set header
                api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

                // fetch user
                const res = await api.get("/auth/user-profile");
                const userData = res.data.data;

                setUser(userData);

            } catch (error) {
                console.error("Token invalid:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // ✅ LOGIN
    const login = async (username, password) => {
        try {
            const response = await api.post("/auth/login", {
                username,
                password,
                device_name: "Web App"
            });

            if (response.data.success && response.data.data) {
                const { token, user: userData } = response.data.data;

                // simpan token (persist)
                localStorage.setItem("token", token);

                // set header
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                // set user
                setUser(userData);

                // redirect
                if (userData.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

                return response.data;
            } else {
                throw new Error(response.data.message || "Login gagal");
            }

        } catch (error) {
            throw new Error(error.response?.data?.message || "Login gagal");
        }
    };

    // ✅ LOGOUT
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.log("Logout server gagal:", error);
        } finally {
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
            setUser(null);
            navigate("/login");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);