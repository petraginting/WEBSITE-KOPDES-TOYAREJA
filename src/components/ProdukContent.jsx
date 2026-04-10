import { useState } from 'react';
import { createPortal } from 'react-dom';
import { List_products } from '../dataset/data.produk';
import {
  createProduk,
  updateProduk,
  deleteProduk,
  produkToFormData,
  validateProdukForm,
  getDefaultFormData
} from '../utilities/produkUtils';

export default function ProdukContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [produkYangDiedit, setProdukYangDiedit] = useState(null);
  const [formData, setFormData] = useState([]);

  const [produkList, setProdukList] = useState(List_products)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTambahProduk = (e) => {
    e.preventDefault();

    // Validasi input menggunakan utility
    if (!validateProdukForm(formData)) {
      alert('Harap isi semua field yang diperlukan!');
      return;
    }

    if (editMode && produkYangDiedit) {
      // Mode Edit menggunakan utility
      const updatedList = updateProduk(produkList, produkYangDiedit, formData);
      setProdukList(updatedList);
      alert('Produk berhasil diupdate!');
    } else {
      // Mode Tambah menggunakan utility
      const produkBaru = createProduk(produkList, formData);
      setProdukList([...produkList, produkBaru]);
      alert('Produk berhasil ditambahkan!');
    }

    // Reset form dan tutup modal menggunakan utility
    setFormData(getDefaultFormData());
    setIsModalOpen(false);
    setEditMode(false);
    setProdukYangDiedit(null);
  };

  const handleEditProduk = (produk) => {
    setEditMode(true);
    setProdukYangDiedit(produk);
    setFormData(produkToFormData(produk));
    setIsModalOpen(true);
  };

  const handleHapusProduk = (produkId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updatedList = deleteProduk(produkList, produkId);
      setProdukList(updatedList);
      alert('Produk berhasil dihapus!');
    }
  };

  const handleBatalEdit = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setProdukYangDiedit(null);
    setFormData(getDefaultFormData());
  };

  return (
    <div className="animate-fadeInUp">
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-dark">
            🛒 Manajemen Produk Koperasi
          </h2>
          <p className="text-[13px] text-light mt-0.5">
            Mengelola produk, stok, dan harga yang dijual
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all">
          + Tambah Produk Baru
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-light text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari nama produk atau kategori..."
            className="w-full bg-white border border-border rounded-xl py-2.5 pr-4 pl-10 text-[13.5px] text-dark outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400/10 transition-all"
          />
        </div>
        <select className="border border-border rounded-xl py-2.5 px-3 text-[13px] text-dark bg-white outline-none focus:border-blue-400 cursor-pointer">
          <option>Semua Kategori</option>
          <option>Sembako</option>
          <option>Kebutuhan Rumah</option>
          <option>Pertanian</option>
          <option>Perikanan</option>
        </select>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-3 gap-[18px]">
        {produkList.map((produk) => (
          <ProductCard
            key={produk.id}
            emoji={produk.emoji}
            name={produk.name}
            category={`${produk.category} • ${produk.unit}`}
            price={produk.price}
            stock={produk.stock}
            onEdit={() => handleEditProduk(produk)}
            onDelete={() => handleHapusProduk(produk.id)}
          />
        ))}
      </div>

      {/* Modal Tambah Produk */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[999] flex justify-center items-start overflow-y-auto pt-10 pb-10 backdrop-blur-md bg-[#0f1a2e]/40 animate-fadeIn">
          <div className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(15,26,46,0.25)] relative z-[1000] animate-scaleIn flex flex-col h-fit">
            <div className="p-6">
              {/* Header Modal */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold text-dark">
                  {editMode ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h3>
                <button
                  onClick={handleBatalEdit}
                  className="text-2xl text-light hover:text-dark transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Form Tambah Produk */}
              <form onSubmit={handleTambahProduk} className="space-y-4">
                {/* Emoji Pilihan */}
                <div>
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Pilih Emoji 😊
                  </label>
                  <div className="grid grid-cols-8 gap-2">
                    {['🛍️', '🌾', '🫙', '🍬', '🌿', '🧴', '🐟', '🍎', '🥕', '🥬', '🍚', '🧂', '🧈', '🥛', '🍞', '🥒'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, emoji })
                        }
                        className={`text-2xl p-2 rounded-lg transition-all ${formData.emoji === emoji
                          ? 'bg-blue-500 scale-110'
                          : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nama Produk */}
                <div>
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Nama Produk *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Beras Organik Premium"
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all cursor-pointer"
                  >
                    <option>Sembako</option>
                    <option>Kebutuhan Rumah</option>
                    <option>Pertanian</option>
                    <option>Perikanan</option>
                  </select>
                </div>

                {/* Harga */}
                <div>
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Harga (tanpa Rp) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Contoh: 65000"
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>

                {/* Stok */}
                <div>
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Stok Unit *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Contoh: 240"
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="text-xs font-semibold text-dark block mb-2">
                    Unit/Ukuran *
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="Contoh: Per 5 kg, Per liter, dll"
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-dark outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>

                {/* Tombol Action */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBatalEdit}
                    className="flex-1 px-4 py-2.5 border border-border text-dark rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-br from-blue-700 to-blue-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                  >
                    {editMode ? 'Update Produk' : 'Tambah Produk'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        , document.body,
      )}
    </div>
  );
}

// Sub-komponen untuk Kartu Produk (Hanya dipakai di file ini)
function ProductCard({ emoji, name, category, price, stock, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden transition-all hover:-translate-y-[3px] hover:shadow-md flex flex-col">
      <div className="w-full h-[140px] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-[40px]">
        {emoji}
      </div>
      <div className="p-3.5 flex-1">
        <div className="font-bold text-[14px] mb-1 text-dark">{name}</div>
        <div className="text-[11px] text-light mb-2.5">{category}</div>
        <div className="text-base font-extrabold text-blue-700 font-serif">
          {price}
        </div>
        <div className="text-[11px] text-light mt-0.5">Stok: {stock} unit</div>
      </div>
      <div className="p-3 border-t border-blue-50 flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-50 text-blue-700 border border-border py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] py-1.5 rounded-lg text-xs font-semibold hover:bg-[#fecaca] transition-all"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
