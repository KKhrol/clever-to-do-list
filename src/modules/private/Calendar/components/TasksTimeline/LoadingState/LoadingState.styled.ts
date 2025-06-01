import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoadingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
