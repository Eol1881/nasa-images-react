import { useNavigation } from 'react-router-dom';
import { ImageData } from '../api/types';
import { ResultItem } from './ResultItem';
import { useEffect, useState } from 'react';

interface Props {
  imagesData: ImageData[];
  shouldThrowError: boolean;
}

export const ResultList: React.FC<Props> = ({ imagesData, shouldThrowError }) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isNothingFound = imagesData.length === 0;
  const isDetailsOpened = location.pathname.startsWith('/details');

  // Throwing fake rendering error mechanism
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    setErrorFlag(shouldThrowError);
  }, [shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');
  // ${isDetailsOpened && 'hidden'}
  return (
    <div
      className={`relative w-full select-none space-y-2 md:block md:pr-4 
      ${isLoading && 'pointer-events-none text-slate-400'} ${isDetailsOpened && 'hidden'}`}
    >
      {imagesData.map((imageData, imageIndex) => (
        <ResultItem key={imageIndex} imageData={imageData}></ResultItem>
      ))}
      <div
        className={`font-pixelify text-2xl text-red-700 ${!isNothingFound && 'invisible hidden'} ${
          isLoading && 'invisible'
        }`}
      >
        NOTHING FOUND
      </div>
    </div>
  );
};
