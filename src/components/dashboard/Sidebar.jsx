import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Truck,
  ShieldCheck,
  UserCog,
  Logs,
  LogOut,
  UserPlus,
  Bell, 
  TagIcon,
  ReceiptText
} from 'lucide-react';
import { AuthContext } from '../../auth/authProvider';
import ShopSwitcher from './ShopSwitcher'; 
import { MdAddShoppingCart, MdSell } from 'react-icons/md';
import AddShopModal from '../shop/AddShopModal';
import { Tag } from 'lucide';

const ProfileSection = ({ user, logout }) => (
  <div className="p-2 pt-4 mt-auto border-t border-gray-200">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center font-bold text-white bg-orange-500 rounded-full w-9 h-9">
        {user?.email?.charAt(0).toUpperCase() || 'U'}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">{user?.role === 'admin' ? 'Administrator' : `${user.fname} ${user.lname}`}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>
       <button 
        onClick={logout} 
        className="p-2 ml-auto rounded-md hover:bg-gray-100"
        aria-label="Logout"
      >
        <LogOut size={18} className="text-gray-500" />
      </button>
    </div>
  </div>
);


const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-2.5 my-1 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-orange-50 text-orange-600 font-semibold'
        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
    }`;

  const userLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/customers", label: "Customers", icon: Users },
    { to: "/suppliers", label: "Suppliers", icon: Truck },
    { to: "/products", label: "Products", icon: Package },
    { to: "/sales", label: "Sales", icon: ReceiptText },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Admin Overview", icon: ShieldCheck },
    { to: "/admin/users", label: "User Management", icon: UserCog },
    { to: "/admin/system-logs", label: "System Logs", icon: Logs },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <aside className="sticky top-0 flex flex-col h-screen p-4 bg-white border-r border-gray-200 w-72">
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <ShopSwitcher />
        </div>
        
        <button className="p-2.5 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <Bell size={20} />
        </button>
      </div>


      <button 
      className="flex items-center justify-center w-full gap-2 px-4 py-2.5 mb-4 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
      title='Add New Shop'
      onClick={()=>setIsModalOpen(true)}
      >
        <MdAddShoppingCart size={16} />
        Add Shop
      </button>

      <nav className="flex-1">
        {user?.role === 'user' && userLinks.map(link => (
          <NavLink to={link.to} className={navLinkClasses} key={link.to}>
            <link.icon size={20} strokeWidth={1.5} className="mr-4" />
            <span>{link.label}</span>
          </NavLink>
        ))}
        
        {user?.role === 'admin' && (
          <div>
            <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Admin
            </p>
            {adminLinks.map(link => (
              <NavLink to={link.to} className={navLinkClasses} key={link.to}>
                <link.icon size={20} strokeWidth={1.5} className="mr-4" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <ProfileSection user={user} logout={logout} />
      {isModalOpen && (
        <AddShopModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
      )}
    </aside>
  );
};

export default Sidebar;