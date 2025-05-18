import type { ITask } from '@api/tasks/dto';

export interface IDateItemProps {
  date: string;
  tasks?: Array<ITask>;
  isLoading: boolean;
  today: string;
  selected: boolean;
  cardWidth: number;
}
