import { formatDisplayDate } from '@utils/date-formatters';
import { getPriorityDots } from '@utils/get-task-priority-dots';
import React from 'react';

import Loader from '@components/Loader';
import Spacer from '@components/Spacer';

import type { IDateItemProps } from '../../../components/CalendarDates/types';
import {
  DateItemContainer,
  DayName,
  DayNumber,
  Dot,
  DotsContainer,
  MonthYearLabel,
} from './CalendarPageDateItem.styled';

const CalendarPageDateItem: React.FC<IDateItemProps> = ({
  date,
  tasks = [],
  isLoading,
  today,
  selected,
  cardWidth,
}) => {
  const isToday = date === today;
  const dotColors = getPriorityDots(tasks || []);
  const [dayName, dayNum, month, year] = formatDisplayDate(date).split(' ');

  return (
    <DateItemContainer
      isToday={isToday}
      selected={selected}
      cardWidth={cardWidth}
    >
      <MonthYearLabel>
        {month} {year}
      </MonthYearLabel>

      <Spacer height={10} />

      <DayName>{dayName}</DayName>
      <DayNumber>{dayNum}</DayNumber>
      <DotsContainer>
        {isLoading ? (
          <Loader size="small" />
        ) : (
          dotColors.map((priority, idx) => (
            <Dot
              key={`${priority}-${idx}`}
              priority={priority}
            />
          ))
        )}
      </DotsContainer>
    </DateItemContainer>
  );
};

export default CalendarPageDateItem;
