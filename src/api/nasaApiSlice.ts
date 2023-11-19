import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NasaApiResponse, SearchResults } from '../types/api';

interface GetItemsPayload {
  searchQuery: string;
  pageSize: number;
  page: number;
}

interface GetItemPayload {
  nasaId: string;
}

export const nasaApiSlice = createApi({
  reducerPath: 'nasaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://images-api.nasa.gov/' }),
  endpoints: (build) => ({
    getItems: build.query<SearchResults, GetItemsPayload>({
      query: ({ searchQuery, pageSize, page }) =>
        `search?q=${searchQuery}&media_type=image&page_size=${pageSize}&page=${page}`,
      transformResponse: (response: NasaApiResponse, meta, args) => {
        const searchResults = {
          imagesData: response.collection.items,
          totalPages: Math.ceil(response.collection.metadata.total_hits / args.pageSize),
        };
        return searchResults;
      },
    }),
    getItem: build.query<SearchResults, GetItemPayload>({
      query: ({ nasaId }) => `search?nasa_id=${nasaId}&media_type=image`,
      transformResponse: (response: NasaApiResponse) => {
        const searchResults = {
          imagesData: response.collection.items,
        };
        return searchResults;
      },
    }),
  }),
});

export const { useGetItemsQuery, useGetItemQuery } = nasaApiSlice;
