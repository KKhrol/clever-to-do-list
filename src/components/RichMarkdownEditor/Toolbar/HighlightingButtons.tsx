import ColorLensIcon from '@mui/icons-material/ColorLens';
import HighlightIcon from '@mui/icons-material/Highlight';
import { Popover } from '@mui/material';
import type { Editor } from '@tiptap/react';
import React, { useCallback } from 'react';
import { TaskHighlightColorsOptions } from 'src/constants/taskHighlightColorsOptions';

import {
  ColorButton,
  ColorPickerContainer,
  ColorSwatch,
  HighlightButtonsGroup,
  ToolbarIconButton,
} from './Toolbar.styled';

interface HighlightButtonsProps {
  editor: Editor | null;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchor: HTMLElement | null) => void;
}

const HighlightingButtons: React.FC<HighlightButtonsProps> = ({
  editor,
  currentColor,
  setCurrentColor,
  anchorEl,
  setAnchorEl,
}) => {
  const isActive = (format: string) => {
    if (!editor) return false;
    return editor.isActive(format);
  };

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );

  const toggle = {
    highlight: (e: React.MouseEvent<HTMLButtonElement>) => {
      handleButtonClick(e);
      if (!editor) return;
      editor.chain().focus().toggleHighlight().run();
    },
    colorHighlight: (color: string) => {
      if (!editor) return;
      editor.chain().focus().toggleHighlight({ color }).run();
      setAnchorEl(null);
    },
  };

  const handleColorPickerOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setAnchorEl(null);
  };

  const colorPickerOpen = Boolean(anchorEl);
  return (
    <>
      <HighlightButtonsGroup>
        <ToolbarIconButton
          isactive={isActive('highlight')}
          onClick={toggle.highlight}
          disabled={!editor?.isEditable}
          aria-label="Highlight"
        >
          <HighlightIcon fontSize="small" />
        </ToolbarIconButton>

        <ColorButton
          buttoncolor={currentColor}
          isactive={false}
          onClick={handleColorPickerOpen}
          disabled={!editor?.isEditable}
          aria-label="Choose highlight color"
        >
          <ColorLensIcon fontSize="small" />
        </ColorButton>
      </HighlightButtonsGroup>

      <Popover
        open={colorPickerOpen}
        anchorEl={anchorEl}
        onClose={handleColorPickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {' '}
        <ColorPickerContainer>
          {TaskHighlightColorsOptions.map(color => (
            <ColorSwatch
              key={color}
              color={color}
              isSelected={currentColor === color}
              onClick={() => {
                setCurrentColor(color);
                toggle.colorHighlight(color);
              }}
            />
          ))}
        </ColorPickerContainer>
      </Popover>
    </>
  );
};

export default HighlightingButtons;
