import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@modules/auth/Login';
import SignUp from '@modules/auth/SignUp';
import AuthLayout from '@modules/auth/components/AuthLayout';
import NotFoundErrorPage from '@modules/error/NotFoundErrorPage';

const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/sign-up',
    element: SignUp,
  },
  {
    path: '/unauthorized',
    element: NotFoundErrorPage,
  },
];

function PublicRouter() {
  return (
    <Routes>
      {publicRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AuthLayout>
              <route.element />
            </AuthLayout>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <Navigate
            to="/auth/login"
            replace
          />
        }
      />
    </Routes>
  );
}

export default PublicRouter;
