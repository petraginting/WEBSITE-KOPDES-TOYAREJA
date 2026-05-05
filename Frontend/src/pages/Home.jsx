import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../api/products";
import BottomNav from "../components/BottomNav";
import logokopdes from "../assets/favnbg.png";
import { baseURL } from "../utilities/produkUtils";

export default function Home() {
  const navigate = useNavigate(); // <-- Inisialisasi navigasi
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Data Dummy Promo (pengganti api sementara)
  const promos = [
    {
      id: 1,
      title: "Promo Hari Ini!",
      desc: "Diskon hingga 20% untuk pembelian beras premium",
      tag: "HEMAT",
      color: "bg-[#2563eb]",
    },
    {
      id: 2,
      title: "Gratis Ongkir!",
      desc: "Pengiriman gratis untuk area Desa Toyareja",
      tag: "ONGKIR",
      color: "bg-[#059669]",
    },
    {
      id: 3,
      title: "Paket Sembako",
      desc: "Beli paket lengkap lebih hemat Rp 15.000",
      tag: "PAKET",
      color: "bg-[#d97706]",
    },
  ];

  // Kategori statis sesuai desain
  const categories = ["Semua", "Sembako", "Kebutuhan Rumah"];

  // Fetch produk dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
        console.log("Error response:", error.response?.data); // DEBUG: lihat error detail
        // Fallback ke dummy data jika API error

      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "Semua" || product.kategori?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.nama
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Container pembatas ukuran mobile */}
      <div className="w-full max-w-[450px] bg-white min-h-screen relative pb-24">
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-20 border-b border-gray-100 px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={logokopdes}
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">
              Kopdes Toyareja
            </h1>
          </div>
          {/* Ubah ikon keranjang menjadi tombol navigasi ke /keranjang */}
          <button
            onClick={() => navigate("/keranjang")}
            className="p-2 relative cursor-pointer hover:bg-gray-50 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          {/* SEARCH BAR */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] shadow-sm placeholder-gray-500"
              placeholder="Cari..."
            />
          </div>

          {/* PROMO CAROUSEL */}
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className={`min-w-[90%] sm:min-w-[320px] ${promo.color} rounded-[20px] p-5 text-white snap-center shrink-0 shadow-md relative overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h2 className="text-[19px] font-bold">{promo.title}</h2>
                  <span className="bg-yellow-400 text-yellow-900 text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider">
                    {promo.tag}
                  </span>
                </div>
                <p className="text-[14px] text-white/90 leading-snug pr-4 relative z-10">
                  {promo.desc}
                </p>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
              </div>
            ))}
          </div>

          {/* KATEGORI FILTER */}
          <div className="flex overflow-x-auto gap-2 mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1">
            {categories.map((kategori, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(kategori)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] font-semibold transition-colors shrink-0 ${activeCategory === kategori
                  ? "bg-[#2563eb] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {kategori}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Memuat produk...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white border border-gray-100 rounded-[20px] p-3 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
                >
                  {/* Container Gambar */}
                  <div className="w-full aspect-square bg-[#e0f2fe] rounded-[14px] mb-3 overflow-hidden flex items-center justify-center">
                    {product.gambar ? (
                      <img
                        src={baseURL + product.gambar}
                        alt={product.nama}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-400 text-xs">No Image</span>
                    )}
                  </div>

                  {/* Info Produk */}
                  <h3 className="font-bold text-[14px] text-gray-800 truncate mb-1">
                    {product.nama}
                  </h3>

                  <p className="font-bold text-[#2563eb] text-[15px] mb-1">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(product.harga)}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-[11px] text-gray-400 truncate">
                      {product.unit && `${product.unit} • `}
                      <span className={product.stok > 0 ? "text-gray-400" : "text-red-500 font-medium"}>
                        {product.stok > 0 ? `Stok: ${product.stok}` : "Stok Habis"}
                      </span>
                    </p>
                  </div>

                  {/* Deskripsi Singkat */}
                  <p className="text-[11px] text-gray-400 truncate mt-1">
                    {product.deskripsi || product.asal || "-"}
                  </p>
                </div>
              ))}
            </div>

          ) : (
            <div className="text-center py-10 text-gray-500">
              Produk tidak ditemukan.
            </div>
          )}
        </div>

        {/* Panggil Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
