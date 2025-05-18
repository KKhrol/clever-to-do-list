import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    margin: '16px',
    overflow: 'hidden',
  },
});

export const ModalHeader = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ModalContent = styled(DialogContent)(() => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '80vh',
  overflow: 'auto',
}));

export const ModalCloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(0.5),
  borderRadius: '50%',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
