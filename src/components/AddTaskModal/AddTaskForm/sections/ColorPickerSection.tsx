import React from 'react';
import { useTranslation } from 'react-i18next';

import { ColorTaskOptions } from '../types';
import {
  ColorCheckIcon,
  ColorOption,
  ColorPickerContainer,
  FormGroup,
  ModalLabel,
} from './sections.styled';

interface IColorPickerSectionProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPickerSection: React.FC<IColorPickerSectionProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation(['common']);
  return (
    <FormGroup>
      <ModalLabel>{t('taskModal.form.color')}</ModalLabel>
      <ColorPickerContainer>
        {ColorTaskOptions.map(color => (
          <ColorOption
            key={color}
            type="button"
            $color={color}
            $selected={value === color}
            onClick={() => onChange(color)}
            aria-label={`Select color ${color}`}
          >
            {value === color && <ColorCheckIcon />}
          </ColorOption>
        ))}
      </ColorPickerContainer>
    </FormGroup>
  );
};

export default ColorPickerSection;
