// src/pages/ProductDetailPage.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, XCircle, UploadCloud, ImageIcon, Loader2 } from 'lucide-react';
import { useGetProductById, useAddProduct, useUpdateProduct } from '../../hooks/useProduct';
import { AuthContext } from '../../auth/authProvider';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const isCreateMode = productId === 'new';

    const [formState, setFormState] = useState({
        name: '', description: '', category: '', purchasePrice: 0, sellingPrice: 0, quantity: 0, reorderLevel: 5,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isEditing, setIsEditing] = useState(isCreateMode);
    const fileInputRef = useRef(null);

    const { currentShop } = useContext(AuthContext);
    const shopId = currentShop?._id;

    // Fetch data for edit mode
    const { data: product, isLoading, isError, error } = useGetProductById(productId, {
        enabled: !isCreateMode,
    });

    const { mutate: addProduct, isPending: isAdding } = useAddProduct();
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
    const isProcessing = isAdding || isUpdating;

    // Populate form when data is fetched in edit mode
    useEffect(() => {
        if (product && !isCreateMode) {
            setFormState({
                name: product.name || '',
                description: product.description || '',
                category: product.category || '',
                purchasePrice: product.purchasePrice || 0,
                sellingPrice: product.sellingPrice || 0,
                quantity: product.quantity || 0,
                reorderLevel: product.reorderLevel || 5,
            });
            setImagePreview(product.imageUrl || '');
        }
    }, [product, isCreateMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(formState).forEach(key => formData.append(key, formState[key]));
        
        if (imageFile) {
            formData.append('productImage', imageFile);
        }
        
        if (isCreateMode) {
            formData.append('shopId', shopId);
            addProduct(formData, {
                onSuccess: () => navigate('/products')
            });
        } else {
            updateProduct({ id: productId, data: formData }, {
                onSuccess: () => setIsEditing(false)
            });
        }
    };
    
    if (isLoading) return <div className="flex items-center justify-center h-screen"><Loader2 className="w-12 h-12 text-orange-500 animate-spin" /></div>;
    if (isError) return <div className="py-10 text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="min-h-screen p-4 bg-gray-50 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/products" className="flex items-center text-sm font-medium text-gray-600 hover:text-orange-600">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                        </Link>
                        <div className="flex items-center space-x-3">
                            {isEditing ? (
                                <>
                                    <button type="submit" disabled={isProcessing} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300">
                                        {isProcessing ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2 -ml-1" />}
                                        {isCreateMode ? 'Create Product' : 'Save Changes'}
                                    </button>
                                    {!isCreateMode && (
                                        <button type="button" onClick={() => setIsEditing(false)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                                            <XCircle className="w-5 h-5 mr-2 -ml-1" /> Cancel
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button type="button" onClick={() => setIsEditing(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                                    Edit Product
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 p-6 bg-white rounded-lg shadow-md md:grid-cols-3 gap-x-8 gap-y-6">
                        <div className="md:col-span-1">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Product Image</label>
                            <div className="relative flex items-center justify-center w-full h-48 bg-gray-100 border-2 border-dashed rounded-lg">
                                {imagePreview ? <img src={imagePreview} alt="Preview" className="object-cover w-full h-full rounded-lg" /> : <ImageIcon className="w-12 h-12 text-gray-400" />}
                            </div>
                            {isEditing && (
                                <>
                                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="inline-flex items-center justify-center w-full px-3 py-2 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                                        <UploadCloud className="w-5 h-5 mr-2" /> Change Image
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:col-span-2 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input type="text" name="name" id="name" value={formState.name} onChange={handleInputChange} disabled={!isEditing} required className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" id="description" rows="3" value={formState.description} onChange={handleInputChange} disabled={!isEditing} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"></textarea>
                            </div>
                            <div>
                                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price (₹)</label>
                                <input type="number" name="sellingPrice" id="sellingPrice" value={formState.sellingPrice} onChange={handleInputChange} disabled={!isEditing} required className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                            </div>
                            <div>
                                <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price (₹)</label>
                                <input type="number" name="purchasePrice" id="purchasePrice" value={formState.purchasePrice} onChange={handleInputChange} disabled={!isEditing} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                                <input type="number" name="quantity" id="quantity" value={formState.quantity} onChange={handleInputChange} disabled={!isEditing} required className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                            </div>
                            <div>
                                <label htmlFor="reorderLevel" className="block text-sm font-medium text-gray-700">Reorder Level</label>
                                <input type="number" name="reorderLevel" id="reorderLevel" value={formState.reorderLevel} onChange={handleInputChange} disabled={!isEditing} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductDetailPage;