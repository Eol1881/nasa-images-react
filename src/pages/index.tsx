import Head from 'next/head';
import { Header } from '@/components/Header/Header';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { ResultList } from '@/components/ResultList/ResultList';
import { GetServerSideProps } from 'next';
import { NasaApiResponse, SearchResults } from '@/types/api';
import { APP_CONFIG } from '@/constants/constants';
import { Pagination } from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PixelifyFont } from '@/assets/fonts';

export const getServerSideProps = (async (context) => {
  const { query } = context;
  const searchQuery = query.search || '';
  const selectedPageSize = query.size || APP_CONFIG.DEFAULT_PAGE_SIZE;
  const pageIndex = query.page || 1;

  const res = await fetch(
    `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image&page_size=${selectedPageSize}&page=${pageIndex}`
  );
  const nasaApiResponse: NasaApiResponse = await res.json();
  const searchResults: SearchResults = {
    imagesData: nasaApiResponse.collection.items,
    totalPages: Math.ceil(nasaApiResponse.collection.metadata.total_hits / +selectedPageSize),
  };
  return {
    props: {
      searchResults,
    },
  };
}) satisfies GetServerSideProps<{
  searchResults: SearchResults;
}>;

export default function Main({ searchResults }: { searchResults: SearchResults }) {
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
      <div className={`container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2 ${PixelifyFont.className}`}>
        <Header />
        <ErrorBoundary>
          <ResultList isLoading={isLoading} imagesData={imagesData} />
          <Pagination isLoading={isLoading} totalPages={totalPages} isNothingFound={isNothingFound} />
        </ErrorBoundary>
      </div>
    </>
  );
}
