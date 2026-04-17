import { useState } from "react";

export default function DashboardContent({ setActiveSection }) {
  // --- 1. STATE UNTUK DATA

  // Data Statistik Atas
  const [statsData] = useState({
    anggota: { value: "248", change: "↑ +12 anggota bulan ini" },
    produk: { value: "64", change: "↑ +5 produk baru" },
    pesanan: { value: "127", change: "↑ +28 pesanan bulan ini" },
    simpanan: { value: "Rp 482 jt", change: "↑ +Rp 18 jt" },
  });

  // Data Grafik Penjualan
  const [chartData] = useState([
    { val: "42jt", height: "70px", label: "Jan", opacity: "1" },
    { val: "38jt", height: "60px", label: "Feb", opacity: "0.8" },
    { val: "56jt", height: "90px", label: "Mar", opacity: "1" },
    { val: "48jt", height: "76px", label: "Apr", opacity: "0.8" },
    { val: "65jt", height: "100px", label: "Mei", opacity: "1" },
    { val: "53jt", height: "84px", label: "Jun", opacity: "0.8" },
  ]);

  // Data Aktivitas Terbaru
  const [activities] = useState([
    {
      id: 1,
      title: "Pesanan #ORD-127 masuk",
      desc: "Budi Santoso — Beras Organik 5kg x2",
      time: "10 menit lalu",
    },
    {
      id: 2,
      title: "Anggota baru terdaftar",
      desc: "Siti Rahayu — No. Anggota #A248",
      time: "1 jam lalu",
    },
    {
      id: 3,
      title: "Simpanan dicatat",
      desc: "Ahmad Fauzi — Simpanan Wajib Rp 50.000",
      time: "2 jam lalu",
    },
    {
      id: 4,
      title: "Produk stok diperbarui",
      desc: "Minyak Goreng 1L — stok menjadi 120 unit",
      time: "3 jam lalu",
    },
    {
      id: 5,
      title: "Pesanan #ORD-126 selesai",
      desc: "Dewi Lestari — status diperbarui: Selesai",
      time: "5 jam lalu",
    },
  ]);

  // Data Tabel Pesanan
  const [recentOrders] = useState([
    {
      id: "ORD-127",
      name: "Budi Santoso",
      product: "Beras Organik 5kg",
      total: "Rp 130.000",
      date: "07/03/2026",
      status: "Diproses",
      statusColor: "bg-[#fef3cd] text-[#854d0e]",
    },
    {
      id: "ORD-126",
      name: "Dewi Lestari",
      product: "Minyak Goreng 1L",
      total: "Rp 45.000",
      date: "06/03/2026",
      status: "Selesai",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "ORD-125",
      name: "Hendra Wijaya",
      product: "Gula Pasir 1kg",
      total: "Rp 18.000",
      date: "06/03/2026",
      status: "Selesai",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "ORD-124",
      name: "Rina Marlina",
      product: "Tepung Terigu 1kg",
      total: "Rp 14.000",
      date: "05/03/2026",
      status: "Dibatalkan",
      statusColor: "bg-[#fee2e2] text-[#991b1b]",
    },
  ]);

  return (
    <div className="animate-fadeInUp">
      {/*  STATS GRID  */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCard
          icon="👥"
          value={statsData.anggota.value}
          label="Total Anggota Aktif"
          change={statsData.anggota.change}
          colorClass="from-blue-600 to-blue-400"
        />
        <StatCard
          icon="🛒"
          value={statsData.produk.value}
          label="Produk Tersedia"
          change={statsData.produk.change}
          colorClass="from-gold to-gold-light"
        />
        <StatCard
          icon="📦"
          value={statsData.pesanan.value}
          label="Total Pesanan Masuk"
          change={statsData.pesanan.change}
          colorClass="from-blue-500 to-blue-400"
        />
        <StatCard
          icon="💰"
          value={statsData.simpanan.value}
          label="Total Simpanan Anggota"
          change={statsData.simpanan.change}
          colorClass="from-purple-500 to-purple-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/*  GRAFIK PENJUALAN  */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="text-[15px] font-bold text-dark">
              📈 Transaksi Penjualan (2026)
            </h3>
            <select className="border border-border rounded-xl py-1.5 px-3 text-xs text-dark bg-white outline-none focus:border-blue-400 cursor-pointer">
              <option>Per Bulan</option>
              <option>Per Minggu</option>
            </select>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-2.5 h-[120px] pt-2.5">
              {chartData.map((item, index) => (
                <BarItem
                  key={index}
                  val={item.val}
                  height={item.height}
                  label={item.label}
                  opacity={item.opacity}
                />
              ))}
            </div>
          </div>
        </div>

        {/*  AKTIVITAS TERBARU  */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="text-[15px] font-bold text-dark">
              ⏱️ Aktivitas Terbaru
            </h3>
            <span className="text-xs text-light">Hari ini</span>
          </div>
          <div className="p-6">
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-100">
              {activities.map((act) => (
                <TimelineItem
                  key={act.id}
                  title={act.title}
                  desc={act.desc}
                  time={act.time}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  TABEL PESANAN TERBARU */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-dark">
            📦 Pesanan Terbaru
          </h3>
          {/* Tombol ke tab pesanan */}
          <button
            onClick={() => setActiveSection("pesanan")}
            className="bg-blue-50 text-blue-700 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all"
          >
            Lihat Semua →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  No. Pesanan
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Anggota
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Produk
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Total
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Tanggal
                </th>
                <th className="bg-blue-50 text-mid font-semibold text-xs px-4 py-3 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-blue-50 border-b border-blue-50"
                >
                  <td className="px-4 py-3 text-dark font-bold">#{order.id}</td>
                  <td className="px-4 py-3 text-dark">{order.name}</td>
                  <td className="px-4 py-3 text-dark">{order.product}</td>
                  <td className="px-4 py-3 text-dark">{order.total}</td>
                  <td className="px-4 py-3 text-dark">{order.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${order.statusColor} px-2.5 py-0.5 rounded-full text-[11px] font-semibold before:content-['●'] before:mr-1 before:text-[8px]`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

//  SUB-KOMPONEN BANTUAN

function StatCard({ icon, value, label, change, colorClass }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md group">
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${colorClass}`}
      ></div>
      <div className="text-[28px] mb-3">{icon}</div>
      <div className="text-[28px] font-extrabold text-dark font-serif">
        {value}
      </div>
      <div className="text-xs text-light font-medium mt-1">{label}</div>
      <div className="text-[11px] mt-2 flex items-center gap-1 text-blue-600">
        {change}
      </div>
    </div>
  );
}

function BarItem({ val, height, label, opacity = "1" }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <div className="text-[10px] font-bold text-blue-700">{val}</div>
      <div
        className="w-full rounded-t-md bg-gradient-to-b from-blue-400 to-blue-600 transition-all hover:brightness-110"
        style={{ height: height, opacity: opacity }}
      ></div>
      <div className="text-[10px] text-light">{label}</div>
    </div>
  );
}

function TimelineItem({ title, desc, time }) {
  return (
    <div className="relative mb-5 last:mb-0">
      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_0_3px_#dbeafe]"></div>
      <div className="font-semibold text-[14px] text-dark">{title}</div>
      <div className="text-[13px] text-mid mt-1">{desc}</div>
      <div className="text-[11px] text-light mt-0.5">{time}</div>
    </div>
  );
}
