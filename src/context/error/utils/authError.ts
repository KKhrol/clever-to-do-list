import { t } from 'i18next';

export function isFirebaseAuthError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null) {
    const err = error as {
      code?: string;
      error?: { errors?: { message?: string }[] };
    };
    if (typeof err.code === 'string' && err.code.startsWith('auth/')) {
      return true;
    }
  }
  return false;
}

export function getFirebaseAuthErrorMessage(error: unknown): string {
  const err = error as {
    code?: string;
    error?: { errors?: { message?: string }[] };
  };
  const code = err.code || err.error?.errors?.[0]?.message || '';
  const normalizedCode =
    typeof code === 'string'
      ? code.replace('auth/', '').replace(/-/g, '_').toUpperCase()
      : '';
  const translationKey = `errors:auth.firebase.${normalizedCode}`;
  const translation = t(translationKey);
  if ('errors:' + translation === translationKey) {
    return t('errors:auth.firebase.default');
  }
  return translation;
}
