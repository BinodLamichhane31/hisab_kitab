import React from 'react';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const AdminDashboard = () => {
    // Define the navigation links for the admin
    const adminLinks = [
        { name: 'Overview', path: '/admin/overview', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
        { name: 'System Logs', path: '/admin/logs', icon: <FileText size={20} /> },
    ];

    return <DashboardLayout sidePanelLinks={adminLinks} />;
};

export default AdminDashboard;