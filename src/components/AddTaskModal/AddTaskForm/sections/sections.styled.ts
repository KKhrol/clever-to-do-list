import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TaskPriority } from 'src/constants/taskPriority.enum';
import { FontSizes, PriorityColors } from 'src/theme/constants';

export const RichEditorContainer = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: '8px',
  minHeight: '150px',
  '& .editor-toolbar': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '4px 0',
  },

  '& .CodeMirror, & textarea': {
    minHeight: '120px',
    height: 'auto',
  },

  '& .markdown-body': {
    padding: '8px',
    fontSize: '14px',
  },
}));

export const ModalLabel = styled('label')(() => ({
  fontWeight: 500,
  marginBottom: 6,
}));

export const ErrorText = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  margin: '4px 0 8px 0',
}));

export const FormGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

export const DateTimeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
  width: '100%',
}));

export const DateInputWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 2,
}));

export const TimeInputWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1.5,
  maxWidth: '180px',
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
}));

export const ColorPickerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
}));

export const ColorOption = styled(IconButton, {
  shouldForwardProp: prop => !['$color', '$selected'].includes(prop as string),
})<{
  $color: string;
  $selected: boolean;
}>(({ theme, $color, $selected }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: $color,
  padding: 0,
  position: 'relative',

  border: $selected
    ? `3px solid ${theme.palette.common.white}`
    : '2px solid transparent',

  outline: $selected ? `2px solid ${theme.palette.primary.main}` : 'none',
  outlineOffset: 1,

  boxShadow: $selected
    ? `0 0 0 4px ${theme.palette.action.selected}, ${theme.shadows[4]}`
    : theme.shadows[1],

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    transform: 'scale(1.12)',
    boxShadow: theme.shadows[4],
    backgroundColor: $color,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
    backgroundColor: $color,
  },
  '&:active': {
    backgroundColor: $color,
  },
}));

export const ColorCheckIcon = styled(CheckIcon)(() => ({
  position: 'absolute',
  color: 'white',
  fontSize: 20,
  filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))',
}));

export const PriorityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));
export const PriorityButton = styled(Button, {
  shouldForwardProp: prop =>
    !['$priority', '$selected'].includes(prop as string),
})<{
  $priority: TaskPriority;
  $selected: boolean;
}>(({ theme, $priority, $selected }) => {
  const priorityColor = PriorityColors[$priority];

  return {
    padding: theme.spacing(0.25, 2),
    height: '32px',
    minWidth: '80px',
    textTransform: 'none',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 1,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: FontSizes.sm,
    transition: 'all 0.2s',
    border: $selected
      ? '1px solid transparent'
      : `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: $selected ? priorityColor : theme.palette.grey[100],
    color: $selected
      ? theme.palette.getContrastText(priorityColor)
      : theme.palette.text.primary,
    opacity: $selected ? 1 : 0.7,

    '&:hover': {
      backgroundColor: $selected ? priorityColor : `${priorityColor}33`,
      borderColor: $selected ? 'transparent' : priorityColor,
      opacity: 1,
    },

    boxShadow: 'none',

    ...($selected && {
      transform: 'translateY(-1px)',
    }),
  };
});
