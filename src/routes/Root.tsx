import React, { memo } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ResultList } from '../components/ResultList';
import { Pagination } from '../components/Pagination';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ThrowFakeErrorButton } from '../components/ThrowFakeErrorButton';

export const Root: React.FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBackdropClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    if (newSearchParams.toString() === searchParams.toString()) return;
    setSearchParams(newSearchParams);
  };

  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2">
      <ThrowFakeErrorButton />
      <Header />
      <ErrorBoundary>
        <section
          className="main relative mt-4 flex justify-between rounded-lg bg-white px-2 py-5 shadow-md sm:px-4"
          onClick={handleBackdropClick}
        >
          <ResultList />
          <Outlet />
        </section>
        <Pagination />
      </ErrorBoundary>
    </div>
  );
});
