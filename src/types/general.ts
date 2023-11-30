export interface InputConfig {
  type: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
  values?: string[];
  text?: string;
  extensions?: string[];
}

export type ValidationErrors = Record<string, string>;

export type FormEntries = Record<string, FormDataEntryValue> | null;
