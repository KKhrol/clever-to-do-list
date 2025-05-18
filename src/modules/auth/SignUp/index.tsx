import { Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@context/auth/AuthContext';
import { useError } from '@context/error/ErrorContext';

import GoogleAuthButton from '@modules/auth/components/GoogleAuthButton';

import Spacer from '@components/Spacer';

import useHandleForm from '@hooks/useHandleForm';

import SignInLink from '../components/SignInLink';
import SignUpForm, { FieldNames, type IFormValues } from './Form';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const { t } = useTranslation(['auth', 'errors', 'common']);
  const { captureError } = useError();

  const {
    values,
    errors: fieldErrors,
    loading,
    handleSubmit,
    handleFieldChange,
    handleFieldFocus,
    handleFieldBlur,
    shouldShowFieldError,
  } = useHandleForm<IFormValues>({
    initialValues: {
      [FieldNames.EMAIL]: '',
      [FieldNames.PASSWORD]: '',
      [FieldNames.CONFIRM_PASSWORD]: '',
    },
    validationRules: {
      [FieldNames.EMAIL]: [
        {
          validate: (value: string) => !!value.trim(),
          errorMessage: 'emailRequired',
        },
        {
          validate: (value: string) => {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(value);
          },
          errorMessage: 'emailInvalid',
        },
      ],
      [FieldNames.PASSWORD]: [
        {
          validate: (value: string) => !!value.trim(),
          errorMessage: 'passwordRequired',
        },
        {
          validate: (value: string) => value.length >= 6,
          errorMessage: 'passwordTooShort',
        },
        {
          validate: (value: string) => /\d/.test(value),
          errorMessage: 'passwordRequiresNumber',
        },
        {
          validate: (value: string) => /[A-Z]/.test(value),
          errorMessage: 'passwordRequiresUppercase',
        },
        {
          validate: (value: string, formValues: IFormValues): boolean =>
            !formValues[FieldNames.CONFIRM_PASSWORD] ||
            value === formValues[FieldNames.CONFIRM_PASSWORD],
          errorMessage: 'passwordMismatch',
        },
      ],
      [FieldNames.CONFIRM_PASSWORD]: [
        {
          validate: (value: string) => !!value.trim(),
          errorMessage: 'passwordConfirmationRequired',
        },
        {
          validate: (value: string, formValues: IFormValues): boolean =>
            value === formValues[FieldNames.PASSWORD],
          errorMessage: 'passwordMismatch',
        },
      ],
    },
    onSubmit: async values => {
      await signUp(values[FieldNames.EMAIL], values[FieldNames.PASSWORD]);
      navigate('/');
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      captureError(err, {
        componentStack: `Google sign-up error\n${err instanceof Error && err.stack ? err.stack : ''}`,
      });
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
        {t('auth:signUp.title')}
      </Typography>

      <Spacer height={26} />

      <SignUpForm
        values={values}
        loading={loading}
        fieldErrors={fieldErrors}
        shouldShowFieldError={shouldShowFieldError}
        onFieldChange={handleFieldChange}
        onFieldFocus={handleFieldFocus}
        onFieldBlur={handleFieldBlur}
        onSubmit={handleSubmit}
      />

      <Divider sx={{ my: 3 }}>{t('auth:common.or')}</Divider>

      <GoogleAuthButton
        disabled={loading}
        onClick={handleGoogleSignUp}
        label={t('auth:signUp.googleButton')}
      />

      <SignInLink />
    </>
  );
}

export default SignUp;
