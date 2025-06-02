import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TaskPriority } from 'src/constants/taskPriority.enum';
import { PriorityColors } from 'src/theme/constants';

export const TaskItemContainer = styled(Paper)<{
  priority: TaskPriority;
  color: string;
}>(({ theme, priority }) => {
  const getPriorityAlpha = () => {
    switch (priority) {
      case TaskPriority.HIGH:
        return '0.08';
      case TaskPriority.MEDIUM:
        return '0.05';
      case TaskPriority.LOW:
      default:
        return '0.02';
    }
  };

  return {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 4,
    border: `1px solid ${PriorityColors[priority]}`,
    borderLeft: `4px solid ${PriorityColors[priority]}`,
    boxShadow: 'none',
    backgroundColor: `${PriorityColors[priority]}${getPriorityAlpha()}`,
    '&:hover': {
      backgroundColor: `${PriorityColors[priority]}${String(Number(getPriorityAlpha()) + 0.03)}`,
    },
  };
});
