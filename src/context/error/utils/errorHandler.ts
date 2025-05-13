/* eslint-disable no-console */
import { t } from 'i18next';
import type { Component } from 'react';
import { toast } from 'react-toastify';

import { getFirebaseAuthErrorMessage, isFirebaseAuthError } from './authError';

export const logError = (
  error: unknown,
  info?: { componentStack?: string },
) => {
  if (process.env.NODE_ENV !== 'prod') {
    console.error('Error captured:', error);
    if (info?.componentStack) {
      console.error('Component stack:', info.componentStack);
    }
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (isFirebaseAuthError(error)) {
    return getFirebaseAuthErrorMessage(error);
  }
  if (error instanceof Error) {
    return error.message || t('errors:unknown');
  }
  if (typeof error === 'string') {
    return error;
  }
  return t('errors:unknown');
};

export const notifyError = (message: string) => {
  toast(message, { type: 'error' });
};

export const captureError = (
  error: unknown,
  info?: { componentStack?: string },
) => {
  logError(error, info);
  const message = getErrorMessage(error);
  notifyError(message);
};

export const handleReactError = (
  error: unknown,
  errorInfo: {
    componentStack?: string;
    errorBoundary?: Component<unknown>;
  },
) => {
  captureError(error, errorInfo);
};

export const handleUncaughtError = handleReactError;
export const handleCaughtError = handleReactError;
