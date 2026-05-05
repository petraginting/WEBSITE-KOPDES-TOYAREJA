import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  deleteProduk,
  produkToFormData,
  getDefaultFormData,
  formatIDR,
  baseURL,
} from "../utilities/produkUtils";
import { getAllProducts } from "../api/products";
import api from "../api/axios";
import { uploadFoto } from "../utilities/uploadFoto";


export default function ProdukContent() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [produkYangDiedit, setProdukYangDiedit] = useState(null);
  const [preview, setPreview] = useState(null);


  // Inisialisasi dengan objek default
  const [formData, setFormData] = useState(getDefaultFormData());
  const [produkList, setProdukList] = useState([]);

  // State untuk Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua Kategori");

  const fetchDataProduct = async () => {
    try {
      const data = await getAllProducts();

      setProdukList(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataProduct()
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTambahProduk = async (e) => {
    e.preventDefault();

    try {
      const formDataFix = uploadFoto(formData, 'gambar')

      if (editMode) {
        formDataFix.append("_method", "PUT");

        await api.post(`/admin/products/${produkYangDiedit.id}`, formDataFix,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      } else {
        await api.post("/admin/products/add", formDataFix, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchDataProduct()
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Gagal simpan produk");
    }
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

  const handleFotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        gambar: file,
      }));
    }

    setPreview(URL.createObjectURL(file));
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
      item.nama_produk?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "Semua Kategori" || item.kategori?.toLowerCase() === filterCategory.toLowerCase();

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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-gray-200 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={preview || baseURL + formData.gambar}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline-none cursor-pointer"
                  />
                </div>

                <input
                  name="nama_produk"
                  value={formData.nama_produk}
                  onChange={handleInputChange}
                  placeholder="Nama Produk"
                  className="w-full border p-2.5 rounded-lg"
                  required
                />

                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full border p-2.5 rounded-lg bg-white"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="sembako">Sembako</option>
                  <option value="kebutuhan rumah">Kebutuhan Rumah</option>
                  <option value="pertanian">Pertanian</option>
                  <option value="perikanan">Perikanan</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="harga"
                    type="number"
                    value={formData.harga}
                    onChange={handleInputChange}
                    placeholder="Harga (Contoh: 50000)"
                    className="border p-2.5 rounded-lg"
                  />
                  <input
                    name="stok"
                    type="number"
                    value={formData.stok}
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
  console.log(produk);

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden transition-all hover:-translate-y-[3px] hover:shadow-md flex flex-col">
      <img src={baseURL + produk.gambar} alt="" className="w-full h-[240px] flex items-center justify-center object-cover" />
      <div className="p-4 flex-1">
        <div className="font-bold text-[15px] mb-1 text-dark">
          {produk.nama}
        </div>
        <div className="text-[11px] text-light mb-2.5 uppercase tracking-wider font-semibold">
          {produk.kategori} • {produk.unit}
        </div>
        <div className="text-lg font-extrabold text-blue-700">
          {formatIDR(produk.harga)}
        </div>
        <div className="text-[12px] text-light mt-1">
          Stok: <span className="font-bold">{produk.stok}</span> unit
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
