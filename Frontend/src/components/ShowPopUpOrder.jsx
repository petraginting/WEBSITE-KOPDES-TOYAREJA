import React from 'react'
import { formatRupiah } from '../utilities/formatters'

const ShowPopUpOrder = ({ totalPrice, isProcessing, cancel, metode_pembayaran, confirm }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-6 rounded-xl max-w-sm w-full mx-4 shadow-2xl transform transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Konfirmasi {metode_pembayaran}
                </h3>
                {metode_pembayaran === "cod" ? (
                    <p className="text-gray-600 mb-6">
                        Anda memilih metode pembayaran di tempat (Cash on Delivery). Kurir
                        akan menagih sejumlah{" "}
                        <span className="font-bold text-gray-800">
                            {formatRupiah(totalPrice)}
                        </span>{" "}
                        saat barang sampai. Lanjutkan pesanan?
                    </p>
                ) : (
                    <p className="text-gray-600 mb-6">
                        Anda memilih metode pembayaran Qris. Anda harus membayar{" "}
                        <span className="font-bold text-gray-800">
                            {formatRupiah(totalPrice)}
                        </span>{" "}. Lanjutkan pesanan?
                    </p>
                )}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={cancel}
                        className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => confirm(metode_pembayaran)}
                        disabled={isProcessing}
                        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {isProcessing ? "Memproses..." : "Ya, Lanjutkan"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShowPopUpOrder
