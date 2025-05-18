import { Route, Routes } from 'react-router-dom';

import NotFoundErrorPage from '@modules/error/NotFoundErrorPage';
import Calendar from '@modules/private/Calendar';
import Home from '@modules/private/Home';
import PrivateLayout from '@modules/private/components/PrivateLayout';

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
    element: NotFoundErrorPage,
  },
];

function PrivateRouter() {
  return (
    <Routes>
      {privateRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PrivateLayout>
              <route.element />
            </PrivateLayout>
          }
        />
      ))}
    </Routes>
  );
}

export default PrivateRouter;
