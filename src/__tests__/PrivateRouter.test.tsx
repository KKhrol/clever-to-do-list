import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import PrivateRouter from '../router/PrivateRouter';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@modules/private/Home', () => ({
  __esModule: true,
  default: () => <div data-testid="home-page">Home Page Content</div>,
}));

jest.mock('@modules/private/Calendar', () => ({
  __esModule: true,
  default: () => <div data-testid="calendar-page">Calendar Page Content</div>,
}));

jest.mock('@modules/error/NotFoundErrorPage', () => ({
  __esModule: true,
  default: () => <div data-testid="not-found-page">Not Found Page Content</div>,
}));

jest.mock('@modules/private/components/PrivateLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="private-layout">
      <div data-testid="private-layout-content">{children}</div>
    </div>
  ),
}));

jest.mock('@context/calendar/CalendarRefreshContext', () => ({
  CalendarRefreshProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

jest.mock('@context/calendar/CalendarContext', () => ({
  CalendarProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('PrivateRouter Component', () => {
  it('renders the Home page when route is /home', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route
            path="/*"
            element={<PrivateRouter />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('private-layout')).toBeInTheDocument();

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('private-layout-content')).toContainElement(
      screen.getByTestId('home-page'),
    );
  });

  it('renders the Calendar page when route is /calendar', () => {
    render(
      <MemoryRouter initialEntries={['/calendar']}>
        <Routes>
          <Route
            path="/*"
            element={<PrivateRouter />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('private-layout')).toBeInTheDocument();

    expect(screen.getByTestId('calendar-page')).toBeInTheDocument();
    expect(screen.getByTestId('private-layout-content')).toContainElement(
      screen.getByTestId('calendar-page'),
    );
  });

  it('renders the NotFound page for invalid deeper routes', () => {
    render(
      <MemoryRouter initialEntries={['/home/invalid/route']}>
        <Routes>
          <Route
            path="/*"
            element={<PrivateRouter />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('private-layout')).toBeInTheDocument();

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByTestId('private-layout-content')).toContainElement(
      screen.getByTestId('not-found-page'),
    );
  });

  it('redirects to /home when route is /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/*"
            element={<PrivateRouter />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
