// pages/CreateFirstShop.jsx
import { useCreateShop } from "../../hooks/useShop"; // Your existing hook
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Building } from 'lucide-react';

const CreateFirstShop = () => {
  const navigate = useNavigate();
  const { mutate: createShop, isLoading } = useCreateShop({
    onSuccess: () => {
      window.location.href = '/dashboard'; 
      navigate('/dashboard')
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <Building className="w-16 h-16 mx-auto text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
            <p className="mt-2 text-gray-600">Let's get your first shop set up.</p>
        </div>
        <Formik
          initialValues={{ name: '', address: '', contactNumber: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Shop name is required'),
            address: Yup.string(),
            contactNumber: Yup.string(),
          })}
          onSubmit={(values) => createShop(values)}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Shop Name</label>
              <Field name="name" type="text" className="w-full mt-1 input-class" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full btn-primary">
              {isLoading ? 'Creating...' : 'Create Shop and Continue'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateFirstShop;