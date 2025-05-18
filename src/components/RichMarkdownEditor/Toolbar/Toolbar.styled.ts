import { Box, styled } from '@mui/material';

export const ColorSwatch = styled(Box)<{ color: string; isSelected: boolean }>(
  ({ color, isSelected }) => ({
    width: 24,
    height: 24,
    backgroundColor: color,
    borderRadius: '50%',
    cursor: 'pointer',
    border: isSelected ? '2px solid #000' : '1px solid #ccc',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }),
);

export const ColorPickerContainer = styled(Box)({
  padding: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: '150px',
  gap: '4px',
});

export const ToolbarContainer = styled(Box)({
  display: 'flex',
  marginBottom: '8px',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

export const FormatButtonsGroup = styled(Box)({
  display: 'flex',
  gap: '3px',
});

export const HighlightButtonsGroup = styled(Box)({
  display: 'flex',
  gap: '3px',
});

export const ToolbarIconButton = styled('button')<{ isactive: boolean }>(
  ({ isactive }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: isactive ? '#e3f2fd' : 'transparent',
    color: isactive ? '#1976d2' : '#757575',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    transition: 'background-color 0.2s ease, color 0.2s ease',
    '&:hover': {
      backgroundColor: isactive ? '#bbdefb' : '#e0e0e0',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.3)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  }),
);

export const ColorButton = styled(ToolbarIconButton)<{ buttoncolor: string }>(
  ({ buttoncolor }) => ({
    color: buttoncolor,
    '& svg': {
      color: buttoncolor,
    },
  }),
);
