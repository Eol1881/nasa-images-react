import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { APP_CONFIG } from '../constants/constants';
import { GlobalState } from '../store/store';
import { setSelectedPageSize } from '../store/slices/searchSlice';

export const PageSizeSelect: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const selectedPageSize = useSelector((state: GlobalState) => state.search.selectedPageSize);

  useEffect(() => {
    const selectedPageSizeSearchParam = searchParams.get('size');
    if (!selectedPageSizeSearchParam) return;
    dispatch(setSelectedPageSize(Number(selectedPageSizeSearchParam)));
  });

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams();
    if (e.target.value !== APP_CONFIG.DEFAULT_PAGE_SIZE.toString()) newSearchParams.set('size', e.target.value);
    if (newSearchParams.toString() === searchParams.toString()) return;
    dispatch(setSelectedPageSize(Number(e.target.value)));
    setSearchParams(newSearchParams);
  };

  const pageSizeOptions = useMemo(
    () =>
      APP_CONFIG.PAGE_SIZES.map((pageSizeOption) => (
        <option key={pageSizeOption} value={pageSizeOption.toString()}>
          {pageSizeOption}
        </option>
      )),
    []
  );

  return (
    <select
      id="countries"
      className="text-md block cursor-pointer bg-gray-700 px-2 font-pixelify text-white focus:outline-none focus:ring-blue-500"
      onChange={changeHandler}
      value={selectedPageSize.toString()}
    >
      {pageSizeOptions}
    </select>
  );
};
