import moment from 'moment';
import { useMemo, useRef } from 'react';
import Timeline, {
  DateHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline';
import 'react-calendar-timeline/dist/style.css';

import { useAuth } from '@context/auth/AuthContext';
import { useCalendarContext } from '@context/calendar/CalendarContext';
import { useCalendarRefresh } from '@context/calendar/CalendarRefreshContext';

import AddTaskModal from '@components/AddTaskModal';

import LoadingState from './LoadingState';
import {
  TimelineContainer,
  TimelineInnerContainer,
  TimelineScrollContainer,
} from './TasksTimeline.styled';
import TasksTimelineHeader from './TasksTimelineHeader';
import { timeSteps } from './constants';
import { useDragHandler } from './hooks/useDragHandler';
import { useTaskModal } from './hooks/useTaskModal';
import { useTimelineItems } from './hooks/useTimelineItems';

const TasksTimeline = () => {
  const {
    selectedDate,
    selectedTasks,
    isSelectedDateLoading,
    pendingSelectedDate,
  } = useCalendarContext();
  const { triggerRefresh } = useCalendarRefresh();
  const { user } = useAuth();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    modalOpen,
    modalMode,
    modalInitialValues,
    handleCanvasClick,
    handleItemClick,
    closeModal,
    handleModalSubmit,
  } = useTaskModal({
    user,
    triggerRefresh,
    selectedTasks,
  });

  const groups = useMemo(
    () => [
      { id: 1, title: 'Tasks' },
      { id: 2, title: 'Add New Task' },
    ],
    [],
  );

  const handleCanvasDrag = useDragHandler({ scrollContainerRef });
  const items = useTimelineItems(selectedTasks, selectedDate);

  if (pendingSelectedDate || isSelectedDateLoading) {
    return <LoadingState selectedDate={pendingSelectedDate || selectedDate} />;
  }

  return (
    <>
      <TasksTimelineHeader selectedDate={selectedDate} />
      <TimelineContainer>
        <TimelineScrollContainer ref={scrollContainerRef}>
          <TimelineInnerContainer onMouseDown={handleCanvasDrag}>
            <Timeline
              groups={groups}
              items={items}
              defaultTimeStart={moment(selectedDate).startOf('day').valueOf()}
              defaultTimeEnd={moment(selectedDate).endOf('day').valueOf()}
              lineHeight={80}
              itemHeightRatio={0.8}
              sidebarWidth={0}
              canMove={false}
              canResize={true}
              timeSteps={timeSteps}
              visibleTimeStart={moment(selectedDate).startOf('day').valueOf()}
              visibleTimeEnd={moment(selectedDate).endOf('day').valueOf()}
              minZoom={12 * 60 * 60 * 1000}
              maxZoom={24 * 60 * 60 * 1000}
              onCanvasClick={handleCanvasClick}
              onItemSelect={handleItemClick}
              onTimeChange={(
                visibleTimeStart,
                visibleTimeEnd,
                updateScrollCanvas,
              ) => {
                const dayStart = moment(selectedDate).startOf('day').valueOf();
                const dayEnd = moment(selectedDate).endOf('day').valueOf();

                if (visibleTimeStart < dayStart || visibleTimeEnd > dayEnd) {
                  updateScrollCanvas(dayStart, dayEnd);
                }
              }}
              stackItems
              verticalLineClassNamesForTime={(timeStart: number) => {
                const minutes = moment(timeStart).minutes();
                if (minutes === 0) {
                  return ['major-line'];
                } else if (minutes === 30) {
                  return ['medium-line'];
                }
                return [];
              }}
            >
              <TimelineMarkers>
                <TodayMarker />
              </TimelineMarkers>

              <TimelineHeaders>
                <DateHeader
                  unit="minute"
                  labelFormat={([start], _unit) => {
                    const timeStr = start.format('HH:mm');
                    return timeStr === '00:00' ? '' : timeStr;
                  }}
                />
              </TimelineHeaders>
            </Timeline>
          </TimelineInnerContainer>
        </TimelineScrollContainer>
      </TimelineContainer>

      <AddTaskModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        initialValues={modalInitialValues}
        mode={modalMode}
      />
    </>
  );
};

export default TasksTimeline;
