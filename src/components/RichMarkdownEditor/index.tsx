import React, { useState } from 'react';
import { TaskHighlightColorsOptions } from 'src/constants/taskHighlightColorsOptions';

import { useRichEditor } from '@hooks/useRichEditor';

import {
  EditorContainer,
  EditorContentStyled,
} from './RichMardownEditor.styled';
import Toolbar from './Toolbar';

interface Props {
  value: string;
  onChange: (markdown: string) => void;
  maxRows?: number;
  lineHeight?: number;
}

const RichMarkdownEditor: React.FC<Props> = ({
  value,
  onChange,
  maxRows,
  lineHeight = 20,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColor, setCurrentColor] = useState(
    TaskHighlightColorsOptions[0],
  );
  const maxHeight = maxRows ? `${maxRows * lineHeight}px` : undefined;

  const editor = useRichEditor({ value, onChange, maxHeight });

  if (!editor) return null;
  return (
    <EditorContainer>
      <Toolbar
        editor={editor}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
      <EditorContentStyled
        editor={editor}
        maxHeight={maxHeight}
      />
    </EditorContainer>
  );
};

export default RichMarkdownEditor;
