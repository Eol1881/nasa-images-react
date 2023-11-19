import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { handlers } from '../api/handlers';
import { singleSearchResponseMock } from '../api/responses';
import { HttpResponse, http } from 'msw';

import { routerConfig } from '../../App';
import { extractImageData } from '../../utils/extractImageData';
import store from '../../store/store';

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

const router = createMemoryRouter(routerConfig, {
  initialEntries: ['/?details=test-nasa-id'],
});

describe('Testing ResultDetails component', () => {
  it('displays a loading indicator while fetching data', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const message = screen.getByTestId('loader');
    expect(message).toBeInTheDocument();
  });
  it('correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const { location, imageUrl, dateCreated, photographer } =
      extractImageData(singleSearchResponseMock.collection.items[0]) || {};

    await waitFor(() => {
      screen.getByTestId('result-details');
    });

    const resultDetails = screen.getByTestId('result-details');
    expect(resultDetails).toBeInTheDocument();

    const itemLocation = within(resultDetails).getByText(RegExp(location, 'i'));
    expect(itemLocation).toBeInTheDocument();

    const itemDateCreated = within(resultDetails).getByText(RegExp(dateCreated, 'i'));
    expect(itemDateCreated).toBeInTheDocument();

    const itemPhotographer = within(resultDetails).getByText(RegExp(photographer, 'i'));
    expect(itemPhotographer).toBeInTheDocument();

    const img = within(resultDetails).getByAltText('NASA photo');
    expect(img).toHaveAttribute('src', imageUrl);
  });
  it('correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const closeButton = screen.getByTestId('close-details-button');
    const resultDetails = screen.getByTestId('result-details');

    expect(closeButton).toBeInTheDocument();
    expect(resultDetails).toBeInTheDocument();

    await userEvent.click(closeButton);
    expect(resultDetails).not.toBeInTheDocument();
  });
});
