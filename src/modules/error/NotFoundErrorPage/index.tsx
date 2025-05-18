import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  ErrorButton,
  ErrorContainer,
  ErrorMessage,
  ErrorTitle,
} from './NotFoundErrorPage.styled';

const NotFoundErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <ErrorContainer>
      <ErrorTitle>{t('errors.notFound.title')}</ErrorTitle>
      <ErrorMessage>{t('errors.notFound.message')}</ErrorMessage>
      <ErrorButton
        onClick={() => {
          navigate('/');
        }}
        type="button"
      >
        {t('errors.notFound.button')}
      </ErrorButton>
    </ErrorContainer>
  );
};

export default NotFoundErrorPage;
