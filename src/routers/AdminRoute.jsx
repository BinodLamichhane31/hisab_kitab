import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import FullPageLoader from "../components/ui/FullPageLoader";
import { AuthContext } from "../auth/authProvider";

const AdminRoute = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;