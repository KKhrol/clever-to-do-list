import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TasksListContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: '16px',
  width: '100%',
  boxSizing: 'border-box',
}));

export const TasksListWrapper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
