import { TaskPriority } from 'src/constants/taskPriority.enum';

export function getPriorityDots(
  tasks: { priority: TaskPriority }[],
): Array<TaskPriority> {
  const hasLow = tasks.some(t => t.priority === TaskPriority.LOW);
  const hasMedium = tasks.some(t => t.priority === TaskPriority.MEDIUM);
  const hasHigh = tasks.some(t => t.priority === TaskPriority.HIGH);

  const priorityDots = [];
  if (hasHigh) priorityDots.push(TaskPriority.HIGH);
  if (hasMedium) priorityDots.push(TaskPriority.MEDIUM);
  if (hasLow) priorityDots.push(TaskPriority.LOW);

  return priorityDots;
}
