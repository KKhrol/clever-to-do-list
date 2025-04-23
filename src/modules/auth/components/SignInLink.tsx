import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const SignInLink: React.FC = () => {
  const { t } = useTranslation(['auth']);

  return (
    <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {t('auth:signUp.hasAccount')}{' '}
        <Link
          component={RouterLink}
          to="/auth/login"
          sx={{ fontWeight: 500 }}
        >
          {t('auth:signUp.signInLink')}
        </Link>
      </Typography>
    </Box>
  );
};

export default SignInLink;
