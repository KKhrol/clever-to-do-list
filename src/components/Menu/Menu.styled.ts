import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginRight: theme.spacing(1),
}));
