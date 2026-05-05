import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import { addToCart } from "../api/cart";
import BottomNav from "../components/BottomNav";
import { baseURL } from "../utilities/produkUtils";
import { formatRupiah } from "../utilities/formatters";

export default function ProductDetail() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil detail produk dari API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(id);
        console.log("Detail produk:", data); // DEBUG
        setProduct(data);
      } catch (error) {
        console.error("Gagal ambil detail produk:", error);
        console.log("Error response:", error.response?.data); // DEBUG
        // Fallback dummy data
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fungsi Tambah/Kurang Qty
  const handleQty = (type) => {
    if (type === "minus" && qty > 1) setQty(qty - 1);
    if (type === "plus") setQty(qty + 1);
  };

  // Tambah ke keranjang
  const handleAddToCart = async () => {
    if (product.stok <= 0) {
      alert("Produk stok habis!");
      return;
    }
    if (qty > product.stok) {
      alert(`Stok hanya tersedia ${product.stok}`);
      return;
    }
    try {
      setIsLoading(true);
      await addToCart(product.id, qty);
      navigate("/keranjang");
    } catch (error) {
      console.error("Gagal tambah ke keranjang:", error);
      alert("Gagal tambah ke keranjang: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        Produk tidak ditemukan.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[450px] bg-white min-h-screen relative pb-24">
        {/* HEADER KEMBALI */}
        <div className="sticky top-0 bg-white z-10 px-5 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-[18px] font-bold text-gray-900">Detail Produk</h1>
        </div>

        <div className="px-5 pb-5">
          {/* Gambar Produk */}
          <div className="w-full aspect-[4/3] bg-[#eef2ff] rounded-[24px] mb-6 flex items-center justify-center overflow-hidden">
            {product.gambar ? (
              <img
                src={baseURL + product.gambar}
                alt={product.nama}
                className="w-full h-full object-cover rounded-[24px]"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          {/* Judul & Harga */}
          <h2 className="text-[22px] font-bold text-gray-900 mb-1">
            {product.nama}
          </h2>
          <p className="text-[22px] font-bold text-[#2563eb] mb-6">
            {formatRupiah(product.harga)}
          </p>

          {/* Info Box */}
          <div className="bg-[#eff6ff] border border-blue-100 rounded-[16px] p-4 flex flex-col gap-2 mb-6">
            <div className="flex text-[14px]">
              <span className="font-bold text-gray-800 w-24">Kategori:</span>
              <span className="text-gray-600">{product.kategori}</span>
            </div>
            {product.unit && (
              <div className="flex text-[14px]">
                <span className="font-bold text-gray-800 w-24">Unit:</span>
                <span className="text-gray-600">{product.unit}</span>
              </div>
            )}
            <div className="flex text-[14px]">
              <span className="font-bold text-gray-800 w-24">Stok:</span>
              <span
                className={product.stok > 0 ? "text-green-600" : "text-red-600"}
              >
                {product.stok > 0 ? `${product.stok} tersedia` : "Habis"}
              </span>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 text-[15px] mb-2">
              Deskripsi Produk
            </h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              {product.deskripsi || "Tidak ada deskripsi"}
            </p>
          </div>

          {/* Jumlah */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 text-[15px] mb-3">Jumlah</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQty("minus")}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-lg text-gray-700"
              >
                -
              </button>
              <span className="font-bold text-[18px] w-6 text-center">
                {qty}
              </span>
              <button
                onClick={() => handleQty("plus")}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-lg text-gray-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal Box */}
          <div className="bg-gray-50 rounded-[16px] p-4 flex justify-between items-center mb-6 border border-gray-100">
            <span className="text-gray-500 text-[15px]">Subtotal</span>
            <span className="font-bold text-[#2563eb] text-[18px]">
              {formatRupiah(product.harga * qty)}
            </span>
          </div>

          {/* Tombol Tambah */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-[16px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Tambah Keranjang
          </button>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
