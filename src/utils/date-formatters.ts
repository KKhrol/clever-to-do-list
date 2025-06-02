import moment from 'moment';

export function addDays(date: Date, days: number): Date {
  return moment(date).add(days, 'days').toDate();
}

export function getDateRange(start: string, days: number): string[] {
  const arr = [];
  const currentDate = moment(start);

  for (let i = 0; i < days; i++) {
    arr.push(formatDateToYYYYMMDD(currentDate.toDate()));
    currentDate.add(1, 'days');
  }

  return arr;
}

export function formatDisplayDate(dateStr: string): string {
  const date = moment(dateStr);
  return date.format('dddd D MMMM YYYY');
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const formatTimeToHHMM = (date: Date): string => {
  return moment(date).format('HH:mm');
};

export const formatTime12Hour = (timeString: string): string => {
  if (!timeString?.includes(':')) {
    return timeString;
  }

  return moment(`2000-01-01T${timeString}`).format('h:mm A');
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  const formattedStartTime = formatTime12Hour(startTime);
  const formattedEndTime = formatTime12Hour(endTime);

  return `${formattedStartTime} - ${formattedEndTime}`;
};
