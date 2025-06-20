import React from 'react';
import { LayoutDashboard, Users, Box, Truck, BarChart2, Repeat } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const UserDashboard = () => {
    // Define the navigation links for the standard user
    const userLinks = [ 
        { name: 'Dashboard', path: '/user/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Customers', path: '/user/customers', icon: <Users size={20} /> },
        { name: 'Products', path: '/user/products', icon: <Box size={20} /> },
        { name: 'Suppliers', path: '/user/suppliers', icon: <Truck size={20} /> },
        { name: 'Transactions', path: '/user/transactions', icon: <Repeat size={20} /> },
        { name: 'Reports', path: '/user/reports', icon: <BarChart2 size={20} /> },
    ];

    return <DashboardLayout sidePanelLinks={userLinks} />;
};

export default UserDashboard;