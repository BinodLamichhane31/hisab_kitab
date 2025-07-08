// PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import FullPageLoader from "../components/ui/FullPageLoader";
import { AuthContext } from "../auth/authProvider";

const PrivateRoute = () => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <FullPageLoader />;
  }

  // If not authenticated, redirect to the landing page (or login page)
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />; 
  }

  // If authenticated, allow access to private routes
  return <Outlet />;
};

export default PrivateRoute;