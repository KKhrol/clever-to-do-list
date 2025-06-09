import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useAuth } from '@context/auth/AuthContext';

import Header from '../components/Header';
import Menu from '../components/Menu';
import { theme } from '../config/tests/themeMock';
import PrivateLayout from '../modules/private/components/PrivateLayout';

jest.mock('@context/auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../components/Menu/MenuTabs', () => () => (
  <div data-testid="menu-tabs">MenuTabs</div>
));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Menu Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    mockLogout.mockClear();
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      user: { uid: 'test-user-123', email: 'test@example.com' },
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders menu tabs and logout button when rendered directly', () => {
    renderWithTheme(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('menu-tabs')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('clicking logout button calls logout function', () => {
    renderWithTheme(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
  it('is rendered in Header when showMenu is true', () => {
    renderWithTheme(
      <MemoryRouter>
        <Header showMenu={true} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('menu-tabs')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('is not rendered in Header when showMenu is false', () => {
    renderWithTheme(
      <MemoryRouter>
        <Header showMenu={false} />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('menu-tabs')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /log out/i }),
    ).not.toBeInTheDocument();
  });
  it('is rendered in PrivateLayout for authenticated users', () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      user: { uid: 'test-user-123' },
      isAuthenticated: true,
    });

    renderWithTheme(
      <MemoryRouter>
        <PrivateLayout>
          <div>Test Content</div>
        </PrivateLayout>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('menu-tabs')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  it('shows different logout state based on authentication', () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      user: { uid: 'test-user-123' },
      isAuthenticated: true,
    });

    const { rerender } = renderWithTheme(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalledTimes(1);

    mockLogout.mockClear();
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      user: null,
      isAuthenticated: false,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Menu />
        </MemoryRouter>
      </ThemeProvider>,
    );

    const logoutButtonUpdated = screen.getByRole('button');
    fireEvent.click(logoutButtonUpdated);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
