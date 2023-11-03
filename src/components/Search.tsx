import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageIndex = searchParams.get('page');

  const [inputSearchQuery, setInputSearchQuery] = useState(
    currentPageIndex ? '' : localStorage.getItem('nasa-search-queue') || ''
  );

  const searchHandler = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('search', inputSearchQuery);
    newSearchParams.delete('page');

    if (
      newSearchParams.toString() === searchParams.toString() ||
      newSearchParams.toString() === '' ||
      inputSearchQuery === ''
    ) {
      return;
    }

    setSearchParams(newSearchParams);
    localStorage.setItem('nasa-search-queue', inputSearchQuery);
  };

  const searchResetHandler = () => {
    setInputSearchQuery('');
    localStorage.removeItem('nasa-search-queue');
    if (!searchParams.has('search') && !searchParams.has('page')) return;
    searchParams.delete('search');
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  document.addEventListener('hard-reset', () => {
    setInputSearchQuery('');
    localStorage.removeItem('nasa-search-queue');
  });

  return (
    <div className="mt-4 space-y-4 rounded-lg bg-white px-2 py-3 text-center text-black shadow-md sm:px-4 sm:text-left">
      <h1 className="select-none font-pixelify text-3xl font-bold">
        <span className="inline-block duration-2000 ease-cool hover:rotate-180">🚀</span> NASA
        Images Viewer
      </h1>

      <div className="flex justify-stretch">
        <input
          id="search"
          className="min-w-0 flex-grow rounded-s-md bg-slate-300 p-1 pl-2 font-pixelify backdrop-blur-lg"
          value={inputSearchQuery}
          placeholder="type search keywords"
          type="text"
          onChange={(e) => {
            setInputSearchQuery(e.target.value.trim());
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            searchHandler();
          }}
        />
        <button className="button-red !rounded-none" onClick={searchResetHandler}>
          Reset
        </button>
        <button className="button-blue !rounded-s-none" onClick={searchHandler}>
          Search
        </button>
      </div>
    </div>
  );
}
