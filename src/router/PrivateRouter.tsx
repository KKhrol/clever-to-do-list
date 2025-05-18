import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { MainTabValues } from 'src/constants/mainTabValues';

import NotFoundErrorPage from '@modules/error/NotFoundErrorPage';
import Calendar from '@modules/private/Calendar';
import Home from '@modules/private/Home';
import PrivateLayout from '@modules/private/components/PrivateLayout';

const TabContent = () => {
  const { tab } = useParams<{ tab: string }>();

  switch (tab) {
    case MainTabValues.CALENDAR:
      return <Calendar />;
    case MainTabValues.HOME:
      return <Home />;
    default:
      return <Home />;
  }
};
const privateRoutes = [
  {
    path: '/',
    element: (
      <Navigate
        to="/home"
        replace
      />
    ),
  },
  {
    path: '/:tab',
    element: <TabContent />,
  },
  {
    path: '*',
    element: <NotFoundErrorPage />,
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
            route.path === '/' ? (
              route.element
            ) : (
              <PrivateLayout>{route.element}</PrivateLayout>
            )
          }
        />
      ))}
    </Routes>
  );
}

export default PrivateRouter;
