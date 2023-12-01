import { InputConfig } from '../types/general';
import { capitalize } from '../utils/capitalize';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  inputConfig: InputConfig;
  error?: string;
  register?: UseFormRegisterReturn<string>;
}

export const FormInput: React.FC<Props> = ({ inputConfig, error, register }) => {
  const getTextInput = () => {
    return (
      <input
        type={inputConfig.type}
        name={inputConfig.name}
        className={`rounded-sm border-2 pl-2 ${error ? 'border-red-400' : 'border-transparent'}`}
        {...register}
      />
    );
  };

  const getRadioInput = () => {
    return (
      <div className="flex w-fit overflow-hidden rounded-md">
        {inputConfig.values?.map((value, index) => {
          return (
            <div key={value}>
              <label className="checkbox-label block cursor-pointer bg-slate-200 px-4 py-1 hover:bg-blue-200">
                <input
                  defaultChecked={index === 0}
                  type={inputConfig.type}
                  name={inputConfig.name}
                  id={value}
                  value={value}
                  className={'hidden'}
                  {...register}
                />
                {capitalize(value)}
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  const getCheckboxInput = () => {
    return (
      <div className={`${error && '!text-red-400'}`}>
        <label
          className={`flex cursor-pointer items-center space-x-2 rounded-sm bg-slate-200 p-1 pl-2 ${
            error ? 'text-red-500' : 'text-gray-800'
          }`}
        >
          <input type={inputConfig.type} name={inputConfig.name} {...register} />
          <span> {inputConfig.text}</span>
        </label>
      </div>
    );
  };

  const getFileInput = () => {
    return (
      <input
        type={inputConfig.type}
        name={inputConfig.name}
        className={`cursor-pointer space-x-2 rounded-sm bg-slate-200 p-1 pl-2 ${
          error ? 'text-red-500' : 'text-gray-800'
        }`}
        accept={inputConfig.extensions?.map((extension) => `image/${extension}`).join(', ')}
        {...register}
      />
    );
  };

  const input = () => {
    switch (inputConfig.type) {
      case 'radio':
        return getRadioInput();
      case 'checkbox':
        return getCheckboxInput();
      case 'file':
        return getFileInput();
      default:
        return getTextInput();
    }
  };

  return (
    <div>
      <label className="flex flex-col space-y-1">
        <span className="pl-2 text-sm font-semibold text-gray-600">{inputConfig.label}</span>
        {input()}
      </label>
      <span className="block h-4 text-right text-sm text-red-600">{error || ''}</span>
    </div>
  );
};
