// src/pages/HomePage.jsx
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user, logout } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome {user?.username} 🎉</h1>
      <p>Role: {user?.role}</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
