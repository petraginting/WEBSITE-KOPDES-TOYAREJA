import { api } from "./api";

// Helper: normalize product data dari backend
const normalizeProduct = (product) => {
  return {
    id: product.id,
    nama: product.nama_produk || product.nama,
    harga: parseInt(product.harga) || 0, // Convert string to number
    kategori: product.kategori,
    deskripsi: product.deskripsi || "",
    asal: product.asal || "",
    unit: product.unit || "",
    stok: parseInt(product.stok) || 0,
    gambar: product.gambar || "",
  };
};

// GET: Ambil semua produk
export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");
    const products = response.data.data || [];
    // Normalize setiap produk
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Gagal ambil produk:", error);
    throw error;
  }
};

// GET: Ambil detail produk berdasarkan ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    const product = response.data.data;
    return normalizeProduct(product);
  } catch (error) {
    console.error("Gagal ambil detail produk:", error);
    throw error;
  }
};

// GET: Ambil produk berdasarkan kategori
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products?category=${category}`);
    const products = response.data.data || [];
    return products.map(normalizeProduct);
  } catch (error) {
    console.error("Gagal ambil produk kategori:", error);
    throw error;
  }
};
