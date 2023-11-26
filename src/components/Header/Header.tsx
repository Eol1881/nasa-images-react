import React, { useState } from 'react';
import { PageSizeSelect } from './PageSizeSelect';
import { APP_CONFIG } from '../../constants/constants';
import { useRouter } from 'next/router';
import { QueryParams } from '@/types/general';
import { ThrowErrorButton } from './ThrowErrorButton';

export const Header: React.FC = () => {
  const router = useRouter();
  const searchQueryUrlParameterValue = router.query.search?.toString() || '';
  const [searchInputValue, setSearchInputValue] = useState<string>(searchQueryUrlParameterValue);

  const searchHandler = () => {
    if (!searchInputValue) return;

    const newQuery: QueryParams = { ...router.query };
    delete newQuery.page;
    delete newQuery.details;
    newQuery.search = searchInputValue;
    if (searchInputValue === searchQueryUrlParameterValue) return;

    router.push({
      pathname: '/',
      query: newQuery,
    });
  };

  const searchResetHandler = () => {
    if (searchInputValue !== '') setSearchInputValue('');
    const isQueryEmpty = !Object.keys(router.query).length;
    if (isQueryEmpty) return;
    router.push({
      pathname: '/',
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value.trim());
  };

  const inputKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') searchHandler();
  };

  return (
    <header className="relative mt-4 space-y-4 rounded-lg bg-white px-2 py-3 text-center text-black shadow-md sm:px-4 sm:text-left">
      <h1 className=" select-none text-3xl font-bold">
        <span className="inline-block duration-2000 ease-cool hover:rotate-180">🚀</span> NASA Images Viewer
      </h1>

      <ThrowErrorButton></ThrowErrorButton>

      <div className="flex justify-stretch">
        <input
          data-testid="search-input"
          id="search"
          className=" min-w-0 flex-grow rounded-s-md bg-slate-300 p-1 pl-2 backdrop-blur-lg"
          value={searchInputValue}
          placeholder={APP_CONFIG.SEARCH_BAR_PLACEHOLDER}
          type="text"
          onChange={inputChangeHandler}
          onKeyDown={inputKeydownHandler}
        />
        <PageSizeSelect />
        <button data-testid="reset-button" className="button-red !rounded-none" onClick={searchResetHandler}>
          Reset
        </button>
        <button data-testid="search-button" className="button-blue !rounded-s-none" onClick={searchHandler}>
          Search
        </button>
      </div>
    </header>
  );
};
