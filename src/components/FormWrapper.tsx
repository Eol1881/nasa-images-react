import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  formTitle: string;
}

export const FormWrapper: React.FC<Props> = ({ children, formTitle }) => {
  return (
    <div className="mx-auto mt-8 w-full max-w-md space-y-4 rounded-sm bg-slate-200 p-2 md:p-4">
      <div className="text-center text-xl">{formTitle}</div>
      <div className="border-1 rounded-md border-gray-600 bg-gray-400/50 p-3 md:p-4">
        {children}
      </div>
    </div>
  );
};
