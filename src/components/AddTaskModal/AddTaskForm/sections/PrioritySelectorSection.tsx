import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TaskPriority } from 'src/constants/taskPriority.enum';

import Spacer from '@components/Spacer';

import { PriorityTaskOptions } from '../types';
import {
  FormGroup,
  ModalLabel,
  PriorityButton,
  PriorityContainer,
} from './sections.styled';

interface IPrioritySelectorSectionProps {
  value: TaskPriority;
  onChange: (priority: TaskPriority) => void;
}

const PrioritySelectorSection: React.FC<IPrioritySelectorSectionProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation(['common']);

  return (
    <FormGroup>
      <ModalLabel>{t('taskModal.form.priority')}</ModalLabel>
      <Spacer height={3} />
      <PriorityContainer>
        {PriorityTaskOptions.map(priority => (
          <PriorityButton
            key={priority}
            type="button"
            $priority={priority}
            $selected={value === priority}
            onClick={() => onChange(priority)}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
          </PriorityButton>
        ))}
      </PriorityContainer>
    </FormGroup>
  );
};

export default PrioritySelectorSection;
