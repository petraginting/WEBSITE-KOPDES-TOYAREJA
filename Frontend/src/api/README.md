# 📚 API Integration - File Structure & Usage

## 🎯 Overview
Semua fitur di aplikasi (Home, ProductDetail, Cart, Riwayat) sudah diintegrasikan dengan API calls yang sesuai dengan backend Laravel.

---

## 📁 File Structure

```
Frontend/src/
├── api/
│   ├── api.js              ← Re-export dari axios.js
│   ├── axios.js            ← Axios instance dengan interceptor
│   ├── auth/login.js       ← (existing, bisa di-update nanti)
│   ├── products.js         ← 🆕 API calls untuk produk
│   ├── cart.js             ← 🆕 API calls untuk keranjang
│   ├── orders.js           ← 🆕 API calls untuk pesanan
│   ├── API_RESPONSE_FORMAT.md      ← 📖 Dokumentasi format respons
│   └── INTEGRATION_CHECKLIST.md    ← 📋 Checklist untuk backend dev
├── pages/
│   ├── Home.jsx            ← ✅ Terintegrasi getAllProducts()
│   ├── ProductDetail.jsx   ← ✅ Terintegrasi getProductById(), addToCart()
│   ├── Keranjang.jsx       ← ✅ Terintegrasi cart functions
│   ├── Riwayat.jsx         ← ✅ Terintegrasi getUserOrders()
│   └── ... (other pages)
├── components/
│   └── PaymentModal.jsx    ← ✅ Updated untuk handle checkout
├── context/
│   └── AuthContext.jsx     ← ✅ Updated untuk handle token
└── utilities/
    └── formatters.js       ← 🆕 Helper functions untuk format data
```

---

## 🔄 Data Flow

### 1. HOME PAGE
```
Home.jsx
  ↓
  useEffect() → getAllProducts()
  ↓
  api.get('/api/products')
  ↓
  Backend: ProductController@index
  ↓
  Response: {status, data: [...products]}
  ↓
  Render: Product cards di home
```

### 2. PRODUCT DETAIL PAGE
```
ProductDetail.jsx
  ↓
  useEffect() → getProductById(id)
  ↓
  api.get('/api/products/{id}')
  ↓
  Backend: ProductController@show
  ↓
  Response: {status, data: {...product}}
  ↓
  Render: Product detail + Add to Cart button
```

### 3. ADD TO CART
```
ProductDetail.jsx → handleAddToCart()
  ↓
  addToCart(productId, qty)
  ↓
  api.post('/api/keranjang/add', {product_id, qty})
  ↓
  Backend: KeranjangController@store
  ↓
  Response: {status, data: {...item}}
  ↓
  Navigate to Keranjang page
```

### 4. CART PAGE
```
Keranjang.jsx
  ↓
  useEffect() → getCart()
  ↓
  api.get('/api/keranjang')
  ↓
  Backend: KeranjangController@index
  ↓
  Response: {status, data: [...items]}
  ↓
  Render: Cart items + Total + Checkout button
```

### 5. UPDATE CART QUANTITY
```
Keranjang.jsx → updateQty(cartId, newQty)
  ↓
  updateCartItem(cartId, newQty)
  ↓
  api.put('/api/keranjang/{id}', {qty})
  ↓
  Backend: KeranjangController@update
  ↓
  Response: {status, data: {...item}}
  ↓
  Update local state + recalculate total
```

### 6. REMOVE FROM CART
```
Keranjang.jsx → removeItem(cartId)
  ↓
  removeFromCart(cartId)
  ↓
  api.delete('/api/keranjang/{id}')
  ↓
  Backend: KeranjangController@destroy
  ↓
  Response: {status, message}
  ↓
  Remove item from local state
```

### 7. CHECKOUT
```
Keranjang.jsx → handleCheckout(paymentMethod)
  ↓
  PaymentModal.jsx → onCheckout()
  ↓
  checkout(checkoutData)
  ↓
  api.post('/api/pesanan/checkout', {
    items: [...{product_id, qty, price}],
    total_price: number,
    payment_method: 'qris'|'cod'
  })
  ↓
  Backend: PesananController@checkout
  ↓
  Response: {status, data: {order_id, ...}}
  ↓
  Clear cart + Navigate to Riwayat
```

### 8. RIWAYAT PEMBELIAN
```
Riwayat.jsx
  ↓
  useEffect() → getUserOrders()
  ↓
  api.get('/api/pesanan')
  ↓
  Backend: PesananController@index
  ↓
  Response: {status, data: [...orders]}
  ↓
  Render: Order list dengan status
```

---

## 📖 File Documentation

### 1. **products.js**
Fungsi-fungsi untuk mengakses API produk:
- `getAllProducts()` - Ambil semua produk
- `getProductById(id)` - Ambil detail produk
- `getProductsByCategory(category)` - Ambil produk per kategori

**Digunakan di:**
- Home.jsx - Menampilkan daftar produk
- ProductDetail.jsx - Menampilkan detail produk

---

### 2. **cart.js**
Fungsi-fungsi untuk mengelola keranjang:
- `getCart()` - Ambil items di keranjang
- `addToCart(productId, qty)` - Tambah item
- `updateCartItem(cartId, qty)` - Update qty
- `removeFromCart(cartId)` - Hapus item

**Digunakan di:**
- ProductDetail.jsx - Add to cart button
- Keranjang.jsx - Cart management

---

### 3. **orders.js**
Fungsi-fungsi untuk mengelola pesanan:
- `getUserOrders()` - Ambil riwayat pesanan
- `getOrderDetail(orderId)` - Ambil detail pesanan
- `checkout(checkoutData)` - Buat pesanan baru
- `cancelOrder(orderId)` - Batalkan pesanan

**Digunakan di:**
- Keranjang.jsx - Checkout
- Riwayat.jsx - Tampil riwayat

---

### 4. **formatters.js**
Helper functions untuk format data:
- `formatRupiah(angka)` - Format ke Rp. X.XXX
- `formatTanggalIndo(date)` - Format ke "25 Apr 2026, 10:30"
- `getStatusStyle(status)` - Return {label, color, bgColor}
- `formatPaymentMethod(method)` - Format payment method
- `calculateSubtotal(harga, qty)` - Hitung subtotal
- `calculateTotal(items)` - Hitung total
- `validateLoginForm(...)` - Validasi form login
- `validateCartForm(...)` - Validasi form cart
- `shortenId(id)` - Shorten ID untuk display

**Digunakan di:** Semua pages

---

### 5. **API_RESPONSE_FORMAT.md** 📖
Dokumentasi lengkap tentang format respons yang diharapkan dari setiap endpoint API:
- Format respons sukses dan error
- Field yang harus ada di setiap response
- HTTP status codes
- Example response untuk setiap endpoint

---

### 6. **INTEGRATION_CHECKLIST.md** 📋
Checklist lengkap untuk backend developer:
- Endpoints yang perlu diimplementasikan
- Struktur response yang diharapkan
- Testing scenarios
- Troubleshooting guide

---

## 🚀 Cara Menggunakan

### Import di Component
```javascript
// Import API functions
import { getAllProducts } from "../api/products";
import { getCart, addToCart } from "../api/cart";
import { getUserOrders } from "../api/orders";

// Import formatters
import { formatRupiah, getStatusStyle } from "../utilities/formatters";

// Di dalam component
useEffect(() => {
  const fetchData = async () => {
    try {
      const products = await getAllProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchData();
}, []);
```

### Error Handling
```javascript
try {
  const data = await getAllProducts();
  // Handle success
} catch (error) {
  console.error("Error:", error.response?.data?.message);
  alert("Gagal: " + error.message);
}
```

---

## 🔑 Key Features

### ✅ Implemented
- [x] Authentication (login, logout, user profile)
- [x] Products listing & detail
- [x] Add to cart
- [x] Cart management (view, update qty, delete)
- [x] Checkout with QRIS & COD
- [x] Order history
- [x] Token persistence & interceptor
- [x] Error handling
- [x] Loading states
- [x] API service layer

### 🔄 Ready for Backend Integration
- [ ] Product API endpoints
- [ ] Cart API endpoints
- [ ] Order/Checkout API endpoints
- [ ] Product/Cart/Order controllers
- [ ] Database migrations & seeders

---

## 🧪 Testing Checklist

Frontend-side testing (sudah siap):
- [x] Components render correctly
- [x] API functions defined
- [x] Error handling implemented
- [x] Loading states shown
- [x] Form validation ready

Backend testing (perlu dilakukan):
- [ ] All endpoints respond with correct format
- [ ] Validation works
- [ ] Authentication middleware works
- [ ] Data persists in database
- [ ] Error responses formatted correctly

---

## 📞 Support

Jika ada issue dengan integrasi:

1. **Check API_RESPONSE_FORMAT.md** - Verifikasi format respons
2. **Check INTEGRATION_CHECKLIST.md** - Verifikasi endpoints
3. **Check browser console** - Lihat error message
4. **Check network tab** - Lihat API request/response
5. **Check backend logs** - Lihat error di server

---

**Status:** ✅ Ready for Backend Integration
**Last Updated:** 2026-04-25
**Frontend URL:** http://localhost:5173
**Backend URL:** http://localhost:8000/api
