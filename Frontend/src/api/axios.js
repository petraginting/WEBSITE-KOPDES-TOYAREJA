import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Pastikan di .env nilainya misalnya: http://localhost:8000/api
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json", // 👉 INI YANG SANGAT NGARUH
  },
});

// Interceptor: Otomatis menyelipkan Token Bearer jika user sudah login

// export default api;
