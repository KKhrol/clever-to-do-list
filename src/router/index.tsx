import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@components/Header';
import Loader from '@components/Loader';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import RequireAuth from './RequireAuth';

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/auth/*"
          element={<PublicRouter />}
        />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Header />
              <PrivateRouter />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
