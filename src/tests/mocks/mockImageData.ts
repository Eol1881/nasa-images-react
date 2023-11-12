import { ImageData } from '../../api/types';

export const mockImageData: ImageData = {
  href: 'test-url',
  data: [
    {
      center: 'test-center',
      title: 'test-title',
      photographer: 'test-photographer',
      keywords: ['test-keyword1', 'test-keyword2'],
      location: 'test-location',
      nasa_id: `test-id-${Date.now().toString()}`,
      media_type: 'test-mediatype',
      date_created: '01.01.2000',
      description: 'test-description',
    },
  ],
  metadata: {
    total_hits: 1,
  },
  links: [
    {
      href: 'test-link-url',
      rel: 'test-rel',
      render: 'test-render',
    },
  ],
};
