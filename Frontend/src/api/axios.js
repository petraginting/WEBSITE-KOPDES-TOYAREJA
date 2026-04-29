import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔥 REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ✅ pakai localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔥 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    // ✅ hanya handle 401 untuk endpoint yang butuh auth
    if (status === 401 && requestUrl !== "/auth/login") {
      // hapus token
      localStorage.removeItem("token");

      // hapus header global
      delete api.defaults.headers.common["Authorization"];

      // redirect SPA-friendly
      window.location.replace("/login"); // lebih aman dari href
    }

    return Promise.reject(error);
  }
);

export default api;