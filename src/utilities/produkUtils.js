// utilities/produkUtils.js

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
