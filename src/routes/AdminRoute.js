import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // User must be logged in
  if (!user) return <Navigate to="/login" replace />;

  // User must be admin
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;
