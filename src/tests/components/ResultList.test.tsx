import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setupServer } from 'msw/node';
import { handlers } from '../api/handlers';
import { HttpResponse, http } from 'msw';
import { emptySearchResponseMock, searchResponseMock } from '../api/responses';

import store from '../../store/store';
import { nasaApiSlice } from '../../api/nasaApiSlice';
import { ResultList } from '../../components/ResultList';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(nasaApiSlice.util.resetApiState());
});
beforeEach(() => {
  server.resetHandlers();
  store.dispatch(nasaApiSlice.util.resetApiState());
});
afterAll(() => server.close());

describe('Testing ResultList component', () => {
  it('renders the correct number of ResultItem components', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultList />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      screen.getAllByTestId('result-item');
    });

    const resultItems = screen.getAllByTestId('result-item');

    expect(resultItems.length).toBe(searchResponseMock.collection.items.length);
  });
  it('displays Loader component when loading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultList />
        </MemoryRouter>
      </Provider>
    );
    const message = screen.getByTestId('loader');
    expect(message).toBeInTheDocument();
  });
  it('displays the appropriate message when no ResultItem is present', async () => {
    server.use(
      http.get(`https://images-api.nasa.gov/search*`, () => {
        return HttpResponse.json(emptySearchResponseMock, {
          status: 200,
        });
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultList />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      screen.getByTestId('nothing-found');
    });

    const message = screen.getByTestId('nothing-found');
    expect(message).toBeInTheDocument();
  });
});
