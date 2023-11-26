import Head from 'next/head';
import { Header } from '@/components/Header/Header';
import { ResultList } from '@/components/ResultList/ResultList';
import { GetServerSideProps } from 'next';
import { ItemDetails, SearchResults } from '@/types/api';
import { Pagination } from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ResultDetails } from '@/components/ResultDetails/ResultDetails';
import { MainWrapper } from '@/components/MainWrapper/MainWrapper';
import { fetchNasaData } from './api/fetchNasaData';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

export interface GsspResult {
  searchResults: SearchResults;
  itemDetails?: ItemDetails;
}

export const getServerSideProps = (async (context) => {
  try {
    const { query } = context;

    const data = await fetchNasaData(query);

    return {
      props: data,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<GsspResult>;

export default function App({ searchResults, itemDetails }: GsspResult) {
  const { imagesData, totalPages } = searchResults;
  const isNothingFound = !imagesData?.length;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>NASA Images</title>
        <link rel="icon" type="image/svg+xml" href="nasa-logo.svg" />
      </Head>

      <ErrorBoundary>
        <Header />
        <MainWrapper>
          <ResultList isLoading={isLoading} imagesData={imagesData} />
          <ResultDetails itemDetails={itemDetails} />
        </MainWrapper>
        <Pagination isLoading={isLoading} totalPages={totalPages} isNothingFound={isNothingFound} />
      </ErrorBoundary>
    </>
  );
}
