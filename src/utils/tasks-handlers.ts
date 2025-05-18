import type { ITask } from '@api/tasks/dto';

import { formatDateToYYYYMMDD } from './date-formatters';

export const splitTasksByDate = (tasks: ITask[]): Record<string, ITask[]> => {
  try {
    return tasks.reduce<Record<string, ITask[]>>((acc, task) => {
      let startDate, endDate;

      try {
        startDate = formatDateToYYYYMMDD(new Date(task.startDate));
        endDate = formatDateToYYYYMMDD(new Date(task.endDate));
      } catch {
        return acc;
      }

      const dates = getDatesBetween(startDate, endDate);

      dates.forEach(date => {
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(task);
      });

      return acc;
    }, {});
  } catch {
    return {};
  }
};

const getDatesBetween = (
  startDateStr: string,
  endDateStr: string,
): string[] => {
  try {
    const dates: string[] = [];

    if (startDateStr === 'Invalid date' || endDateStr === 'Invalid date') {
      return dates;
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return dates;
    }

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(formatDateToYYYYMMDD(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  } catch {
    return [];
  }
};
