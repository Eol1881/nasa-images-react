import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from '../../App';
import { SearchContextProvider } from '../../context/SearchContextProvider';

const mockRouterNotExistent = createMemoryRouter(routerConfig, {
  initialEntries: ['/non-existent-path'],
  initialIndex: 0,
});

const mockRouterExistent = createMemoryRouter(routerConfig, {
  initialEntries: ['/'],
  initialIndex: 0,
});

describe('Testing 404 page component', () => {
  it('renders ErrorPage on non-existent path', () => {
    render(
      <SearchContextProvider>
        <RouterProvider router={mockRouterNotExistent} />
      </SearchContextProvider>
    );

    const errorPageComponent = screen.getByTestId('error-page');
    expect(errorPageComponent).toBeInTheDocument();
  });
  it('does not render ErrorPage on existent path', () => {
    render(
      <SearchContextProvider>
        <RouterProvider router={mockRouterExistent} />
      </SearchContextProvider>
    );

    const errorPageComponent = screen.queryByTestId('error-page');
    expect(errorPageComponent).not.toBeInTheDocument();
  });
});
