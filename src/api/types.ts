export interface GetImagesDataResponse {
  collection: {
    version: string;
    href: string;
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
  links?: [
    {
      href: string;
      rel: string;
      render: string;
    },
  ];
}
