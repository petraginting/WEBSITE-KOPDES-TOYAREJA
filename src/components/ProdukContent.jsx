import { useState } from "react";
import { createPortal } from "react-dom";
import { List_products } from "../dataset/data.produk";
import {
  createProduk,
  updateProduk,
  deleteProduk,
  produkToFormData,
  validateProdukForm,
  getDefaultFormData,
} from "../utilities/produkUtils";

export default function ProdukContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [produkYangDiedit, setProdukYangDiedit] = useState(null);

  // Inisialisasi dengan objek default
  const [formData, setFormData] = useState(getDefaultFormData());
  const [produkList, setProdukList] = useState(List_products);

  // State untuk Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua Kategori");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTambahProduk = (e) => {
    e.preventDefault();

    if (!validateProdukForm(formData)) {
      alert("Harap isi semua field yang diperlukan!");
      return;
    }

    if (editMode && produkYangDiedit) {
      const updatedList = updateProduk(produkList, produkYangDiedit, formData);
      setProdukList(updatedList);
      alert("Produk berhasil diupdate!");
    } else {
      const produkBaru = createProduk(produkList, formData);
      setProdukList([...produkList, produkBaru]);
      alert("Produk berhasil ditambahkan!");
    }

    resetForm();
  };

  const handleEditProduk = (produk) => {
    setEditMode(true);
    setProdukYangDiedit(produk);
    setFormData(produkToFormData(produk));
    setIsModalOpen(true);
  };

  const handleHapusProduk = (produkId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      const updatedList = deleteProduk(produkList, produkId);
      setProdukList(updatedList);
    }
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
    setIsModalOpen(false);
    setEditMode(false);
    setProdukYangDiedit(null);
  };

  // LOGIKA FILTER & SEARCH
  const filteredProducts = produkList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "Semua Kategori" || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fadeInUp p-4">
      {/* Header Halaman */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={() => {
            setEditMode(false);
            setFormData(getDefaultFormData());
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:-translate-y-[1px] hover:shadow-lg transition-all"
        >
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-border rounded-xl py-2.5 pr-4 pl-10 text-[13.5px] outline-none focus:border-blue-400 transition-all"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-border rounded-xl py-2.5 px-3 text-[13px] text-dark bg-white outline-none cursor-pointer"
        >
          <option>Semua Kategori</option>
          <option>Sembako</option>
          <option>Kebutuhan Rumah</option>
          <option>Pertanian</option>
          <option>Perikanan</option>
        </select>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((produk) => (
            <ProductCard
              key={produk.id}
              produk={produk}
              onEdit={() => handleEditProduk(produk)}
              onDelete={() => handleHapusProduk(produk.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-light italic">
            Produk tidak ditemukan...
          </div>
        )}
      </div>

      {/* Modal - Menggunakan Portal */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex justify-center items-start overflow-y-auto pt-10 pb-10 backdrop-blur-md bg-black/40">
            <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-md p-6 relative animate-scaleIn">
              <div className="flex justify-between mb-5">
                <h3 className="text-lg font-extrabold">
                  {editMode ? "Edit Produk" : "Tambah Produk"}
                </h3>
                <button onClick={resetForm} className="text-xl">
                  ✕
                </button>
              </div>

              <form onSubmit={handleTambahProduk} className="space-y-4">
                {/* pilih emoji untu sementara */}
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "🛍️",
                    "🌾",
                    "🫙",
                    "🍬",
                    "🌿",
                    "🧴",
                    "🐟",
                    "🍎",
                    "🍚",
                    "🧂",
                    "🧈",
                    "🥛",
                  ].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, emoji })}
                      className={`text-2xl p-2 rounded-lg ${formData.emoji === emoji ? "bg-blue-500" : "bg-gray-100"}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama Produk"
                  className="w-full border p-2.5 rounded-lg"
                  required
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border p-2.5 rounded-lg bg-white"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Sembako">Sembako</option>
                  <option value="Kebutuhan Rumah">Kebutuhan Rumah</option>
                  <option value="Pertanian">Pertanian</option>
                  <option value="Perikanan">Perikanan</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Harga (Contoh: 50000)"
                    className="border p-2.5 rounded-lg"
                  />
                  <input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Stok"
                    className="border p-2.5 rounded-lg"
                  />
                </div>

                <input
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="Unit (Contoh: Per kg)"
                  className="w-full border p-2.5 rounded-lg"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-100 py-2.5 rounded-lg font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-bold"
                  >
                    Simpan
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

function ProductCard({ produk, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden transition-all hover:-translate-y-[3px] hover:shadow-md flex flex-col">
      <div className="w-full h-[140px] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-[40px]">
        {produk.emoji}
      </div>
      <div className="p-4 flex-1">
        <div className="font-bold text-[15px] mb-1 text-dark">
          {produk.name}
        </div>
        <div className="text-[11px] text-light mb-2.5 uppercase tracking-wider font-semibold">
          {produk.category} • {produk.unit}
        </div>
        <div className="text-lg font-extrabold text-blue-700">
          {produk.price}
        </div>
        <div className="text-[12px] text-light mt-1">
          Stok: <span className="font-bold">{produk.stock}</span> unit
        </div>
      </div>
      <div className="p-3 border-t border-gray-50 flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg text-xs font-bold hover:bg-blue-100"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg text-xs font-bold hover:bg-red-100"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
