export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDateRange(start: string, days: number): string[] {
  const arr = [];
  let date = new Date(start);
  for (let i = 0; i < days; i++) {
    arr.push(formatDateToYYYYMMDD(date));
    date = addDays(date, 1);
  }
  return arr;
}

export function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString(undefined, { weekday: 'long' });
  const dayNum = date.getDate();
  const month = date.toLocaleDateString(undefined, { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${dayNum} ${month} ${year}`;
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTimeToHHMM = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
