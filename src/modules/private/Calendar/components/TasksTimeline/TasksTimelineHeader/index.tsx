import { formatDisplayDate } from '@utils/date-formatters';
import React, { useMemo } from 'react';

import StyledTitle from '@components/StyledTitle';

import { DayHeader } from './TaskTimelineHeader.styled';

interface TasksTimelineHeaderProps {
  selectedDate: string;
}

const TasksTimelineHeader: React.FC<TasksTimelineHeaderProps> = ({
  selectedDate,
}) => {
  const formattedDate = useMemo(() => {
    if (!selectedDate) return '';
    return formatDisplayDate(selectedDate);
  }, [selectedDate]);

  return (
    <DayHeader>
      <StyledTitle>{formattedDate}</StyledTitle>
    </DayHeader>
  );
};

export default TasksTimelineHeader;
