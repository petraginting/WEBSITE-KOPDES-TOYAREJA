/**
 * Format Utilities
 * Fungsi-fungsi helper untuk format data yang konsisten di seluruh aplikasi
 */

/**
 * Format angka ke Rupiah
 * @param {number} angka - Nilai yang akan diformat
 * @returns {string} Format Rupiah (Rp. X.XXX)
 */
export const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
};

/**
 * Format tanggal ke format Indonesia
 * @param {string|Date} tanggal - Tanggal yang akan diformat
 * @returns {string} Format: "25 April 2026, 10:30"
 */
export const formatTanggalIndo = (tanggal) => {
  if (tanggal === null) return
  
  const date = new Date(tanggal);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  };
  return date.toLocaleString("id-ID", options);
};

/**
 * Format status pesanan ke display yang lebih user-friendly
 * @param {string} status - Status dari API (pending, confirmed, diproses, dikirim, selesai)
 * @returns {object} { label: string, color: string, bgColor: string }
 */
export const getStatusStyle = (status) => {
  const statusMap = {
    pending: {
      label: "Menunggu",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
    },
    confirmed: {
      label: "Dikonfirmasi",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    diproses: {
      label: "Diproses",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    dikirim: {
      label: "Dikirim",
      color: "text-orange-700",
      bgColor: "bg-orange-100",
    },
    selesai: {
      label: "Selesai",
      color: "text-green-700",
      bgColor: "bg-green-100",
    },
    Selesai: {
      label: "Selesai",
      color: "text-green-700",
      bgColor: "bg-green-100",
    },
    Diproses: {
      label: "Diproses",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    Dibatalkan: {
      label: "Dibatalkan",
      color: "text-red-700",
      bgColor: "bg-red-100",
    },
  };
  return (
    statusMap[status] || {
      label: status,
      color: "text-gray-700",
      bgColor: "bg-gray-100",
    }
  );
};

/**
 * Format payment method ke display yang lebih user-friendly
 * @param {string} method - Payment method (qris, cod, transfer, dll)
 * @returns {string} Formatted payment method
 */
export const formatPaymentMethod = (method) => {
  const methodMap = {
    qris: "QRIS",
    cod: "Cash on Delivery",
    transfer: "Transfer Bank",
    ewallet: "E-Wallet",
  };
  return methodMap[method] || method;
};

/**
 * Hitung subtotal untuk item
 * @param {number} harga - Harga per unit
 * @param {number} qty - Jumlah item
 * @returns {number} Subtotal
 */
export const calculateSubtotal = (harga, qty) => {
  return harga * qty;
};

/**
 * Hitung total dari array items
 * @param {array} items - Array item dengan structure {harga, qty}
 * @returns {number} Total
 */
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.harga * item.qty, 0);
};

/**
 * Validasi form login
 * @param {string} username - Username/NIK
 * @param {string} password - Password
 * @returns {object} { isValid: boolean, errors: array }
 */
export const validateLoginForm = (username, password) => {
  const errors = [];
  if (!username || username.trim() === "") {
    errors.push("Username/NIK harus diisi");
  }
  if (!password || password.trim() === "") {
    errors.push("Password harus diisi");
  }
  if (password && password.length < 6) {
    errors.push("Password minimal 8 karakter");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validasi form tambah ke keranjang
 * @param {number} qty - Jumlah item
 * @param {number} maxQty - Stok maksimal
 * @returns {object} { isValid: boolean, errors: array }
 */
export const validateCartForm = (qty, maxQty) => {
  const errors = [];
  if (!qty || qty < 1) {
    errors.push("Jumlah minimal 1");
  }
  if (qty > maxQty) {
    errors.push(`Stok hanya tersedia ${maxQty}`);
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Shortener untuk ID/order number untuk display
 * @param {string} id - ID atau order number
 * @returns {string} Shortened ID (last 6 chars)
 */
export const shortenId = (id) => {
  return id.toString().slice(-6);
};
