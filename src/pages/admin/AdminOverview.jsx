import React from 'react';

// Example stat card component
const StatCard = ({ title, value, color }) => (
    <div className={`p-6 rounded-lg shadow-md ${color}`}>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
);

const AdminOverview = () => {
    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Admin Overview</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard title="Total Registered Users" value="1,250" color="bg-blue-500" />
                <StatCard title="Active Users (24h)" value="342" color="bg-green-500" />
                <StatCard title="System Alerts" value="3" color="bg-red-500" />
            </div>
            {/* You can add charts or more data here */}
        </div>
    );
};

export default AdminOverview;