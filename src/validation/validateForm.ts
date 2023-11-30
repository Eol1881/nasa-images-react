import { FormEntries } from '../types/general';
import { validationSchema } from './validationSchema';
import { ValidationError } from 'yup';

export const validateForm = async (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const formEntries: FormEntries = Object.fromEntries(formData);
  console.log('Form submitted: ', formEntries);

  try {
    await validationSchema.validate(formEntries, { abortEarly: false });
    return null;
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      const errorMessages = error.inner.reduce(
        (acc: Record<string, string>, curr: ValidationError) => {
          acc[curr.path as string] = curr.message;
          return acc;
        },
        {}
      );
      return errorMessages;
    } else {
      return null;
    }
  }
};
