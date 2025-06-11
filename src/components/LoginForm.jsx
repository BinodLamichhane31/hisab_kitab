import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../hooks/useLoginUser';

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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 font-semibold text-white transition duration-200 bg-orange-500 rounded-md hover:bg-orange-600"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
