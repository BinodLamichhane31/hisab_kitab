import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Truck,
  ShieldCheck,
  UserCog,
  BookCopy
} from 'lucide-react';
import { AuthContext } from '../../auth/authProvider';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center p-3 my-1 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <aside className="flex flex-col w-64 p-4 text-white bg-gray-800">
      <div className="flex items-center gap-2 px-3 pb-4 border-b border-gray-700">
        <BookCopy size={32} className="text-blue-400" />
        <h1 className="text-xl font-bold">Bookkeeping</h1>
      </div>

      <nav className="flex-1 mt-4">
        {user?.role ==='user' && (
        <><p className="px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Menu</p><NavLink to="/dashboard" className={navLinkClasses}>
                      <LayoutDashboard size={20} className="mr-3" />
                      Dashboard
                  </NavLink><NavLink to="/customers" className={navLinkClasses}>
                          <Users size={20} className="mr-3" />
                          Customers
                      </NavLink><NavLink to="/products" className={navLinkClasses}>
                          <Package size={20} className="mr-3" />
                          Products
                      </NavLink><NavLink to="/suppliers" className={navLinkClasses}>
                          <Truck size={20} className="mr-3" />
                          Suppliers
                      </NavLink></>
    )}
        
        {user?.role === 'admin' && (
          <div className="mt-6">
            <p className="px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Admin</p>
            <NavLink to="/admin/dashboard" className={navLinkClasses}>
              <ShieldCheck size={20} className="mr-3" />
              Admin Overview
            </NavLink>
            <NavLink to="/admin/users" className={navLinkClasses}>
              <UserCog size={20} className="mr-3" />
              User Management
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;