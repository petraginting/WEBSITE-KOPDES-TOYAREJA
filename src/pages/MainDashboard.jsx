import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import AnggotaContent from "../components/AnggotaContent";
import SimpananContent from "../components/SimpananContent";
import ProdukContent from "../components/ProdukContent";
import PesananContent from "../components/PesananContent";
import NotifikasiContent from "../components/NotifikasiContent";
import LaporanContent from "../components/LaporanContent";
import ProfilContent from "../components/ProfilContent";
import PrediksiStockContent from "../components/PrediksiStockContent";

const titles = {
  dashboard: ["Dashboard", "Ringkasan aktivitas koperasi hari ini"],
  anggota: ["Manajemen Data Anggota", "Kelola seluruh data anggota koperasi"],
  simpanan: ["Simpanan Anggota", "Pantau dan kelola simpanan anggota"],
  produk: ["Produk Koperasi", "Kelola katalog produk yang dijual"],
  pesanan: ["Manajemen Pesanan", "Pantau dan proses pesanan masuk"],
  notifikasi: ["Notifikasi & Promosi", "Kirim informasi kepada anggota"],
  prediksi: ["Prediksi Stock", "Memprediksi kapan stock habis"],
  laporan: ["Laporan Koperasi", "Laporan transaksi dan keuangan"],
  profil: ["Profil Koperasi", "Informasi dan pengaturan koperasi"],
};

export default function MainDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [title, subtitle] = titles[activeSection] || [activeSection, ""];

  return (
    <div className="flex w-full">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={onLogout}
      />

      <div className="ml-[260px] flex-1 min-h-screen bg-cream">
        {/* Topbar */}
        <div className="bg-white border-b border-border px-8 h-16 flex items-center justify-between fixed top-0 right-0 left-[260px] z-10">
          <div>
            <h1 className="text-lg font-bold text-dark">{title}</h1>
            <p className="text-xs text-light">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-light bg-blue-50 px-3 py-1.5 rounded-full border border-border">
              📅 Sabtu, 07 Maret 2026
            </div>
            <div className="w-9 h-9 bg-blue-50 border border-border rounded-lg cursor-pointer flex items-center justify-center text-base relative hover:bg-blue-100 transition-all">
              🔔
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-7 mt-16">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "anggota" && <AnggotaContent />}
          {activeSection === "simpanan" && <SimpananContent />}
          {activeSection === "produk" && <ProdukContent />}
          {activeSection === "pesanan" && <PesananContent />}
          {activeSection === "notifikasi" && <NotifikasiContent />}
          {activeSection === "prediksi" && <PrediksiStockContent />}
          {activeSection === "laporan" && <LaporanContent />}
          {activeSection === "profil" && <ProfilContent />}
        </div>
      </div>
    </div>
  );
}
