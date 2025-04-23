import { useCallback, useState } from 'react';

interface ValidationRule<TValue, TFormValues = Record<string, unknown>> {
  validate: (value: TValue, formValues: TFormValues) => boolean;
  errorMessage: string;
}

type FieldValidation<T> = {
  [K in keyof T]?: ValidationRule<T[K], T>[];
};

interface UseFormConfig<T> {
  initialValues: T;
  validationRules: FieldValidation<T>;
  onSubmit: (values: T) => Promise<void>;
  onError?: (error: string) => void;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

function useHandleForm<T extends object>({
  initialValues,
  validationRules,
  onSubmit,
  onError,
  validateOnBlur = false,
  validateOnChange = false,
}: UseFormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >({});
  const [focusedFields, setFocusedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateFields = useCallback(
    (fieldName?: keyof T, newValue?: T[keyof T]): boolean => {
      const newErrors: Partial<Record<keyof T, string>> = {};
      let isValid = true;

      const fieldsToValidate = fieldName
        ? [fieldName]
        : (Object.keys(validationRules) as Array<keyof T>);

      const currentValues =
        fieldName && newValue !== undefined
          ? { ...values, [fieldName]: newValue }
          : values;

      fieldsToValidate.forEach(field => {
        const fieldRules = validationRules[field];
        const valueToValidate =
          field === fieldName && newValue !== undefined
            ? newValue
            : currentValues[field];

        if (fieldRules?.length) {
          const fieldIsValid = fieldRules.every(rule =>
            rule.validate(valueToValidate, currentValues),
          );
          if (!fieldIsValid) {
            const failingRule = fieldRules.find(
              rule => !rule.validate(valueToValidate, currentValues),
            );
            if (failingRule) {
              newErrors[field] = failingRule.errorMessage;
              isValid = false;
            }
          }
        }
      });

      setErrors(prev => {
        const updatedErrors = { ...prev };

        fieldsToValidate.forEach(field => {
          if (field in newErrors) {
            updatedErrors[field] = newErrors[field];
          } else {
            delete updatedErrors[field];
          }
        });

        return updatedErrors;
      });

      return isValid;
    },
    [values, validationRules],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setGeneralError('');

      if (!validateFields()) {
        return;
      }

      setLoading(true);
      try {
        await onSubmit(values);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setGeneralError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [onSubmit, validateFields, onError, values],
  );

  const handleFieldChange = useCallback(
    (field: keyof T) => (value: T[keyof T]) => {
      setValues(prev => ({
        ...prev,
        [field]: value,
      }));
      if (validateOnChange) {
        validateFields(field, value);
      }
    },
    [validateFields, validateOnChange],
  );

  const handleFieldFocus = useCallback((field: keyof T) => {
    setFocusedFields(prev => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const handleFieldBlur = useCallback(
    (field: keyof T) => {
      setFocusedFields(prev => ({
        ...prev,
        [field]: false,
      }));
      setTouchedFields(prev => ({
        ...prev,
        [field]: true,
      }));
      if (validateOnBlur) {
        validateFields(field);
      }
    },
    [validateFields, validateOnBlur],
  );

  const shouldShowFieldError = useCallback(
    (field: keyof T) => {
      const hasError = !!errors[field];
      const isTouched = touchedFields[field];
      const isFocused = focusedFields[field];

      return hasError && isTouched && !isFocused;
    },
    [errors, touchedFields, focusedFields],
  );

  return {
    values,
    errors,
    loading,
    generalError,
    handleSubmit,
    handleFieldChange,
    handleFieldFocus,
    handleFieldBlur,
    setGeneralError,
    shouldShowFieldError,
  };
}

export default useHandleForm;
