import { Route, Routes } from 'react-router-dom';

import ErrorPage from '@modules/error';
import Calendar from '@modules/private/Calendar';
import Home from '@modules/private/Home';

const privateRoutes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/calendar',
    element: Calendar,
  },
  {
    path: '*',
    element: ErrorPage,
  },
];

function PrivateRouter() {
  return (
    <Routes>
      {privateRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
        />
      ))}{' '}
    </Routes>
  );
}

export default PrivateRouter;
