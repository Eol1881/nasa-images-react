import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ImageMagnifier } from './ImageMagnifier';
import { extractImageData } from '../utils/extractImageData';
import { Loader } from './Loader';
import { useGetItemQuery } from '../api/nasaApiSlice';

export const ResultDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const nasaId = searchParams.get('details') as string;

  const { data, isFetching } = useGetItemQuery({
    nasaId: nasaId,
  });

  const imageData = data?.imagesData[0];

  const getUpdatedSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    return `?${newSearchParams.toString()}`;
  };

  return (
    nasaId &&
    imageData && (
      <div
        data-testid="result-details"
        className="result-details"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isFetching && <Loader></Loader>}
        <ImageMagnifier imageUrl={extractImageData(imageData).imageUrl} isLoading={isFetching}></ImageMagnifier>
        <div className="mt-2 flex w-full flex-col justify-between font-pixelify text-sm">
          <p>Location: {extractImageData(imageData).location || 'Unknown'}</p>
          <p>Photo: {extractImageData(imageData).photographer || 'Unknown'}</p>
          <p>Date: {extractImageData(imageData).dateCreated || 'Unknown'}</p>
        </div>
        <Link
          to={{ search: getUpdatedSearchParams() }}
          className="absolute bottom-0 right-0 inline-block p-4 font-pixelify transition-all hover:scale-110"
          data-testid="close-details-button"
        >
          CLOSE ❌
        </Link>
      </div>
    )
  );
};
