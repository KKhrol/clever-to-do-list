import { formatDateToYYYYMMDD } from '@utils/date-formatters';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DateText,
  HeaderContainer,
  TaskCountText,
} from './TasksListHeader.styled';

interface TasksListHeaderProps {
  taskCount: number;
  formattedDate: string;
}

const TasksListHeader: React.FC<TasksListHeaderProps> = ({
  taskCount,
  formattedDate,
}) => {
  const { t } = useTranslation(['common']);
  const today = formatDateToYYYYMMDD(moment().toDate());
  const isToday = formattedDate === today;

  return (
    <HeaderContainer>
      <TaskCountText>
        {taskCount}{' '}
        {isToday
          ? t('homePage.tasksList.tasksToday')
          : t('homePage.tasksList.tasks')}
      </TaskCountText>
      <DateText>{formattedDate}</DateText>
    </HeaderContainer>
  );
};

export default TasksListHeader;
