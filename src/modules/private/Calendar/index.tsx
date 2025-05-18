import { formatDateToYYYYMMDD } from '@utils/date-formatters';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarProvider } from '@context/calendar/CalendarContext';

import Spacer from '@components/Spacer';
import StyledTitle from '@components/StyledTitle';

import { CalendarDates } from '../components/CalendarDates';
import type { IDateItemProps } from '../components/CalendarDates/types';
import { CalendarContainer } from './Calendar.styled';
import CalendarPageDateItem from './components/CalendarPageDateItem';
import TasksTimeline from './components/TasksTimeline';

const VisibleDaysCount = 9;
const PaddingHorizontal = 30;
const gap = 30;
//TODO: find a good place to move them

export const Calendar = () => {
  const { t } = useTranslation(['common']);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemSize = Math.floor(windowWidth / VisibleDaysCount);
  const today = formatDateToYYYYMMDD(new Date());

  return (
    <CalendarProvider initialDate={today}>
      <CalendarContainer paddingHorizontal={PaddingHorizontal}>
        <StyledTitle>{t('calendarPage.title')}</StyledTitle>
        <Spacer height={20} />
        <CalendarDates
          initialDate={today}
          DateItemComponent={
            CalendarPageDateItem as React.ComponentType<IDateItemProps>
          }
          height={160}
          itemSize={itemSize}
          width={windowWidth - PaddingHorizontal * 2}
          gap={gap}
        />
        <TasksTimeline />
      </CalendarContainer>
    </CalendarProvider>
  );
};

export default Calendar;
