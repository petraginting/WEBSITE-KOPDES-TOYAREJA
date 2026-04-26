import { Routes, Route, Navigate } from "react-router-dom";
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
import VerifyFPW from "./pages/VerifyForgotPW";
import VerifyRegist from "./pages/VerifyRegist";
import MainDashboard from "./pages/MainDashboard";
import { Children } from "react";
import { useAuth } from "./context/AuthContext";

// gerbang utama cek login
const PrivateRoute = ({ children }) => {
  const { loading } = useAuth();
  const token = localStorage.getItem("token");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

//cek login dan cek role
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Halaman login */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="verify" element={<VerifyRegist />} />
      {/* Lupa Password */}
      <Route path="/forgot-password">
        <Route index element={<ForgotPassword />} />
        <Route path="verify-forgot-password" element={<VerifyFPW />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Menu admin */}
      <Route path="/admin">
        <Route
          index
          element={
            <AdminRoute>
              <MainDashboard />
            </AdminRoute>
          }
        />
      </Route>
      {/* Menu utama user */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/riwayat"
        element={
          <PrivateRoute>
            <Riwayat />
          </PrivateRoute>
        }
      />
      <Route
        path="/about"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      />
      <Route
        path="/simpanan"
        element={
          <PrivateRoute>
            <Simpanan />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/keranjang"
        element={
          <PrivateRoute>
            <Keranjang />
          </PrivateRoute>
        }
      />
      {/* Detail Produk berdasarkan ID */}
      <Route
        path="/product/:id"
        element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
