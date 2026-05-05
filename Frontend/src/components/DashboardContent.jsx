import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useSimpanan } from "../context/SimpananContext";
import { getAllProducts } from "../api/products";
import { useAnggota } from "../context/AnggotaContext";
import { formatRupiah } from "../utilities/simpanan";

export default function DashboardContent({ setActiveSection }) {
  const { anggotaList } = useAnggota()

  const [pesananList, setPesananList] = useState([]);
  const [product, setProduct] = useState([])
  const { totalPokok, totalWajib, totalSukarela } = useSimpanan();
  // const [isLoading, setIsLoading] = useState(false);
  // --- 1. STATE UNTUK DATA


  const totalSimpanan = totalPokok + totalWajib + totalSukarela
  // Data Statistik Atas
  const statsData = [
    {
      icon: "👥",
      value: anggotaList.length,
      label: "Total Anggota",
      change: "↑ +12 anggota bulan ini",
      colorClass: "from-blue-600 to-blue-400",
    },
    {
      icon: "🛒",
      value: product.length,
      label: "Produk Tersedia",
      change: "↑ +5 produk baru",
      colorClass: "from-gold to-gold-light",
    },
    {
      icon: "📦",
      value: pesananList.length,
      label: "Total Pesanan Masuk",
      change: "↑ +28 pesanan bulan ini",
      colorClass: "from-blue-500 to-blue-400",
    },
    {
      icon: "💰",
      value: formatRupiah(totalSimpanan), // 🔥 dinamis
      label: "Total Simpanan Anggota",
      change: "↑ +Rp 18 jt",
      colorClass: "from-purple-500 to-purple-400",
    },
  ];

  // Data Grafik Penjualan
  const [chartData] = useState([
    { val: "42jt", height: "70px", label: "Jan", opacity: "1" },
    { val: "38jt", height: "60px", label: "Feb", opacity: "0.8" },
    { val: "56jt", height: "90px", label: "Mar", opacity: "1" },
    { val: "48jt", height: "76px", label: "Apr", opacity: "0.8" },
    { val: "65jt", height: "100px", label: "Mei", opacity: "1" },
    { val: "53jt", height: "84px", label: "Jun", opacity: "0.8" },
  ]);



  const fetchDataPesanan = async () => {
    // setIsLoading(true);
    try {
      const response = await api.get("/admin/pesanan");
      setPesananList(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      alert("Gagal memuat data pesanan dari server.");
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchDataProduct = async () => {
    try {
      const data = await getAllProducts()
      setProduct(data)
    } catch (error) {
      console.error(error);
      alert("Gagal memuat data produk dari server.")
    }
  }

  useEffect(() => {
    fetchDataProduct()
    fetchDataPesanan();
  }, []);



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

  ]);

  return (
    <div className="animate-fadeInUp">
      {/*  STATS GRID  */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        {statsData.map((item, i) => (
          <StatCard
            key={i}
            icon={item.icon}
            value={item.value}
            label={item.label}
            change={item.change}
            colorClass={item.colorClass}
          />
        ))}
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
                  Jumlah Produk
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
              {pesananList.slice(0, 5).map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-blue-50 border-b border-blue-50"
                >
                  <td className="px-4 py-3 text-dark font-bold">#{order.id}</td>
                  <td className="px-4 py-3 text-dark">{order.user?.anggota?.nama_lengkap}</td>
                  <td className="px-4 py-3 text-dark">{order.details?.length}</td>
                  <td className="px-4 py-3 text-dark">{formatRupiah(order.total_harga)}</td>
                  <td className="px-4 py-3 text-dark">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`
                        ${order.status_pesanan === 'pending' ? "bg-amber-100 text-amber-700" : ""} 
                        ${order.status_pesanan === 'diproses' ? "bg-blue-100 text-blue-700" : ""} 
                        ${order.status_pesanan === 'selesai' ? "bg-emerald-100 text-emerald-700" : ""} 
                        ${order.status_pesanan === 'dibatalkan' ? "bg-red-100 text-red-700" : ""}
                        px-2.5 py-0.5 rounded-full text-[11px] font-semibold before:content-['●'] before:mr-1 before:text-[8px]`}
                    >
                      {order.status_pesanan}
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
