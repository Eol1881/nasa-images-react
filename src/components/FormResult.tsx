import { INPUTS_CONFIG } from '../constatns/inputConfig';
import { IFormData } from '../validation/validationSchema';

interface Props {
  formEntries: IFormData | null;
  label: string;
}

export const FormResult: React.FC<Props> = ({ formEntries, label }) => {
  return (
    formEntries && (
      <div>
        <div className=" w-full rounded-t-md bg-red-400 text-center font-semibold">{label}</div>
        <div className="border-1 space-y-3 overflow-hidden rounded-b-md border-gray-600 bg-gray-400/50 p-4">
          <ul className="space-y-2">
            {Object.entries(formEntries).map((formEntrie) => {
              const entrieName = formEntrie[0];
              const entrieValue = formEntrie[1].toString();
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
