import { useState, useEffect } from "react";
import { getUserOrders } from "../api/orders";
import BottomNav from "../components/BottomNav";
import { formatTanggalIndo } from "../utilities/formatters";

export default function Riwayat() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk mengontrol Modal Detail Struk
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Ambil riwayat pesanan dari API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Gagal mengambil data riwayat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  // Fungsi pengatur warna badge Status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Menunggu":
        return "bg-orange-100 text-yellow-700";
      case "Selesai":
        return "bg-green-100 text-green-500";
      case "Diproses":
        return "bg-blue-100 text-blue-500";
      case "Dibatalkan":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[450px] bg-white min-h-screen relative pb-24">
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 py-5">
          <h1 className="text-[22px] font-bold text-gray-800 tracking-tight">
            Riwayat Pembelian
          </h1>
        </div>

        {/* LIST KONTEN */}
        <div className="p-5">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Memuat riwayat...
            </div>
          ) : orders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {orders.sort((a, b) => b.id - a.id).map((order, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedOrder(order)} // <--- Pemicu Modal
                  className="bg-white rounded-[24px] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="font-bold text-gray-900 text-[15px] mb-0.5">
                        {order.id}
                      </h2>
                      <p className="text-gray-500 text-[12px]">{order.created_at}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600">
                        {order.metode_pembayaran === "cod"
                          ? "COD"
                          : order.metode_pembayaran}
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-medium ${getStatusStyle(order.status)}`}
                      >
                        {order.status_pesanan}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-[13px] mb-3">
                    {order.details?.length} item
                  </p>
                  <hr className="border-gray-100 my-3" />

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500 text-[13px]">Total</span>
                    <span className="font-bold text-[#1e3a8a] text-[16px]">
                      {formatRupiah(order.total_harga)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Belum ada riwayat pembelian.
            </div>
          )}
        </div>

        {/* Panggil Bottom Navigation */}
        <BottomNav />

        {/* ========================================= */}
        {/* MODAL / POP-UP DETAIL STRUK */}
        {/* ========================================= */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:max-w-[450px] sm:mx-auto">
            {/* Animasi muncul dari bawah/tengah */}
            <div className="bg-white w-full rounded-[28px] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden animate-[scale-up_0.2s_ease-out]">
              {/* Header Modal */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-[18px] text-[#1e293b]">
                  Detail Struk
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Judul Toko */}
              <div className="text-center mb-6">
                <h3 className="font-bold text-[22px] text-[#1e293b] mb-1">
                  Kopdes Toyareja
                </h3>
                <p className="text-gray-500 text-[13px]">
                  Belanja Mudah, Harga Hemat
                </p>
              </div>

              {/* Info Transaksi */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[13px]">
                    No. Transaksi
                  </span>
                  <span className="font-bold text-[#1e293b] text-[13px]">
                    {selectedOrder.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[13px]">Nama Penerima</span>
                  <span className="font-bold text-[#1e293b] text-[13px]">
                    {selectedOrder.user?.anggota?.nama_lengkap}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[13px]">Tanggal</span>
                  <span className="font-bold text-[#1e293b] text-[13px]">
                    {formatTanggalIndo(selectedOrder.created_at)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[13px]">
                    Metode Pembayaran
                  </span>
                  <span className="font-bold text-[#1e293b] text-[13px]">
                    {selectedOrder.metode_pembayaran}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[13px]">
                    Alamat Pengiriman
                  </span>
                  <span className="font-bold text-[#1e293b] text-[13px]">
                    {selectedOrder.alamat_pengiriman}
                  </span>
                </div>
              </div>

              <hr className="border-gray-200 mb-5" />

              {/* Daftar Item Pembelian */}
              <div className="mb-6">
                <h4 className="font-bold text-[#1e293b] text-[15px] mb-4">
                  Item Pembelian
                </h4>
                <div className="flex flex-col gap-4">
                  {selectedOrder.details?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1e293b] text-[14px] mb-0.5">
                          {item.product?.nama_produk}
                        </span>
                        <span className="text-gray-400 text-[12px]">
                          {item.jumlah} x {formatRupiah(item.product?.harga)}
                        </span>
                      </div>
                      <span className="font-bold text-[#1e293b] text-[14px]">
                        {formatRupiah(item.jumlah * item.product?.harga)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 mb-5" />

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-[#1e293b] text-[17px]">
                  Total
                </span>
                <span className="font-bold text-blue-600 text-[18px]">
                  {formatRupiah(selectedOrder.total_harga)}
                </span>
              </div>

              {selectedOrder.poin > 0 && (
                <div className="bg-[#fffcf0] border border-yellow-200 rounded-[14px] p-4 flex justify-between items-center mb-8">
                  <span className="font-bold text-[#92400e] text-[14px]">
                    Poin yang didapat
                  </span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span className="font-extrabold text-[#b45309] text-[15px]">
                      +{selectedOrder.points}
                    </span>
                  </div>
                </div>
              )}

              {/* Footer Modal */}
              <div className="text-center text-gray-400 text-[12px] leading-relaxed pb-2">
                <p>Terima kasih atas pembelian Anda!</p>
                <p>Kopdes Toyareja</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
