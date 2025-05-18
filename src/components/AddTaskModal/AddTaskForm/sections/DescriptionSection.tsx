import React from 'react';
import { useTranslation } from 'react-i18next';

import RichMarkdownEditor from '@components/RichMarkdownEditor';

import { FormGroup, ModalLabel, RichEditorContainer } from './sections.styled';

interface IDescriptionSectionProps {
  value: string;
  onChange: (value: string) => void;
  maxRows?: number;
}

const DescriptionSection: React.FC<IDescriptionSectionProps> = ({
  value,
  onChange,
  maxRows = 10,
}) => {
  const { t } = useTranslation(['common']);

  return (
    <FormGroup>
      <ModalLabel htmlFor="task-desc">
        {t('taskModal.form.description')}
      </ModalLabel>
      <RichEditorContainer>
        <RichMarkdownEditor
          value={value || ''}
          onChange={onChange}
          maxRows={maxRows}
        />
      </RichEditorContainer>
    </FormGroup>
  );
};

export default DescriptionSection;
