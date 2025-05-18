import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAddTaskButton = styled(Button)(({ theme }) => ({
  borderRadius: '24px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  textTransform: 'none',
  padding: theme.spacing(0.75, 2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  minWidth: '140px',
}));

export const ButtonContent = styled('span')({
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const IconWrapper = styled('span')(({ theme }) => ({
  display: 'flex',
  marginRight: theme.spacing(1),
}));
