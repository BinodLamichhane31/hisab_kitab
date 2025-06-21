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

function HomeRedirect() {
  const { user } = useContext(AuthContext);
  

  if (!user) {
    // If not logged in, show the landing page
    return <LandingPage />;
  }
  
  // If logged in, check their role and redirect accordingly
  // I am assuming the user object has a 'role' property, e.g., user.role === 'admin'
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
}


function App() {

  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      {/* The landing page is the main public route */}
      <Route path="/" element={<HomeRedirect />} />


      {/* ---------------- PRIVATE USER ROUTES ---------------- */}
      {/* All routes inside here require the user to be logged in. */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
        </Route>
      </Route>


      {/* ----------------- PRIVATE ADMIN ROUTES ----------------- */}
      {/* All routes inside here require the user to be logged in AND be an admin. */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}> {/* Can reuse the same layout */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
      </Route>


      {/* ------------------ CATCH ALL ------------------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;