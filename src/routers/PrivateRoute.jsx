// src/routes/PrivateRoute.jsx (Updated)

import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import FullPageLoader from "../components/ui/FullPageLoader";
import { AuthContext } from "../auth/authProvider";

const PrivateRoute = () => {
  // Destructure everything we need from the context
  const { user, shops, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <FullPageLoader />;
  }

  // 1. If not authenticated, redirect to the landing page (or login page)
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 2. NEW: If user is authenticated but has no shops, redirect to the create-shop page
  // We add a check to prevent an infinite redirect loop if they are already on that page.
  if (
    user.role !== 'admin' && 
    shops.length === 0 && 
    location.pathname !== '/create-first-shop'
  ) {
    return <Navigate to="/create-first-shop" replace />;
  }

  // 3. If all checks pass, allow access to the requested private route
  return <Outlet />;
};

export default PrivateRoute;