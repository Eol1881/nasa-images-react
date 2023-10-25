import { GetImagesDataResponse } from './types';

const PAGE_SIZE = 10;

export async function fetchData(page: number, searchQuery?: string) {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${
        searchQuery || ''
      }&media_type=image&page_size=${PAGE_SIZE}&page=${page}`
    );

    const data: GetImagesDataResponse = await response.json();
    return data.collection.items;
  } catch (error) {
    console.error(error);
  }
}
