import { render, screen, waitFor } from '@testing-library/react';
import { Pagination } from '../../components/Pagination';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { mockImageData } from '../mocks/mockImageData';
import userEvent from '@testing-library/user-event';
import { ImageData } from '../../api/types';
import { MockContextProvider } from '../mocks/MockContextProvider';

const mockRouter = createMemoryRouter(
  [
    {
      path: '/',
      element: <Pagination isLoading={false} />,
    },
    {
      path: '/details',
      element: <>Details</>,
    },
  ],
  {
    initialEntries: ['/'],
    initialIndex: 0,
  }
);

const mockImagesData: ImageData[] = [mockImageData];

describe('Testing Pagination component', () => {
  it('updates URL query parameter when page changes', async () => {
    render(
      <MockContextProvider mockImagesData={mockImagesData}>
        <RouterProvider router={mockRouter} />
      </MockContextProvider>
    );

    expect(mockRouter.state.location.pathname).toEqual('/');

    const nextButton = screen.getByText('Next');
    const prevButton = screen.getByText('Prev');

    userEvent.click(nextButton);
    await waitFor(() => {
      expect(mockRouter.state.location.search).toEqual('?page=2');
    });

    userEvent.click(prevButton);
    await waitFor(() => {
      expect(mockRouter.state.location.search).toEqual('');
    });
  });
});
