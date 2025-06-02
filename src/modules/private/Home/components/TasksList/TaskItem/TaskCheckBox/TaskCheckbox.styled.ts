import type { CheckboxProps } from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

export const CircleCheckbox = styled(Checkbox)<
  CheckboxProps & { customColor?: string }
>(({ theme, customColor }) => ({
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  marginRight: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    borderRadius: '50%',
    padding: '2px',
    width: '22px',
    height: '22px',
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      backgroundColor: customColor || theme.palette.primary.main,
      color: '#fff',
    },
  },
  '&:not(.Mui-checked)': {
    '& .MuiSvgIcon-root': {
      border: `2px solid ${customColor || theme.palette.text.secondary}`,
      backgroundColor: 'transparent',
      color: 'transparent',
    },
  },
}));

export const CustomIcon = styled('span')<{ customColor?: string }>(
  ({ customColor }) => ({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: `2px solid ${customColor || '#ccc'}`,
    backgroundColor: 'transparent',
  }),
);

export const CustomCheckedIcon = styled('span')<{ customColor?: string }>(
  ({ customColor }) => ({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: customColor || '#ff9800',
    border: `2px solid ${customColor || '#ff9800'}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  }),
);
