import moment from 'moment';
import { useMemo } from 'react';
import { TaskPriority } from 'src/constants/taskPriority.enum';
import { PriorityColors } from 'src/theme/constants';

import type { ITask } from '@api/tasks/dto';

export const useTimelineItems = (
  selectedTasks: ITask[],
  selectedDate: string,
) => {
  return useMemo(() => {
    return selectedTasks.map(task => {
      const start = moment(`${task.startDate}T${task.startTime}`);
      const end = moment(`${task.endDate}T${task.endTime}`);

      const currentDayStart = moment(selectedDate).startOf('day');
      const currentDayEnd = moment(selectedDate).endOf('day');

      const displayStart = start.isBefore(currentDayStart)
        ? moment(currentDayStart)
        : moment(start);
      const displayEnd = end.isAfter(currentDayEnd)
        ? moment(currentDayEnd)
        : moment(end);

      const timeDisplay = `${displayStart.format('HH:mm')} - ${displayEnd.format('HH:mm')}`;
      const displayTitle = `${task.title} (${timeDisplay})`;
      let borderStyle = '';
      let borderColor = '';

      switch (task.priority) {
        case TaskPriority.HIGH:
          borderColor = PriorityColors[TaskPriority.HIGH];
          borderStyle = `3px solid ${task.isCompleted ? 'rgba(244, 67, 54, 0.7)' : borderColor}`;
          break;
        case TaskPriority.MEDIUM:
          borderColor = PriorityColors[TaskPriority.MEDIUM];
          borderStyle = `2px solid ${task.isCompleted ? 'rgba(255, 152, 0, 0.6)' : borderColor}`;
          break;
        case TaskPriority.LOW:
          borderColor = PriorityColors[TaskPriority.LOW];
          borderStyle = `1px solid ${task.isCompleted ? 'rgba(255, 214, 0, 0.5)' : borderColor}`;
          break;
      }

      return {
        id: task.id,
        group: 1,
        title: displayTitle,
        start_time: displayStart.valueOf(),
        end_time: displayEnd.valueOf(),
        canMove: false,
        canResize: false,
        canChangeGroup: false,
        itemProps: {
          style: {
            background: task.isCompleted ? '#A9A9A9' : task.color || '#ff9800',
            opacity: task.isCompleted ? 0.8 : 1,
            color: '#fff',
            borderRadius: '8px',
            boxShadow: task.isCompleted
              ? '0 1px 2px rgba(0,0,0,0.1)'
              : '0 2px 4px rgba(0,0,0,0.2)',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '6px 12px',
            height: '100%',
            overflow: 'hidden',
            border: borderStyle,
            whiteSpace: 'pre-wrap',
            fontSize: '0.85rem',
          },
          'data-testid': `task-item-${task.id}`,
        },
      };
    });
  }, [selectedTasks, selectedDate]);
};
