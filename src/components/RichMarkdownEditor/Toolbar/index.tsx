import type { Editor } from '@tiptap/react';
import React from 'react';

import FormattingButtons from './FormatingButtons';
import HighlightingButtons from './HighlightingButtons';
import { ToolbarContainer } from './Toolbar.styled';

interface ToolbarProps {
  editor: Editor | null;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchor: HTMLElement | null) => void;
}
const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  currentColor,
  setCurrentColor,
  anchorEl,
  setAnchorEl,
}) => {
  return (
    <ToolbarContainer>
      <FormattingButtons editor={editor} />
      <HighlightingButtons
        editor={editor}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </ToolbarContainer>
  );
};

export default Toolbar;
