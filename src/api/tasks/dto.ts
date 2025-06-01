import type { Timestamp } from 'firebase/firestore';
import type { TaskPriority } from 'src/constants/taskPriority.enum';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  startDate: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:mm
  endDate: string; // Format: YYYY-MM-DD
  endTime: string; // Format: HH:mm
  createdAt: Timestamp;
  updatedAt: Timestamp;
  priority: TaskPriority;
  color: string; // HEX
  isCompleted?: boolean;
}

export type CreateTask = Omit<
  ITask,
  'id' | 'createdAt' | 'updatedAt' | 'isCompleted'
>;

export type UpdateTask = Partial<Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>>;

export type MutationResponse = Pick<ITask, 'id'>;
