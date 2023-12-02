import { FormResult } from '../components/FormResult';
import { useAppSelector } from '../store/hooks';

export const Main: React.FC = () => {
  const formsData = useAppSelector((state) => state.formsData.forms);
  const lastFormId = useAppSelector((state) => state.formsData.lastFormId);

  return (
    <div className="mx-auto mt-8 w-full max-w-md space-y-6 rounded-sm bg-slate-200 p-2 md:p-4">
      <div className="text-center text-xl">Form Results</div>
      {formsData.length === 0 && <div>Plase submit a form to see the results</div>}
      {formsData.toReversed().map((formData) => {
        return (
          <FormResult
            isNew={formData.formMetaData.timestamp === lastFormId}
            key={formData.formMetaData.timestamp}
            formEntries={formData.formEntries}
            formMetaData={formData.formMetaData}
          />
        );
      })}
    </div>
  );
};
