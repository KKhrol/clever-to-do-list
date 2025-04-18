import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@modules/auth/Login';
import SignUp from '@modules/auth/SignUp';
import ErrorPage from '@modules/error';

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
    element: ErrorPage,
  },
];

function PublicRouter() {
  return (
    <Routes>
      {publicRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
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
