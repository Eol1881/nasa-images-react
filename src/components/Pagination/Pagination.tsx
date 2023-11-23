import { QueryParams } from '@/types/general';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  isNothingFound: boolean;
  isLoading: boolean;
  totalPages?: number;
}

export const Pagination: React.FC<Props> = ({ isLoading, isNothingFound, totalPages = 1 }) => {
  const router = useRouter();
  const pageIndex = Number(router.query.page) || 1;

  const isOnFirstPage = pageIndex === 1;
  const isOnLastPage = totalPages === pageIndex;

  const paginationHandler = (isNext: boolean) => {
    const newPageIndex = isNext ? pageIndex + 1 : pageIndex - 1;
    const newQuery: QueryParams = { ...router.query };
    newPageIndex === 1 ? delete newQuery.page : (newQuery.page = newPageIndex.toString());
    delete newQuery.details;

    router.push({
      pathname: '/',
      query: newQuery,
    });
  };

  return (
    <div className="h-10">
      {!isLoading && !isNothingFound && (
        <div className=" flex justify-between pt-4 text-white">
          <div>
            Page: {pageIndex} / {totalPages}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                paginationHandler(false);
              }}
              disabled={isOnFirstPage}
              className={`transition-all ${isOnFirstPage ? 'text-red-500' : 'hover:text-sky-500'}`}
            >
              Prev
            </button>
            <button
              onClick={() => {
                paginationHandler(true);
              }}
              disabled={isOnLastPage}
              className={`transition-all ${isOnLastPage ? 'text-red-500' : 'hover:text-sky-500'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
