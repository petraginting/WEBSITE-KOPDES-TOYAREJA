import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import BottomNav from "../components/BottomNav";

export default function Keranjang() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // READ: Ambil isi keranjang
  const fetchCart = async () => {
    try {
      // UNTUK NANTI: const response = await api.get('/keranjang');
      // setCartItems(response.data.items);

      const dummyData = [
        {
          id: 1,
          cart_id: 101,
          nama: "Telur Ayam Kampung",
          harga: 35000,
          qty: 1,
        },
      ];
      setCartItems(dummyData);
      calculateTotal(dummyData);
    } catch (error) {
      console.error("Gagal ambil keranjang");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.harga * item.qty, 0);
    setTotalPrice(total);
  };

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);

  // UPDATE: Ubah Jumlah Barang (Qty)
  const updateQty = async (cartId, newQty) => {
    if (newQty < 1) return removeItem(cartId);

    // Optimistic UI Update
    const updatedCart = cartItems.map((item) =>
      item.cart_id === cartId ? { ...item, qty: newQty } : item,
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);

    try {
      // UNTUK NANTI: await api.put(`/keranjang/${cartId}`, { qty: newQty });
    } catch (error) {
      console.error("Gagal update");
    }
  };

  // DELETE: Hapus dari keranjang
  const removeItem = async (cartId) => {
    const updatedCart = cartItems.filter((item) => item.cart_id !== cartId);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);

    try {
      // UNTUK NANTI: await api.delete(`/keranjang/${cartId}`);
    } catch (error) {
      console.error("Gagal hapus");
    }
  };

  // CREATE: Buat Pesanan (Checkout)
  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Keranjang kosong!");
    try {
      // UNTUK NANTI: await api.post('/checkout', { items: cartItems, total: totalPrice });
      alert("Pesanan berhasil dibuat!");
      navigate("/riwayat");
    } catch (error) {
      alert("Checkout sukses (Simulasi)");
      navigate("/riwayat");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[450px] bg-white min-h-screen flex flex-col relative pb-24">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-5 py-4 flex items-center gap-4 border-b border-gray-100">
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
          <h1 className="text-[18px] font-bold text-gray-900">
            Keranjang Belanja
          </h1>
        </div>

        {/* Daftar Item */}
        <div className="flex-1 p-5 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Keranjang Anda masih kosong.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cart_id}
                className="relative flex items-center gap-4 p-4 mb-4 bg-white border border-gray-100 rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
              >
                {/* Gambar Placeholder */}
                <div className="w-[72px] h-[72px] bg-[#eef2ff] rounded-[14px] flex items-center justify-center text-[#2563eb] font-bold text-[12px]">
                  Egg
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-[14px] text-gray-900 leading-tight pr-6">
                    {item.nama}
                  </h3>
                  <p className="text-[#2563eb] font-bold text-[14px] mt-1 mb-2">
                    {formatRupiah(item.harga)}
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQty(item.cart_id, item.qty - 1)}
                      className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-600"
                    >
                      -
                    </button>
                    <span className="font-bold text-[14px]">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.cart_id, item.qty + 1)}
                      className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Tombol Hapus / Tempat Sampah */}
                <button
                  onClick={() => removeItem(item.cart_id)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* STRUK BELANJA (Hanya muncul jika ada barang) */}
        {cartItems.length > 0 && (
          <div className="p-5 pt-0">
            <div className="bg-[#f8fafc] rounded-[24px] p-5 border border-gray-100">
              <h3 className="font-bold text-[16px] text-gray-900 mb-4">
                Struk Belanja
              </h3>

              {/* Rincian per barang */}
              <div className="flex flex-col gap-2 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cart_id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-500 text-[14px]">
                      {item.nama} x{item.qty}
                    </span>
                    <span className="font-bold text-gray-800 text-[14px]">
                      {formatRupiah(item.harga * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200 mb-4" />

              {/* Total Akhir */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-[16px] text-gray-900">
                  Total
                </span>
                <span className="font-bold text-[18px] text-[#2563eb]">
                  {formatRupiah(totalPrice)}
                </span>
              </div>

              {/* Tombol Checkout */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-[16px] py-4 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-all"
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
}
