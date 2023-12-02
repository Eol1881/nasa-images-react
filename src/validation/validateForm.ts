import { ValidationError } from 'yup';
import { validationSchema } from './validationSchema';

export const validateForm = async (formEntries?: Record<string, string>) => {
  try {
    await validationSchema.validate(formEntries, { abortEarly: false });
    return null;
  } catch (error) {
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
