import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GlobalState } from '../store/store';

export const Pagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page')) || 1;

  const isLoading = useSelector((state: GlobalState) => state.loading.isResultsLoading);
  const searchResults = useSelector((state: GlobalState) => state.search.searchResults);

  const totalPages = searchResults.totalPages || 1;
  const isOnFirstPage = pageIndex === 1;
  const isOnLastPage = totalPages === pageIndex;
  const isNothingFound = !searchResults.imagesData?.length;

  const paginationHandler = (isNext: boolean) => {
    const newPageIndex = isNext ? pageIndex + 1 : pageIndex - 1;
    const newSearchParams = new URLSearchParams(searchParams);
    if (newPageIndex === 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', newPageIndex.toString());
    }
    newSearchParams.delete('details');
    if (newSearchParams.toString() === searchParams.toString()) return;
    setSearchParams(newSearchParams);
  };

  return (
    <div className="h-10">
      {!isLoading && !isNothingFound && (
        <div className="flex justify-between pt-4 font-pixelify text-white">
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
