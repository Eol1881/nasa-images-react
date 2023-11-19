import { HttpResponse, delay, http } from 'msw';
import { searchResponseMock } from './responses';

export const handlers = [
  http.get(`https://images-api.nasa.gov/search*`, async () => {
    await delay(250);
    return HttpResponse.json(searchResponseMock, {
      status: 200,
    });
  }),
];
