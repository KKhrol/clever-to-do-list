import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { FixedSizeList as List } from 'react-window';

export const StyledList = styled(List)(({ theme }: { theme: Theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  overflowY: 'hidden',
}));
