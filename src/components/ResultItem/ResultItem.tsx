import styles from './styles.module.css';

import React from 'react';
import { ImageData } from '@/types/api';
import { extractImageData } from '@/utils/extractImageData';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  imageData: ImageData;
}

export const ResultItem: React.FC<Props> = ({ imageData }) => {
  const router = useRouter();
  const { imageUrl, imageTitle, nasaId, center, dateCreated } = extractImageData(imageData) || {};

  const isActive = nasaId === router.query.details;

  return (
    <Link
      className={`${styles.item} ${isActive && styles.itemActive}`}
      data-testid="result-item"
      href={{
        query: { ...router.query, details: nasaId },
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      scroll={false}
    >
      <h5 className="h-12 text-center ">{imageTitle}</h5>

      <Image
        src={imageUrl}
        alt={imageTitle}
        className={`h-48 w-full object-cover`}
        width={0}
        height={0}
        sizes="100vw"
      />

      <p>Center: {<span>{center}</span>}</p>
      <p>{dateCreated}</p>
    </Link>
  );
};
