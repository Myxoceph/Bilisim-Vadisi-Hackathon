import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, vetOnly = false, customerOnly = false }) {

  const { user, loading } = useAuth();

  if (loading)
  {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user)
    return <Navigate to="/login" replace />;

  if (vetOnly && user.userType !== 'vet')
    return <Navigate to="/dashboard" replace />;

  if (customerOnly && user.userType !== 'customer')
    return <Navigate to="/dashboard" replace />;

  return children;
}
