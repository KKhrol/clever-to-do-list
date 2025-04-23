import { Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

export enum FieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export interface IFormValues {
  [FieldNames.EMAIL]: string;
  [FieldNames.PASSWORD]: string;
  [FieldNames.CONFIRM_PASSWORD]: string;
}

export interface IErrorData {
  [FieldNames.EMAIL]?: string;
  [FieldNames.PASSWORD]?: string;
  [FieldNames.CONFIRM_PASSWORD]?: string;
}

interface SignUpFormProps {
  values: IFormValues;
  onFieldChange: (field: FieldNames) => (value: string) => void;
  loading: boolean;
  fieldErrors: IErrorData;
  shouldShowFieldError: (field: FieldNames) => boolean;
  onFieldFocus: (field: FieldNames) => void;
  onFieldBlur: (field: FieldNames) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  values,
  loading,
  fieldErrors,
  shouldShowFieldError,
  onFieldChange,
  onFieldBlur,
  onFieldFocus,
  onSubmit,
}) => {
  const { t } = useTranslation(['auth']);

  const hasEmptyFields = Object.values(values).some(
    (value: string) => !value.trim(),
  );
  const hasErrors = Object.values(fieldErrors).length > 0;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
    >
      <Stack
        spacing={4}
        paddingX={2}
      >
        <TextField
          required
          fullWidth
          label={t('auth:signUp.emailLabel')}
          type="email"
          value={values[FieldNames.EMAIL]}
          onFocus={() => onFieldFocus(FieldNames.EMAIL)}
          onBlur={() => onFieldBlur(FieldNames.EMAIL)}
          onChange={e => onFieldChange(FieldNames.EMAIL)(e.target.value)}
          autoComplete="email"
          error={shouldShowFieldError(FieldNames.EMAIL)}
          helperText={
            shouldShowFieldError(FieldNames.EMAIL) &&
            t(`auth:signUp.errors.${fieldErrors[FieldNames.EMAIL]}`)
          }
        />

        <TextField
          required
          fullWidth
          label={t('auth:signUp.passwordLabel')}
          type="password"
          value={values[FieldNames.PASSWORD]}
          onFocus={() => onFieldFocus(FieldNames.PASSWORD)}
          onBlur={() => onFieldBlur(FieldNames.PASSWORD)}
          onChange={e => onFieldChange(FieldNames.PASSWORD)(e.target.value)}
          error={shouldShowFieldError(FieldNames.PASSWORD)}
          helperText={
            shouldShowFieldError(FieldNames.PASSWORD) &&
            t(`auth:signUp.errors.${fieldErrors[FieldNames.PASSWORD]}`)
          }
        />

        <TextField
          required
          fullWidth
          label={t('auth:signUp.confirmPasswordLabel')}
          type="password"
          value={values[FieldNames.CONFIRM_PASSWORD]}
          onFocus={() => onFieldFocus(FieldNames.CONFIRM_PASSWORD)}
          onBlur={() => onFieldBlur(FieldNames.CONFIRM_PASSWORD)}
          onChange={e =>
            onFieldChange(FieldNames.CONFIRM_PASSWORD)(e.target.value)
          }
          error={shouldShowFieldError(FieldNames.CONFIRM_PASSWORD)}
          helperText={
            shouldShowFieldError(FieldNames.CONFIRM_PASSWORD) &&
            t(`auth:signUp.errors.${fieldErrors[FieldNames.CONFIRM_PASSWORD]}`)
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading || hasErrors || hasEmptyFields}
          sx={{ py: 1.3 }}
        >
          {t('auth:signUp.submitButton')}
        </Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
