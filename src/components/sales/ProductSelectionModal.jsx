import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useGetProductsByShop } from '../../hooks/useProduct';
import useDebounce from '../../hooks/useDebounce';
import { AuthContext } from '../../auth/authProvider';
import { Search, X, Loader2, Package, CircleAlert, Plus, Check } from 'lucide-react';

export default function ProductSelectionModal({ isOpen, onClose }) {
    const { values, setFieldValue } = useFormikContext();
    const { currentShop } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState({});
    const debouncedSearch = useDebounce(searchTerm, 300);

    const { data: productResponse, isLoading, isError } = useGetProductsByShop({
        shopId: currentShop?._id,
        search: debouncedSearch,
    });
    const products = productResponse?.data || [];

    // V-- NEW: Create a memoized Set for quick lookups of existing item IDs --V
    const existingItemIds = useMemo(() => {
        return new Set(values.items.map(item => item.productId));
    }, [values.items]);
    
    // Reset local state when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedProducts({});
        }
    }, [isOpen]);

    const handleToggleProduct = (product) => {
        // V-- NEW: Prevent toggling if the product is already in the sale --V
        if (existingItemIds.has(product._id)) {
            toast.info(`${product.name} is already in the sale cart.`);
            return;
        }

        setSelectedProducts(prev => {
            const newSelected = { ...prev };
            if (newSelected[product._id]) {
                delete newSelected[product._id];
            } else {
                newSelected[product._id] = product;
            }
            return newSelected;
        });
    };
    
    const handleAddItems = () => {
        const newItems = Object.values(selectedProducts).map(product => ({
            productId: product._id,
            name: product.name,
            quantity: 1, 
            priceAtSale: product.sellingPrice,
            stock: product.quantity
        }));

        if(newItems.length > 0) {
            setFieldValue('items', [...values.items, ...newItems]);
        }
        onClose();
    };
    
    const selectedCount = Object.keys(selectedProducts).length;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-2xl flex flex-col h-[90vh] bg-white rounded-xl shadow-lg">
                    <div className="flex-shrink-0 p-4 border-b">
                        <div className="flex items-center justify-between">
                            <Dialog.Title className="text-lg font-semibold text-gray-800">Add Products to Sale</Dialog.Title>
                            <button onClick={onClose} className="p-1 text-gray-500 rounded-full hover:bg-gray-100"><X size={20} /></button>
                        </div>
                        <div className="relative mt-2">
                            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by product name, category..." className="w-full py-2 pl-10 pr-3 border-gray-300 rounded-lg"/>
                        </div>
                    </div>
                    <div className="flex-grow px-4 overflow-y-auto">
                        {isLoading && <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}
                        {isError && <div className="p-4 text-center text-red-600"><CircleAlert className="inline-block mr-2" /> Could not load products.</div>}
                        {!isLoading && !isError && products.length === 0 && <div className="p-4 text-center text-gray-500"><Package className="inline-block mr-2" /> No products found.</div>}
                        <ul className="py-4 space-y-2">
                            {products.map(product => {
                                // V-- NEW: Determine the state of the list item --V
                                const isAlreadyInCart = existingItemIds.has(product._id);
                                const isSelected = !!selectedProducts[product._id];
                                const isOutOfStock = product.quantity === 0;
                                const isDisabled = isOutOfStock || isAlreadyInCart;

                                return (
                                    <li 
                                        key={product._id} 
                                        onClick={() => !isDisabled && handleToggleProduct(product)} 
                                        className={`flex items-center p-3 transition-all rounded-lg
                                            ${isSelected ? 'bg-orange-100 ring-2 ring-orange-400' : 'hover:bg-gray-50'}
                                            ${isDisabled ? 'opacity-60 cursor-not-allowed bg-gray-50' : 'cursor-pointer'}`
                                        }
                                    >
                                        <input 
                                            type="checkbox" 
                                            readOnly 
                                            checked={isSelected || isAlreadyInCart} // V-- Check if it's selected OR already in the cart --V
                                            disabled={isDisabled}
                                            className="w-5 h-5 mr-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 disabled:text-gray-400 disabled:border-gray-200"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-medium text-gray-800">{product.name}</p>
                                            <p className="text-sm text-gray-500">Stock: {product.quantity} | Price: ₹{product.sellingPrice}</p>
                                        </div>
                                        {/* V-- NEW: Display a more descriptive status badge --V */}
                                        {isAlreadyInCart ? (
                                            <span className="flex items-center text-xs font-semibold text-green-700">
                                                <Check size={14} className="mr-1" /> Added
                                            </span>
                                        ) : isOutOfStock && (
                                            <span className="text-xs font-semibold text-red-600">Out of Stock</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                     <div className="flex-shrink-0 p-4 border-t bg-gray-50">
                        <button onClick={handleAddItems} disabled={selectedCount === 0}
                            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-orange-500 rounded-md shadow-sm hover:bg-orange-600 disabled:bg-gray-400">
                           <Plus className="w-5 h-5 mr-2" /> Add {selectedCount > 0 ? `${selectedCount} Item(s)` : 'Items'} to Sale
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}