import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../../constants/constants';
import { useRouter } from 'next/router';
import { QueryParams } from '@/types/general';

export const PageSizeSelect: React.FC = () => {
  const router = useRouter();
  const { size } = router.query;
  const [selectedPageSize, setSelectedPageSize] = useState(APP_CONFIG.DEFAULT_PAGE_SIZE);

  useEffect(() => {
    setSelectedPageSize(size ? +size : APP_CONFIG.DEFAULT_PAGE_SIZE);
  }, [size]);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    const isDefaultValue = newValue === APP_CONFIG.DEFAULT_PAGE_SIZE.toString();

    const newQuery: QueryParams = { ...router.query };
    delete newQuery.details;
    delete newQuery.page;
    newQuery.size = newValue;
    isDefaultValue && delete newQuery.size;

    router.push({
      pathname: '/',
      query: newQuery,
    });
    setSelectedPageSize(+newValue);
  };

  const pageSizeOptions = APP_CONFIG.PAGE_SIZES.map((pageSizeOption) => (
    <option key={pageSizeOption} value={pageSizeOption.toString()}>
      {pageSizeOption}
    </option>
  ));

  return (
    <select
      id="page-size"
      className="text-md  block cursor-pointer bg-gray-700 px-2 text-white focus:outline-none focus:ring-blue-500"
      onChange={changeHandler}
      value={selectedPageSize.toString()}
    >
      {pageSizeOptions}
    </select>
  );
};
