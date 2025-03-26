// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminRequired = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightOrange"></div>
      </div>
    );
  }
  
  if (adminRequired) {
    const adminToken = localStorage.getItem('admin_token');
    return adminToken ? children : <Navigate to="/admin/login" />;
  }
  
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;