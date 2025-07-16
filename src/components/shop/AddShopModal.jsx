import React from 'react';
import { useCreateShop } from '../../hooks/useShop';
import { Dialog } from '@headlessui/react';
import { PlusCircle, XCircle } from 'lucide-react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const AddShopModal = ({ isOpen, onClose }) => {
  const { mutate: createShop, isLoading } = useCreateShop();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md p-6 space-y-4 bg-white shadow-2xl rounded-2xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <PlusCircle className="w-6 h-6 text-orange-500" />
              Add New Shop
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 transition-all hover:text-red-500"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <Formik
            initialValues={{ name: '', address: '', contactNumber: '' }}
            validationSchema={Yup.object({
              name: Yup.string().required('Shop name is required'),
              address: Yup.string().required('Shop address is required'),
              contactNumber: Yup.string().required('Shop contact is required'),
            })}
            onSubmit={(values, { resetForm }) => {
              createShop(values, {
                onSuccess: () => {
                  resetForm();
                  onClose();
                },
              });
            }}
          >
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Shop Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                />
                <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <Field
                  name="contactNumber"
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="mt-1 text-sm text-red-500"
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
                'Add Shop'
              )}
            </button>
          </div>
            </Form>
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddShopModal;
