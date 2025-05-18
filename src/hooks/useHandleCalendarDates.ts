import {
  addDays,
  formatDateToYYYYMMDD,
  getDateRange,
} from '@utils/date-formatters';
import { splitTasksByDate } from '@utils/tasks-handlers';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  FixedSizeList,
  ListOnItemsRenderedProps,
  ListOnScrollProps,
} from 'react-window';
import {
  CALENDAR_FETCH_THRESHOLD,
  CALENDAR_PAGE_SIZE,
} from 'src/constants/taskFetchPatams';

import { useAuth } from '@context/auth/AuthContext';
import { useCalendarContext } from '@context/calendar/CalendarContext';

import { getUserTasksByPeriod } from '@api/tasks';
import type { ITask } from '@api/tasks/dto';

type DateTasksState = Record<
  string,
  { tasks: ITask[]; loading: boolean; loaded: boolean }
>;

export const useHandleCalendarDates = (initialDate?: string) => {
  const user = useAuth();
  const userId = user?.user?.uid ?? '';
  const listRef = useRef<FixedSizeList>(null);
  const { pendingSelectedDate, setSelectedDateData } = useCalendarContext();
  const today = useMemo(
    () => initialDate || formatDateToYYYYMMDD(new Date()),
    [initialDate],
  );

  const [scrollOffset, setScrollOffset] = useState(0);

  const [dates, setDates] = useState<string[]>(() => [
    ...getDateRange(
      formatDateToYYYYMMDD(addDays(new Date(today), -CALENDAR_PAGE_SIZE)),
      CALENDAR_PAGE_SIZE,
    ),
    ...getDateRange(today, CALENDAR_PAGE_SIZE),
  ]);

  const [dateTasks, setDateTasks] = useState<DateTasksState>({});

  const fetchTasksForDates = useCallback(
    async (datesToFetch: string[]) => {
      const datesToLoad = datesToFetch.filter(dateKey => {
        const dt = dateTasks[dateKey];
        return !dt?.loaded && !dt?.loading;
      });

      if (datesToLoad.length === 0) return;

      setDateTasks(prev => {
        const updated = { ...prev };
        datesToLoad.forEach(dateKey => {
          updated[dateKey] = { tasks: [], loading: true, loaded: false };
        });
        return updated;
      });

      try {
        const startDate = datesToLoad[0];
        const endDate = datesToLoad[datesToLoad.length - 1];

        const tasks = await getUserTasksByPeriod(userId, startDate, endDate);

        const tasksByDate = splitTasksByDate(tasks);

        setDateTasks(prev => {
          const updated = { ...prev };
          datesToLoad.forEach(dateKey => {
            updated[dateKey] = {
              tasks: tasksByDate[dateKey] || [],
              loading: false,
              loaded: true,
            };
          });
          return updated;
        });
      } catch {
        setDateTasks(prev => {
          const updated = { ...prev };
          datesToLoad.forEach(dateKey => {
            updated[dateKey] = { tasks: [], loading: false, loaded: true };
          });
          return updated;
        });
      }
    },
    [userId, dateTasks],
  );

  const isDateInLoadedRange = useCallback(
    (date: string) => dates.includes(date),
    [dates],
  );

  const handleScroll = ({ scrollOffset }: ListOnScrollProps) =>
    setScrollOffset(scrollOffset);

  const handleItemsRendered = useCallback(
    ({ visibleStartIndex, visibleStopIndex }: ListOnItemsRenderedProps) => {
      if (dates.length - visibleStopIndex <= CALENDAR_FETCH_THRESHOLD) {
        const lastDate = dates[dates.length - 1];
        const moreDates = getDateRange(
          formatDateToYYYYMMDD(addDays(new Date(lastDate), 1)),
          CALENDAR_PAGE_SIZE,
        );
        setDates(prev => {
          const newDates = [...prev, ...moreDates];
          return Array.from(new Set(newDates));
        });
      }

      if (visibleStartIndex <= CALENDAR_FETCH_THRESHOLD) {
        const firstDate = dates[0];
        const morePastDates = getDateRange(
          formatDateToYYYYMMDD(
            addDays(new Date(firstDate), -CALENDAR_PAGE_SIZE),
          ),
          CALENDAR_PAGE_SIZE,
        );
        setDates(prev => {
          const newDates = [...morePastDates, ...prev];
          return Array.from(new Set(newDates));
        });

        if (listRef.current) {
          listRef.current.scrollToItem(
            morePastDates.length + visibleStartIndex,
            'start',
          );
        }
      }

      const start = Math.max(0, visibleStartIndex - CALENDAR_FETCH_THRESHOLD);
      const end = Math.min(dates.length, visibleStopIndex + 1);
      fetchTasksForDates(dates.slice(start, end));
    },
    [dates, fetchTasksForDates],
  );

  useEffect(() => {
    const todayIndex = dates.findIndex(date => date === today);
    if (listRef.current && todayIndex !== -1) {
      listRef.current.scrollToItem(todayIndex, 'center');
    }
  }, [dates, today]);

  useEffect(() => {
    if (!pendingSelectedDate) return;

    if (!isDateInLoadedRange(pendingSelectedDate)) return;

    const dateKey = pendingSelectedDate;
    const { tasks, loading, loaded } = dateTasks[dateKey] || {};

    if (loaded || loading) {
      setSelectedDateData({
        date: dateKey,
        tasks,
        loading,
        loaded,
      });
    }
  }, [
    pendingSelectedDate,
    dateTasks,
    isDateInLoadedRange,
    setSelectedDateData,
  ]);

  return {
    listRef,
    dates,
    dateTasks,
    today,
    scrollOffset,
    setScrollOffset,
    handleScroll,
    handleItemsRendered,
  };
};
