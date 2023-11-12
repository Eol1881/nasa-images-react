import React, { useContext, useState } from 'react';
import { PageSizeSelect } from './PageSizeSelect';
import { APP_CONFIG } from '../constants/constants';
import { SearchContext } from '../context/SearchContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setSearchQuery } = useContext(SearchContext);

  const [searchInputValue, setSearchInputValue] = useState(localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_PREFIX) || '');

  const searchHandler = () => {
    setSearchQuery(searchInputValue);
    localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_PREFIX, searchInputValue);
  };

  const searchResetHandler = () => {
    setSearchInputValue('');
    localStorage.removeItem(APP_CONFIG.LOCAL_STORAGE_PREFIX);
    setSearchQuery('');
    if (location.pathname === '/' && !location.search) return;
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value.trim());
  };

  const inputKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') searchHandler();
  };

  return (
    <header className="mt-4 space-y-4 rounded-lg bg-white px-2 py-3 text-center text-black shadow-md sm:px-4 sm:text-left">
      <h1 className="select-none font-pixelify text-3xl font-bold">
        <span className="inline-block duration-2000 ease-cool hover:rotate-180">🚀</span> NASA Images Viewer
      </h1>

      <div className="flex justify-stretch">
        <input
          data-testid="search-input"
          id="search"
          className="min-w-0 flex-grow rounded-s-md bg-slate-300 p-1 pl-2 font-pixelify backdrop-blur-lg"
          value={searchInputValue}
          placeholder={APP_CONFIG.SEARCH_BAR_PLACEHOLDER}
          type="text"
          onChange={inputChangeHandler}
          onKeyDown={inputKeydownHandler}
        />
        <PageSizeSelect></PageSizeSelect>
        <button className="button-red !rounded-none" onClick={searchResetHandler}>
          Reset
        </button>
        <button data-testid="search-button" className="button-blue !rounded-s-none" onClick={searchHandler}>
          Search
        </button>
      </div>
    </header>
  );
};
