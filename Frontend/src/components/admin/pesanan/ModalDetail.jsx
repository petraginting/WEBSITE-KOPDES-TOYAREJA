import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { baseURL, formatIDR } from "../../../utilities/produkUtils";
import { createPortal } from "react-dom";
import PreviewFoto from "../../profile/PreviewFoto";
import { formatTanggalIndo } from "../../../utilities/formatters";

const ModalDetail = ({ data, onClose, statusStyles }) => {
    // State untuk menyimpan daftar item dari tabel detail_pesanan
    const [detailItems, setDetailItems] = useState([]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)


    // Fetch data detail pesanan saat modal dibuka
    useEffect(() => {
        const fetchDetailPesanan = async () => {
            setIsLoadingDetails(true);
            try {
                // Sesuaikan endpoint ini dengan route 'show' di web.php / api.php Laravel Anda
                // Contoh: Route::get('/detail-pesanan/{pesanan_id}', [DetailPesananController::class, 'show']);
                const response = await api.get(`/pesanan/${data.id}`);

                // Mengambil array dari response JSON Laravel: 'data' => $details
                setDetailItems(response.data.data);
            } catch (error) {
                console.error("Gagal mengambil detail pesanan:", error);
            } finally {
                setIsLoadingDetails(false);
            }
        };

        if (data && data.id) {
            fetchDetailPesanan();
        }
    }, [data]);

    return (
        createPortal(
            <div className="fixed inset-0 z-[999] flex justify-center items-start overflow-y-auto pt-10 pb-10 backdrop-blur-md bg-black/40">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-fadeInUp p-6 max-h-[120vh] flex flex-col">
                    {/* HEADER MODAL */}
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-dark">Detail Pesanan</h2>
                            <p className="text-sm text-gray-500">#{data.orderId || data.id}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:bg-red-50 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center text-2xl transition-all"
                        >
                            ×
                        </button>
                    </div>

                    {/* INFO PELANGGAN */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                            <p className="text-gray-500 mb-1">Nama Anggota</p>
                            <p className="font-semibold text-dark">{data.user?.anggota?.nama_lengkap}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Status Pesanan</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusStyles[data.status_pesanan]}`}>
                                {data.status_pesanan}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                            <p className="text-gray-500 mb-1">Alamat</p>
                            <p className="font-semibold text-dark">{data.alamat_pengiriman}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Tanggal Pesanan</p>
                            <p className="font-semibold text-dark">{formatTanggalIndo(data.created_at)}</p>
                        </div>
                    </div>

                    {data.bukti_pembayaran && (
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div>
                                <p className="text-gray-500 mb-1">Metode Pembayaran</p>
                                <p className="text-lg uppercase text-gray-800 font-bold">{data.metode_pembayaran}</p>

                            </div>
                            <div
                                onClick={() => {
                                    if (data.bukti_pembayaran) setIsPreviewOpen(true);
                                }}
                            >
                                <img src={baseURL + data.bukti_pembayaran} alt="Zoomed Preview" className="h-20 cursor-zoom-in" />
                            </div>
                        </div>
                    )}

                    {isPreviewOpen && data.bukti_pembayaran && (
                        <PreviewFoto
                            foto={baseURL + data.bukti_pembayaran}
                            setIsPreviewOpen={setIsPreviewOpen}
                        />
                    )}

                    {/* TABEL ITEM PRODUK (Dari DetailPesananController) */}
                    <div className="flex-1 overflow-y-auto border border-gray-200 rounded-xl">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-gray-50 sticky top-0 shadow-sm">
                                <tr>
                                    <th className="py-3 px-4 font-semibold text-gray-600 border-b">
                                        Produk
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-gray-600 border-b text-center">
                                        Harga Satuan
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-gray-600 border-b text-center">
                                        Jumlah
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-gray-600 border-b text-right">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoadingDetails ? (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-gray-500">
                                            <span className="animate-pulse">
                                                Memuat daftar produk...
                                            </span>
                                        </td>
                                    </tr>
                                ) : detailItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-gray-500">
                                            Tidak ada produk dalam pesanan ini.
                                        </td>
                                    </tr>
                                ) : (
                                    detailItems.details?.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b last:border-0 hover:bg-gray-50"
                                        >
                                            {/* Sesuaikan item.product.nama dengan nama kolom di tabel Product Anda */}
                                            <td className="py-3 px-4 font-medium text-dark">
                                                {item.product?.nama_produk ||
                                                    item.name ||
                                                    "Produk Tidak Diketahui"}
                                            </td>
                                            {/* Asumsi harga didapat dari harga produk dibagi jumlah atau langsung dari relasi */}
                                            <td className="py-3 px-4 text-center text-gray-600">
                                                {formatIDR(item.harga_satuan)}
                                            </td>
                                            <td className="py-3 px-4 text-center font-medium">
                                                {item.jumlah}
                                            </td>
                                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                                                {formatIDR(item.subtotal)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* FOOTER TOTAL */}
                    <div className="mt-6 flex justify-between items-center border-t pt-4">
                        <span className="text-gray-500 font-medium">Total Keseluruhan</span>
                        <span className="text-2xl font-bold text-dark">
                            {formatIDR(data.total_harga || data.total)}
                        </span>
                    </div>
                </div>
            </div>,
            document.body,
        )
    );
}

export default ModalDetail;