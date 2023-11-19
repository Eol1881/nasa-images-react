import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { routerConfig } from '../../App';
import { Root } from '../../routes/Root';
import store from '../../store/store';

const testRouterConfig = routerConfig.map((route) => {
  if (route.element.type === Root) {
    return { ...route, element: <>Mock Root</> };
  }
  return route;
});

const mockRouterNotExistent = createMemoryRouter(testRouterConfig, {
  initialEntries: ['/non-existent-path'],
  initialIndex: 0,
});

const mockRouterExistent = createMemoryRouter(testRouterConfig, {
  initialEntries: ['/'],
  initialIndex: 0,
});

describe('Testing 404 page component', () => {
  it('renders ErrorPage on non-existent path', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={mockRouterNotExistent} />
      </Provider>
    );

    const errorPageComponent = screen.getByTestId('error-page');
    expect(errorPageComponent).toBeInTheDocument();
  });
  it('does not render ErrorPage on existent path', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={mockRouterExistent} />
      </Provider>
    );

    const errorPageComponent = screen.queryByTestId('error-page');
    expect(errorPageComponent).not.toBeInTheDocument();
  });
});
