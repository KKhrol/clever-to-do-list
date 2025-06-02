import React, { createContext, useCallback, useContext, useState } from 'react';

interface CalendarRefreshContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const CalendarRefreshContext = createContext<
  CalendarRefreshContextType | undefined
>(undefined);

export const CalendarRefreshProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <CalendarRefreshContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </CalendarRefreshContext.Provider>
  );
};

export const useCalendarRefresh = () => {
  const context = useContext(CalendarRefreshContext);
  if (!context) {
    throw new Error(
      'useCalendarRefresh must be used within a CalendarRefreshProvider',
    );
  }
  return context;
};
