import { ImageData } from '../../api/types';

export const getMockSearchContext = (mockImagesData: ImageData[]) => {
  return {
    searchResults: {
      imagesData: mockImagesData,
      totalPages: 228,
    },
    shouldThrowError: false,
    searchQuery: '',
    setSearchQuery: () => {},
    setSearchResults: () => {},
    setShouldThrowError: () => {},
  };
};
