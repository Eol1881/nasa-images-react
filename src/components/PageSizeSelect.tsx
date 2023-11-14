import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { APP_CONFIG } from '../constants/constants';

export const PageSizeSelect: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageSize = searchParams.get('size') || APP_CONFIG.DEFAULT_PAGE_SIZE;

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams();
    if (e.target.value !== APP_CONFIG.DEFAULT_PAGE_SIZE.toString()) newSearchParams.set('size', e.target.value);
    if (newSearchParams.toString() === searchParams.toString()) return;
    setSearchParams(newSearchParams);
  };

  return (
    <select
      id="countries"
      className="text-md block cursor-pointer bg-gray-700 px-2 font-pixelify text-white focus:outline-none focus:ring-blue-500"
      onChange={changeHandler}
      value={currentPageSize.toString()}
    >
      {APP_CONFIG.PAGE_SIZES.map((pageSizeOption) => {
        return (
          <option key={pageSizeOption} value={pageSizeOption.toString()}>
            {pageSizeOption}
          </option>
        );
      })}
    </select>
  );
};
