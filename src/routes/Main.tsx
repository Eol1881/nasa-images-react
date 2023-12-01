import { FormResult } from '../components/FormResult';
import { useAppSelector } from '../store/hooks';

export const Main: React.FC = () => {
  const formsData = useAppSelector((state) => state.formsData.forms);

  return (
    <div className="mx-auto mt-8 w-full max-w-md space-y-6 rounded-sm bg-slate-200 p-2 md:p-4">
      <div className="text-center text-xl">Form Results</div>
      {formsData.length === 0 && <div>Plase submit a form to see the results</div>}
      {formsData.map((formData) => {
        return (
          <FormResult
            key={formData.formMetaData.timestamp}
            formEntries={formData.formEntries}
            formMetaData={formData.formMetaData}
          />
        );
      })}
    </div>
  );
};
