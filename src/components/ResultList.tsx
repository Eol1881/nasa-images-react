import React, { useContext, useEffect, useState } from 'react';
import { ResultItem } from './ResultItem';
import { extractImageData } from '../utils/extractImageData';
import { SearchContext } from '../context/SearchContextProvider';
import { Loader } from './Loader';
import { useSearchParams } from 'react-router-dom';

interface Props {
  isLoading: boolean;
}

export const ResultList: React.FC<Props> = ({ isLoading }) => {
  const { searchResults, shouldThrowError } = useContext(SearchContext);
  const { imagesData } = searchResults;

  const [searchParams] = useSearchParams();
  const activeItemNasaId = searchParams.get('details');

  const isNothingFound = imagesData?.length === 0;

  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
    setErrorFlag(shouldThrowError);
  }, [shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');
  return (
    <div className={`result-list ${isLoading && 'pointer-events-none text-slate-400'}`}>
      {imagesData &&
        imagesData.map((imageData) => (
          <ResultItem
            key={extractImageData(imageData).nasaId}
            isActive={extractImageData(imageData).nasaId === activeItemNasaId}
            imageData={imageData}
          />
        ))}
      {isLoading && <Loader />}
      {isNothingFound && !isLoading && <div className={`font-pixelify text-2xl text-red-700`}>NOTHING FOUND</div>}
    </div>
  );
};
