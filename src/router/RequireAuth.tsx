import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@context/auth/AuthContext';

import Loader from '@components/Loader';
import { LoaderWrapper } from '@components/Loader/Loader.styled';

interface RequireAuthProps {
  children: React.ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

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
