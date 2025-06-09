import { formatDateToYYYYMMDD } from '@utils/date-formatters';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskPriority } from 'src/constants/taskPriority.enum';

import { useAuth } from '@context/auth/AuthContext';
import { useCalendarContext } from '@context/calendar/CalendarContext';
import { useCalendarRefresh } from '@context/calendar/CalendarRefreshContext';

import { updateUserTask } from '@api/tasks';
import type { CreateTask, ITask, UpdateTask } from '@api/tasks/dto';

import AddTaskModal from '@components/AddTaskModal';

import TaskItem from './TaskItem';
import { TasksListContainer, TasksListWrapper } from './TasksList.styled';
import TasksListHeader from './TasksListHeader';
import TasksListSkeleton from './TasksListSkeleton';

const TasksList: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { user } = useAuth();
  const {
    selectedDate,
    selectedTasks,
    isSelectedDateLoading,
    isSelectedDateLoaded,
    pendingSelectedDate,
  } = useCalendarContext();
  const today = formatDateToYYYYMMDD(moment().toDate());
  const isToday = selectedDate === today;

  const { triggerRefresh } = useCalendarRefresh();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [modalInitialValues, setModalInitialValues] = useState<
    CreateTask | undefined
  >(undefined);

  const sortedTasks = useMemo(() => {
    if (!selectedTasks) return [];

    return [...selectedTasks].sort((a, b) => {
      if (a.priority !== b.priority) {
        if (a.priority === TaskPriority.HIGH) return -1;
        if (b.priority === TaskPriority.HIGH) return 1;
        if (a.priority === TaskPriority.MEDIUM) return -1;
        if (b.priority === TaskPriority.MEDIUM) return 1;
      }

      return a.startTime.localeCompare(b.startTime);
    });
  }, [selectedTasks]);

  const handleTaskToggle = async (task: ITask) => {
    if (!user) return;

    try {
      const updatedTask: UpdateTask = {
        isCompleted: !task.isCompleted,
      };

      await updateUserTask(user.uid, task.id, updatedTask);
      triggerRefresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update task:', error);
    }
  };

  const handleTaskClick = (task: ITask) => {
    setSelectedTask(task);
    setModalInitialValues({
      title: task.title,
      description: task.description || '',
      startDate: task.startDate,
      startTime: task.startTime,
      endDate: task.endDate,
      endTime: task.endTime,
      priority: task.priority,
      color: task.color,
    });
    setUpdateModalOpen(true);
  };

  const handleModalSubmit = async (taskData: CreateTask) => {
    if (!user || !selectedTask) return;

    try {
      await updateUserTask(user.uid, selectedTask.id, taskData);
      setUpdateModalOpen(false);
      setSelectedTask(null);
      triggerRefresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update task:', error);
    }
  };

  const handleModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedTask(null);
  };

  if (pendingSelectedDate || isSelectedDateLoading) {
    return <TasksListSkeleton />;
  }

  return (
    <TasksListContainer>
      <TasksListHeader
        taskCount={sortedTasks.length}
        formattedDate={selectedDate}
      />

      <TasksListWrapper>
        {sortedTasks?.length && isSelectedDateLoaded ? (
          sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => handleTaskToggle(task)}
              onTaskClick={handleTaskClick}
            />
          ))
        ) : (
          <div>
            {isToday
              ? t('homePage.tasksList.noTasksToday')
              : t('homePage.tasksList.noTasksForSelectedDate')}
          </div>
        )}
      </TasksListWrapper>

      {/* Add Task Update Modal */}
      <AddTaskModal
        open={updateModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialValues={modalInitialValues}
        mode="update"
      />
    </TasksListContainer>
  );
};

export default TasksList;
