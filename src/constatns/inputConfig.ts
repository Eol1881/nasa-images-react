import { InputConfig } from '../types/general';

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
