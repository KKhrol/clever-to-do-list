import { formatDateToYYYYMMDD, formatTimeToHHMM } from '@utils/date-formatters';
import type { User } from 'firebase/auth';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { TaskPriority } from 'src/constants/taskPriority.enum';

import { addUserTask, updateUserTask } from '@api/tasks';
import type { CreateTask, ITask } from '@api/tasks/dto';

import { ColorTaskOptions } from '@components/AddTaskModal/AddTaskForm/types';

interface UseAddTaskModalProps {
  user: User | null;
  triggerRefresh: () => void;
  selectedTasks: ITask[];
}

export const useTaskModal = ({
  user,
  triggerRefresh,
  selectedTasks,
}: UseAddTaskModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'update'>('add');
  const [modalInitialValues, setModalInitialValues] = useState<
    CreateTask | undefined
  >(undefined);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleCanvasClick = useCallback((_groupId: number, time: number) => {
    const clickedTime = moment(time);
    const endTime = moment(time).add(1, 'hour');

    const startDate = formatDateToYYYYMMDD(clickedTime.toDate());
    const startTime = formatTimeToHHMM(clickedTime.toDate());
    const endDate = formatDateToYYYYMMDD(endTime.toDate());
    const endTimeStr = formatTimeToHHMM(endTime.toDate());

    setSelectedTaskId(null);

    setModalMode('add');
    setModalInitialValues({
      title: '',
      description: '',
      startDate,
      startTime,
      endDate,
      endTime: endTimeStr,
      priority: TaskPriority.MEDIUM,
      color: ColorTaskOptions[0],
    });
    setModalOpen(true);
  }, []);

  const handleItemClick = useCallback(
    (itemId: string) => {
      const task = selectedTasks.find(t => t.id === itemId);
      if (task) {
        setSelectedTaskId(task.id);
        setModalMode('update');
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
        setModalOpen(true);
      }
    },
    [selectedTasks],
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedTaskId(null);
  }, []);

  const handleModalSubmit = useCallback(
    async (taskData: CreateTask) => {
      if (!user) return;
      try {
        if (modalMode === 'add') {
          await addUserTask(user.uid, {
            ...taskData,
          });
        } else if (modalMode === 'update' && selectedTaskId) {
          await updateUserTask(user.uid, selectedTaskId, taskData);
        }

        closeModal();
        triggerRefresh();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to save task:', error);
      }
    },
    [user, modalMode, selectedTaskId, closeModal, triggerRefresh],
  );

  return {
    modalOpen,
    modalMode,
    modalInitialValues,
    selectedTaskId,
    handleCanvasClick,
    handleItemClick,
    closeModal,
    handleModalSubmit,
  };
};
