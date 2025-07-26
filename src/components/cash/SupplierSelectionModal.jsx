import React, { useState, useContext, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useGetSuppliersByShop } from '../../hooks/useSupplier'; 
import useDebounce from '../../hooks/useDebounce';
import { AuthContext } from '../../auth/authProvider';
import { Search, X, Loader2, Truck, CircleAlert } from 'lucide-react';

export default function SupplierSelectionModal({ isOpen, onClose, onSelect }) {
    const { currentShop } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);

    // The hook returns the full response: { success, data, pagination }
    const { data: suppliersResponse, isLoading, isError, error } = useGetSuppliersByShop({
        shopId: currentShop?._id,
        search: debouncedSearch,
    });
    
    // --- THIS IS THE FIX ---
    // Safely access the nested `data` array from the response object.
    const suppliers = suppliersResponse?.data || [];
    // --- END FIX ---

    useEffect(() => { if (isOpen) setSearchTerm(''); }, [isOpen]);

    const handleSelectSupplier = (supplier) => {
        onSelect(supplier); // This triggers handlePartySelect in DashboardPage
        // The onClose is now handled by the parent
    };

    const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-2xl">
                    <div className="flex items-center justify-between p-4 border-b">
                        <Dialog.Title className="text-lg font-semibold text-gray-800">Select Supplier</Dialog.Title>
                        <button type="button" onClick={onClose} className="p-1 text-gray-500 rounded-full hover:bg-gray-100"><X size={20} /></button>
                    </div>
                    <div className="p-4">
                        <div className="relative">
                            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by name or phone..." className="w-full py-2 pl-10 pr-3 border-gray-300 rounded-lg"/>
                        </div>
                    </div>
                    <div className="px-4 pb-4 overflow-y-auto max-h-96">
                        {isLoading && <div className="flex justify-center h-48 py-8"><Loader2 className="animate-spin" size={32}/></div>}
                        {isError && <div className="p-4 text-center text-red-600"><CircleAlert className="inline-block mr-2" />{error?.message || 'Could not load suppliers.'}</div>}
                        {!isLoading && !isError && suppliers.length === 0 && <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500"><Truck size={48} className="mb-2"/><p className="font-semibold">No suppliers found</p></div>}
                        <ul className="space-y-2">
                            {/* This .map() call will now work correctly */}
                            {suppliers.map(supplier => (
                                <li key={supplier._id}>
                                    <button onClick={() => handleSelectSupplier(supplier)} className="flex items-center w-full p-3 text-left transition-colors rounded-lg cursor-pointer hover:bg-orange-50">
                                        <div className="flex items-center justify-center w-10 h-10 mr-4 font-bold text-orange-600 bg-orange-100 rounded-full">{getInitials(supplier.name)}</div>
                                        <div>
                                            <p className="font-medium text-gray-800">{supplier.name}</p>
                                            <p className="text-sm text-gray-500">{supplier.phone}</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <p className="text-xs text-gray-500">Balance</p>
                                            <p className="text-sm font-semibold text-gray-800">Rs. {supplier.currentBalance.toLocaleString()}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}