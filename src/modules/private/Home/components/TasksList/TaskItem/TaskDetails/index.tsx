import React from 'react';

import { DetailsContainer, TaskTime, TaskTitle } from './TaskDetails.styled';

interface TaskDetailsProps {
  title: string;
  timeRange: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ title, timeRange }) => {
  return (
    <DetailsContainer>
      <TaskTitle>{title}</TaskTitle>
      <TaskTime>{timeRange}</TaskTime>
    </DetailsContainer>
  );
};

export default TaskDetails;
