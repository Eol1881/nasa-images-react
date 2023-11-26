import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { QueryParams } from '@/types/general';
import { ImageMagnifier } from './ImageMagnifier';
import { extractImageData } from '@/utils/extractImageData';
import { ItemDetails } from '@/types/api';

import styles from './styles.module.css';

interface Props {
  itemDetails?: ItemDetails;
}

export const ResultDetails: React.FC<Props> = ({ itemDetails }) => {
  const { query } = useRouter();

  if (!itemDetails) return;
  const { imageData } = itemDetails;

  const getCloseDetailsQuery = () => {
    const newQuery: QueryParams = { ...query };
    delete newQuery.details;
    return newQuery;
  };

  return (
    imageData && (
      <div
        data-testid="result-details"
        className={styles.details}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ImageMagnifier imageUrl={extractImageData(imageData).imageUrl}></ImageMagnifier>
        <div className="font-pixelify mt-2 flex w-full flex-col justify-between text-sm">
          <p>Location: {extractImageData(imageData).location || 'Unknown'}</p>
          <p>Photo: {extractImageData(imageData).photographer || 'Unknown'}</p>
          <p>Date: {extractImageData(imageData).dateCreated || 'Unknown'}</p>
        </div>
        <Link
          href={{
            query: getCloseDetailsQuery(),
          }}
          className="font-pixelify absolute bottom-0 right-0 inline-block p-4 transition-all hover:scale-110"
          data-testid="close-details-button"
        >
          CLOSE ❌
        </Link>
      </div>
    )
  );
};
