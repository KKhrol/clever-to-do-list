import { Box, styled } from '@mui/material';
import { EditorContent } from '@tiptap/react';

export const EditorContainer = styled(Box)({
  // TODO: add styles
});

export const EditorContentContainer = styled('div')({
  minHeight: '100px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '8px',
});

export const EditorContentStyled = styled(EditorContent)<{
  maxHeight?: string;
}>(({ maxHeight }) => ({
  '& .ProseMirror': {
    minHeight: '100px',
    maxHeight: maxHeight,
    overflowY: maxHeight ? 'auto' : undefined,
    outline: 'none',
  },
  minHeight: '100px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '8px',
}));
