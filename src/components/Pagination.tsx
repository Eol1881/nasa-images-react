import { useSearchParams } from 'react-router-dom';

export function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || localStorage.getItem('nasa-search-query') || '';

  const paginationHandler = (isNext: boolean) => {
    const searchParams = new URLSearchParams();
    searchParams.set('search', searchQuery);
    searchParams.set('page', isNext ? (pageIndex + 1).toString() : (pageIndex - 1).toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-between pt-4 font-pixelify text-white">
      <div>Page: {pageIndex}</div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            paginationHandler(false);
          }}
          disabled={pageIndex === 1}
          className={`${pageIndex === 1 ? 'text-red-500' : ''}`}
        >
          Prev
        </button>
        <button
          onClick={() => {
            paginationHandler(true);
          }}
          disabled={pageIndex === 999} // TODO: fix
          className={`${pageIndex === 999 ? 'text-red-500' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
