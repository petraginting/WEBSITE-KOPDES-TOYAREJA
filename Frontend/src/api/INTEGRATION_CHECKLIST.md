# 📋 CHECKLIST INTEGRASI API FRONTEND - BACKEND

## Status: ✅ Frontend siap untuk integrasi

Semua fitur di frontend sudah diintegrasikan dengan API calls yang benar. Backend developer perlu memastikan semua endpoint dan struktur response sesuai dengan dokumentasi ini.

---

## 🔐 1. AUTHENTICATION (Sudah Diimplementasikan ✅)

### Endpoints yang sudah berfungsi:
- ✅ `POST /api/auth/login` - Login dengan username/password
- ✅ `GET /api/auth/user-profile` - Ambil profil user (authenticated)
- ✅ `POST /api/auth/logout` - Logout dan hapus token

### Setup di Frontend:
- ✅ Token disimpan di `sessionStorage`
- ✅ Axios interceptor otomatis menambahkan Bearer token
- ✅ Error 401 otomatis redirect ke login
- ✅ AuthContext mengelola user state

### Catatan untuk Backend:
- Pastikan LoginController.php sudah implement `logout()` dan `getUserProfile()` methods
- Token expiry: 1 minggu (sudah dikonfigurasi)
- Response format: lihat `API_RESPONSE_FORMAT.md`

---

## 📦 2. PRODUCTS (Perlu Diverifikasi)

### Endpoints yang diharapkan:
- `GET /api/products` - Ambil semua produk
- `GET /api/products/{id}` - Ambil detail produk

### Frontend Integration:
- ✅ Home.jsx - Menampilkan daftar produk dari API
- ✅ ProductDetail.jsx - Menampilkan detail produk

### Checklist Backend:
- [ ] Pastikan ProductController sudah implement:
  - [ ] `index()` - return semua products
  - [ ] `show($id)` - return detail product
- [ ] Response format sesuai dengan dokumentasi (lihat `API_RESPONSE_FORMAT.md`)
- [ ] Field yang harus ada: `id`, `nama`, `harga`, `kategori`, `deskripsi`, `asal`
- [ ] Testing: ambil produk di Home, klik detail produk

---

## 🛒 3. KERANJANG / CART (Perlu Diimplementasikan)

### Endpoints yang diharapkan:
- `GET /api/keranjang` - Ambil items dalam keranjang
- `POST /api/keranjang/add` - Tambah item ke keranjang
- `PUT /api/keranjang/{id}` - Update qty item
- `DELETE /api/keranjang/{id}` - Hapus item dari keranjang

### Frontend Integration:
- ✅ Keranjang.jsx - Tampil cart items, update qty, delete item
- ✅ ProductDetail.jsx - Add to cart button
- ✅ API calls sudah siap

### Checklist Backend:
- [ ] Pastikan KeranjangController sudah implement:
  - [ ] `index()` - return user's cart items
  - [ ] `store()` - add item to cart
  - [ ] `update($id)` - update qty
  - [ ] `destroy($id)` - delete item
- [ ] Response format sesuai dokumentasi
- [ ] Field yang harus ada: `id`, `keranjang_id`, `product_id`, `nama`, `harga`, `kuantitas`, `subtotal`
- [ ] Middleware: `auth:sanctum` untuk semua endpoint
- [ ] Validasi: qty harus > 0, product_id harus valid
- [ ] Testing: add product to cart, update qty, delete item

---

## 💳 4. CHECKOUT & PESANAN (Perlu Diimplementasikan)

### Endpoints yang diharapkan:
- `POST /api/pesanan/checkout` - Buat pesanan dari keranjang
- `GET /api/pesanan` - Ambil pesanan user (riwayat)
- `GET /api/pesanan/{id}` - Ambil detail pesanan
- `DELETE /api/pesanan/{id}` - Batalkan pesanan

### Frontend Integration:
- ✅ Keranjang.jsx - Checkout button trigger PaymentModal
- ✅ Riwayat.jsx - Tampil riwayat pembelian
- ✅ API calls sudah siap

### Checklist Backend:
- [ ] Pastikan PesananController sudah implement:
  - [ ] `checkout()` - create order from cart
  - [ ] `index()` - return user's orders
  - [ ] `show($id)` - return order detail
  - [ ] `destroy($id)` - cancel order
- [ ] Response format sesuai dokumentasi
- [ ] Field yang harus ada:
  - Order: `id`, `keranjang_id`, `user_id`, `total_price`, `payment_method`, `status`, `created_at`, `items`
  - Items: `product_id`, `kuantitas`, `harga`, `subtotal`
- [ ] Order statuses: `pending`, `confirmed`, `diproses`, `dikirim`, `selesai`
- [ ] Payment methods: `qris`, `cod`
- [ ] Generate unique order_id (format: ORD-XXXXXXXXXX)
- [ ] Clear user's cart setelah checkout berhasil
- [ ] Middleware: `auth:sanctum` untuk semua endpoint
- [ ] Validasi: items tidak boleh kosong, total_price harus > 0
- [ ] Testing: 
  - [ ] Add product to cart
  - [ ] Checkout dengan QRIS
  - [ ] Checkout dengan COD
  - [ ] Lihat riwayat pembelian

---

## 🎯 Payment Methods

### QRIS (Bank Transfer via QR Code)
- Frontend: User upload bukti pembayaran
- Backend: Validasi bukti pembayaran (optional, atau manual)
- Status: pending → confirmed (manual admin)

### COD (Cash on Delivery)
- Frontend: Konfirmasi COD
- Backend: Langsung set status ke pending/confirmed
- Status: pending → diproses → dikirim → selesai

---

## 📱 API Response Validation Checklist

Sebelum testing, pastikan setiap response dari API memiliki struktur:

```javascript
{
  "status": "success" | "error",
  "message": "string",
  "data": { /* atau array */ }
}
```

- [ ] Semua endpoint return response dengan format yang konsisten
- [ ] Field `status` bernilai `"success"` atau `"error"`
- [ ] Field `data` berisi data yang diminta atau null untuk error
- [ ] HTTP status codes sesuai:
  - 200 untuk success
  - 201 untuk created
  - 400/422 untuk validation error
  - 401 untuk unauthorized
  - 404 untuk not found

---

## 🧪 Testing Scenarios

### 1. Login Flow
```
1. Buka halaman Login
2. Input username & password
3. Klik tombol Masuk
4. Verifikasi: Token tersimpan, redirect ke Home
5. Refresh page - verifikasi: user masih login
```

### 2. Browse & Detail Produk
```
1. Di Home, verifikasi produk tampil dari API
2. Klik detail produk
3. Verifikasi detail produk ditampilkan dari API
```

### 3. Add to Cart
```
1. Di ProductDetail, set qty
2. Klik "Tambah ke Keranjang"
3. Verifikasi: item ditambah ke API cart
4. Klik "Keranjang" - verifikasi item tampil
```

### 4. Manage Cart
```
1. Di Keranjang, update qty
2. Verifikasi: qty terupdate di API
3. Hapus item
4. Verifikasi: item dihapus dari API
```

### 5. Checkout QRIS
```
1. Di Keranjang, klik Checkout
2. Pilih QRIS
3. Upload bukti
4. Klik Konfirmasi
5. Verifikasi: order dibuat, cart dikosongkan
6. Redirect ke Riwayat
```

### 6. Checkout COD
```
1. Di Keranjang, klik Checkout
2. Pilih COD
3. Konfirmasi COD
4. Verifikasi: order dibuat, cart dikosongkan
5. Redirect ke Riwayat
```

### 7. Riwayat Pembelian
```
1. Klik menu Riwayat
2. Verifikasi: tampil daftar pesanan dari API
3. Verifikasi: status dan metode pembayaran sesuai
```

### 8. Logout
```
1. Klik Logout
2. Verifikasi: token dihapus, redirect ke Login
```

---

## 🔗 API Routes Summary

```php
// Products
Route::get('/products', 'ProductController@index')->middleware('auth:sanctum');
Route::get('/products/{id}', 'ProductController@show')->middleware('auth:sanctum');

// Cart
Route::get('/keranjang', 'KeranjangController@index')->middleware('auth:sanctum');
Route::post('/keranjang/add', 'KeranjangController@store')->middleware('auth:sanctum');
Route::put('/keranjang/{id}', 'KeranjangController@update')->middleware('auth:sanctum');
Route::delete('/keranjang/{id}', 'KeranjangController@destroy')->middleware('auth:sanctum');

// Orders
Route::post('/pesanan/checkout', 'PesananController@checkout')->middleware('auth:sanctum');
Route::get('/pesanan', 'PesananController@index')->middleware('auth:sanctum');
Route::get('/pesanan/{id}', 'PesananController@show')->middleware('auth:sanctum');
Route::delete('/pesanan/{id}', 'PesananController@destroy')->middleware('auth:sanctum');

// Auth (sudah implement)
Route::post('/auth/login', 'Auth/LoginController@login');
Route::get('/auth/user-profile', 'Auth/LoginController@getUserProfile')->middleware('auth:sanctum');
Route::post('/auth/logout', 'Auth/LoginController@logout')->middleware('auth:sanctum');
```

---

## 📝 Notes

- Semua authenticated endpoints memerlukan middleware `auth:sanctum`
- Frontend akan otomatis menambahkan Bearer token di header `Authorization`
- Jika token expired atau invalid (401), frontend redirect ke login
- Semua error messages dari backend akan ditampilkan di alert ke user
- Format date di response bisa ISO 8601 atau string formatted (backend yang tentukan)

---

## ✅ Validation Checklist

Sebelum release ke production:

- [ ] Semua endpoints sudah implement
- [ ] Response format sesuai dokumentasi
- [ ] Testing semua scenarios berhasil
- [ ] Error handling berfungsi (invalid token, validation error, etc)
- [ ] Pagination (optional, untuk products/orders yang banyak)
- [ ] Rate limiting untuk security
- [ ] CORS configured untuk frontend URL
- [ ] Database migration dan seeder siap
- [ ] Logging untuk monitoring

---

## 🆘 Troubleshooting

### Frontend Error: "Cannot read property 'data' of undefined"
**Penyebab:** Response API tidak sesuai format
**Solusi:** Verifikasi response format sesuai `API_RESPONSE_FORMAT.md`

### Frontend Error: "401 Unauthorized"
**Penyebab:** Token invalid atau expired
**Solusi:** User perlu login ulang, atau refresh token logic ditambahkan

### Add to Cart tidak bekerja
**Penyebab:** 
1. Endpoint `/keranjang/add` belum implement
2. User belum authenticated
3. Product ID tidak valid
**Solusi:** Check routes, check authentication, check product exists

### Checkout gagal
**Penyebab:**
1. Cart kosong
2. Backend tidak clear cart setelah checkout
3. Order creation error
**Solusi:** Check cart items, implement checkout logic, add logging di backend

---

Generated: 2026-04-25
Status: Ready for Backend Integration
