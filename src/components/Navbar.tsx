import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">✈️ Flight Reservation</h1>
      {user && (
        <div className="flex gap-4 items-center">
          {user.role === "user" && (
            <Link to="/reservations" className="hover:underline">
              My Reservations
            </Link>
          )}
          {user.role === "admin" && (
            <Link to="/admin" className="hover:underline">
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
