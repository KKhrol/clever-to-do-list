import { useTranslation } from 'react-i18next';

import { useCalendarContext } from '@context/calendar/CalendarContext';

import Loader from '@components/Loader';

import {
  HeaderContainer,
  LoadingText,
  SkeletonContainer,
} from './TasksListSkeleton.styled';

const TasksListSkeleton = () => {
  const { t } = useTranslation(['common']);
  const { selectedDate } = useCalendarContext();

  return (
    <SkeletonContainer>
      <HeaderContainer>
        <LoadingText>
          {t('homePage.tasksList.loadingTasks')}
          {selectedDate && ` ${t('homePage.tasksList.for')} ${selectedDate}`}
        </LoadingText>
      </HeaderContainer>
      <Loader />
    </SkeletonContainer>
  );
};

export default TasksListSkeleton;
