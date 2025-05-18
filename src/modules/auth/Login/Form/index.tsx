import { Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

export enum FieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface IFormValues {
  [FieldNames.EMAIL]: string;
  [FieldNames.PASSWORD]: string;
}

export interface IErrorData {
  [FieldNames.EMAIL]?: string;
  [FieldNames.PASSWORD]?: string;
}

interface LoginFormProps {
  values: IFormValues;
  onFieldChange: (field: FieldNames) => (value: string) => void;
  loading: boolean;
  fieldErrors: IErrorData;
  shouldShowFieldError: (field: FieldNames) => boolean;
  onFieldBlur: (field: FieldNames) => void;
  onFieldFocus: (field: FieldNames) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  values,
  loading,
  fieldErrors,
  shouldShowFieldError,
  onFieldBlur,
  onFieldChange,
  onFieldFocus,
  onSubmit,
}) => {
  const { t } = useTranslation(['auth']);
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
          label={t('auth:signIn.emailLabel')}
          type="email"
          value={values[FieldNames.EMAIL]}
          onFocus={() => onFieldFocus(FieldNames.EMAIL)}
          onBlur={() => onFieldBlur(FieldNames.EMAIL)}
          onChange={e => onFieldChange(FieldNames.EMAIL)(e.target.value)}
          autoComplete="email"
          error={shouldShowFieldError(FieldNames.EMAIL)}
          helperText={
            shouldShowFieldError(FieldNames.EMAIL) &&
            t(`auth:signIn.errors.${fieldErrors[FieldNames.EMAIL]}`)
          }
        />

        <TextField
          required
          fullWidth
          label={t('auth:signIn.passwordLabel')}
          type="password"
          value={values[FieldNames.PASSWORD]}
          onFocus={() => onFieldFocus(FieldNames.PASSWORD)}
          onBlur={() => onFieldBlur(FieldNames.PASSWORD)}
          onChange={e => onFieldChange(FieldNames.PASSWORD)(e.target.value)}
          error={shouldShowFieldError(FieldNames.PASSWORD)}
          helperText={
            shouldShowFieldError(FieldNames.PASSWORD) &&
            t(`auth:signIn.errors.${fieldErrors[FieldNames.PASSWORD]}`)
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ py: 1.3 }}
        >
          {t('auth:signIn.submitButton')}
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
