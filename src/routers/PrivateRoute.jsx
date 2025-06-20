import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import FullPageLoader from "../components/ui/FullPageLoader";
import { AuthContext } from "../auth/authProvider";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const location = useLocation();
   console.log('[PrivateRoute] Checking route. Context state:', { isLoading, isAuthenticated });

  if (isLoading) {
        console.log('[PrivateRoute] 🛑 Showing Loader because isLoading is TRUE.');

    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
    console.log('[PrivateRoute] ✅ Access GRANTED. Rendering Outlet.');


  return <Outlet />;
};

export default PrivateRoute;