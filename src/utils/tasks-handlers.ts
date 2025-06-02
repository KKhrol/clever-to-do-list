import moment from 'moment';

import type { ITask } from '@api/tasks/dto';

import { formatDateToYYYYMMDD } from './date-formatters';

export const splitTasksByDate = (tasks: ITask[]): Record<string, ITask[]> => {
  try {
    return tasks.reduce<Record<string, ITask[]>>((acc, task) => {
      let startDate, endDate;

      try {
        startDate = formatDateToYYYYMMDD(moment(task.startDate).toDate());
        endDate = formatDateToYYYYMMDD(moment(task.endDate).toDate());
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

    const startDate = moment(startDateStr);
    const endDate = moment(endDateStr);

    if (!startDate.isValid() || !endDate.isValid()) {
      return dates;
    }

    const currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      dates.push(formatDateToYYYYMMDD(currentDate.toDate()));
      currentDate.add(1, 'days');
    }

    return dates;
  } catch {
    return [];
  }
};
