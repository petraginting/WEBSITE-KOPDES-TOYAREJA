import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// Import icon dari lucide-react
import { Home, History, Info, Wallet, User } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  // State untuk menyimpan foto avatar
  const [avatar, setAvatar] = useState(localStorage.getItem("userAvatar"));

  // Listener agar BottomNav langsung update saat foto diubah dari halaman Profile
  useEffect(() => {
    const handleAvatarUpdate = () => {
      setAvatar(localStorage.getItem("userAvatar"));
    };

    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
    };
  }, []);

  // Data menu navigasi menggunakan komponen Lucide
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: "Riwayat",
      path: "/riwayat",
      icon: History,
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
    },
    {
      name: "Simpanan",
      path: "/simpanan",
      icon: Wallet,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe z-[90]">
      <div className="flex justify-between items-center max-w-[450px] mx-auto px-6 py-3">
        {navItems.map((item, index) => {
          const isActive = currentPath === item.path;
          const IconComponent = item.icon;

          return (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center gap-1"
            >
              {/* Jika item adalah Profile dan avatar tersedia, tampilkan gambar */}
              {item.name === "Profile" && avatar ? (
                <div
                  className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-colors ${isActive ? "border-[#3b66f5]" : "border-transparent"
                    }`}
                >
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                /* Jika tidak, tampilkan icon bawaan Lucide */
                <IconComponent
                  className={`w-6 h-6 transition-colors ${isActive ? "text-[#3b66f5]" : "text-gray-500"
                    }`}
                />
              )}

              <span
                className={`text-[10px] font-semibold transition-colors ${isActive ? "text-[#3b66f5]" : "text-gray-500"
                  }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
