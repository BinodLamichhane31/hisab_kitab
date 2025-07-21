import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddCustomer, useUpdateCustomer } from '../../hooks/useCustomer';
import { X, User, Mail, Phone, MapPin, Loader2, AlertCircle } from 'lucide-react';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{7,15}$/, 'Please enter a valid phone number')
    .required('Phone number is required.'),
  address: Yup.string()
    .required('Address is required.'),
});

const InputGroup = ({ icon: Icon, error, touched, ...props }) => {
    const showError = error && touched;
    return (
        <div>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className={`w-5 h-5 ${showError ? 'text-red-500' : 'text-slate-400'}`} />
                </span>
                <input
                    {...props}
                    className={`block w-full py-2.5 pl-10 pr-3 text-sm text-slate-800 bg-slate-100 rounded-lg transition
                    ${showError ? 'border-red-500 border focus:ring-red-500/50' : 'border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500'}`}
                />
            </div>
            {showError && (
                <div className="flex items-center mt-1.5 text-xs text-red-600">
                    <AlertCircle size={14} className="mr-1" />
                    {error}
                </div>
            )}
        </div>
    );
};

const CustomerFormModal = ({ onClose, shopId, customerToEdit }) => {
    const isEditMode = Boolean(customerToEdit);

    const { mutate: addCustomer, isPending: isAdding } = useAddCustomer();
    const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();
    const isLoading = isAdding || isUpdating;

    const formik = useFormik({
        initialValues: {
            name: customerToEdit?.name || '',
            email: customerToEdit?.email || '',
            phone: customerToEdit?.phone || '',
            address: customerToEdit?.address || '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (isEditMode) {
                updateCustomer({ ...values, id: customerToEdit._id }, {
                    onSuccess: () => onClose(),
                });
            } else {
                addCustomer({ ...values, shop: shopId }, {
                    onSuccess: () => onClose(),
                });
            }
        },
    });

    const modalTitle = isEditMode ? 'Edit Customer Details' : 'Create New Customer';
    const submitButtonText = isEditMode ? 'Save Changes' : 'Save Customer';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800">{modalTitle}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
                    <InputGroup
                        icon={User}
                        placeholder="Full Name"
                        {...formik.getFieldProps('name')}
                        touched={formik.touched.name}
                        error={formik.errors.name}
                    />
                    <InputGroup
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        {...formik.getFieldProps('email')}
                        touched={formik.touched.email}
                        error={formik.errors.email}
                    />
                    <InputGroup
                        icon={Phone}
                        type="tel"
                        placeholder="Phone Number"
                        {...formik.getFieldProps('phone')}
                        touched={formik.touched.phone}
                        error={formik.errors.phone}
                    />
                    <InputGroup
                        icon={MapPin}
                        type="text"
                        placeholder="Address"
                        {...formik.getFieldProps('address')}
                        touched={formik.touched.address}
                        error={formik.errors.address}
                    />

                    <div className="flex justify-end pt-6 space-x-3">
                        <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 text-sm font-semibold bg-transparent rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none disabled:opacity-50">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading || !formik.isValid} className="flex items-center justify-center min-w-[120px] px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600 focus:outline-none disabled:bg-orange-300 disabled:cursor-not-allowed">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : submitButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerFormModal;
