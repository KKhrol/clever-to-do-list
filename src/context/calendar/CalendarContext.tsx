import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { ITask } from '@api/tasks/dto';

export type DateTasksState = Record<
  string,
  { tasks: ITask[]; loading: boolean; loaded: boolean }
>;

interface SelectedDateState {
  date: string;
  tasks: ITask[];
  loading: boolean;
  loaded: boolean;
}

interface ICalendarContextType {
  selectedDate: string;
  selectedTasks: ITask[];
  isSelectedDateLoading: boolean;
  isSelectedDateLoaded: boolean;
  pendingSelectedDate: string | null;
  requestSelectDate: (date: string) => void;
  setSelectedDateData: (data: {
    date: string;
    tasks: ITask[];
    loading: boolean;
    loaded: boolean;
  }) => void;
}

const CalendarContext = createContext<ICalendarContextType | undefined>(
  undefined,
);

export const CalendarProvider: React.FC<{
  initialDate: string;
  children: React.ReactNode;
}> = ({ initialDate, children }) => {
  const [selectedDateState, setSelectedDateState] = useState<SelectedDateState>(
    {
      date: initialDate,
      tasks: [],
      loading: true,
      loaded: false,
    },
  );

  const [pendingSelectedDate, setPendingSelectedDate] = useState<string | null>(
    initialDate ?? null,
  );

  const requestSelectDate = useCallback((date: string) => {
    setPendingSelectedDate(date);
  }, []);

  const setSelectedDateData = useCallback(
    (data: {
      date: string;
      tasks: ITask[];
      loading: boolean;
      loaded: boolean;
    }) => {
      setSelectedDateState({
        date: data.date,
        tasks: data.tasks,
        loading: data.loading,
        loaded: data.loaded,
      });
      if (data.loaded) {
        setPendingSelectedDate(null);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      selectedDate: selectedDateState.date,
      selectedTasks: selectedDateState.tasks,
      isSelectedDateLoading: selectedDateState.loading,
      isSelectedDateLoaded: selectedDateState.loaded,
      pendingSelectedDate,
      requestSelectDate,
      setSelectedDateData,
    }),
    [
      selectedDateState,
      pendingSelectedDate,
      requestSelectDate,
      setSelectedDateData,
    ],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
};
