import { fireEvent, render, screen } from '@testing-library/react';

import { useAuth } from '@context/auth/AuthContext';

import LogOutButton from '../components/LogOutButton';

jest.mock('@context/auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('LogOutButton Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders the logout button with tooltip', () => {
    render(<LogOutButton />);

    const logoutButton = screen.getByRole('button');
    expect(logoutButton).toBeInTheDocument();

    const logoutIcon = screen.getByTestId('LogoutIcon');
    expect(logoutIcon).toBeInTheDocument();
  });

  it('calls logout function when clicked', () => {
    render(<LogOutButton />);

    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
