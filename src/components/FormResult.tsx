import { INPUTS_CONFIG } from '../routes/UncontrolledForm';
import { FormEntries } from '../types/general';

interface Props {
  formData: FormEntries;
  label: string;
}

export const FormResult: React.FC<Props> = ({ formData, label }) => {
  return (
    formData && (
      <div>
        <div className=" w-full rounded-t-md bg-red-400 text-center font-semibold">
          {label}
        </div>
        <div className="border-1 space-y-3 overflow-hidden rounded-b-md border-gray-600 bg-gray-400/50 p-4">
          <ul className="space-y-2">
            {Object.entries(formData).map((formDataEntrie) => {
              const entrieName = formDataEntrie[0];
              const entrieValue = formDataEntrie[1].toString();
              const entrieLabel = INPUTS_CONFIG.find((input) => {
                return input.name === entrieName;
              })?.label;
              return (
                <li key={entrieName} className="space-y-1">
                  <div className="text-xs text-gray-600">{entrieLabel}</div>
                  <div className="scroll overflow-x-auto rounded-md bg-slate-400 pl-2">
                    {entrieValue}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
};
