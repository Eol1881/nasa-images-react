import { NasaApiResponse } from '@/types/api';

export const apiResponseMockSingle: NasaApiResponse = {
  collection: {
    metadata: {
      total_hits: 0,
    },
    items: [
      {
        href: '',
        data: [
          {
            center: 'HQ',
            title: 'Expedition 28 Preflight',
            photographer: 'NASA/Roscosmos/Andrey Shelepin',
            keywords: [
              'Baikonur',
              'Expedition 28',
              'Expedition 28 Preflight',
              'JAXA (Japan Aerospace Exploration Agency)',
              'Kazakhstan',
              'Mike Fossum',
              'ROSCOSMOS (Russian Federal Space Agency)',
              'Satoshi Furukawa',
              'Sergei Volkov',
            ],
            location: 'Baikonur Cosmodrome',
            nasa_id: 'test-nasa-id',
            media_type: 'image',
            date_created: '2011-06-07T00:00:00Z',
            description:
              'Expedition 28 NASA Flight Engineer Mike Fossum, left, Soyuz Commander Sergei Volkov of Russia, and JAXA (Japan Aerospace Exploration Agency) Flight Engineer Satoshi Furukawa, right, have their Russian Sokol suits prepared for launch by a technicians at the Baikonur Cosmodrome in Baikonur, Kazakhstan, Tueday, June 7, 2011.  Fossum, Volkov and Furukawa and launched in their Soyuz TMA-02M rocket from the Baikonur Cosmodrome in Kazakhstan the following morning on June 8th. Photo Credit: (NASA/Roscosmos/Andrey Shelepin)',
          },
        ],
        links: [
          {
            href: '/asd',
            rel: 'preview',
            render: 'image',
          },
        ],
      },
    ],
  },
};
