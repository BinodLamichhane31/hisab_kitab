// src/pages/user/DashboardPage.jsx

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/authProvider';
import { useGetDashboardStats, useGetDashboardChart } from '../../hooks/useDashboard';
import { useGetTransactions } from '../../hooks/useTransaction';
import { motion } from 'framer-motion';

import StatCard from '../../components/dashboard/StatCard';
import DashboardChart from '../../components/dashboard/DashboardChart';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import CustomerSelectionModal from '../../components/cash/CustomerSelectionModal';
import SupplierSelectionModal from '../../components/cash/SupplierSelectionModal';
import PaymentFormModal from '../../components/cash/PaymentFormModal';

import { Users, Truck, DollarSign, TrendingUp, TrendingDown, ArrowDown, ArrowUp } from 'lucide-react';

const DashboardPage = () => {
    const { currentShop } = useContext(AuthContext);
    const shopId = currentShop?._id;

    const [modalStep, setModalStep] = useState('closed'); 
    const [paymentType, setPaymentType] = useState('CASH_IN'); 
    const [selectedParty, setSelectedParty] = useState(null); 

    const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats({ shopId });
    const { data: chartData, isLoading: isLoadingChart } = useGetDashboardChart({ shopId });
    const { data: transactionResponse, isLoading: isLoadingTransactions } = useGetTransactions({ shopId, limit: 5 });

    const latestTransactions = transactionResponse?.data || [];
    
    const handleOpenSelection = (type) => {
        setPaymentType(type);
        setModalStep('selecting');
    };

    const handlePartySelect = (party) => {
        setSelectedParty(party);
        setModalStep('paying');
    };

    const handleCloseModals = () => {
        setModalStep('closed');
        setSelectedParty(null);
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    };

    return (
        <>
            <div className="min-h-screen p-4 bg-gray-50/50 sm:p-6 lg:p-8">
                <div className="max-w-full mx-auto space-y-8">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants} className="items-start justify-between md:flex">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                                <p className="mt-1 text-gray-500">Welcome back! Here's a summary of your shop's activity.</p>
                            </div>
                            <div className="flex items-center gap-3 mt-4 md:mt-0">
                                <button onClick={() => handleOpenSelection('CASH_IN')} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-shadow bg-green-600 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                    <ArrowDown className="w-5 h-5" /> Cash In
                                </button>
                                <button onClick={() => handleOpenSelection('CASH_OUT')} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-shadow bg-red-600 rounded-lg shadow-sm hover:shadow-lg hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                    <ArrowUp className="w-5 h-5" /> Cash Out
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard icon={Users} title="Total Customers" value={stats?.totalCustomers} isLoading={isLoadingStats} />
                            <StatCard icon={Truck} title="Total Suppliers" value={stats?.totalSuppliers} isLoading={isLoadingStats} />
                            <StatCard icon={TrendingUp} title="Receivable" value={stats?.receivableAmount} isLoading={isLoadingStats} formatAsCurrency={true} />
                            <StatCard icon={TrendingDown} title="Payable" value={stats?.payableAmount} isLoading={isLoadingStats} formatAsCurrency={true} />
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-5">
                            <div className="p-6 bg-white shadow-lg lg:col-span-3 rounded-xl ring-1 ring-black ring-opacity-5">
                                <h2 className="text-lg font-semibold text-gray-800">12-Month Performance</h2>
                                <p className="text-sm text-gray-500">Sales vs. Purchases</p>
                                <div className="mt-6">
                                    <DashboardChart data={chartData} isLoading={isLoadingChart} />
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                 <h2 className="mb-4 text-lg font-semibold text-gray-800">Latest Transactions</h2>
                                 <TransactionsTable transactions={latestTransactions} isLoading={isLoadingTransactions} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            
            {paymentType === 'CASH_IN' ? (
                <CustomerSelectionModal 
                    isOpen={modalStep === 'selecting'}
                    onClose={handleCloseModals}
                    onSelect={handlePartySelect}
                />
            ) : (
                <SupplierSelectionModal
                    isOpen={modalStep === 'selecting'}
                    onClose={handleCloseModals}
                    onSelect={handlePartySelect}
                />
            )}

            {selectedParty && (
                <PaymentFormModal
                    isOpen={modalStep === 'paying'}
                    onClose={handleCloseModals}
                    party={selectedParty}
                    type={paymentType}
                />
            )}
        </>
    );
};

export default DashboardPage;