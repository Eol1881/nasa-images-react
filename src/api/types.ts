export interface SearchResults {
  totalPages?: number;
  imagesData: ImageData[];
}

export interface NasaApiRespone {
  collection: {
    metadata: {
      total_hits: number;
    };
    items: ImageData[];
  };
}

export interface ImageData {
  href: string;
  data: [
    {
      center: string;
      title: string;
      photographer: string;
      keywords: string[];
      location: string;
      nasa_id: string;
      media_type: string;
      date_created: string;
      description: string;
    },
  ];
  metadata: {
    total_hits: number;
  };
  links?: [
    {
      href: string;
      rel: string;
      render: string;
    },
  ];
}
