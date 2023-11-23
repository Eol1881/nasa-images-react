export const ThrowErrorButton: React.FC = () => {
  return (
    <button
      data-testid="throw-fake-error-button"
      className="absolute right-0 top-0 !m-0 p-3 text-slate-600 hover:text-slate-950"
    >
      Throw fake error
    </button>
  );
};
