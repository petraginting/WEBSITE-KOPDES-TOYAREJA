<<<<<<< HEAD
// utilities/produkUtils.js
// Utility functions untuk manajemen produk

/**
 * Membuat produk baru dengan ID otomatis
 * @param {Array} produkList - Array produk yang ada
 * @param {Object} formData - Data form produk baru
 * @returns {Object} Produk baru
 */
export const createProduk = (produkList, formData) => {
  const produkBaru = {
    id: Math.max(...produkList.map(p => p.id), 0) + 1,
    emoji: formData.emoji,
    name: formData.name,
    category: formData.category,
    price: `Rp ${formData.price}`,
    stock: formData.stock,
    unit: formData.unit,
  };
  return produkBaru;
};

/**
 * Mengupdate produk yang ada
 * @param {Array} produkList - Array produk yang ada
 * @param {Object} produkYangDiedit - Produk yang akan diedit
 * @param {Object} formData - Data form yang diupdate
 * @returns {Array} Array produk yang telah diupdate
 */
export const updateProduk = (produkList, produkYangDiedit, formData) => {
  const produkDiupdate = {
    ...produkYangDiedit,
    emoji: formData.emoji,
    name: formData.name,
    category: formData.category,
    price: `Rp ${formData.price}`,
    stock: formData.stock,
    unit: formData.unit,
  };

  return produkList.map(produk =>
    produk.id === produkYangDiedit.id ? produkDiupdate : produk
  );
};

/**
 * Menghapus produk berdasarkan ID
 * @param {Array} produkList - Array produk yang ada
 * @param {number} produkId - ID produk yang akan dihapus
 * @returns {Array} Array produk setelah penghapusan
 */
export const deleteProduk = (produkList, produkId) => {
  return produkList.filter(produk => produk.id !== produkId);
};

/**
 * Mengkonversi data produk untuk form edit
 * @param {Object} produk - Data produk
 * @returns {Object} Data form untuk edit
 */
export const produkToFormData = (produk) => {
  return {
    emoji: produk.emoji,
    name: produk.name,
    category: produk.category,
    price: produk.price.replace('Rp ', '').replace(/\./g, ''), // Remove 'Rp ' and dots
    stock: produk.stock,
    unit: produk.unit,
  };
};

/**
 * Validasi data form produk
 * @param {Object} formData - Data form yang akan divalidasi
 * @returns {boolean} True jika valid, false jika tidak
 */
export const validateProdukForm = (formData) => {
  return (
    formData.name.trim() !== '' &&
    formData.price.trim() !== '' &&
    formData.stock.trim() !== ''
  );
};

/**
 * Reset form data ke nilai default
 * @returns {Object} Form data default
 */
export const getDefaultFormData = () => {
  return {
    emoji: '🛍️',
    name: '',
    category: '',
    price: '',
    stock: '',
    unit: '',
  };
};
=======
// Memformat angka ke Rupiah untuk tampilan
export const formatIDR = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export const createProduk = (produkList, formData) => {
  const maxId =
    produkList.length > 0 ? Math.max(...produkList.map((p) => p.id)) : 0;
  return {
    id: maxId + 1,
    emoji: formData.emoji || "🛍️",
    name: formData.name,
    category: formData.category,
    price: formatIDR(formData.price), // Gunakan formatter
    stock: formData.stock,
    unit: formData.unit,
  };
};

export const updateProduk = (produkList, produkYangDiedit, formData) => {
  const produkDiupdate = {
    ...produkYangDiedit,
    emoji: formData.emoji,
    name: formData.name,
    category: formData.category,
    price: formatIDR(formData.price),
    stock: formData.stock,
    unit: formData.unit,
  };

  return produkList.map((produk) =>
    produk.id === produkYangDiedit.id ? produkDiupdate : produk,
  );
};

export const deleteProduk = (produkList, produkId) => {
  return produkList.filter((produk) => produk.id !== produkId);
};

export const produkToFormData = (produk) => {
  // Ambil angka saja dari string harga (misal "Rp 65.000" jadi "65000")
  const numericPrice = produk.price.replace(/[^0-9]/g, "");
  return {
    emoji: produk.emoji,
    name: produk.name,
    category: produk.category,
    price: numericPrice,
    stock: produk.stock,
    unit: produk.unit,
  };
};

export const validateProdukForm = (formData) => {
  return (
    formData.name?.trim() !== "" &&
    formData.category?.trim() !== "" &&
    formData.price !== "" &&
    formData.stock !== ""
  );
};

export const getDefaultFormData = () => {
  return {
    emoji: "🛍️",
    name: "",
    category: "",
    price: "",
    stock: "",
    unit: "",
  };
};
>>>>>>> 1bdc2db (sdh bisa CRUD)
