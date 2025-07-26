import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/authProvider';
import { useGetDashboardStats, useGetDashboardChart } from '../../hooks/useDashboard';
import { useGetTransactions } from '../../hooks/useTransaction';

// Reusable Components
import StatCard from '../../components/dashboard/StatCard';
import DashboardChart from '../../components/dashboard/DashboardChart';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import CustomerSelectionModal from '../../components/cash/CustomerSelectionModal';
import SupplierSelectionModal from '../../components/cash/SupplierSelectionModal';
import PaymentFormModal from '../../components/cash/PaymentFormModal';

import { Users, Truck, DollarSign, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

const DashboardPage = () => {
    const { currentShop } = useContext(AuthContext);
    const shopId = currentShop?._id;

    // State to manage the two-step modal process
    const [modalStep, setModalStep] = useState('closed'); // 'closed', 'selecting', 'paying'
    const [paymentType, setPaymentType] = useState('CASH_IN'); // 'CASH_IN' or 'CASH_OUT'
    const [selectedParty, setSelectedParty] = useState(null); // Holds the selected customer/supplier

    // Fetching data for all dashboard sections
    const { data: stats, isLoading: isLoadingStats, isError: isErrorStats, error: errorStats } = useGetDashboardStats({ shopId });
    const { data: chartData, isLoading: isLoadingChart, isError: isErrorChart, error: errorChart } = useGetDashboardChart({ shopId });
    const { data: transactionResponse, isLoading: isLoadingTransactions, isError: isErrorTransactions, error: errorTransactions } = useGetTransactions({ shopId, limit: 5 });

    const latestTransactions = transactionResponse?.data || [];
    
    // --- WORKFLOW HANDLERS ---
    const handleOpenSelection = (type) => {
        setPaymentType(type);
        setModalStep('selecting');
    };

    const handlePartySelect = (party) => {
        setSelectedParty(party);
        setModalStep('paying'); // Move to the next step: the payment form
    };

    const handleCloseModals = () => {
        setModalStep('closed');
        setSelectedParty(null); // Reset selected party on close
    };
    // --- END WORKFLOW HANDLERS ---

    return (
        <>
            <div className="min-h-screen p-4 bg-slate-50 sm:p-6 lg:p-8">
                <div className="max-w-full mx-auto space-y-8">
                    {/* Header */}
                    <div className="items-start justify-between md:flex">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-500">Welcome back! Here's a summary of your shop's activity.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <button onClick={() => handleOpenSelection('CASH_IN')} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700">
                                <ArrowDown className="w-5 h-5" /> Cash In
                            </button>
                            <button onClick={() => handleOpenSelection('CASH_OUT')} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700">
                                <ArrowUp className="w-5 h-5" /> Cash Out
                            </button>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard icon={Users} title="Total Customers" value={stats?.totalCustomers ?? '...'} isLoading={isLoadingStats} error={isErrorStats} />
                        <StatCard icon={Truck} title="Total Suppliers" value={stats?.totalSuppliers ?? '...'} isLoading={isLoadingStats} error={isErrorStats} />
                        <StatCard icon={DollarSign} title="Receivable Amount" value={`Rs. ${stats?.receivableAmount.toLocaleString() ?? '...'}`} isLoading={isLoadingStats} error={isErrorStats} />
                        <StatCard icon={AlertTriangle} title="Payable Amount" value={`Rs. ${stats?.payableAmount.toLocaleString() ?? '...'}`} isLoading={isLoadingStats} error={isErrorStats} />
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left Column: Chart */}
                        <div className="p-6 bg-white shadow-lg lg:col-span-2 rounded-xl ring-1 ring-gray-900/5">
                            <h2 className="text-lg font-semibold text-gray-800">12-Month Performance</h2>
                            <p className="text-sm text-gray-500">Sales vs. Purchases</p>
                            <div className="mt-4">
                                <DashboardChart data={chartData} isLoading={isLoadingChart} isError={isErrorChart} error={errorChart} />
                            </div>
                        </div>
                        {/* Right Column: Latest Transactions */}
                        <div className="lg:col-span-1">
                             <h2 className="mb-4 text-lg font-semibold text-gray-800">Latest Transactions</h2>
                             <TransactionsTable transactions={latestTransactions} isLoading={isLoadingTransactions} isError={isErrorTransactions} error={errorTransactions} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* --- MODAL RENDERING LOGIC --- */}
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

            {/* Render the PaymentFormModal only when a party has been selected and we're in the 'paying' step */}
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