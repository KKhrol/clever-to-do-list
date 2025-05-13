import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { captureError } from './utils/errorHandler';

interface ErrorContextType {
  captureError: (error: unknown, info?: { componentStack?: string }) => void;
  lastError: Error | null;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [lastError, setLastError] = useState<Error | null>(null);

  const handleCaptureError = (
    error: unknown,
    info?: { componentStack?: string },
  ) => {
    if (error instanceof Error) {
      setLastError(error);
    } else {
      setLastError(new Error(String(error)));
    }

    captureError(error, info);
  };

  const clearError = () => {
    setLastError(null);
  };

  return (
    <ErrorContext.Provider
      value={{ captureError: handleCaptureError, lastError, clearError }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within ErrorProvider');
  }
  return context;
};
