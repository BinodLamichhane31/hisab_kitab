import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/authProvider';
import { useNavigate } from 'react-router-dom';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
);

const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // Redirect to the appropriate default dashboard page
            switch (user.role) {
                case 'admin':
                    navigate('/admin/overview', { replace: true });
                    break;
                case 'user':
                    navigate('/user/dashboard', { replace: true });
                    break;
                default:
                    // Handle unknown role
                    navigate('/error', { replace: true }); 
            }
        }
    }, [user, navigate]); // Rerun effect if user or navigate changes

    // Show a loader while we wait for the user object and redirection
    return <LoadingSpinner />;
};

export default DashboardPage;