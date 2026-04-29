import React, { useState, useRef } from "react";

const PaymentModal = ({ isOpen, onClose, totalPrice, onCheckout }) => {
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [proofFile, setProofFile] = useState(null);
  const [showCODPopup, setShowCODPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);

  const handleSuccessTransaction = async (method) => {
    if (!onCheckout) {
      alert(`Transaksi dengan ${method.toUpperCase()} berhasil!`);
      onClose();
      resetForm();
      return;
    }

    try {
      setIsProcessing(true);
      await onCheckout(method);
      resetForm();
      // onClose dipanggil oleh parent setelah checkout berhasil
    } catch (error) {
      console.error("Error during checkout:", error);
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setProofFile(null);
    setPaymentMethod("qris");
    setShowCODPopup(false);
  };

  const handleMethodSelect = (method) => {
    if (method === "cod") {
      setShowCODPopup(true);
    } else {
      setPaymentMethod("qris");
    }
  };

  const confirmCOD = () => {
    setShowCODPopup(false);
    setPaymentMethod("cod");
    handleSuccessTransaction("cod");
  };

  const cancelCOD = () => {
    setShowCODPopup(false);
    setPaymentMethod("qris");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProofFile(file);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay & Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50">
        {/* ✅ Modal wrapper — flex column, tinggi max 90vh */}
        <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl relative flex flex-col max-h-[90vh]">
          {/* ✅ Header — fixed, tidak ikut scroll */}
          <div className="flex items-center px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <button
              onClick={onClose}
              className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
            <h2 className="text-xl font-bold text-gray-800">Pembayaran</h2>
          </div>

          {/* ✅ Konten — bisa discroll */}
          <div className="overflow-y-auto flex-1 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Pilih Metode Pembayaran
            </h3>

            {/* Opsi QRIS */}
            <div
              onClick={() => handleMethodSelect("qris")}
              className={`border-2 rounded-xl p-4 mb-4 flex justify-between items-center cursor-pointer transition-all ${paymentMethod === "qris"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-blue-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800">QRIS</p>
                  <p className="text-sm text-gray-500">Bayar dengan scan QR</p>
                </div>
              </div>
              {paymentMethod === "qris" && (
                <div className="bg-blue-600 text-white rounded-full p-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Area QRIS */}
            {paymentMethod === "qris" && (
              <div className="mb-6">
                <div className="bg-gray-300 w-48 h-48 mx-auto mb-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-medium">
                    Gambar QRIS di sini
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">
                  Bukti Pembayaran
                </h4>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="bg-gray-200 h-24 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors border-2 border-dashed border-gray-400"
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
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}

            {/* Opsi COD */}
            <div
              onClick={() => handleMethodSelect("cod")}
              className={`border-2 rounded-xl p-4 mb-6 flex justify-between items-center cursor-pointer transition-all ${paymentMethod === "cod"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-sm text-gray-500">
                    Bayar saat barang sampai
                  </p>
                </div>
              </div>
              {paymentMethod === "cod" && (
                <div className="bg-blue-600 text-white rounded-full p-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Ringkasan Total */}
            <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Total Pembayaran</span>
              <span className="text-blue-700 font-bold text-lg">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            <div className="flex gap-4">
              {/* Tombol Batal */}
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>

              {/* Tombol Konfirmasi */}
              <button
                onClick={() => handleSuccessTransaction(paymentMethod)}
                disabled={isProcessing || (paymentMethod === "qris" && !proofFile)}
                className={`flex-1 font-bold py-3 rounded-lg transition ${isProcessing || (paymentMethod === "qris" && !proofFile)
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
          {/* ✅ Tutup area scroll */}
        </div>
      </div>

      {/* Pop-up Konfirmasi COD */}
      {showCODPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Konfirmasi COD
            </h3>
            <p className="text-gray-600 mb-6">
              Anda memilih metode pembayaran di tempat (Cash on Delivery). Kurir
              akan menagih sejumlah{" "}
              <span className="font-bold text-gray-800">
                {formatRupiah(totalPrice)}
              </span>{" "}
              saat barang sampai. Lanjutkan pesanan?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelCOD}
                className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={confirmCOD}
                disabled={isProcessing}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isProcessing ? "Memproses..." : "Ya, Lanjutkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
