import type { ITask } from '@api/tasks/dto';

interface ITaskStats {
  total: number;
  completed: number;
  ratio: string;
}

export const getTaskStats = (tasks: ITask[] = []): ITaskStats => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.isCompleted).length;

  const ratio = total > 0 ? `${completed}/${total}` : '0/0';

  return {
    total,
    completed,
    ratio,
  };
};
