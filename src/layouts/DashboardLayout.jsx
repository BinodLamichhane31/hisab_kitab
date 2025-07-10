import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar"; 
import Header from "../components/dashboard/Header";  
import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;