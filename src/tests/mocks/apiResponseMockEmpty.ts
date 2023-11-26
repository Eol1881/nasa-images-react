import { NasaApiResponse } from '@/types/api';

export const apiResponseMockEmpty: NasaApiResponse = {
  collection: {
    metadata: {
      total_hits: 0,
    },
    items: [],
  },
};
