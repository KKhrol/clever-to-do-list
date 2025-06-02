import { formatDateToYYYYMMDD } from '@utils/date-formatters';
import moment from 'moment';
import React from 'react';

import type { DateTasksState } from '@context/calendar/CalendarContext';
import { useCalendarContext } from '@context/calendar/CalendarContext';

import type { IDateItemProps } from '../types';
import { ItemWrapper } from './DateItemWrapper.styled';

interface Props {
  index: number;
  style: React.CSSProperties;
  itemSize: number;
  cardWidth: number;
  DateItemComponent: React.ComponentType<IDateItemProps>;
  dates: string[];
  dateTasks: DateTasksState;
  today: string;
}

const DateItemWrapper: React.FC<Props> = ({
  index,
  style,
  itemSize,
  cardWidth,
  DateItemComponent,
  dates,
  dateTasks,
  today,
}) => {
  const date = dates[index];
  const dateKey = formatDateToYYYYMMDD(moment(date).toDate());
  const { tasks, loading } = dateTasks[dateKey] || {};
  const { selectedDate, requestSelectDate, pendingSelectedDate } =
    useCalendarContext();

  const handleClick = () => {
    requestSelectDate(dateKey);
  };

  return (
    <ItemWrapper
      style={style}
      itemSize={itemSize}
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      <DateItemComponent
        date={date}
        tasks={tasks}
        isLoading={loading}
        today={today}
        selected={pendingSelectedDate === dateKey || selectedDate === dateKey}
        cardWidth={cardWidth}
      />
    </ItemWrapper>
  );
};

export default DateItemWrapper;
