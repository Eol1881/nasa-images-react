import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from '../../App';
import { MockContextProvider } from '../mocks/MockContextProvider';
import { Root } from '../../routes/Root';

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
      <MockContextProvider>
        <RouterProvider router={mockRouterNotExistent} />
      </MockContextProvider>
    );

    const errorPageComponent = screen.getByTestId('error-page');
    expect(errorPageComponent).toBeInTheDocument();
  });
  it('does not render ErrorPage on existent path', () => {
    render(
      <MockContextProvider>
        <RouterProvider router={mockRouterExistent} />
      </MockContextProvider>
    );

    const errorPageComponent = screen.queryByTestId('error-page');
    expect(errorPageComponent).not.toBeInTheDocument();
  });
});
