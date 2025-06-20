import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../hooks/useLoginUser';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  const { mutate, isLoading } = useLoginUser();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <div className="flex items-center justify-center mb-4 space-x-2">
              <LogIn className="text-orange-500" size={40} />
              <h2 className="text-3xl font-extrabold text-orange-500">Welcome</h2>
            </div>

            <div className="relative">
              <Mail className="absolute text-gray-400 left-3 top-3" size={20} />
              <Field
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="relative">
              <Lock className="absolute text-gray-400 left-3 top-3" size={20} />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 font-semibold text-white transition duration-200 bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
