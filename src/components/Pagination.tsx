import React, { useContext } from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContextProvider';

export const Pagination: React.FC = () => {
  const { searchResults } = useContext(SearchContext);

  const totalPages = searchResults.totalPages || 1;
  const isNothingFound = !searchResults.imagesData.length;

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
    navigate(`/?${searchParams}`);
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
