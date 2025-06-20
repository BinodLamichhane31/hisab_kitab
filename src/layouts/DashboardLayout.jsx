import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

// This is the main shell for both Admin and User dashboards
const DashboardLayout = ({ sidePanelLinks }) => {
    const { user, logout, isLoggingOut } = useContext(AuthContext);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Side Panel */}
            <aside className="flex flex-col flex-shrink-0 w-64 text-white bg-gray-800">
                <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
                    <h1 className="text-xl font-bold">AppLogo</h1>
                </div>
                <nav className="flex-grow px-2 py-4">
                    {sidePanelLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="flex items-center gap-3 px-4 py-2 my-1 text-gray-300 transition-colors rounded-lg hover:bg-gray-700 hover:text-white"
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={logout}
                        disabled={isLoggingOut}
                        className="flex items-center w-full gap-3 px-4 py-2 text-gray-300 transition-colors rounded-lg hover:bg-red-600 hover:text-white disabled:opacity-50"
                    >
                        <LogOut size={20} />
                        <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
                    <div>
                        {/* You can add breadcrumbs or page titles here later */}
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={20} className="text-gray-500" />
                        <span className="font-medium text-gray-700">{user?.fname} ({user?.role})</span>
                    </div>
                </header>
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* Nested routes will be rendered here */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;