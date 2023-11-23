import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import { extractImageData } from '@/utils/extractImageData';
import { ImageData } from '@/types/api';
import { ResultItem } from '../ResultItem/ResultItem';
import { useSearchParams } from 'next/navigation';
import { Loader } from '../Loader/Loader';

// export default function Page({ searchResults }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return searchResults.imagesData;
// }

interface Props {
  imagesData: ImageData[];
  isLoading: boolean;
}
useSearchParams;
export const ResultList: React.FC<Props> = ({ imagesData, isLoading }) => {
  const shouldThrowError = false;

  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
    setErrorFlag(shouldThrowError);
  }, [shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');
  return (
    <main className={styles.main}>
      {isLoading && <Loader />}
      <div className={'flex w-fit flex-wrap justify-evenly gap-4'}>
        {imagesData &&
          imagesData.map((imageData) => (
            <ResultItem key={extractImageData(imageData).nasaId} isActive={false} imageData={imageData} />
          ))}
        {!imagesData?.length && (
          <div className={` text-2xl text-red-700`} data-testid="nothing-found">
            NOTHING FOUND
          </div>
        )}
      </div>
    </main>
  );
};
