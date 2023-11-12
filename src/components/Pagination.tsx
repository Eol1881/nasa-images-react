import React, { useContext } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchContext } from '../context/SearchContextProvider';

interface Props {
  isLoading: boolean;
}

export const Pagination: React.FC<Props> = ({ isLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { searchResults } = useContext(SearchContext);

  const totalPages = searchResults.totalPages || 1;
  const isNothingFound = !searchResults.imagesData.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page')) || 1;
  const isOnFirstPage = pageIndex === 1;
  const isOnLastPage = totalPages === pageIndex;

  const paginationHandler = (isNext: boolean) => {
    const newPageIndex = isNext ? pageIndex + 1 : pageIndex - 1;
    if (newPageIndex === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', newPageIndex.toString());
    }
    setSearchParams(searchParams);

    if (location.pathname === '/') return;
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  return (
    !isLoading &&
    !isNothingFound && (
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
    )
  );
};
