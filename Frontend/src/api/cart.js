import { api } from "./api";

// GET: Ambil semua item keranjang
export const getCart = async () => {
  try {
    const response = await api.get("/keranjang");
    return response.data.data || [];
  } catch (error) {
    console.error("Gagal ambil keranjang:", error);
    throw error;
  }
};

// POST: Tambah item ke keranjang
export const addToCart = async (productId, qty) => {
  try {
    const response = await api.post("/keranjang/add", {
      product_id: productId,
      kuantitas: qty,
    });
    return response.data.data;
  } catch (error) {
    console.error("Gagal tambah ke keranjang:", error);
    throw error;
  }
};

// PUT: Update qty item keranjang
export const updateCartItem = async (cartId, qty) => {
  try {
    const response = await api.put(`/keranjang/${cartId}`, {
      kuantitas: qty,
    });
    return response.data.data;
  } catch (error) {
    console.error("Gagal update keranjang:", error);
    throw error;
  }
};

// DELETE: Hapus item dari keranjang
export const removeFromCart = async (cartId) => {
  try {
    const response = await api.delete(`/keranjang/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Gagal hapus dari keranjang:", error);
    throw error;
  }
};
