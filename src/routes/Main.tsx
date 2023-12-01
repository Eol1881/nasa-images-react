import { FormResult } from '../components/FormResult';
import { useAppSelector } from '../store/hooks';

export const Main: React.FC = () => {
  const uncontrolledFormEntries = useAppSelector((state) => state.uncontrolledFormData.formData);
  const hookFormEntries = useAppSelector((state) => state.hookFormData.formData);

  return (
    <div className="mx-auto mt-8 w-full max-w-md space-y-6 rounded-sm bg-slate-200 p-2 md:p-4">
      <div className="text-center text-xl">Form Results</div>
      {!uncontrolledFormEntries && !hookFormEntries && (
        <div>Plase submit a form to see the results</div>
      )}
      <FormResult formEntries={uncontrolledFormEntries} label="Uncontrolled Form" />
      <FormResult formEntries={hookFormEntries} label="Hook Form" />
    </div>
  );
};
