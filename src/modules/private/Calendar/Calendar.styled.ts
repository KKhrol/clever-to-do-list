import { styled } from '@mui/material/styles';

export const CalendarContainer = styled('div')<{
  paddingHorizontal?: number;
}>(({ paddingHorizontal = 30 }) => ({
  width: '100%',
  height: '100%',
  padding: `40px ${paddingHorizontal}px 0 ${paddingHorizontal}px`,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  margin: 0,
}));
