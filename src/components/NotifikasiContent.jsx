import { useState } from "react";
import { createPortal } from "react-dom";
import { List_notifikasi } from "../dataset/data.notifikasi";

export default function NotifikasiContent() {
  const [notifList, setNotifList] = useState(List_notifikasi);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notifYangDiedit, setNotifYangDiedit] = useState(null);

  const [formData, setFormData] = useState({
    tipe: "Info",
    title: "",
    message: "",
    target: "Semua Anggota",
    validUntil: "",
  });

  // --- LOGIKA STATUS ---
  const getStatus = (notif) => {
    const today = new Date().toISOString().split("T")[0];
    if (notif.status === "Nonaktif") return "Ditarik";
    if (notif.validUntil && today > notif.validUntil) return "Expired";
    return "Aktif";
  };

  const activeNotifs = notifList.filter((n) => getStatus(n) === "Aktif");

  // --- HANDLER ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModalTambah = () => {
    setEditMode(false);
    setFormData({
      tipe: "Info",
      title: "",
      message: "",
      target: "Semua Anggota",
      validUntil: "",
    });
    setIsModalOpen(true);
  };

  const openModalEdit = (notif) => {
    setEditMode(true);
    setNotifYangDiedit(notif);
    setFormData({
      tipe: notif.tipe,
      title: notif.title,
      message: notif.message,
      target: notif.target,
      validUntil: notif.validUntil || "",
    });
    setIsModalOpen(true);
  };

  const handleSimpanNotif = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    if (editMode && notifYangDiedit) {
      // MODE EDIT
      const updatedList = notifList.map((n) =>
        n.id === notifYangDiedit.id ? { ...n, ...formData } : n,
      );
      setNotifList(updatedList);
    } else {
      // MODE TAMBAH
      const notifBaru = {
        id: Date.now(),
        ...formData,
        date: today,
        status: "Aktif",
      };
      setNotifList([notifBaru, ...notifList]);
    }

    setIsModalOpen(false);
  };

  const handleTarikNotif = (id) => {
    if (window.confirm("Tarik notifikasi ini dari publik?")) {
      setNotifList(
        notifList.map((n) => (n.id === id ? { ...n, status: "Nonaktif" } : n)),
      );
    }
  };

  return (
    <div className="animate-fadeInUp">
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={openModalTambah}
          className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:shadow-lg transition-all"
        >
          + Buat Pengumuman
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LIST NOTIFIKASI AKTIF */}
        <div className="bg-white border border-border rounded-2xl shadow-sm flex flex-col h-[600px]">
          <div className="p-5 border-b border-border bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-dark">
              📢 Notifikasi yang Tayang
            </h3>
            <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
              Live
            </span>
          </div>
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {activeNotifs.length > 0 ? (
              activeNotifs.map((n) => (
                <NotifCard
                  key={n.id}
                  data={n}
                  onEdit={() => openModalEdit(n)}
                  onTarik={() => handleTarikNotif(n.id)}
                />
              ))
            ) : (
              <div className="text-center py-20 text-light italic text-sm">
                Belum ada promo aktif periode ini.
              </div>
            )}
          </div>
        </div>

        {/* STATISTIK & RIWAYAT */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <StatBox
              label="Total Broadcast"
              value={notifList.length}
              color="text-blue-700"
              bg="bg-blue-50"
            />
            <StatBox
              label="Sedang Aktif"
              value={activeNotifs.length}
              color="text-emerald-700"
              bg="bg-emerald-50"
            />
          </div>

          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border font-bold text-sm bg-gray-50/50">
              Riwayat Pengiriman
            </div>
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-light uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Judul</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {notifList.map((n) => (
                  <tr
                    key={n.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-dark font-medium">
                      {n.title}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={getStatus(n)} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openModalEdit(n)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL FORM (Bisa Tambah & Edit) */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-scaleIn">
              <h3 className="text-xl font-bold mb-5">
                {editMode ? "📝 Edit Notifikasi" : "🚀 Buat Pesan Baru"}
              </h3>
              <form onSubmit={handleSimpanNotif} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormGroup label="Tipe">
                    <select
                      name="tipe"
                      value={formData.tipe}
                      onChange={handleInputChange}
                      className="input-style"
                    >
                      <option value="Info">Info</option>
                      <option value="Promo">Promo</option>
                      <option value="Produk">Produk</option>
                    </select>
                  </FormGroup>
                  <FormGroup label="Target Anggota">
                    <select
                      name="target"
                      value={formData.target}
                      onChange={handleInputChange}
                      className="input-style"
                    >
                      <option value="Semua Anggota">Semua</option>
                      <option value="Anggota Aktif">Hanya Aktif</option>
                      <option value="Pengurus">Hanya Pengurus</option>
                    </select>
                  </FormGroup>
                </div>
                <FormGroup label="Judul Notifikasi">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="input-style"
                  />
                </FormGroup>
                <FormGroup label="Isi Pesan">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="input-style resize-none"
                  />
                </FormGroup>
                <FormGroup label="Berlaku Hingga">
                  <input
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    className="input-style"
                  />
                </FormGroup>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200"
                  >
                    {editMode ? "Simpan Perubahan" : "Kirim Sekarang"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

// COMPONENTS PENOLONG

function NotifCard({ data, onEdit, onTarik }) {
  const styles = {
    Promo: "bg-amber-50 text-amber-700 border-amber-100",
    Info: "bg-blue-50 text-blue-700 border-blue-100",
    Produk: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <div className="group bg-white border border-border rounded-2xl p-4 transition-all hover:shadow-md relative">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${styles[data.tipe]}`}
        >
          {data.tipe}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-md text-sm"
          >
            ✏️
          </button>
          <button
            onClick={onTarik}
            className="text-red-500 hover:bg-red-50 p-1.5 rounded-md text-sm"
          >
            ✕
          </button>
        </div>
      </div>
      <h4 className="font-bold text-dark text-sm">{data.title}</h4>
      <p className="text-xs text-light mt-1 leading-relaxed">{data.message}</p>
      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-[10px]">
        <span className="text-red-500 font-bold">
          📅 Hingga: {data.validUntil || "Selamanya"}
        </span>
        <span className="text-light">{data.date}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Aktif: "bg-emerald-100 text-emerald-700",
    Expired: "bg-amber-100 text-amber-700",
    Ditarik: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function StatBox({ label, value, color, bg }) {
  return (
    <div
      className={`${bg} rounded-2xl p-5 border border-border/50 text-center`}
    >
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-[11px] text-light font-bold uppercase mt-1 tracking-wider">
        {label}
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-dark uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}
