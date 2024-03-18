import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const ProtectedRoute = ({ children }) => {
  const { user, group } = useAuth();

  if (!user) {
    // User is not authenticated
    return <Navigate to={process.env.PUBLIC_URL + '/signin'} />;
  }
  /* 
  if (user && !group) {
    // User is authenticated but doesn't have a group
    return <Navigate to='/afterregister' />;
  }
 */
  // User is authenticated and has a group
  return <>{children}</>;
};

export default ProtectedRoute;
