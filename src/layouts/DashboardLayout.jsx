import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar"; // You would create this
import Header from "../components/dashboard/Header";   // You would create this

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto bg-gray-200">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;