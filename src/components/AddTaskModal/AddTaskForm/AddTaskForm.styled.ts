import { Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontSizes } from 'src/theme/constants';

export const ModalForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
}));

export const ScrollableContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '4px',
  },
}));

export const ModalFooter = styled(Paper)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 3),
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  position: 'sticky',
  bottom: 0,
  zIndex: 10,
  width: '100%',
  height: '64px', // Fixed height for footer
  boxSizing: 'border-box',
  boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
}));

export const ModalButton = styled(Button, {
  shouldForwardProp: prop => prop !== '$variant',
})<{
  $variant?: 'primary' | 'secondary';
}>(({ theme, $variant }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 8,
  fontWeight: 600,
  fontSize: FontSizes.md,
  textTransform: 'none',
  minWidth: '100px',
  backgroundColor:
    $variant === 'primary'
      ? theme.palette.primary.main
      : theme.palette.grey[200],
  color:
    $variant === 'primary'
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  '&:hover': {
    backgroundColor:
      $variant === 'primary'
        ? theme.palette.primary.dark
        : theme.palette.grey[300],
  },
  '&.Mui-disabled': {
    backgroundColor:
      $variant === 'primary'
        ? theme.palette.primary.light
        : theme.palette.grey[100],
    opacity: 0.7,
  },
}));
