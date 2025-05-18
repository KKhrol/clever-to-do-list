import { useCalendarContext } from '@context/calendar/CalendarContext';

const TasksTimeline = () => {
  const {
    selectedDate,
    selectedTasks,
    isSelectedDateLoading,
    isSelectedDateLoaded,
    pendingSelectedDate,
  } = useCalendarContext();

  if (pendingSelectedDate || isSelectedDateLoading) {
    return (
      <div>
        <h3>Tasks for {pendingSelectedDate}</h3>
        <div>Loading tasks...</div>
      </div>
    );
  }

  if (isSelectedDateLoaded && selectedTasks.length === 0) {
    return <div>No tasks for {selectedDate}</div>;
  }

  return (
    <div>
      <h3>Tasks for {selectedDate}</h3>
      <ul>
        {selectedTasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TasksTimeline;
