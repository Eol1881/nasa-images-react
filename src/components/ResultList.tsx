import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { ResultItem } from './ResultItem';
import { extractImageData } from '../utils/extractImageData';
import { SearchContext } from '../context/SearchContextProvider';

export const ResultList: React.FC = () => {
  const { searchResults, shouldThrowError } = useContext(SearchContext);
  const { imagesData } = searchResults;

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isNothingFound = imagesData?.length === 0;
  const isDetailsOpened = location.pathname.startsWith('/details');

  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    setErrorFlag(shouldThrowError);
  }, [shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');
  return (
    <div
      className={`relative w-full select-none space-y-2 md:block md:pr-4
      ${isLoading && 'pointer-events-none text-slate-400'} ${isDetailsOpened && 'hidden'}`}
    >
      {imagesData &&
        imagesData.map((imageData) => (
          <ResultItem key={extractImageData(imageData).nasaId} imageData={imageData}></ResultItem>
        ))}
      {isNothingFound && !isLoading && <div className={`font-pixelify text-2xl text-red-700`}>NOTHING FOUND</div>}
    </div>
  );
};
