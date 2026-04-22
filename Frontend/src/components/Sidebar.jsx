export default function Sidebar({
  isOpen,
  setIsOpen,
  activeSection,
  setActiveSection,
  onLogout,
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", section: "Menu Utama" },
    {
      id: "anggota",
      label: "Data Anggota",
      icon: "👥",
      section: "Manajemen Data",
    },
    { id: "simpanan", label: "Simpanan Anggota", icon: "💰" },
    { id: "produk", label: "Produk Koperasi", icon: "🛒" },
    { id: "pesanan", label: "Pesanan", icon: "📦" },
    {
      id: "notifikasi",
      label: "Notifikasi & Promo",
      icon: "🔔",
      section: "Komunikasi",
    },
    {
      id: "prediksi",
      label: "Prediksi Stok AI",
      icon: "✨",
      section: "Lainnya",
    },
    { id: "laporan", label: "Laporan", icon: "📋" },
    { id: "profil", label: "Profil Koperasi", icon: "🏢" },
  ];

  return (
    <aside
      className={`h-screen bg-[#fafafa] flex flex-col fixed top-0 left-0 z-[100] shadow-[0_4px_12px_rgba(37,99,235,0.35)] transition-all duration-300 ease-in-out ${
        isOpen ? "w-[270px]" : "w-[70px]"
      }`}
    >
      {/* HEADER SIDEBAR (Hamburger & Logo) */}
      <div
        className={`h-16 flex items-center border-b border-black/10 flex-shrink-0 transition-all duration-300 ${
          isOpen ? "px-3 gap-1" : "px-0 justify-center"
        }`}
      >
        {/* Logo Koperasi*/}
        {isOpen && (
          <div className="flex items-center gap-1 overflow-hidden cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img
                src="/src/assets/favnbg.png"
                alt="gambarlogo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center leading-none whitespace-nowrap">
              <div className="font-serif text-[15px] font-bold leading-tight text-dark">
                KOPDES TOYAREJA
              </div>
              <div className="text-[9px] text-black/50 tracking-widest uppercase mt-0.5">
                Koperasi Desa
              </div>
            </div>
          </div>
        )}

        {/* Tombol Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-dark hover:bg-black/5 rounded-lg transition-colors focus:outline-none flex-shrink-0"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* MENU NAVIGASI */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden hide-scrollbar">
        {menuItems.map((item) => (
          <div key={item.id} className={isOpen ? "px-4" : "px-3"}>
            {/* Header Section cuman tampil saat terbuka */}
            {item.section && isOpen && (
              <div className="text-black/80 text-[10px] tracking-[1.5px] uppercase font-semibold py-3 px-2 whitespace-nowrap">
                {item.section}
              </div>
            )}

            {/* Jarak ekstra antar section jika sidebar tertutup */}
            {item.section && !isOpen && <div className="h-4"></div>}

            {/* Tombol Menu */}
            <div
              onClick={() => setActiveSection(item.id)}
              title={!isOpen ? item.label : ""} // Munculkan tooltip teks saat dihover pada mode mini
              className={`flex items-center p-2.5 rounded-xl text-[13.5px] font-medium cursor-pointer transition-all mb-1 select-none overflow-hidden
                ${isOpen ? "gap-2.5" : "justify-center"}
                ${
                  activeSection === item.id
                    ? "bg-gradient-to-br from-blue-500 to-blue-400 text-black shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
                    : "text-black/60 hover:bg-black/5 hover:text-black"
                }`}
            >
              <span className="text-base text-center flex-shrink-0 w-5">
                {item.icon}
              </span>

              {/* Teks Label & Badge (Hanya tampil jika terbuka) */}
              {isOpen && (
                <>
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-gold text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* AREA PROFIL BAWAH */}
      <div className="p-4 border-t border-black/10 flex flex-col gap-2 flex-shrink-0">
        {isOpen ? (
          // Mode Terbuka: Tampilkan info lengkap & tombol logout
          <>
            <button
              onClick={onLogout}
              className="w-full bg-white hover:bg-red-50 border border-black/20 rounded-xl text-black/80 text-[13px] p-2.5 flex items-center justify-center gap-1.5 hover:text-red-600 hover:border-red-200 transition-all shadow-sm whitespace-nowrap"
            >
              ↩ Keluar
            </button>
          </>
        ) : (
          // Mode Tertutup: Tampilkan hanya ikon profil yang mengarah ke halaman profil
          <button
            onClick={() => setActiveSection("profil")}
            title="Profil Koperasi"
            className={`w-full flex items-center justify-center p-3 rounded-xl transition-all ${
              activeSection === "profil"
                ? "bg-gradient-to-br from-blue-500 to-blue-400 shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
                : "bg-black/5 hover:bg-black/10 text-black/70"
            }`}
          >
            <span className="text-lg">👤</span>
          </button>
        )}
      </div>
    </aside>
  );
}
