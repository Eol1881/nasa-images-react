import { useNavigate, useSearchParams } from 'react-router-dom';
import { APP_CONFIG } from '../constants';

export function PageSizeSelect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPageSize = searchParams.get('size') || APP_CONFIG.DEFAULT_PAGE_SIZE;

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value === APP_CONFIG.DEFAULT_PAGE_SIZE.toString()) newSearchParams.delete('size');
    else newSearchParams.set('size', e.target.value);

    newSearchParams.delete('page');

    if (newSearchParams.toString() === searchParams.toString()) return;
    navigate(`/?${newSearchParams}`);
  };

  return (
    <select
      id="countries"
      className="text-md block cursor-pointer bg-gray-700 px-2 font-pixelify text-white focus:outline-none focus:ring-blue-500"
      onChange={changeHandler}
      value={currentPageSize.toString()}
    >
      {APP_CONFIG.PAGE_SIZES.map((pageSize) => {
        return (
          <option key={pageSize} value={pageSize.toString()}>
            {pageSize}
          </option>
        );
      })}
    </select>
  );
}
