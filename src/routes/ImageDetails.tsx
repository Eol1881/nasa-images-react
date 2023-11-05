import { Params, useLoaderData, useSearchParams } from 'react-router-dom';
import { fetchDetailsFromApi } from '../api/api';
import { SearchResults } from '../api/types';
import { Link } from 'react-router-dom';
import { ImageMagnifier } from '../components/ImageMagnifier';
import { extractImageData } from '../utils/extractImageData';

export async function detailsLoader({ params }: { params: Params }) {
  const nasaId = params.id;
  return fetchDetailsFromApi(nasaId || '');
}

export function ImageDetails() {
  const [searchParams] = useSearchParams();
  const searchResults = useLoaderData() as SearchResults;
  const imageData = searchResults.imagesData[0];
  const { imageUrl, location, photographer, dateCreated } = extractImageData(imageData);

  return (
    <div className="relative flex h-fit w-fit basis-full select-none flex-col items-center justify-between rounded-l-lg bg-blue-300/25 p-4 pb-5 md:basis-2/3 lg:basis-2/5">
      <ImageMagnifier key={imageUrl} imageUrl={imageUrl}></ImageMagnifier>

      <div className="mt-2 flex w-full flex-col justify-between font-pixelify text-sm">
        <p>Location: {location || 'Unknown'}</p>
        <p>Photo: {photographer || 'Unknown'}</p>
        <p>Date: {dateCreated || 'Unknown'}</p>
      </div>
      <Link
        to={{ pathname: '/', search: searchParams.toString() }}
        className=" absolute bottom-0 right-0 inline-block p-4 font-pixelify transition-all hover:scale-110"
      >
        CLOSE ❌
      </Link>
    </div>
  );
}
