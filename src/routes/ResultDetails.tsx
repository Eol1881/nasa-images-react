import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDetailsFromApi } from '../api/api';
import { ImageData } from '../api/types';
import { Link } from 'react-router-dom';
import { ImageMagnifier } from '../components/ImageMagnifier';
import { extractImageData } from '../utils/extractImageData';
import { Loader } from '../components/Loader';

export const ResultDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const [searchParams] = useSearchParams();
  const nasaId = searchParams.get('details');

  useEffect(() => {
    if (!nasaId) return;
    let isMounted = true;

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const detailsData = await fetchDetailsFromApi(nasaId);
        if (isMounted) setImageData(detailsData.imagesData[0]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [nasaId]);

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
        <ImageMagnifier imageUrl={extractImageData(imageData).imageUrl} isLoading={isLoading}></ImageMagnifier>
        {isLoading && <Loader></Loader>}
        <div className="mt-2 flex w-full flex-col justify-between font-pixelify text-sm">
          <p>Location: {extractImageData(imageData).location || 'Unknown'}</p>
          <p>Photo: {extractImageData(imageData).photographer || 'Unknown'}</p>
          <p>Date: {extractImageData(imageData).dateCreated || 'Unknown'}</p>
        </div>
        <Link
          to={{ search: getUpdatedSearchParams() }}
          className=" absolute bottom-0 right-0 inline-block p-4 font-pixelify transition-all hover:scale-110"
        >
          CLOSE ❌
        </Link>
      </div>
    )
  );
};
