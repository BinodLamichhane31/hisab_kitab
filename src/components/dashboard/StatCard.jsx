import React from 'react';
import { Loader2 } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, isLoading }) => {
    return (
        <div className="flex items-center p-5 bg-white shadow-lg rounded-xl ring-1 ring-gray-900/5">
            <div className="flex items-center justify-center w-12 h-12 mr-4 bg-orange-100 rounded-full">
                <Icon className="w-6 h-6 text-orange-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                {isLoading ? (
                    <div className="w-32 h-6 mt-1 bg-gray-200 rounded-md animate-pulse"></div>
                ) : (
                    <p className="text-2xl font-semibold text-gray-800">{value}</p>
                )}
            </div>
        </div>
    );
};

export default StatCard;