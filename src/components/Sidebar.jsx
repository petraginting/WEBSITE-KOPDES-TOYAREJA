export default function Sidebar({ activeSection, setActiveSection, onLogout }) {
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
    { id: "pesanan", label: "Pesanan", icon: "📦", badge: "5" },
    {
      id: "notifikasi",
      label: "Notifikasi & Promo",
      icon: "🔔",
      section: "Komunikasi",
    },
    { id: "laporan", label: "Laporan", icon: "📋", section: "Lainnya" },
    { id: "profil", label: "Profil Koperasi", icon: "🏢" },
  ];

  return (
    <aside className="w-[260px] min-h-screen bg-[#fafafa] flex flex-col fixed top-0 left-0 z-[100] shadow-[0_4px_12px_rgba(37,99,235,0.35)]">
      <div className="p-6 border-b border-black/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
          {/* Gambar Logo */}
          <img
            src="/src/assets/favnbg.png"
            alt="gambarlogo"
            className="w-[150%] h-[150%] object-contain "
          />
        </div>
        <div className="flex flex-col justify-center leading none">
          <div className="font-serif text-base font-bold leading-tight">
            KOPDES TOYAREJA
          </div>
          <div className="text-[10px] text-black/40 tracking-widest uppercase">
            Koperasi Desa TOYAREJA
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto hide-scrollbar">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.section && (
              <div className="text-black/80 text-[10px] tracking-[1.5px] uppercase font-semibold py-3 px-2">
                {item.section}
              </div>
            )}
            <div
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl text-[13.5px] font-medium cursor-pointer transition-all mb-0.5 select-none
                ${
                  activeSection === item.id
                    ? "bg-gradient-to-br from-blue-500 to-blue-400 text-black shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
                    : "text-black/60 hover:bg-white/5 hover:text-black"
                }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>{" "}
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-gold text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 p-2.5 bg-white/5 rounded-xl mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center text-base">
            👤
          </div>
          <div>
            <div className="text-[13px] font-semibold text-black">
              Admin Utama
            </div>
            <div className="text-[11px] text-black/80">Administrator</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full bg-white/5 border border-black/70 rounded-xl text-black/80 text-[13px] p-2.5 flex items-center justify-center gap-1.5 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30 transition-all"
        >
          ↩ Keluar dari Sistem
        </button>
      </div>
    </aside>
  );
}
