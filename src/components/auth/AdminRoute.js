import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // no login → redirect
  if (!user) return <Navigate to="/login" replace />;

  // user is logged but NOT admin → block
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // user is admin → allow
  return children;
};

export default AdminRoute;
