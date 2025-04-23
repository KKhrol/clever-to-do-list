import type { User } from 'firebase/auth';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  logout,
  onAuthStateChanged,
  signIn,
  signInWithGoogle,
  signUp,
} from '@api/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    const user = await signIn(email, password);
    setUser(user);
    setLoading(false);
  };

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    const user = await signUp(email, password);
    setUser(user);
    setLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    const user = await signInWithGoogle();
    setUser(user);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      signIn: handleSignIn,
      signUp: handleSignUp,
      signInWithGoogle: handleSignInWithGoogle,
      logout: handleLogout,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
