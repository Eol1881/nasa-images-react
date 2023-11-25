import React from 'react';
import { extractImageData } from '@/utils/extractImageData';
import { ImageData } from '@/types/api';
import { ResultItem } from '../ResultItem/ResultItem';
import { Loader } from '../Loader/Loader';

interface Props {
  imagesData: ImageData[];
  isLoading: boolean;
}

export const ResultList: React.FC<Props> = ({ imagesData, isLoading }) => {
  return (
    <>
      {isLoading && <Loader />}
      <div className={`flex w-fit flex-wrap justify-evenly gap-4 ${isLoading && 'pointer-events-none'}`}>
        {imagesData &&
          imagesData.map((imageData) => <ResultItem key={extractImageData(imageData).nasaId} imageData={imageData} />)}
        {!imagesData?.length && (
          <div className={` text-2xl text-red-700`} data-testid="nothing-found">
            NOTHING FOUND
          </div>
        )}
      </div>
    </>
  );
};
