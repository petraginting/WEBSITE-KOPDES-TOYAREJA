import { useState } from "react";
import { Data_Transaksi, Data_Simpanan } from "../dataset/data.laporan";

export default function LaporanContent() {
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [selectedYear, setSelectedYear] = useState("2026");

  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  //  LOGIKA FILTER
  const filterByDate = (data) => {
    return data.filter((item) => {
      const date = new Date(item.tanggal);
      const itemMonth = (date.getMonth() + 1).toString().padStart(2, "0");
      const itemYear = date.getFullYear().toString();
      return itemMonth === selectedMonth && itemYear === selectedYear;
    });
  };

  const filteredTransaksi = filterByDate(Data_Transaksi);
  const filteredSimpanan = filterByDate(Data_Simpanan);

  //  FUNGSI EXPORT EXCEL (CSV)
  const exportToCSV = (data, fileName, headers) => {
    if (data.length === 0) {
      alert("Tidak ada data untuk dieksport pada periode ini.");
      return;
    }

    // Gabung Header dan Baris Data
    const csvRows = [
      headers.join(","), // Baris pertama: Header
      ...data.map((row) => Object.values(row).join(",")), // Baris berikutnya: Data
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Trigger Download Browser
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${fileName}_${selectedMonth}_${selectedYear}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fadeInUp print:p-0">
      {/* Header Halaman */}
      <div className="flex items-center justify-end mb-6 print:hidden">
        <div className="flex gap-2.5">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-border rounded-xl py-2 px-3 text-[13px] bg-white outline-none focus:border-blue-400 cursor-pointer"
          >
            <option value="01">Januari</option>
            <option value="02">Februari</option>
            <option value="03">Maret</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-border rounded-xl py-2 px-3 text-[13px] bg-white outline-none focus:border-blue-400 cursor-pointer"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>

          <button
            onClick={() => window.print()}
            className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:shadow-lg transition-all"
          >
            ⬇ Cetak PDF
          </button>
        </div>
      </div>

      {/* Ringkasan Laporan */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <ReportCard
          label="Penjualan"
          value={formatIDR(filteredTransaksi.reduce((a, b) => a + b.total, 0))}
        />
        <ReportCard label="Transaksi" value={filteredTransaksi.length} />
        <ReportCard
          label="Simpanan"
          value={formatIDR(filteredSimpanan.reduce((a, b) => a + b.jumlah, 0))}
        />
      </div>

      {/* TABEL 1: TRANSAKSI */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-bold text-dark">
            💳 Laporan Transaksi Penjualan
          </h3>
          <button
            onClick={() =>
              exportToCSV(filteredTransaksi, "Laporan_Transaksi", [
                "ID",
                "Nama",
                "Produk",
                "Qty",
                "Total",
                "Tanggal",
              ])
            }
            className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all print:hidden"
          >
            Excel (CSV)
          </button>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-blue-50/50 border-b border-border">
              <th className="px-4 py-3 text-left">No. TRX</th>
              <th className="px-4 py-3 text-left">Anggota</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransaksi.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-bold">{item.id}</td>
                <td className="px-4 py-3">{item.nama}</td>
                <td className="px-4 py-3 font-semibold">
                  {formatIDR(item.total)}
                </td>
                <td className="px-4 py-3 text-light">{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransaksi.length === 0 && <EmptyData />}
      </div>

      {/* TABEL 2: SIMPANAN */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-bold text-dark">
            💰 Laporan Simpanan Anggota
          </h3>
          <button
            onClick={() =>
              exportToCSV(filteredSimpanan, "Laporan_Simpanan", [
                "ID",
                "Nama",
                "Jenis",
                "Jumlah",
                "Tanggal",
              ])
            }
            className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all print:hidden"
          >
            Excel (CSV)
          </button>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-blue-50/50 border-b border-border">
              <th className="px-4 py-3 text-left">ID Anggota</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Jumlah</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredSimpanan.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-bold">{item.id}</td>
                <td className="px-4 py-3">{item.nama}</td>
                <td className="px-4 py-3 font-semibold">
                  {formatIDR(item.jumlah)}
                </td>
                <td className="px-4 py-3 text-light">{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredSimpanan.length === 0 && <EmptyData />}
      </div>
    </div>
  );
}

function ReportCard({ label, value }) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 text-center shadow-sm">
      <div className="text-xl font-extrabold text-blue-700">{value}</div>
      <div className="text-[11px] text-light uppercase tracking-wider mt-1 font-semibold">
        {label}
      </div>
    </div>
  );
}

function EmptyData() {
  return (
    <div className="p-10 text-center text-light italic text-sm">
      Tidak ada data untuk periode ini.
    </div>
  );
}
