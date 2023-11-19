import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import store from '../../store/store';
import { Provider } from 'react-redux';

import { routerConfig } from '../../App';

const mockRouter = createMemoryRouter(routerConfig, {
  initialEntries: ['/'],
  initialIndex: 0,
});

describe('Testing Pagination component', () => {
  it('updates URL query parameter when page changes', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={mockRouter} />
      </Provider>
    );

    expect(mockRouter.state.location.pathname).toEqual('/');

    await waitFor(() => {
      screen.getByText('Next');
    });

    const nextButton = screen.getByText('Next');

    await userEvent.click(nextButton);

    expect(mockRouter.state.location.search).toEqual('?page=2');

    await waitFor(() => {
      screen.getByText('Prev');
    });

    const prevButton = screen.getByText('Prev');

    await userEvent.click(prevButton);

    expect(mockRouter.state.location.search).toEqual('');
  });
});
