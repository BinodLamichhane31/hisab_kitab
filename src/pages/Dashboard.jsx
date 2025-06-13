import React, { useContext } from 'react';
import { AuthContext } from '../auth/authProvider';
import { LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const role = user?.role === 'admin' ? 'Admin' : 'User';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
            {/* <Navbar /> */}
            <div className="flex flex-col items-center justify-center px-4 py-20">
                <div className="w-full max-w-md p-8 space-y-6 text-center bg-white shadow-xl rounded-2xl">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, <span className="text-orange-500">{user?.fname}</span>
                    </h1>
                    <p className="text-gray-500">This is your dashboard panel.</p>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
