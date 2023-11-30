import { FormResult } from '../components/FormResult';
import { useAppSelector } from '../store/hooks';

export const Main: React.FC = () => {
  const uncontrolledFormData = useAppSelector(
    (state) => state.uncontrolledFormData.formData
  );

  return (
    <div className="mx-auto mt-8 w-full max-w-md space-y-4 rounded-sm bg-slate-200 p-2 md:p-4">
      <div className="text-center text-xl">Form Results</div>
      {!uncontrolledFormData && (
        <div>Plase submit a form to see the results</div>
      )}
      <FormResult formData={uncontrolledFormData} label="Uncontrolled Form" />
    </div>
  );
};
