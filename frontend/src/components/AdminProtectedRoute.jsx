import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;