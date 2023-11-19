import { render, screen } from '@testing-library/react';
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

describe('Testing ThrowFakeErrorButton component', () => {
  it('renders ErrorBoundary on click', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={mockRouter} />
      </Provider>
    );

    const throwErrorButton = screen.getByTestId('throw-fake-error-button');

    await screen.findByText('Next');

    await userEvent.click(throwErrorButton);

    const errorPageComponent = screen.queryByTestId('error-boundary');
    expect(errorPageComponent).toBeInTheDocument();
  });
});
