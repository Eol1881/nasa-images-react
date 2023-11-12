import React, { useContext, useEffect, useState } from 'react';
import { ResultItem } from './ResultItem';
import { extractImageData } from '../utils/extractImageData';
import { SearchContext } from '../context/SearchContextProvider';
import { Loader } from './Loader';

interface Props {
  isLoading: boolean;
}

export const ResultList: React.FC<Props> = ({ isLoading }) => {
  const { searchResults, shouldThrowError } = useContext(SearchContext);
  const { imagesData } = searchResults;

  const isNothingFound = imagesData?.length === 0;
  const isDetailsOpened = location.pathname.startsWith('/details');

  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
    setErrorFlag(shouldThrowError);
  }, [shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');
  return (
    <div
      className={`relative min-h-full w-full select-none space-y-2 md:block md:pr-4
      ${isLoading && 'pointer-events-none text-slate-400'} ${isDetailsOpened && 'hidden'}`}
    >
      {imagesData &&
        imagesData.map((imageData) => (
          <ResultItem key={extractImageData(imageData).nasaId} imageData={imageData}></ResultItem>
        ))}
      {isLoading && <Loader />}
      {isNothingFound && !isLoading && <div className={`font-pixelify text-2xl text-red-700`}>NOTHING FOUND</div>}
    </div>
  );
};
