import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PriorityWrapper = styled(Box)<{ priorityColor: string }>(
  ({ priorityColor }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginLeft: 'auto',
    color: priorityColor,
  }),
);
