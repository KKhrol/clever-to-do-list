import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const SignUpLink: React.FC = () => {
  const { t } = useTranslation(['auth']);

  return (
    <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {t('auth:signIn.noAccount')}{' '}
        <Link
          component={RouterLink}
          to="/auth/sign-up"
          sx={{ fontWeight: 500 }}
        >
          {t('auth:signIn.signUpLink')}
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpLink;
