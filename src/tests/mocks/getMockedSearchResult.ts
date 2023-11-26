import { apiResponseMock } from './apiResponseMock';
import { apiResponseMockSingle } from './apiresponseMockSingle';
import { apiResponseMockEmpty } from './apiResponseMockEmpty';
import { ItemDetails, SearchResults } from '@/types/api';

export const getMockedSearchResult = (resultType?: 'empty' | 'single'): SearchResults => {
  switch (resultType) {
    case 'empty':
      return {
        totalPages: 0,
        imagesData: apiResponseMockEmpty.collection.items,
      };
    case 'single':
      return {
        totalPages: 1,
        imagesData: apiResponseMockSingle.collection.items,
      };
    default:
      return {
        totalPages: 10,
        imagesData: apiResponseMock.collection.items,
      };
  }
};

export const getMockedItemDetails = (): ItemDetails => {
  return {
    imageData: apiResponseMock.collection.items[0],
  };
};
