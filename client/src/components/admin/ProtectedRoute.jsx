import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import PageLoader from '../ui/PageLoader.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}