import { api } from "./api";

// GET: Ambil semua pesanan (riwayat) user
export const getUserOrders = async () => {
  try {
    const response = await api.get("/pesanan");
    return response.data.data || [];
  } catch (error) {
    console.error("Gagal ambil riwayat pesanan:", error);
    throw error;
  }
};

// GET: Ambil detail pesanan
export const getOrderDetail = async (orderId) => {
  try {
    const response = await api.get(`/pesanan/${orderId}`);
    return response.data.data;
  } catch (error) {
    console.error("Gagal ambil detail pesanan:", error);
    throw error;
  }
};

// POST: Checkout (buat pesanan baru)
export const checkout = async (checkoutData) => {
  try {
    const response = await api.post("/pesanan/checkout", checkoutData);
    return response.data.data;
  } catch (error) {
    console.error("Gagal checkout:", error);
    throw error;
  }
};

// DELETE: Batalkan pesanan
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.delete(`/pesanan/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Gagal batalkan pesanan:", error);
    throw error;
  }
};
