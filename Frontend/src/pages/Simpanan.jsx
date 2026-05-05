import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/AuthContext";

export default function Simpanan() {
  const { profile, loading } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Container utama untuk mobile view */}
      <div className="w-full max-w-[450px] bg-white min-h-screen relative pb-24 flex flex-col">
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-300 px-6 py-5">
          <h1 className="text-[22px] font-bold text-gray-800 tracking-tight">
            Simpanan
          </h1>
        </div>

        {/* AREA KONTEN UTAMA */}
        <div className="flex-1 flex flex-col relative">
          {loading ? (
            <div className="p-5">
              {/* Skeleton Loading untuk Card */}
              <div className="h-32 bg-gray-200 animate-pulse rounded-[16px] w-full"></div>
            </div>
          ) : profile.user?.role === 'anggota' ? (
            /* TAMPILAN JIKA USER ADALAH ANGGOTA (KARTU BIRU) */
            <div className="p-5">
              <div className="bg-[#2563eb] rounded-[16px] p-6 shadow-[0_8px_20px_rgba(37,99,235,0.3)]">
                <div className="flex items-center gap-2 mb-3">
                  {/* Ikon Dompet Kecil */}
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2H2V5zm0 4v6a2 2 0 002 2h12a2 2 0 002-2V9H2zm2 2a1 1 0 100 2h3a1 1 0 100-2H4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white text-[14px] font-medium tracking-wide">
                    Saldo Tersedia
                  </span>
                </div>
                <h2 className="text-white font-bold text-[32px] tracking-tight">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(profile.total_simpanan)}
                </h2>
              </div>
            </div>
          ) : (
            /* TAMPILAN JIKA USER BUKAN ANGGOTA (TEKS DI TENGAH) */
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-black text-[13px] font-bold mb-1">
                Anda belum terdaftar sebagai anggota.
              </p>
              <p className="text-black text-[13px] font-bold leading-relaxed">
                Silakan hubungi nomor di bawah ini jika Anda ingin mendaftar
                menjadi anggota.
              </p>
            </div>
          )}
        </div>

        {/* Panggil Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
