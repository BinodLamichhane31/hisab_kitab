import React, { useState } from 'react';
import { useAddSupplier } from '../../hooks/useSupplier';
import { X, User, Mail, Phone, MapPin, Loader2 } from 'lucide-react';

const InputGroup = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <Icon className="w-5 h-5 text-slate-400" />
    </span>
    <input
      {...props}
      className="block w-full py-2.5 pl-10 pr-3 text-sm text-slate-800 bg-slate-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
    />
  </div>
);

const AddSupplierModal = ({ shopId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shop: shopId,
  });

  const { mutate: addSupplier, isLoading } = useAddSupplier();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('All fields are required.');
      return;
    }
    addSupplier(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Create New Supplier</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Full Name
            </label>
            <InputGroup
              icon={User}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Email Address
            </label>
            <InputGroup
              icon={Mail}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Phone
            </label>
            <InputGroup
              icon={Phone}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Address
            </label>
            <InputGroup
              icon={MapPin}
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end pt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold bg-transparent rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-orange-500 border border-transparent rounded-lg shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Supplier'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;
