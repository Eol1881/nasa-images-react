export type InputName =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'confirm-password'
  | 'gender'
  | 'terms-and-conditions'
  | 'picture';

export interface InputConfig {
  type: React.HTMLInputTypeAttribute;
  label: string;
  name: InputName;
  values?: string[];
  text?: string;
  extensions?: string[];
}
