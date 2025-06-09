import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DayHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
