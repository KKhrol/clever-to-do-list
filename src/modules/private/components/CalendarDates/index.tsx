import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';

import { useHandleCalendarDates } from '@hooks/useHandleCalendarDates';

import { StyledList } from './CalendarDates.styled';
import DateItemWrapper from './DateItemWrapper';
import { ScrollArrowButton } from './ScrollArrowButon';
import type { IDateItemProps } from './types';

interface CalendarDatesProps {
  initialDate?: string;
  DateItemComponent: React.ComponentType<IDateItemProps>;
  height?: number;
  width?: number | string;
  itemSize?: number;
  gap?: number;
}

const SCROLL_AMOUNT = 800;

export const CalendarDates: React.FC<CalendarDatesProps> = ({
  initialDate,
  DateItemComponent,
  height = 140,
  width = 800,
  itemSize = 130,
  gap = 16,
}) => {
  const cardWidth = itemSize - gap;

  const {
    listRef,
    dates,
    dateTasks,
    today,
    scrollOffset,
    handleItemsRendered,
    handleScroll,
  } = useHandleCalendarDates(initialDate);

  const handleScrollLeft = () => {
    listRef.current?.scrollTo(Math.max(0, scrollOffset - SCROLL_AMOUNT));
  };

  const handleScrollRight = () => {
    listRef.current?.scrollTo(scrollOffset + SCROLL_AMOUNT);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ScrollArrowButton
        onClick={handleScrollLeft}
        icon={<ArrowBackIosIcon />}
        position="left"
      />

      <StyledList
        ref={listRef}
        height={height}
        width={width}
        itemCount={dates.length}
        itemSize={itemSize}
        layout="horizontal"
        onItemsRendered={handleItemsRendered}
        onScroll={handleScroll}
      >
        {({ index, style }) => (
          <DateItemWrapper
            index={index}
            style={style}
            itemSize={itemSize}
            cardWidth={cardWidth}
            DateItemComponent={DateItemComponent}
            dates={dates}
            dateTasks={dateTasks}
            today={today}
          />
        )}
      </StyledList>

      <ScrollArrowButton
        onClick={handleScrollRight}
        icon={<ArrowForwardIosIcon />}
        position="right"
      />
    </div>
  );
};
