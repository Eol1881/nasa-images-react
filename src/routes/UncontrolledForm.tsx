import React, { useRef, useState } from 'react';
import { FormInput } from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { updateFormData } from '../store/slices/uncontrolledFormSlice';
import { validateForm } from '../validation/validateForm';
import { InputConfig, ValidationErrors } from '../types/general';
import { fileToBase64 } from '../utils/fileToBase64';

export const INPUTS_CONFIG: InputConfig[] = [
  {
    type: 'text',
    label: 'Name',
    name: 'name',
  },
  {
    type: 'number',
    label: 'Age',
    name: 'age',
  },
  {
    type: 'string',
    label: 'Email',
    name: 'email',
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
  },
  {
    type: 'password',
    label: 'Confirm password',
    name: 'confirm-password',
  },
  {
    type: 'radio',
    label: 'Gender',
    name: 'gender',
    values: ['male', 'female', 'deer'],
  },
  {
    type: 'checkbox',
    label: 'Terms and conditions',
    name: 'terms-and-conditions',
    text: 'Agree to Terms and Conditions',
  },
  {
    type: 'file',
    label: 'Upload picture',
    name: 'picture',
    extensions: ['jpeg', 'png'],
  },
];

export const UncontrolledForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const errors = await validateForm(formRef.current);

    const formData = new FormData(formRef.current);
    const file = formData.get('picture') as File;
    const basedFile = await fileToBase64(file);
    formData.append('picture', basedFile);

    if (errors) {
      setErrors(errors);
    } else {
      dispatch(updateFormData(formData));
      navigate('/');
    }
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-md space-y-4 rounded-sm bg-slate-200 p-2 md:p-4">
      <div className="text-center text-xl">Uncontrolled Form</div>
      <div className="border-1 rounded-md border-gray-600 bg-gray-400/50 p-3 md:p-4">
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
          <input type="submit" value="Submit" className="mx-auto mt-4 block" />
        </form>
      </div>
    </div>
  );
};
