import React, { useState, useRef, useEffect } from "react";
import { useAnggota } from "../context/AnggotaContext";
import ShowPopUpOrder from "./ShowPopUpOrder";
import { formatRupiah } from "../utilities/formatters";
import qris from "../assets/qris1.jpeg"

const PaymentModal = ({ isOpen, onClose, totalPrice, onCheckout }) => {
  // ✅ Ubah nilai awal menjadi null agar tidak ada yang terbuka otomatis
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [address, setAddress] = useState('')
  const [proofFile, setProofFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const { cek_metode_pembayaran } = useAnggota()

  useEffect(() => {
    if (paymentMethod) {
      cek_metode_pembayaran(paymentMethod);
    }
  }, [paymentMethod, cek_metode_pembayaran]);


  const fileInputRef = useRef(null);


  const handleSuccessTransaction = async (method) => {
    if (!onCheckout) {
      alert(`Transaksi dengan ${method.toUpperCase()} berhasil!`);
      handleCloseModal();
      return;
    }

    try {
      setIsProcessing(true);
      await onCheckout(method, address, proofFile);
      resetForm();
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setProofFile(null);
    setPaymentMethod(null); // Kembalikan ke null saat reset
    setShowPopup(false);
  };

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  // ✅ Fungsi ini sekarang hanya memilih metode, tidak langsung membuka popup COD
  const handleMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  // ✅ Logika baru untuk tombol Konfirmasi di bawah
  const handleConfirmClick = () => {
    if (paymentMethod === "cod") {
      setShowPopup(true); // Popup muncul saat klik konfirmasi
    } else if (paymentMethod === "qris") {
      setShowPopup(true); // Popup muncul saat klik konfirmasi
    }
  };

  const confirm = (metode) => {
    setShowPopup(false);
    handleSuccessTransaction(metode);
  };

  const cancel = () => {
    setShowPopup(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProofFile(file);
  };

  const isFormInvalid =
    !paymentMethod ||
    address.trim() === "" ||
    isProcessing ||
    (paymentMethod === 'qris' && !proofFile)

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay & Modal */}
      <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 lg:mb-10">
        <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl relative flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <button
              onClick={handleCloseModal}
              className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-800">Pembayaran</h2>
          </div>

          {/* Konten */}
          <div className="overflow-y-auto flex-1 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Pilih Metode Pembayaran
            </h3>

            {/* Opsi QRIS */}
            <div
              onClick={() => handleMethodSelect("qris")}
              className={`border-2 rounded-xl p-4 mb-4 flex justify-between items-center cursor-pointer transition-all ${paymentMethod === "qris" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800">QRIS</p>
                  <p className="text-sm text-gray-500">Bayar dengan scan QR</p>
                </div>
              </div>
              {paymentMethod === "qris" && (
                <div className="bg-blue-600 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            {/* Area QRIS - Hanya muncul jika paymentMethod === "qris" */}
            <div className={`overflow-auto transition-all duration-300 ${paymentMethod === "qris" ? "max-h-[1000px] mb-6 opacity-100" : "max-h-0 mb-0 opacity-0"}`}>
              <img src={qris} alt="" className="mb-5" />
              <h4 className="font-bold text-gray-800 mb-2">
                Bukti Pembayaran
              </h4>
              {proofFile && (
                <div className="relative group cursor-zoom-in" onClick={() => setIsZoomed(true)}>
                  <img src={URL.createObjectURL(proofFile)} alt="Preview Bukti" className="h-auto w-full rounded-lg border hover:opacity-90 transition-opacity" />
                  {/* Overlay kecil untuk memberi petunjuk bisa di-klik */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-lg">
                    <span className="bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">Klik untuk Zoom</span>
                  </div>
                </div>
              )}

              <div
                onClick={() => fileInputRef.current.click()}
                className="bg-gray-200 h-24 mt-5 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors border-2 border-dashed border-gray-400"
              >

                {proofFile ? (
                  <span className="text-green-600 font-medium truncate px-4">
                    {proofFile.name}
                  </span>
                ) : (
                  <span className="text-gray-500 font-medium">
                    Klik untuk upload foto bukti
                  </span>
                )}
              </div>
              {/* --- MODAL ZOOM --- */}
              {isZoomed && proofFile && (
                <div
                  className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
                  onClick={() => setIsZoomed(false)}
                >
                  {/* Tombol Close */}
                  <button className="absolute top-5 right-5 text-white text-3xl font-bold">&times;</button>

                  <img
                    src={URL.createObjectURL(proofFile)}
                    alt="Zoomed Preview"
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm transition-transform duration-300 scale-105"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Opsi COD */}
            <div
              onClick={() => handleMethodSelect("cod")}
              className={`border-2 rounded-xl p-4 mb-6 flex justify-between items-center cursor-pointer transition-all ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Cash on Delivery (COD)</p>
                  <p className="text-sm text-gray-500">Bayar saat barang sampai</p>
                </div>
              </div>
              {paymentMethod === "cod" && (
                <div className="bg-blue-600 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2 text-[15px]">
                Alamat Penerima <span className="text-red-500">*</span>
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Jl. Sudirman No. 10, RT 01/RW 02, Purwokerto..."
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-blue-500 transition-colors resize-none bg-gray-50 focus:bg-white"
                rows="3"
              ></textarea>
            </div>

            {/* Ringkasan Total */}
            <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Total Pembayaran</span>
              <span className="text-blue-700 font-bold text-lg">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            <div className="flex gap-4 pb-10 md:pb-1">
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmClick}
                disabled={isFormInvalid}
                className={`flex-1 font-bold py-3 rounded-lg transition ${!paymentMethod || isProcessing || (paymentMethod === "qris" && !proofFile)
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-700 text-white hover:bg-blue-800 shadow-md active:scale-95"
                  }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Memproses...
                  </div>
                ) : (
                  "Konfirmasi"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Konfirmasi COD */}
      {showPopup && (
        <ShowPopUpOrder
          totalPrice={totalPrice}
          isProcessing={isProcessing}
          cancel={cancel}
          metode_pembayaran={paymentMethod}
          confirm={confirm}
        />
      )}
    </>
  );
};

export default PaymentModal;