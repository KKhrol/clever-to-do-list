import { styled } from '@mui/material/styles';
import { PriorityColors } from 'src/theme/constants';

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
  padding: theme.spacing(1),
}));

export const MonthYearLabel = styled('div')(({ theme }) => ({
  fontSize: 11,
  opacity: 0.7,
  position: 'absolute',
  top: theme.spacing(1),
  fontWeight: 400,
}));

export const DayName = styled('div')({
  fontSize: 16,
  marginBottom: 4,
  fontWeight: 'inherit',
});

export const DayNumber = styled('div')({
  fontSize: 22,
  fontWeight: 700,
  lineHeight: 1.2,
  marginBottom: 4,
});

export const DotsContainer = styled('div')({
  marginTop: 6,
  height: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Dot = styled('span')<{ priority: keyof typeof PriorityColors }>(
  ({ priority }) => ({
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    margin: '0 2px',
    background: PriorityColors[priority],
  }),
);
