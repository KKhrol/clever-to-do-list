import { formatDisplayDate } from '@utils/date-formatters';
import { getTaskStats } from '@utils/get-stats-of-tasks';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Loader from '@components/Loader';

import type { IDateItemProps } from '../../../components/CalendarDates/types';
import {
  DateItemContainer,
  DayName,
  DayNumber,
  TasksCountText,
  TasksLabel,
  TasksStatsContainer,
  TasksStatsWrapper,
} from './HomePageDateItem.styled';

const HomePageDateItem: React.FC<IDateItemProps> = ({
  date,
  tasks = [],
  isLoading,
  today,
  selected,
  cardWidth,
}) => {
  const { t } = useTranslation(['common']);
  const isToday = date === today;
  const { ratio } = getTaskStats(tasks);
  const [dayName, dayNum] = formatDisplayDate(date).split(' ');

  return (
    <DateItemContainer
      isToday={isToday}
      selected={selected}
      cardWidth={cardWidth}
    >
      <DayName>{dayName}</DayName>
      <DayNumber>{dayNum}</DayNumber>
      <TasksStatsWrapper>
        {isLoading ? (
          <Loader size="small" />
        ) : (
          <TasksStatsContainer>
            <TasksLabel>{t('homePage.completedTasks')}</TasksLabel>
            <TasksCountText>{ratio}</TasksCountText>
          </TasksStatsContainer>
        )}
      </TasksStatsWrapper>
    </DateItemContainer>
  );
};

export default HomePageDateItem;
