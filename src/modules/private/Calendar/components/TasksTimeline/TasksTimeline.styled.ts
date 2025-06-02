import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TimelineScrollContainer = styled('div')(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  '&::-webkit-scrollbar': { height: '8px' },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '4px',
  },
}));

export const TimelineInnerContainer = styled('div')(() => ({
  width: '200%',
  cursor: 'grab',
}));

export const TimelineContainer = styled(Box)(({ theme }) => ({
  minHeight: '50vh',
  maxHeight: '100%',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  '& .react-calendar-timeline': {
    fontFamily: theme.typography.fontFamily,
    width: '100%',
    overflow: 'visible',
  },
  '& .rct-outer': { overflowX: 'visible' },
  '& .rct-scroll': {
    overflowX: 'visible',
    width: '100%',
  },
  '& .rct-header-root': {
    border: `none`,
    backgroundColor: theme.palette.primary.light,
  },
  '& .rct-dateHeader': {
    border: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.95rem',
    fontWeight: 500,
    textAlign: 'center',
    transform: 'translateX(-50%)',
  },
  '& .rct-hl-odd': {
    backgroundColor: 'transparent !important',
    border: 'none !important',
  },
  '& .rct-hl-even': { border: 'none !important' },
  '& .rct-vertical-lines .rct-vl': {
    borderLeft: `1px dashed ${theme.palette.divider}`,
    zIndex: 40,
  },
  '& .major-line': {
    borderLeft: `2px solid ${theme.palette.primary.light} !important`,
    opacity: 0.5,
  },
  '& .minor-line': {
    borderLeft: `1px dashed ${theme.palette.divider} !important`,
  },
  '& .medium-line': {
    borderLeft: `1.5px solid ${theme.palette.secondary.main} !important`,
    opacity: 0.3,
  },
  '& .rct-item': {
    transition: 'all 0.2s ease-in-out',
    borderRadius: '8px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
    },
  },
  '& .rct-item-content': {
    height: '100%',
    padding: '4px 8px',
    fontSize: '0.9rem',
  },
}));
