import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import GeneratePage from "./pages/GeneratePage";
import HistoryList from "./pages/HistoryList";
import HistoryDetail from "./pages/HistoryDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function Navigation({ token, onLogout }) {
  return (
    <nav style={{ padding: "15px", display: "flex", gap: "15px", alignItems: "center" }}>
      <Link to="/">Generate Resume</Link>
      <Link to="/history">History</Link>
      
      {token ? (
        <button onClick={onLogout} style={{ marginLeft: "auto", cursor: "pointer" }}>
          Logout
        </button>
      ) : (
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}

function AppContent() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <>
      <Navigation token={token} onLogout={handleLogout} />

      <div className="app-container">
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage onLoginSuccess={(t) => setToken(t)} />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Main App Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <GeneratePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history/:id"
            element={
              <ProtectedRoute>
                <HistoryDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}