import { useState } from 'react';

interface Props {
  searchHandler: (searchQuery: string) => void;
  searchResetHandler: () => void;
  searchQuery: string;
}

export function Search(props: Props) {
  const [searchInputValue, setSearchInputValue] = useState(props.searchQuery);

  const resetHandler = () => {
    setSearchInputValue('');
    localStorage.removeItem('nasa-search-queue');
    props.searchResetHandler();
  };

  const handleSearch = () => {
    localStorage.setItem('nasa-search-queue', searchInputValue);
    props.searchHandler(searchInputValue);
  };

  return (
    <div className="mt-4 space-y-4 rounded-lg bg-white px-2 py-3 text-center text-black shadow-md sm:px-4 sm:text-left">
      <h1 className="select-none font-pixelify text-3xl font-bold">🚀 NASA Images Viewer</h1>
      <div className="flex justify-stretch">
        <input
          id="search"
          className="min-w-0 flex-grow rounded-s-md bg-slate-300 p-1 pl-2 font-pixelify backdrop-blur-lg"
          value={searchInputValue}
          placeholder="type search keywords"
          type="text"
          onChange={(e) => {
            setSearchInputValue(e.target.value.trim());
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            handleSearch();
          }}
        />
        <button className="button-red !rounded-none" onClick={resetHandler}>
          Reset
        </button>
        <button className="button-blue !rounded-s-none" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
