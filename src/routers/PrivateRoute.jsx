// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/authProvider';

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (role && user?.role !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
