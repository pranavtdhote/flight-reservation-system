import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<"admin" | "user">("user");

  const handleLogin = () => {
    login("demo-id", role);
    navigate(role === "admin" ? "/admin" : "/reservations");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <select
          className="border rounded p-2 w-full mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "user")}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login as {role}
        </button>
      </div>
    </div>
  );
}
