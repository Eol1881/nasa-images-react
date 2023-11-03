import { SearchResults, NasaApiRespone } from './types';
import { getErrorMessage } from '../utils/getErrorMessage';

const PAGE_SIZE = 13;

export async function fetchData(page: number, searchQuery?: string): Promise<SearchResults> {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${
        searchQuery || ''
      }&media_type=image&page_size=${PAGE_SIZE}&page=${page}`
    );

    const data: NasaApiRespone = await response.json();

    return {
      imagesData: data.collection.items,
      totalPages: Math.ceil(data.collection.metadata.total_hits / PAGE_SIZE),
    };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(`Network Error! [ ${errorMessage} ]`);
  }
}
