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
      center: string; // 'AFRC';
      title: string; //'X-40A on runway after Free Flight #2A';
      photographer: string; //'NASA/Tony Landis';
      keywords: string[]; // ['X-40A', 'FF#2A', 'Free Flight #2A'];
      location: string; //'AFRC';
      nasa_id: string; //'EC01-0107-05';
      media_type: string; //'image';
      date_created: string; //'2001-04-12T00:00:00Z';
      description: string; //'Second free-flight of the X-40A at the NASA Dryden Flight Research Center, on Edwards AFB, Calif., was made on Apr. 12, 2001. The unpowered X-40A, an 85 percent scale risk reduction version of the proposed X-37, is proving the capability of an autonomous flight control and landing system in a series of glide flights at Edwards. The April 12 flight introduced complex vehicle maneuvers during the landing sequence. The X-40A was released from an Army Chinook helicopter flying 15,050 feet overhead. Ultimately, the unpiloted X-37 is intended as an orbital testbed and technology demonstrator, capable of landing like an airplane and being quickly serviced for a follow-up mission.';
    },
  ];
  links?: [
    {
      href: string; //'https://images-assets.nasa.gov/image/EC01-0107-05/EC01-0107-05~thumb.jpg';
      rel: string; //'preview';
      render: string; //'image';
    },
  ];
}
