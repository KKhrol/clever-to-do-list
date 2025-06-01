import { styled } from '@mui/material/styles';

export const DateItemContainer = styled('div')<{
  isToday: boolean;
  selected: boolean;
  cardWidth: number;
}>(({ theme, isToday, selected, cardWidth }) => ({
  width: cardWidth,
  height: '100%',
  borderRadius: 16,
  border: `3px solid ${
    selected
      ? theme.palette.primary.main
      : isToday
        ? theme.palette.text.primary
        : theme.palette.divider
  }`,
  background: isToday
    ? theme.palette.text.primary
    : selected
      ? theme.palette.background.paper
      : theme.palette.background.default,
  color: selected
    ? theme.palette.primary.main
    : isToday
      ? theme.palette.background.paper
      : theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: isToday ? 700 : 500,
  boxShadow: selected ? `0 2px 8px ${theme.palette.primary.main}30` : undefined,
  transition: 'all 0.2s',
  position: 'relative',
  boxSizing: 'border-box',
}));
// TODO: Question: Will it make sense to leave only one DateItemContainer? I have almost the same in Calendar?

export const DayName = styled('div')({
  fontSize: 16,
  marginBottom: 2,
});

export const DayNumber = styled('div')({
  fontSize: 24,
  fontWeight: 700,
});

export const TasksStatsWrapper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 40,
}));

export const TasksStatsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const TasksLabel = styled('div')(({ theme }) => ({
  fontSize: 9,
  fontWeight: 400,
  opacity: 0.8,
  marginBottom: theme.spacing(0.3),
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}));

export const TasksCountText = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  padding: theme.spacing(0.2, 0.8),
  borderRadius: 10,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
}));
