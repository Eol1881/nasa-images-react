import React, { useState } from 'react';
import { ImageData } from '../api/types';
import { Link, useSearchParams } from 'react-router-dom';
import { extractImageData } from '../utils/extractImageData';

interface Props {
  imageData: ImageData;
  isActive: boolean;
}

export const ResultItem: React.FC<Props> = ({ imageData, isActive }) => {
  const [searchParams] = useSearchParams();

  const { imageUrl, imageTitle, nasaId, center, dateCreated } = extractImageData(imageData) || {};
  const [isImageFullyLoaded, setIsImageFullyLoaded] = useState(false); // TODO: add loader

  const getUpdatedSearchParams = () => {
    nasaId && searchParams.set('details', nasaId);
    return `?${searchParams.toString()}`;
  };

  return (
    <Link
      className={`result-item ${isActive && 'result-item--active'}`}
      data-testid="result-item"
      to={{
        search: getUpdatedSearchParams(),
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h5 className="h-12 text-center">{imageTitle}</h5>

      <img
        src={imageUrl}
        alt={imageTitle}
        className={`result-item__img ${!isImageFullyLoaded && 'opacity-0'}`}
        onLoad={() => {
          setIsImageFullyLoaded(true);
        }}
      />

      <p>Center: {<span>{center}</span>}</p>
      <p>{dateCreated}</p>
    </Link>
  );
};
