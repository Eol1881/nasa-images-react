import { INPUTS_CONFIG } from '../constatns/inputConfig';
import { FormMetaData } from '../types/general';
import { FormEntries } from '../validation/validationSchema';

interface Props {
  formEntries: FormEntries;
  formMetaData: FormMetaData;
  isNew?: boolean;
}

export const FormResult: React.FC<Props> = ({ formEntries, formMetaData, isNew }) => {
  return (
    formEntries && (
      <div>
        <div className=" w-full rounded-t-md bg-red-400 text-center font-semibold">
          {formMetaData.formTitle}
        </div>
        <div
          className={`border-1 space-y-3 overflow-hidden rounded-b-md border-gray-600 bg-gray-400/50 p-4 ${
            isNew ? 'bg-green-400/50' : ''
          }`}
        >
          <ul className="space-y-2">
            {Object.entries(formEntries).map((formEntrie) => {
              const entrieName = formEntrie[0];
              const entrieValue = formEntrie[1].toString();
              if (entrieName === 'formTitle') return;
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
