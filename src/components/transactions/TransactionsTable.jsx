import React from 'react';
import { Loader2, CircleAlert, ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';

const TransactionTypeIcon = ({ type }) => {
    if (type === 'CASH_IN') {
        return <TrendingUp className="w-5 h-5 text-green-500" />;
    }
    if (type === 'CASH_OUT') {
        return <TrendingDown className="w-5 h-5 text-red-500" />;
    }
    return <ArrowRightLeft className="w-5 h-5 text-gray-500" />;
};

const TableSkeleton = () => (
    [...Array(10)].map((_, i) => (
        <tr key={i} className="animate-pulse">
            <td className="px-6 py-4"><div className="w-8 h-4 bg-gray-200 rounded"></div></td>
            <td className="px-6 py-4"><div className="w-24 h-4 bg-gray-200 rounded"></div></td>
            <td className="px-6 py-4"><div className="w-40 h-4 bg-gray-200 rounded"></div></td>
            <td className="px-6 py-4"><div className="w-32 h-4 bg-gray-200 rounded"></div></td>
            <td className="px-6 py-4 text-right"><div className="w-20 h-4 ml-auto bg-gray-200 rounded"></div></td>
        </tr>
    ))
);

const EmptyState = () => (
    <tr>
        <td colSpan="5" className="py-20 text-center">
            <ArrowRightLeft className="w-16 h-16 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">No Transactions Found</h3>
            <p className="mt-1 text-sm text-gray-500">No records match the current filters.</p>
        </td>
    </tr>
);

const TransactionsTable = ({ transactions, isLoading, isError, error }) => {
    return (
        <div className="overflow-hidden bg-white shadow-lg rounded-xl ring-1 ring-gray-900/5">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="w-12 px-6 py-3"></th>
                            <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">Date</th>
                            <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">Description</th>
                            <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">Category / Related</th>
                            <th className="px-6 py-3 text-xs font-semibold tracking-wider text-right text-gray-600 uppercase">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                            <TableSkeleton />
                        ) : isError ? (
                            <tr><td colSpan="5" className="py-10 text-center text-red-600"><div className="flex flex-col items-center justify-center gap-2"><CircleAlert className="w-8 h-8"/><span>{error.message || 'Failed to load data.'}</span></div></td></tr>
                        ) : transactions.length === 0 ? (
                            <EmptyState />
                        ) : (
                            transactions.map(tx => (
                                <tr key={tx._id} className="transition-colors duration-200 hover:bg-orange-50/60">
                                    <td className="px-6 py-4"><TransactionTypeIcon type={tx.type} /></td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(tx.transactionDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{tx.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="font-semibold">{tx.category.replace(/_/g, ' ')}</span>
                                        {tx.relatedCustomer && <div className="text-xs">To: {tx.relatedCustomer.name}</div>}
                                        {tx.relatedSupplier && <div className="text-xs">From: {tx.relatedSupplier.name}</div>}
                                    </td>
                                    <td className={`px-6 py-4 text-sm font-medium text-right whitespace-nowrap ${tx.type === 'CASH_IN' ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.type === 'CASH_OUT' && '- '}
                                        Rs. {tx.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsTable;