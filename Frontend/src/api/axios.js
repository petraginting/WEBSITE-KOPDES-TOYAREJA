import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Sesuaikan URL backend Laravel Anda
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor: Otomatis menyelipkan Token Bearer jika user sudah login
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ambil token dari penyimpanan HP
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
