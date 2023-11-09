import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageSizeSelect } from './PageSizeSelect';
import { APP_CONFIG } from '../constants';

interface Props {
  inputSearchQuery: string;
  setInputSearchQuery: (searchQuery: string) => void;
  searchResetHandler: () => void;
}

export const Header: React.FC<Props> = ({ inputSearchQuery, setInputSearchQuery, searchResetHandler }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchHandler = () => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search', inputSearchQuery);
    newSearchParams.delete('page');

    if (currentSearchParams.toString() === newSearchParams.toString() || inputSearchQuery === '') return;

    localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_PREFIX, inputSearchQuery);
    navigate(`/?${newSearchParams}`);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchQuery(e.target.value.trim());
  };

  const inputKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') searchHandler();
  };

  return (
    <header
      className="mt-4 space-y-4 rounded-lg bg-white px-2 py-3 text-center text-black shadow-md sm:px-4 sm:text-left"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="select-none font-pixelify text-3xl font-bold">
        <span className="inline-block duration-2000 ease-cool hover:rotate-180">🚀</span> NASA Images Viewer
      </h1>

      <div className="flex justify-stretch">
        <input
          id="search"
          className="min-w-0 flex-grow rounded-s-md bg-slate-300 p-1 pl-2 font-pixelify backdrop-blur-lg"
          value={inputSearchQuery}
          placeholder={APP_CONFIG.SEARCH_BAR_PLACEHOLDER}
          type="text"
          onChange={inputChangeHandler}
          onKeyDown={inputKeydownHandler}
        />
        <PageSizeSelect></PageSizeSelect>
        <button className="button-red !rounded-none" onClick={searchResetHandler}>
          Reset
        </button>
        <button className="button-blue !rounded-s-none" onClick={searchHandler}>
          Search
        </button>
      </div>
    </header>
  );
};
