import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactElement } from "react";


interface Props {
   children: ReactElement;
  role?: "admin" | "user";
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}
