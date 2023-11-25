import { APP_CONFIG } from '@/constants/constants';
import { ItemDetails, NasaApiResponse, SearchResults } from '@/types/api';
import { ParsedUrlQuery } from 'querystring';

export async function fetchNasaData(query: ParsedUrlQuery) {
  const searchQuery = query.search || '';
  const selectedPageSize = query.size || APP_CONFIG.DEFAULT_PAGE_SIZE;
  const pageIndex = query.page || 1;
  const nasaId = query.details;

  const res = await fetch(
    `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image&page_size=${selectedPageSize}&page=${pageIndex}`
  );
  const nasaApiResponse: NasaApiResponse = await res.json();
  const searchResults: SearchResults = {
    imagesData: nasaApiResponse.collection.items,
    totalPages: Math.ceil(nasaApiResponse.collection.metadata.total_hits / +selectedPageSize),
  };
  const data: { searchResults: SearchResults; itemDetails?: ItemDetails } = {
    searchResults,
  };

  if (nasaId) {
    const res = await fetch(`https://images-api.nasa.gov/search?nasa_id=${nasaId}&media_type=image`);
    const nasaApiResponse: NasaApiResponse = await res.json();
    const itemDetails: ItemDetails = {
      imageData: nasaApiResponse.collection.items[0],
    };
    data.itemDetails = itemDetails;
  }
  return data;
}
