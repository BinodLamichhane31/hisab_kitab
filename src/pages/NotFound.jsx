import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 to-white">
            <div className="w-full max-w-md p-8 space-y-6 text-center bg-white shadow-xl rounded-2xl">
                <div className="flex justify-center">
                    <AlertCircle size={48} className="text-orange-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
                <p className="text-gray-500">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                    onClick={handleBackHome}
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                    <ArrowLeft size={18} />
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
