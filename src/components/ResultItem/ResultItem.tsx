import styles from './styles.module.css';

import React from 'react';
import { ImageData } from '@/types/api';
import { extractImageData } from '@/utils/extractImageData';
import Image from 'next/image';

interface Props {
  imageData: ImageData;
  isActive: boolean;
}
ImageData;
export const ResultItem: React.FC<Props> = ({ imageData, isActive }) => {
  const { imageUrl, imageTitle, center, dateCreated } = extractImageData(imageData) || {};

  return (
    <div className={`${styles.item} ${isActive && styles.itemActive}`} data-testid="result-item">
      <h5 className="h-12 text-center ">{imageTitle}</h5>

      <Image
        src={imageUrl}
        alt={imageTitle}
        className={`h-48 w-full object-cover`}
        width={0}
        height={0}
        sizes="100vw" // TODO: ???
      />

      <p>Center: {<span>{center}</span>}</p>
      <p>{dateCreated}</p>
    </div>
  );
};
