import { formatTimeRange } from '@utils/date-formatters';
import React from 'react';

import type { ITask } from '@api/tasks/dto';

import PriorityIndicator from './PriorityIndicator';
import TaskCheckbox from './TaskCheckBox';
import TaskDetails from './TaskDetails';
import { TaskItemContainer } from './TaskItem.styled';

interface TaskItemProps {
  task: ITask;
  onToggle: () => void;
  onTaskClick?: (task: ITask) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onTaskClick }) => {
  const timeRange = formatTimeRange(task.startTime, task.endTime);

  const handleTaskClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof Element &&
      (e.target.closest('input[type="checkbox"]') ||
        e.target.closest('.MuiCheckbox-root'))
    ) {
      return;
    }

    if (onTaskClick) {
      onTaskClick(task);
    }
  };

  return (
    <TaskItemContainer
      priority={task.priority}
      color={task.color}
      onClick={handleTaskClick}
      style={{ cursor: 'pointer' }}
    >
      <TaskCheckbox
        checked={!!task.isCompleted}
        onChange={onToggle}
        color={task.color}
      />
      <TaskDetails
        title={task.title}
        timeRange={timeRange}
      />
      <PriorityIndicator priority={task.priority} />
    </TaskItemContainer>
  );
};

export default TaskItem;
