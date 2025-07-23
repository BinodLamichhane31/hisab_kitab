import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPurchases } from '../../hooks/usePurchase'; // <-- Use Purchase Hook
import useDebounce from '../../hooks/useDebounce';
import { AuthContext } from '../../auth/authProvider';

import {
    Search,
    Plus,
    ShoppingCart, // <-- Changed Icon
    Loader2,
    ChevronLeft,
    ChevronRight,
    CircleAlert
} from 'lucide-react';

// Reusable component, can be moved to a shared file
const StatusBadge = ({ record }) => {
    let config = { text: 'Due', className: 'bg-red-100 text-red-800' };

    if (record.status === 'CANCELLED') {
        config = { text: 'Cancelled', className: 'bg-gray-200 text-gray-700 line-through' };
    } else {
        switch (record.paymentStatus) {
            case 'PAID':
                config = { text: 'Paid', className: 'bg-green-100 text-green-800' };
                break;
            case 'PARTIAL':
                config = { text: 'Partial', className: 'bg-yellow-100 text-yellow-800' };
                break;
            case 'UNPAID': // Changed from DUE for consistency with backend
                config = { text: 'Unpaid', className: 'bg-red-100 text-red-800' };
                break;
            default:
                break;
        }
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className}`}>
            {config.text}
        </span>
    );
};

// Reusable component, no changes needed
const TableSkeleton = ({ columns = 6 }) => (
    [...Array(8)].map((_, i) => (
        <tr key={i} className="animate-pulse">
            <td className="px-6 py-4 whitespace-nowrap"><div className="w-24 h-4 bg-gray-200 rounded"></div></td>
            <td className="px-6 py-4 whitespace-nowrap"><div className="w-20 h-4 bg-gray-200 rounded"></div></td>
            <td className="hidden px-6 py-4 md:table-cell whitespace-nowrap"><div className="w-32 h-4 bg-gray-200 rounded"></div></td>
            <td className="px-6 py-4 text-right whitespace-nowrap"><div className="w-16 h-4 ml-auto bg-gray-200 rounded"></div></td>
            <td className="hidden px-6 py-4 sm:table-cell whitespace-nowrap"><div className="w-20 h-6 mx-auto bg-gray-200 rounded-full"></div></td>
            <td className="px-6 py-4 text-right whitespace-nowrap"><div className="h-4 ml-auto bg-gray-200 rounded w-28"></div></td>
        </tr>
    ))
);

// Changed text and icon for Purchases
const EmptyState = ({ onAddClick }) => (
    <div className="py-20 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300" />
        <h3 className="mt-4 text-lg font-semibold text-gray-800">No Purchases Found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new purchase record.</p>
        <button
            onClick={onAddClick}
            className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium text-white transition-transform transform bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
            <Plus className="w-5 h-5 mr-2 -ml-1" />
            Create Your First Purchase
        </button>
    </div>
);

const PurchasesPage = () => {
    const navigate = useNavigate();
    const { currentShop } = useContext(AuthContext);
    const shopId = currentShop?._id;

    const [filters, setFilters] = useState({
        search: '',
        purchaseType: '', // <-- Changed from saleType
        paymentStatus: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearch = useDebounce(filters.search, 500);

    // <-- Using Purchase Hooks -->
    const { data, isLoading, isError, error } = useGetPurchases({
        shopId,
        page: currentPage,
        search: debouncedSearch,
        purchaseType: filters.purchaseType,
        paymentStatus: filters.paymentStatus,
        limit: 10,
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, filters.purchaseType, filters.paymentStatus]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleAddClick = () => navigate('/purchases/new');

    const purchases = data?.data || [];
    const pagination = data?.pagination || {};

    return (
        <div className="min-h-screen p-4 bg-slate-50 sm:p-6 lg:p-8">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="pb-5 mb-6 border-b border-gray-200 md:flex md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Purchase History</h1>
                        <p className="mt-1 text-sm text-gray-500">View, track, and manage all your shop's purchases.</p>
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white transition-transform transform bg-orange-500 border border-transparent rounded-md shadow-sm md:mt-0 hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        <Plus className="w-5 h-5 mr-2 -ml-1" />
                        Create Purchase
                    </button>
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                    <div className="relative md:col-span-1">
                        <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="block w-full py-2 pl-10 pr-3 transition-colors border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="Search by Bill #..." // <-- Changed Placeholder
                        />
                    </div>
                    <select name="purchaseType" value={filters.purchaseType} onChange={handleFilterChange} className="w-full py-2 transition-colors bg-white border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                        <option value="">All Purchase Types</option>
                        <option value="CASH">Cash Purchases</option>
                        <option value="SUPPLIER">Supplier Purchases</option>
                    </select>
                    <select name="paymentStatus" value={filters.paymentStatus} onChange={handleFilterChange} className="w-full py-2 transition-colors bg-white border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                        <option value="">All Payment Statuses</option>
                        <option value="PAID">Paid</option>
                        <option value="UNPAID">Unpaid</option>
                        <option value="PARTIAL">Partial</option>
                    </select>
                </div>

                {/* Purchases Table */}
                <div className="overflow-hidden bg-white shadow-lg rounded-xl ring-1 ring-gray-900/5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">Bill #</th>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">Date</th>
                                    <th className="hidden px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase md:table-cell">Supplier</th>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-right text-gray-600 uppercase">Total Amount</th>
                                    <th className="hidden px-6 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase sm:table-cell">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-right text-gray-600 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading ? (
                                    <TableSkeleton />
                                ) : isError ? (
                                    <tr><td colSpan="6" className="py-10 text-center text-red-600"><div className="flex flex-col items-center justify-center gap-2"><CircleAlert className="w-8 h-8"/><span>{error.message || 'Failed to load purchases data.'}</span></div></td></tr>
                                ) : purchases.length === 0 ? (
                                     <tr><td colSpan="6"><EmptyState onAddClick={handleAddClick} /></td></tr>
                                ) : (
                                    purchases.map(purchase => (
                                        <tr key={purchase._id} className="transition-colors duration-200 hover:bg-orange-50/60">
                                            <td className="px-6 py-4 font-mono text-sm text-gray-700 whitespace-nowrap">{purchase.billNumber}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                                            <td className="hidden px-6 py-4 text-sm text-gray-800 md:table-cell whitespace-nowrap">{purchase.supplier?.name || <span className="italic text-gray-500">Cash Purchase</span>}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">Rs. {purchase.grandTotal.toLocaleString()}</td>
                                            <td className="hidden px-6 py-4 text-center sm:table-cell whitespace-nowrap"><StatusBadge record={purchase} /></td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <button onClick={() => navigate(`/purchases/${purchase._id}`)} className="text-sm font-medium text-orange-600 transition-colors hover:text-orange-800 hover:underline">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                     {/* Pagination Controls */}
                    {purchases.length > 0 && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
                            <div className="hidden text-sm text-gray-700 sm:block">Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{pagination.totalPages}</span></div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1 || isLoading} className="inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeft className="w-5 h-5" /></button>
                                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.totalPages || isLoading} className="inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PurchasesPage;