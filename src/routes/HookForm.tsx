import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import { FormWrapper } from '../components/FormWrapper';
import { INPUTS_CONFIG } from '../constatns/inputConfig';
import { updateFormsData } from '../store/slices/FormsDataSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { FormEntries, validationSchema } from '../validation/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitButton } from '../components/SubmitButton';
import { serializeFormData } from '../utils/serializeFormData';

export const HookForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, submitCount },
    getValues,
  } = useForm<FormEntries>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async () => {
    if (!isValid) {
      return;
    } else {
      const { serializedFormEntries } = await serializeFormData(getValues());
      dispatch(
        updateFormsData({
          formEntries: serializedFormEntries,
          formMetaData: {
            timestamp: Date.now(),
            formTitle: 'Hook Form',
          },
        })
      );
      navigate('/');
    }
  };

  return (
    <FormWrapper formTitle="Hook Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {INPUTS_CONFIG.map((inputConfig) => {
          return (
            <FormInput
              inputConfig={inputConfig}
              error={errors[inputConfig.name]?.message}
              key={inputConfig.name}
              register={register(inputConfig.name)}
            />
          );
        })}
        <SubmitButton isDisabled={!!submitCount && !isValid} />
      </form>
    </FormWrapper>
  );
};
