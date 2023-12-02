import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup
    .string()
    .test('required', 'required field', (value) => !!value)
    .matches(/^\p{Lu}/u, 'the first letter must be uppercase')
    .required('required field'),
  age: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('age must be a number')
    .positive('age must be a positive number')
    .required('required field'),
  email: yup
    .string()
    .test('required', 'required field', (value) => !!value)
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'must contain @ symbol followed by domain name')
    .required('required field'),
  password: yup
    .string()
    .required('required field')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\p{Ll}]/u, 'Password must contain at least one lowercase letter')
    .matches(/[\p{Lu}]/u, 'Password must contain at least one uppercase letter')
    .matches(/[\p{P}]/u, 'Password must contain at least one special character'),
  ['confirm-password']: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('required field'),
  ['terms-and-conditions']: yup
    .mixed()
    .test('mixed', 'required field', (value) => {
      if (typeof value === 'string') return (value as string).length > 0;
      if (typeof value === 'boolean') return value as boolean;
    })
    .required('required field'),
  picture: yup
    .mixed()
    .required('file is required')
    .test('file', 'file is required', (value) => {
      if (value instanceof File) return (value as File).size > 0;
      if (value instanceof FileList) return (value as FileList)[0]?.size > 0;
      return false;
    })
    .test('fileSize', 'file size is too large', (value) => {
      if (value instanceof File) return (value as File).size < 800000;
      if (value instanceof FileList) return (value as FileList)[0]?.size < 800000;
      return false;
    }),
  gender: yup.string().required('required field'),
});

export type FormEntries = yup.InferType<typeof validationSchema>;
