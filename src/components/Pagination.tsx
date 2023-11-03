import { useSearchParams } from 'react-router-dom';

interface Props {
  totalPages: number;
}

export function Pagination(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page')) || 1;
  const { totalPages } = props;

  const paginationHandler = (isNext: boolean) => {
    const newPageIndex = isNext ? pageIndex + 1 : pageIndex - 1;
    if (newPageIndex === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', newPageIndex.toString());
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-between pt-4 font-pixelify text-white">
      <div>
        Page: {pageIndex} / {totalPages}
      </div>
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
          disabled={totalPages === pageIndex}
          className={`${totalPages === pageIndex ? 'text-red-500' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
