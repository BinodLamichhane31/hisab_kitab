import { useRegisterUser } from '../hooks/useRegisterUser';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Lock,
  KeyRound,
} from 'lucide-react';

export default function RegisterForm() {
  const { mutate, isLoading } = useRegisterUser();

  const initialValues = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const onSubmit = (values) => {
    const { fname, lname, email, phone, password } = values;
    const payload = { fname, lname, email, phone, password };
    mutate(payload);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div className="flex items-center justify-center mb-4 space-x-2">
                <ShieldCheck className="text-orange-500" size={40} />
                <h2 className="text-3xl font-extrabold text-orange-500">Create an Account</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <User className="absolute text-gray-400 left-3 top-3" size={20} />
                  <Field
                    name="fname"
                    placeholder="First Name"
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage name="fname" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                <div className="relative">
                  <User className="absolute text-gray-400 left-3 top-3" size={20} />
                  <Field
                    name="lname"
                    placeholder="Last Name"
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage name="lname" component="div" className="mt-1 text-sm text-red-500" />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute text-gray-400 left-3 top-3" size={20} />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="relative">
                <Phone className="absolute text-gray-400 left-3 top-3" size={20} />
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="relative">
                <Lock className="absolute text-gray-400 left-3 top-3" size={20} />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="relative">
                <KeyRound className="absolute text-gray-400 left-3 top-3" size={20} />
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-semibold text-white transition duration-200 bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register Now'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
