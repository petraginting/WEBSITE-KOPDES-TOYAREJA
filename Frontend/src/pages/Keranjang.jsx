import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateCartItem, removeFromCart } from "../api/cart";
import { checkout } from "../api/orders";
import BottomNav from "../components/BottomNav";
import PaymentModal from "../components/PaymentModal";

export default function Keranjang() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ambil keranjang dari API
  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const data = await getCart();
      setCartItems(data);
      calculateTotal(data);
    } catch (error) {
      console.error("Gagal ambil keranjang", error);
      // Dummy fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      // Gunakan item.harga atau item.product.harga tergantung struktur API Anda
      const harga = item.product?.harga;
      return sum + (harga * item.kuantitas);
    }, 0);
    setTotalPrice(total);
  };

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);

  const updateQty = async (cartId, newQty) => {
    if (newQty < 1) return removeItem(cartId);

    try {
      setIsLoading(true);
      await updateCartItem(cartId, newQty);
      const updatedCart = cartItems.map((item) =>
        item.cart_id === cartId ? { ...item, kuantitas: newQty } : item,
      );
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Gagal update qty:", error);
      alert("Gagal update qty: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (cartId) => {
    try {
      setIsLoading(true);
      await removeFromCart(cartId);
      const updatedCart = cartItems.filter((item) => item.cart_id !== cartId);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Gagal hapus item:", error);
      alert("Gagal hapus item: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(cartItems);


  const handleCheckout = async (paymentMethod) => {
    if (cartItems.length === 0) return alert("Keranjang kosong!");

    try {
      setIsLoading(true);
      const checkoutData = {
        items: cartItems.map(item => ({
          product_id: item.id,
          qty: item.kuantitas,
          price: item.product?.harga
        })),
        total_price: totalPrice,
        payment_method: paymentMethod,
      };

      const result = await checkout(checkoutData);
      setShowPaymentModal(false);
      setCartItems([]);
      setTotalPrice(0);
      alert("Checkout berhasil! Nomor pesanan: " + result.order_id);
      navigate("/riwayat");
    } catch (error) {
      console.error("Gagal checkout:", error);
      alert("Gagal checkout: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return alert("Keranjang kosong!");
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[450px] bg-white min-h-screen flex flex-col relative">
        {/* Header — sticky di atas */}
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

        {/* ✅ Daftar Item — scroll area, kasih padding bawah agar tidak tertutup struk */}
        <div className="flex-1 overflow-y-auto p-5 pb-[220px]">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Keranjang Anda masih kosong.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="relative flex items-center gap-4 p-4 mb-4 bg-white border border-gray-100 rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
              >
                <div className="w-[72px] h-[72px] bg-[#eef2ff] rounded-[14px] flex items-center justify-center text-[#2563eb] font-bold text-[12px]">
                  <img src={item.product?.gambar} alt={item.product?.nama_produk} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[14px] text-gray-900 leading-tight pr-6">
                    {item.product?.nama_produk}
                  </h3>
                  <p className="text-[#2563eb] font-bold text-[14px] mt-1 mb-2">
                    {formatRupiah(item.product?.harga)}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQty(item.id, item.kuantitas - 1)}
                      className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-600"
                    >
                      -
                    </button>
                    <span className="font-bold text-[14px]">{item.kuantitas}</span>
                    <button
                      onClick={() => updateQty(item.id, item.kuantitas + 1)}
                      className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center font-bold text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
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

        {/* ✅ STRUK BELANJA — fixed di bawah, di atas BottomNav */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-[450px] px-5 pb-3 bg-white border-t border-gray-100 z-50">
            <div className="bg-[#f8fafc] rounded-[24px] p-5 border border-gray-100 mt-3 shadow-sm">
              <h3 className="font-bold text-[16px] text-gray-900 mb-4">Struk Belanja</h3>

              {/* Daftar Item - Berikan max-height agar tidak menutupi layar jika item banyak */}
              <div className="space-y-3 mb-4 max-h-[150px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.cart_id} className="flex justify-between items-center">
                    <span className="text-gray-500 text-[14px]">
                      {item.product?.nama_produk} <span className="text-blue-600 font-medium">x{item.kuantitas}</span>
                    </span>
                    <span className="font-bold text-gray-800 text-[14px]">
                      {formatRupiah(item.product?.harga * item.kuantitas)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200 mb-4" />

              {/* Total + Tombol Checkout */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-[12px]">Total Pembayaran</p>
                  <p className="font-bold text-[18px] text-[#2563eb]">
                    {formatRupiah(totalPrice)}
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Proses...
                    </div>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}


        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onCheckout={handleCheckout}
          totalPrice={totalPrice}
        />

        <BottomNav />
      </div>
    </div>
  );
}
