import { styled } from '@mui/material/styles';

export const ScrollButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  zIndex: 2,
  opacity: 0.7,
  background: theme.palette.background.paper,
  border: 'none',
  width: 32,
  height: 64,
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,

  '&:hover': {
    opacity: 1,
  },
}));
