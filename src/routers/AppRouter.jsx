import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import LandingPage from "../pages/Landing";
import UserDashboard from "../pages/user/DashboardPage";
import CustomerManagementPage from "../pages/user/CustomerManagementPage";
import SupplierManagement from "../pages/user/SupplierManagement";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import NotFound from "../pages/NotFound";
import { AuthContext } from "../auth/authProvider";
import { useContext } from "react";
import SystemLogsPage from "../pages/admin/SystemLogs";
import FullPageLoader from "../components/ui/FullPageLoader"; 
import CreateFirstShop from "../pages/user/CreateFirstShop";
import SupplierManagementPage from "../pages/user/SupplierManagementPage";
import ProductManagement from "../pages/user/ProductManagement";
import ProductDetailPage from "../pages/user/ProductDetailPage";
import SalesPage from "../pages/user/SalesPage";
import CreateSalePage from "../pages/user/CreateSalePage";



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
          <Route path="/customers" element={<CustomerManagementPage />} />
          <Route path="/customers/:customerId" element={<CustomerManagementPage />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/suppliers" element={<SupplierManagementPage />} />
          <Route path="/suppliers/:supplierId" element={<SupplierManagementPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/sales/new" element={<CreateSalePage />} />
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

