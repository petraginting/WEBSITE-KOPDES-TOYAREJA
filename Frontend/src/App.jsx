import { useState } from "react";
import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard";

import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordVerify from "./pages/ForgotPasswordVerify";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <MainDashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />} />

      <Route path="/" element={<MainDashboard />} />

      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/verify-otp" element={<ForgotPasswordVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
