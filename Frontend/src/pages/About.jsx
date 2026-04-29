import { useState, useEffect } from "react";
// import { api } from "../api/axios";
import BottomNav from "../components/BottomNav";

export default function About() {
  const [aboutInfo, setAboutInfo] = useState({
    title: "",
    subtitle: "",
    description1: "",
    description2: "",
  });

  // State baru untuk menampung nominal total simpanan
  const [totalSimpanan, setTotalSimpanan] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi memanggil API Backend (Laravel)
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        // UNTUK NANTI: Endpoint untuk mengambil data about dan total simpanan
        // const responseAbout = await api.get('/settings/about');
        // const responseSimpanan = await api.get('/simpanan/total-global');
        // setAboutInfo(responseAbout.data.data);
        // setTotalSimpanan(responseSimpanan.data.total);

        // --- DATA DUMMY SEMENTARA ---
        setTimeout(() => {
          setAboutInfo({
            title: "Kopdes Toyareja",
            subtitle: "Belanja Mudah, Harga Hemat",
            description1:
              "Kopdes Toyareja adalah platform e-commerce yang menyediakan kebutuhan sembako berkualitas langsung dari petani dan produsen terpercaya. Kami berkomitmen untuk menyediakan produk segar dengan harga terjangkau untuk keluarga Indonesia.",
            description2:
              "Dengan sistem poin reward dan berbagai metode pembayaran yang mudah, kami hadir untuk memberikan pengalaman belanja sembako yang menyenangkan dan praktis.",
          });

          // Simulasi total simpanan anggota (misal: Rp 125.500.000)
          setTotalSimpanan(125500000);
          setIsLoading(false);
        }, 500); // Simulasi loading 0.5 detik
      } catch (error) {
        console.error("Gagal mengambil data about:", error);
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Container utama untuk mobile view */}
      <div className="w-full max-w-[450px] bg-white min-h-screen relative pb-24">
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-300 px-6 py-5">
          <h1 className="text-[22px] font-bold text-gray-800 tracking-tight">
            Tentang Kami
          </h1>
        </div>

        {/* LIST KONTEN */}
        <div className="p-5">
          {/* 1. Kartu Biru (Header Profil) */}
          <div className="bg-[#2563eb] rounded-[24px] p-8 flex flex-col items-center text-center shadow-[0_10px_25px_rgba(37,99,235,0.25)] mb-5">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm overflow-hidden">
              <span className="text-green-600 font-bold text-[22px]">Leaf</span>
            </div>
            <h2 className="text-white font-bold text-[24px] mb-1">
              {aboutInfo.title}
            </h2>
            <p className="text-white/90 text-[15px]">{aboutInfo.subtitle}</p>
          </div>

          {/* 2. Kartu Mini: Total Simpanan (Bagian Baru) */}
          <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                {/* Ikon Dompet */}
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-[12px] font-medium mb-0.5">
                  Total Simpanan Anggota
                </p>
                {isLoading ? (
                  <div className="h-6 bg-gray-200 w-32 animate-pulse rounded"></div>
                ) : (
                  <p className="text-gray-900 font-extrabold text-[18px]">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(totalSimpanan)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 3. Kartu Putih (Deskripsi Teks) */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-gray-900 text-[18px] mb-4">
              Tentang Kami
            </h3>

            {isLoading ? (
              <div className="animate-pulse flex flex-col gap-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-gray-600 text-[15px] leading-relaxed">
                <p>{aboutInfo.description1}</p>
                <p>{aboutInfo.description2}</p>
              </div>
            )}
          </div>
        </div>

        {/* Panggil Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
