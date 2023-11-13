import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { mockImageData } from '../mocks/mockImageData';
import { routerConfig } from '../../App';
import { SearchContextProvider } from '../../context/SearchContextProvider';
import userEvent from '@testing-library/user-event';

const mockRouter = createMemoryRouter(routerConfig, {
  initialEntries: ['/'],
  initialIndex: 0,
});

vi.mock('../../api/api', () => ({
  fetchItemsFromApi: vi.fn().mockResolvedValue({ totalPages: 1, imagesData: [mockImageData] }),
}));

describe('Testing ThrowFakeErrorButton component', () => {
  it('renders ErrorBoundary on click', async () => {
    render(
      <SearchContextProvider>
        <RouterProvider router={mockRouter} />
      </SearchContextProvider>
    );

    const throwErrorButton = screen.getByTestId('throw-fake-error-button');

    await screen.findByText('Next');
    // await waitFor(() => {
    //   screen.debug();
    // });

    await userEvent.click(throwErrorButton);
    // await waitFor(() => {
    //   screen.debug();
    // });

    const errorPageComponent = screen.queryByTestId('error-boundary');
    expect(errorPageComponent).toBeInTheDocument();
  });
});
