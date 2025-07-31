// src/components/dashboard/Sidebar.js

import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, Truck, ShieldCheck, UserCog, Logs, LogOut,
  ReceiptText, ShoppingBag, History, Crown,
  Store
} from 'lucide-react';
import { AuthContext } from '../../auth/authProvider';
import ShopSwitcher from './ShopSwitcher'; 
import { MdAddShoppingCart } from 'react-icons/md';
import Notification from '../notification/Notification';
import { useGetProfile } from '../../hooks/auth/useProfile';
import ShopFormModal from '../shop/ShopFormModal';
import ConfirmLogoutModal from '../ui/ConfirmLogoutModal';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6060/api";

const ProfileSection = ({ user, logout }) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const filename = imagePath.split('/').pop();
    return `${API_URL}/uploads/${filename}`;
  };

  const imageUrl = getImageUrl(user?.profileImage);
  console.log(imageUrl);

  const handleLogout = () => {
    // Call logout directly from context - no API call needed
    logout();
  };

  return (
    <div className="p-2 pt-4 mt-auto border-t border-gray-200">
      <div className="flex items-center gap-3">
        <NavLink to="/profile" className="flex items-center flex-grow gap-3 p-1 -m-1 rounded-md hover:bg-gray-100" title="View Profile">
          {imageUrl ? (
            <img src={imageUrl} alt="Profile" className="object-cover rounded-full w-9 h-9" />
          ) : (
            <div className="flex items-center justify-center font-bold text-white bg-orange-500 rounded-full w-9 h-9">
              {user?.fname?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-700">{user?.role === 'admin' ? 'Administrator' : `${user?.fname || ''} ${user?.lname || ''}`}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </NavLink>
        <button 
          onClick={handleLogout} 
          className="p-2 ml-auto rounded-md hover:bg-gray-100"
          aria-label="Logout"
        >
          <LogOut size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};


const Sidebar = () => {
  const { user, logout, switchShop, isLoggingOut } = useContext(AuthContext);
  const { data: profileData, isLoading: isProfileLoading, isError } = useGetProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Cleanup on unmount or when user becomes null
  useEffect(() => {
    if (!user) {
      setIsModalOpen(false);
      setIsLogoutModalOpen(false);
    }
  }, [user]);

  // Don't render if user is null or logging out
  if (!user || isLoggingOut) {
    return null;
  }

  const handleNewShopCreation = (newShop) => {
    if (newShop && newShop._id) {
      switchShop(newShop._id);
    }
  };

  const handleLogoutClick = () => {
    // Close any open modals first
    setIsModalOpen(false);
    
    // Open logout confirmation modal
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Close the confirmation modal
    setIsLogoutModalOpen(false);
    
    // Call logout
    logout();
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

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
    { to: "/purchases", label: "Purchases", icon: ShoppingBag },
    { to: "/transactions", label: "Transactions", icon: History },
    { to: "/subscription", label: "Subscription", icon:  Crown},
    { to: "/shops", label: "Manage Shops", icon:  Store},
  ];

  const adminLinks = [
    { to: "/admin/users", label: "User Management", icon: UserCog },
    { to: "/admin/system-logs", label: "System Logs", icon: Logs },
  ];

  return (
    <aside className="sticky top-0 z-20 flex flex-col h-screen p-4 bg-white border-r border-gray-200 w-72">
      
      {user.role === 'user' &&
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <ShopSwitcher />
        </div>
        <Notification />
      </div>
}
{user.role === 'user' &&
      <button 
        className="flex items-center justify-center w-full gap-2 px-4 py-2.5 mb-4 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        title='Add New Shop'
        onClick={()=>setIsModalOpen(true)}
      >
        <MdAddShoppingCart size={16} />
        Add Shop
      </button>}


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

      <ProfileSection user={profileData?.data} logout={handleLogoutClick} />

      {isModalOpen && (
        <ShopFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      )}

      {isLogoutModalOpen && (
        <ConfirmLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          isLoading={isLoggingOut}
        />
      )}
    </aside>
  );
};

export default Sidebar;