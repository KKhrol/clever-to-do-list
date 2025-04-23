import { Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@context/auth/AuthContext';

import Spacer from '@components/Spacer';

import useHandleForm from '@hooks/useHandleForm';

import GoogleAuthButton from '../components/GoogleAuthButton.tsx';
import SignUpLink from '../components/SignUpLink.tsx';
import type { IFormValues } from './Form';
import LoginForm, { FieldNames } from './Form';

function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const { t } = useTranslation(['auth', 'errors']);
  const {
    values,
    errors: fieldErrors,
    loading,
    generalError: error,
    shouldShowFieldError,
    handleFieldBlur,
    handleSubmit,
    handleFieldChange,
    handleFieldFocus,
    setGeneralError: setError,
  } = useHandleForm<IFormValues>({
    initialValues: {
      [FieldNames.EMAIL]: '',
      [FieldNames.PASSWORD]: '',
    },
    validationRules: {
      [FieldNames.EMAIL]: [
        {
          validate: value => !!value.trim(),
          errorMessage: 'emailRequired',
        },
      ],
      [FieldNames.PASSWORD]: [
        {
          validate: value => !!value.trim(),
          errorMessage: 'passwordRequired',
        },
      ],
    },
    onSubmit: async values => {
      await signIn(values[FieldNames.EMAIL], values[FieldNames.PASSWORD]);
      navigate('/');
    },
    onError: () => 'errors:auth.signIn.invalidCredentials', //for toast messages in the future
  });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (_err) {
      setError('errors:auth.signIn.googleSignInFailed');
    }
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        gutterBottom
        fontWeight="600"
      >
        {t('auth:signIn.title')}
      </Typography>

      <Spacer height={26} />

      {error && (
        <Typography
          color="error"
          variant="body2"
          align="center"
          sx={{ mb: 2 }}
        >
          {t(error)}
        </Typography>
      )}

      <LoginForm
        values={values}
        loading={loading}
        fieldErrors={fieldErrors}
        shouldShowFieldError={shouldShowFieldError}
        onFieldBlur={handleFieldBlur}
        onFieldChange={handleFieldChange}
        onFieldFocus={handleFieldFocus}
        onSubmit={handleSubmit}
      />

      <Divider sx={{ my: 4 }}>{t('auth:common.or')}</Divider>

      <GoogleAuthButton
        disabled={loading}
        onClick={handleGoogleSignIn}
        label={t('auth:signIn.googleButton')}
      />

      <SignUpLink />
    </>
  );
}

export default Login;
