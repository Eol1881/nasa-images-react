import { SearchResults, NasaApiRespone } from './types';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export async function fetchItemsFromApi(page: number, pageSize: number, searchQuery: string): Promise<SearchResults> {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image&page_size=${pageSize}&page=${page}`
    );

    const data: NasaApiRespone = await response.json();

    return {
      imagesData: data.collection.items,
      totalPages: Math.ceil(data.collection.metadata.total_hits / pageSize),
    };
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    throw new Error(`Network Error! [ ${errorMessage} ]`);
  }
}

export async function fetchDetailsFromApi(nasaID: string): Promise<SearchResults> {
  try {
    const response = await fetch(`https://images-api.nasa.gov/search?nasa_id=${nasaID}&media_type=image`);

    const data: NasaApiRespone = await response.json();

    return {
      imagesData: data.collection.items,
      totalPages: 1,
    };
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    throw new Error(`Network Error! [ ${errorMessage} ]`);
  }
}
