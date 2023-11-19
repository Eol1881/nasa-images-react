import React, { useEffect, useState } from 'react';
import { ResultItem } from './ResultItem';
import { extractImageData } from '../utils/extractImageData';
import { Loader } from './Loader';
import { useSearchParams } from 'react-router-dom';
import { useGetItemsQuery } from '../api/nasaApiSlice';
import { useSelector } from 'react-redux';
import { GlobalState } from '../store/store';

export const ResultList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentPageIndex = Number(searchParams.get('page')) || 1;
  const activeItemNasaId = searchParams.get('details');

  const shouldThrowError = useSelector((state: GlobalState) => state.loading.shouldThrowFakeError);
  const searchQuery = useSelector((state: GlobalState) => state.search.searchQuery);
  const selectedPageSize = useSelector((state: GlobalState) => state.search.selectedPageSize);

  const { data, isFetching } = useGetItemsQuery({
    searchQuery: searchQuery,
    pageSize: selectedPageSize,
    page: currentPageIndex,
  });

  const imagesData = data?.imagesData;

  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
    setErrorFlag(shouldThrowError);
  }, [shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');
  return (
    <div className={`result-list ${isFetching && 'pointer-events-none text-slate-400'}`}>
      {imagesData &&
        imagesData.map((imageData) => (
          <ResultItem
            key={extractImageData(imageData).nasaId}
            isActive={extractImageData(imageData).nasaId === activeItemNasaId}
            imageData={imageData}
          />
        ))}
      {isFetching && <Loader />}
      {!imagesData?.length && !isFetching && (
        <div className={`font-pixelify text-2xl text-red-700`} data-testid="nothing-found">
          NOTHING FOUND
        </div>
      )}
    </div>
  );
};
