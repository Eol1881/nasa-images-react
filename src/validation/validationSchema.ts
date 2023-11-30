import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^\p{Lu}/u, 'the first letter must be uppercase')
    .required('required field'),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .typeError('age must be a number')
    .positive('age must be a positive number')
    .required('required field'),
  email: yup
    .string()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'must contain @ symbol followed by domain name'
    )
    .required('required field'),
  password: yup.string().required('required field'),
  ['confirm-password']: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('required field'),
  ['terms-and-conditions']: yup.string().required('required field'),
  ['picture']: yup
    .mixed()
    .test(
      'file',
      'file is required',
      (value) => value instanceof File && value.size > 0
    )
    .test(
      'fileSize',
      'file size is too large',
      (value) => value && (value as File).size <= 800000
    ),
});
