import React from 'react';
import { useCreateShop } from '../../hooks/useShop';
import { Dialog } from '@headlessui/react';
import { PlusCircle, XCircle, Loader2 } from 'lucide-react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const AddShopModal = ({ isOpen, onClose, onCreationSuccess }) => {
  const { mutate: createShop, isLoading } = useCreateShop();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md p-6 space-y-4 bg-white shadow-2xl rounded-2xl">
          <Formik
            initialValues={{ name: '', address: '', contactNumber: '' }}
            validationSchema={Yup.object({
              name: Yup.string().required('Shop name is required'),
              address: Yup.string(),
              contactNumber: Yup.string(),
            })}
            onSubmit={(values, { resetForm }) => {
              createShop(values, {
                onSuccess: (response) => {
                  resetForm();
                  onClose(); 

                  const newShop = response.data.data;

                  if (onCreationSuccess && newShop) {
                    onCreationSuccess(newShop);
                  }
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
                  placeholder="e.g., My Awesome Store"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
              </div>
               <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address (Optional)
                </label>
                <Field
                  name="address"
                  type="text"
                  placeholder="e.g., Umakunda-02, Ramechhap"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
                />
                <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number (Optional)
                </label>
                <Field
                  name="contactNumber"
                  type="text"
                  placeholder="e.g., +977 98XXXXXXXX"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-orange-500 focus:border-orange-500"
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
                  className="flex items-center justify-center min-w-[100px] px-4 py-2 text-sm font-semibold text-white bg-orange-500 border border-transparent rounded-lg shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Shop'
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