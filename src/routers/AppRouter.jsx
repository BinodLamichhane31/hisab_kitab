import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import LandingPage from "../pages/Landing";
import UserDashboard from "../pages/user/DashboardPage";
import CustomerManagement from "../pages/user/CustomerManagement";
import ProductManagement from "../pages/user/ProductManagement";
import SupplierManagement from "../pages/user/SupplierManagement";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import NotFound from "../pages/NotFound";
import { AuthContext } from "../auth/authProvider";
import { useContext } from "react";
import SystemLogsPage from "../pages/admin/SystemLogs";
import FullPageLoader from "../components/ui/FullPageLoader"; 
import CreateFirstShop from "../pages/user/CreateFirstShop";



function AppRouter() {
  const { user, isLoading } = useContext(AuthContext);


  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user
            ? (user?.role === 'admin' ?<Navigate to="/admin/dashboard" replace /> : <Navigate to="/dashboard" replace />)
            :  <LandingPage />
        }
      />

      {/* ---------------- PRIVATE USER ROUTES ---------------- */}
       <Route element={<PrivateRoute />}>
        {/* Routes WITH the Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
        </Route>

        {/* Route WITHOUT the Dashboard Layout (but still private) */}
        <Route path="/create-first-shop" element={<CreateFirstShop />} />
      </Route>


      {/* ----------------- PRIVATE ADMIN ROUTES ----------------- */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/system-logs" element={<SystemLogsPage />} />
        </Route>
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;

