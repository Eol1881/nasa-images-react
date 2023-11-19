import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { setupServer } from 'msw/node';
import { handlers } from '../api/handlers';
import { HttpResponse, http } from 'msw';
import { searchResponseMock, singleSearchResponseMock } from '../api/responses';

import { ResultItem } from '../../components/ResultItem';
import { extractImageData } from '../../utils/extractImageData';
import { routerConfig } from '../../App';
import store from '../../store/store';

const router = createMemoryRouter(routerConfig, {
  initialEntries: ['/?search=moon'],
});

const mockImageData = searchResponseMock.collection.items[0];

const server = setupServer(...handlers);

server.use(
  http.get(`https://images-api.nasa.gov/search*`, () => {
    return HttpResponse.json(singleSearchResponseMock, {
      status: 200,
    });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Testing ResultList component', () => {
  it('renders the relevant ResultItem data', async () => {
    render(
      <MemoryRouter>
        <ResultItem imageData={mockImageData} isActive={false} />
      </MemoryRouter>
    );

    const { imageUrl, imageTitle, center, dateCreated } = extractImageData(mockImageData) || {};

    await waitFor(() => {
      screen.getByTestId('result-item');
    });

    const resultItem = screen.getByTestId('result-item');
    expect(resultItem).toBeInTheDocument();

    const itemTitle = within(resultItem).getByText(imageTitle);
    expect(itemTitle).toBeInTheDocument();

    const itemCenter = within(resultItem).getByText(center);
    expect(itemCenter).toBeInTheDocument();

    const itemDateCreated = within(resultItem).getByText(dateCreated);
    expect(itemDateCreated).toBeInTheDocument();

    const img = within(resultItem).getByAltText(imageTitle);
    expect(img).toHaveAttribute('src', imageUrl);
  });
  it('opens a detailed card component on click and triggers an additional API call', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const resultItem = await screen.findByTestId('result-item');
    expect(resultItem).toBeInTheDocument();

    await userEvent.click(resultItem);

    const resultDetails = await screen.findByTestId('result-details');
    expect(resultDetails).toBeInTheDocument();
  });
});
