import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@context/auth/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
}

export default RequireAuth;
