import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import './index.css';

import LoginPage from "./pages/LoginPage";
import ReservationsPage from "./components/ReservationList";
import AdminDashboard from "./pages/AdminDashboard";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <div>
      {user && <Navbar />}
      {children}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/reservations"
              element={
                <ProtectedRoute role="user">
                  <ReservationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
