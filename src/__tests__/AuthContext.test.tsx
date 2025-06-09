import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import type { User } from 'firebase/auth';

import * as authApi from '@api/auth';

import { AuthProvider, useAuth } from '../context/auth/AuthContext';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const mockUser: User = {
  uid: 'test-uid-123',
  email: 'test@example.com',
  displayName: 'Test User',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  phoneNumber: null,
  photoURL: null,
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: jest.fn(),
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  reload: jest.fn(),
  toJSON: jest.fn(),
  providerId: '',
};

jest.mock('@api/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signIn: jest.fn(),
  signUp: jest.fn(),
  signInWithGoogle: jest.fn(),
  logout: jest.fn(),
}));

const TestComponent = () => {
  const {
    user,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
  } = useAuth();

  return (
    <div>
      <div data-testid="user">{user ? 'User exists' : 'No user'}</div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not loading'}</div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </div>
      <button onClick={() => signIn('test@example.com', 'password')}>
        Sign In
      </button>
      <button onClick={() => signUp('test@example.com', 'password')}>
        Sign Up
      </button>
      <button onClick={() => signInWithGoogle()}>Sign In with Google</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  let authStateCallback: (user: User | null) => void;

  beforeEach(() => {
    (authApi.onAuthStateChanged as jest.Mock).mockImplementation(
      (callback: (user: User | null) => void) => {
        authStateCallback = callback;
        return jest.fn();
      },
    );

    (authApi.onAuthStateChanged as jest.Mock).mockClear();
    (authApi.signIn as jest.Mock).mockClear();
    (authApi.signUp as jest.Mock).mockClear();
    (authApi.signInWithGoogle as jest.Mock).mockClear();
    (authApi.logout as jest.Mock).mockClear();
  });

  it('initializes with loading state and no user', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('auth-status')).toHaveTextContent(
      'Not authenticated',
    );
  });

  it('updates state when user auth state changes', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    act(() => {
      authStateCallback(mockUser);
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      expect(screen.getByTestId('user')).toHaveTextContent('User exists');
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Authenticated',
      );
    });
  });
  it('handles sign in successfully', async () => {
    (authApi.signIn as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const signInButton = screen.getByText('Sign In');

    await act(async () => {
      fireEvent.click(signInButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(authApi.signIn).toHaveBeenCalledWith('test@example.com', 'password');

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('User exists');
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Authenticated',
      );
    });
  });
  it('handles sign up successfully', async () => {
    (authApi.signUp as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const signUpButton = screen.getByText('Sign Up');

    await act(async () => {
      fireEvent.click(signUpButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(authApi.signUp).toHaveBeenCalledWith('test@example.com', 'password');

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('User exists');
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Authenticated',
      );
    });
  });

  it('handles Google sign in successfully', async () => {
    (authApi.signInWithGoogle as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const googleButton = screen.getByText('Sign In with Google');

    await act(async () => {
      fireEvent.click(googleButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(authApi.signInWithGoogle).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('User exists');
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Authenticated',
      );
    });
  });

  it('handles logout successfully', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    act(() => {
      authStateCallback(mockUser);
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('User exists');
    });

    const logoutButton = screen.getByText('Logout');

    await act(async () => {
      fireEvent.click(logoutButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(authApi.logout).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('No user');
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Not authenticated',
      );
    });
  });

  it('properly updates isAuthenticated based on user state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent(
      'Not authenticated',
    );

    act(() => {
      authStateCallback(mockUser);
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Authenticated',
      );
    });

    act(() => {
      authStateCallback(null);
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Not authenticated',
      );
    });
  });

  it('unsubscribes from auth state listener on unmount', () => {
    const mockUnsubscribe = jest.fn();
    (authApi.onAuthStateChanged as jest.Mock).mockReturnValue(mockUnsubscribe);

    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(authApi.onAuthStateChanged).toHaveBeenCalled();

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it('memoizes context value correctly', () => {
    let contextValueRef: AuthContextType | undefined;

    const ContextCapture = () => {
      const contextValue = useAuth();
      contextValueRef = contextValue;
      return null;
    };

    const { rerender } = render(
      <AuthProvider>
        <ContextCapture />
      </AuthProvider>,
    );

    const initialValue = contextValueRef;

    rerender(
      <AuthProvider>
        <ContextCapture />
      </AuthProvider>,
    );

    expect(contextValueRef).toBe(initialValue);
  });

  it('updates memoized value when user state changes', async () => {
    let contextValueRef: AuthContextType | undefined;

    const ContextCapture = () => {
      const contextValue = useAuth();
      contextValueRef = contextValue;
      return null;
    };

    render(
      <AuthProvider>
        <ContextCapture />
      </AuthProvider>,
    );

    const initialValue = contextValueRef;

    act(() => {
      authStateCallback(mockUser);
    });

    await waitFor(() => {
      expect(contextValueRef).not.toBe(initialValue);
      expect(contextValueRef?.user).toBe(mockUser);
      expect(contextValueRef?.isAuthenticated).toBe(true);
    });
  });

  it('maintains consistent auth state across multiple components', async () => {
    const SecondTestComponent = () => {
      const { user, isAuthenticated } = useAuth();
      return (
        <div>
          <div data-testid="second-user">
            {user ? 'User exists' : 'No user'}
          </div>
          <div data-testid="second-auth-status">
            {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
          </div>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
        <SecondTestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('second-user')).toHaveTextContent('No user');
    expect(screen.getByTestId('auth-status')).toHaveTextContent(
      'Not authenticated',
    );
    expect(screen.getByTestId('second-auth-status')).toHaveTextContent(
      'Not authenticated',
    );

    act(() => {
      authStateCallback(mockUser);
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('User exists');
      expect(screen.getByTestId('second-user')).toHaveTextContent(
        'User exists',
      );
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Authenticated',
      );
      expect(screen.getByTestId('second-auth-status')).toHaveTextContent(
        'Authenticated',
      );
    });
  });

  it('calls API methods with correct parameters', async () => {
    (authApi.signIn as jest.Mock).mockResolvedValue(mockUser);
    (authApi.signUp as jest.Mock).mockResolvedValue(mockUser);
    (authApi.signInWithGoogle as jest.Mock).mockResolvedValue(mockUser);
    (authApi.logout as jest.Mock).mockResolvedValue(undefined);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Sign In'));
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(authApi.signIn).toHaveBeenCalledWith('test@example.com', 'password');

    await act(async () => {
      fireEvent.click(screen.getByText('Sign Up'));
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(authApi.signUp).toHaveBeenCalledWith('test@example.com', 'password');

    await act(async () => {
      fireEvent.click(screen.getByText('Sign In with Google'));
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(authApi.signInWithGoogle).toHaveBeenCalledWith();

    await act(async () => {
      fireEvent.click(screen.getByText('Logout'));
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(authApi.logout).toHaveBeenCalledWith();
  });

  it('sets loading to false after auth state initialization', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');

    act(() => {
      authStateCallback(null);
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
    });
  });
});

describe('useAuth hook', () => {
  it('throws error when used outside AuthProvider', () => {
    const TestComponentOutsideProvider = () => {
      useAuth();
      return null;
    };

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {
      // Do nothing
    });

    expect(() => {
      render(<TestComponentOutsideProvider />);
    }).toThrow('useAuth must be used within an AuthProvider');

    spy.mockRestore();
  });
  it('returns context value when used within AuthProvider', () => {
    let contextValue: AuthContextType | undefined;

    const TestComponentInsideProvider = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponentInsideProvider />
      </AuthProvider>,
    );

    expect(contextValue).toBeDefined();
    expect(contextValue!).toHaveProperty('user');
    expect(contextValue!).toHaveProperty('loading');
    expect(contextValue!).toHaveProperty('isAuthenticated');
    expect(contextValue!).toHaveProperty('signIn');
    expect(contextValue!).toHaveProperty('signUp');
    expect(contextValue!).toHaveProperty('signInWithGoogle');
    expect(contextValue!).toHaveProperty('logout');
  });
});
