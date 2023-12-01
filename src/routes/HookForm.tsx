import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import { FormWrapper } from '../components/FormWrapper';
import { INPUTS_CONFIG } from '../constatns/inputConfig';
import { updateFormData } from '../store/slices/HookFormSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { IFormData, validationSchema } from '../validation/validationSchema';
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
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async () => {
    if (!isValid) {
      return;
    } else {
      const { serializedFormEntries } = await serializeFormData(getValues());
      dispatch(updateFormData(serializedFormEntries));
      navigate('/');
    }
  };

  useEffect(() => {
    console.log(errors);
  });

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
