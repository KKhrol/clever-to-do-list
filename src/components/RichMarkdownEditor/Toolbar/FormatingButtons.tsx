import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import type { Editor } from '@tiptap/react';
import React from 'react';

import { FormatButtonsGroup, ToolbarIconButton } from './Toolbar.styled';

interface FormattingButtonsProps {
  editor: Editor | null;
}

const FormattingButtons: React.FC<FormattingButtonsProps> = ({ editor }) => {
  const isActive = (format: string) => {
    if (!editor) return false;
    return editor.isActive(format);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggle = {
    bold: (e: React.MouseEvent<HTMLButtonElement>) => {
      handleButtonClick(e);
      if (!editor) return;
      editor.chain().focus().toggleBold().run();
    },
    italic: (e: React.MouseEvent<HTMLButtonElement>) => {
      handleButtonClick(e);
      if (!editor) return;
      editor.chain().focus().toggleItalic().run();
    },
    underline: (e: React.MouseEvent<HTMLButtonElement>) => {
      handleButtonClick(e);
      if (!editor) return;
      editor.chain().focus().toggleUnderline().run();
    },
  };

  return (
    <FormatButtonsGroup>
      <ToolbarIconButton
        isactive={isActive('bold')}
        onClick={toggle.bold}
        disabled={!editor?.isEditable}
        aria-label="Bold"
      >
        <FormatBoldIcon fontSize="small" />
      </ToolbarIconButton>

      <ToolbarIconButton
        isactive={isActive('italic')}
        onClick={toggle.italic}
        disabled={!editor?.isEditable}
        aria-label="Italic"
      >
        <FormatItalicIcon fontSize="small" />
      </ToolbarIconButton>

      <ToolbarIconButton
        isactive={isActive('underline')}
        onClick={toggle.underline}
        disabled={!editor?.isEditable}
        aria-label="Underline"
      >
        <FormatUnderlinedIcon fontSize="small" />
      </ToolbarIconButton>
    </FormatButtonsGroup>
  );
};

export default FormattingButtons;
