import React from 'react';
import { useTranslation } from 'react-i18next';

import Loader from '@components/Loader';
import Spacer from '@components/Spacer';
import StyledTitle from '@components/StyledTitle';

import { LoadingContainer } from './LoadingState.styled';

interface LoadingStateProps {
  pendingSelectedDate?: string;
  selectedDate: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  pendingSelectedDate,
  selectedDate,
}) => {
  const { t } = useTranslation(['common']);

  return (
    <LoadingContainer>
      <StyledTitle>
        {t('calendarPage.tasksFor', {
          date: pendingSelectedDate || selectedDate,
        })}
      </StyledTitle>
      <Spacer height={20} />
      <Loader size="medium" />
    </LoadingContainer>
  );
};

export default LoadingState;
