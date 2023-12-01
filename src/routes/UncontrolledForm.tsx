import React, { useRef, useState } from 'react';
import { FormInput } from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { updateFormData } from '../store/slices/uncontrolledFormSlice';
import { validateForm } from '../validation/validateForm';
import { FormWrapper } from '../components/FormWrapper';
import { INPUTS_CONFIG } from '../constatns/inputConfig';
import { SubmitButton } from '../components/SubmitButton';
import { serializeFormData } from '../utils/serializeFormData';

export const UncontrolledForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const { serializedFormEntries, rawFormEntries } = await serializeFormData(formData);

    const errors = await validateForm(rawFormEntries);

    console.log(errors);

    if (errors) {
      setErrors(errors);
    } else {
      dispatch(updateFormData(serializedFormEntries));
      navigate('/');
    }
  };

  return (
    <FormWrapper formTitle="Uncontrolled Form">
      <form onSubmit={handleSubmit} ref={formRef}>
        {INPUTS_CONFIG.map((inputConfig) => {
          return (
            <FormInput
              inputConfig={inputConfig}
              error={errors[inputConfig.name]}
              key={inputConfig.name}
            />
          );
        })}
        <SubmitButton />
      </form>
    </FormWrapper>
  );
};
