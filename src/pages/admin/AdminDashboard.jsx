import { LayoutDashboard } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="flex items-center gap-3 text-3xl text-gray-800 font-regular">
              <LayoutDashboard size={30} className="text-orange-500"/>
              Dashboard Overview
            </h1>
      <p className="mt-2 text-gray-600">System-wide analytics and key performance indicators.</p>
    </div>
  );
};
export default AdminDashboard;