import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Riwayat from "./pages/Riwayat";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Simpanan from "./pages/Simpanan";
import Profile from "./pages/Profile";
import Keranjang from "./pages/Keranjang";
import ProductDetail from "./pages/ProductDetail";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOTP";
import MainDashboard from "./pages/MainDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Lupa Password */}
        <Route path="/forgot-password">
          <Route index element={<ForgotPassword />} />
          <Route path="verify" element={<VerifyOtp />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/admin">
          <Route index element={<MainDashboard />} />
        </Route>

        {/* Menu utama */}
        <Route path="/" element={<Home />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/about" element={<About />} />
        <Route path="/simpanan" element={<Simpanan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/keranjang" element={<Keranjang />} />
        {/* Detail Produk berdasarkan ID */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
