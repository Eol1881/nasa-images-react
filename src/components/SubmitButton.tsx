interface Props {
  isDisabled?: boolean;
}

export const SubmitButton: React.FC<Props> = ({ isDisabled }) => {
  return (
    <input
      type="submit"
      value="Submit"
      disabled={isDisabled}
      className={`mt-6 block h-14 w-full rounded-md  ${
        isDisabled
          ? 'cursor-default bg-blue-600/60 hover:bg-blue-600/60'
          : 'cursor-pointer bg-blue-600 hover:bg-blue-600/90'
      }`}
    />
  );
};
