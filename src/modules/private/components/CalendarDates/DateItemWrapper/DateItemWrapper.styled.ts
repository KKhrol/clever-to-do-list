import { styled } from '@mui/material/styles';

export const ItemWrapper = styled('div', {
  shouldForwardProp: prop => prop !== 'itemSize',
})<{ itemSize: number }>(({ itemSize }) => ({
  width: itemSize,
  boxSizing: 'border-box',
  height: '100%',
  overflow: 'hidden',
}));
