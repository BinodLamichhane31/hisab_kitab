import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider';

// A simple loading spinner component (you can style this better)
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
);

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isAuthLoading } = useContext(AuthContext);
    const location = useLocation();

    // 1. While the authentication status is being checked, show a loading indicator.
    if (isAuthLoading) {
        return <LoadingSpinner />;
    }

    // 2. If the loading is finished and the user is NOT authenticated,
    //    redirect them to the login page. We also pass the current location
    //    so the user can be redirected back after logging in.
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // 3. If loading is finished and the user IS authenticated, render the
    //    child component (e.g., the DashboardPage).
    return children;
};

export default PrivateRoute;