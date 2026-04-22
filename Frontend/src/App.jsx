import { useState } from "react";
import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-cream font-sans text-dark overflow-x-hidden">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MainDashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}

export default App;
