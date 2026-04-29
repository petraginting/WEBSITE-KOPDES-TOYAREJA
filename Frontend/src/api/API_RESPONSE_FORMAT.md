/**
 * API Response Format Documentation
 * ================================
 * 
 * Frontend mengharapkan format response API dari Backend sesuai dengan dokumentasi ini.
 * Pastikan setiap endpoint mengembalikan struktur data yang sesuai.
 */

// ============================================================================
// 1. PRODUCTS API
// ============================================================================

/**
 * GET /api/products
 * Ambil semua produk
 * 
 * Response:
 * {
 *   "status": "success" | "error",
 *   "message": "string",
 *   "data": [
 *     {
 *       "id": number,
 *       "nama": "string",
 *       "harga": number,
 *       "kategori": "string", // Sembako, Kebutuhan Rumah, etc
 *       "deskripsi": "string",
 *       "asal": "string",
 *       "qty": number (optional - stock available)
 *     },
 *     ...
 *   ]
 * }
 */

/**
 * GET /api/products/:id
 * Ambil detail produk berdasarkan ID
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "string",
 *   "data": {
 *     "id": number,
 *     "nama": "string",
 *     "harga": number,
 *     "kategori": "string",
 *     "deskripsi": "string",
 *     "asal": "string",
 *     "qty": number // stock available
 *   }
 * }
 */

// ============================================================================
// 2. CART API
// ============================================================================

/**
 * GET /api/keranjang
 * Ambil semua item dalam keranjang user (authenticated)
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "string",
 *   "data": [
 *     {
 *       "id": number, // cart item ID
 *       "cart_id": number, // untuk reference update/delete
 *       "product_id": number,
 *       "nama": "string",
 *       "harga": number,
 *       "qty": number,
 *       "subtotal": number // harga * qty
 *     },
 *     ...
 *   ]
 * }
 */

/**
 * POST /api/keranjang/add
 * Tambah produk ke keranjang
 * 
 * Request Body:
 * {
 *   "product_id": number,
 *   "qty": number
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "string",
 *   "data": {
 *     "id": number,
 *     "cart_id": number,
 *     "product_id": number,
 *     "nama": "string",
 *     "harga": number,
 *     "qty": number,
 *     "subtotal": number
 *   }
 * }
 */

/**
 * PUT /api/keranjang/:id
 * Update qty item keranjang
 * 
 * Request Body:
 * {
 *   "qty": number
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "string",
 *   "data": {
 *     "id": number,
 *     "cart_id": number,
 *     "product_id": number,
 *     "nama": "string",
 *     "harga": number,
 *     "qty": number,
 *     "subtotal": number
 *   }
 * }
 */

/**
 * DELETE /api/keranjang/:id
 * Hapus item dari keranjang
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "Item berhasil dihapus"
 * }
 */

// ============================================================================
// 3. ORDERS / PESANAN API
// ============================================================================

/**
 * POST /api/pesanan/checkout
 * Buat pesanan baru (checkout)
 * 
 * Request Body:
 * {
 *   "items": [
 *     {
 *       "product_id": number,
 *       "qty": number,
 *       "price": number
 *     },
 *     ...
 *   ],
 *   "total_price": number,
 *   "payment_method": "qris" | "cod"
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "Pesanan berhasil dibuat",
 *   "data": {
 *     "order_id": "ORD-xxx", // nomor pesanan unik
 *     "id": number,
 *     "user_id": number,
 *     "total_price": number,
 *     "payment_method": "qris" | "cod",
 *     "status": "pending" | "confirmed" | "diproses" | "dikirim" | "selesai",
 *     "created_at": "2026-04-25T10:00:00Z",
 *     "items": [
 *       {
 *         "product_id": number,
 *         "qty": number,
 *         "price": number,
 *         "subtotal": number
 *       }
 *     ]
 *   }
 * }
 */

/**
 * GET /api/pesanan
 * Ambil semua pesanan user (riwayat pembelian)
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "string",
 *   "data": [
 *     {
 *       "id": number,
 *       "order_id": "ORD-xxx",
 *       "date": "22 Apr 2026, 09:57", // atau timestamp format
 *       "total": number,
 *       "total_price": number,
 *       "method": "QRIS" | "Cash on Delivery",
 *       "payment_method": "qris" | "cod",
 *       "status": "Selesai" | "Diproses" | "Dibatalkan",
 *       "points": number, // reward points earned
 *       "items": [
 *         {
 *           "product_id": number,
 *           "nama": "string",
 *           "qty": number,
 *           "harga": number
 *         },
 *         ...
 *       ]
 *     },
 *     ...
 *   ]
 * }
 */

/**
 * GET /api/pesanan/:id
 * Ambil detail pesanan
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "string",
 *   "data": {
 *     "id": number,
 *     "order_id": "ORD-xxx",
 *     "user_id": number,
 *     "total_price": number,
 *     "payment_method": "qris" | "cod",
 *     "status": "pending" | "confirmed" | "diproses" | "dikirim" | "selesai",
 *     "created_at": "2026-04-25T10:00:00Z",
 *     "items": [
 *       {
 *         "product_id": number,
 *         "nama": "string",
 *         "qty": number,
 *         "price": number,
 *         "subtotal": number
 *       }
 *     ]
 *   }
 * }
 */

/**
 * DELETE /api/pesanan/:id
 * Batalkan pesanan
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "Pesanan berhasil dibatalkan"
 * }
 */

// ============================================================================
// 4. AUTH API (sudah diimplementasikan)
// ============================================================================

/**
 * POST /api/auth/login
 * Response:
 * {
 *   "status": "success",
 *   "message": "Login successful",
 *   "data": {
 *     "user": {
 *       "id": number,
 *       "username": "string",
 *       "email": "string",
 *       "role": "user" | "admin",
 *       ...
 *     },
 *     "token": "string" // Bearer token
 *   }
 * }
 */

/**
 * GET /api/auth/user-profile (authenticated)
 * Response:
 * {
 *   "status": "success",
 *   "message": "string",
 *   "data": {
 *     "id": number,
 *     "username": "string",
 *     "email": "string",
 *     "role": "user" | "admin",
 *     ...
 *   }
 * }
 */

/**
 * POST /api/auth/logout (authenticated)
 * Response:
 * {
 *   "status": "success",
 *   "message": "Logout successful"
 * }
 */

// ============================================================================
// ERROR RESPONSE FORMAT
// ============================================================================

/**
 * Error Response (semua endpoint):
 * {
 *   "status": "error",
 *   "message": "Error description",
 *   "errors": { // optional, untuk validation errors
 *     "field_name": ["error message 1", "error message 2"],
 *     ...
 *   }
 * }
 * 
 * HTTP Status Codes:
 * - 200: Success
 * - 201: Created
 * - 400: Bad Request (validation error)
 * - 401: Unauthorized (token invalid/expired)
 * - 403: Forbidden
 * - 404: Not Found
 * - 422: Unprocessable Entity (validation error)
 * - 500: Server Error
 */
