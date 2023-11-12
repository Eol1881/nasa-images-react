import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ResultList } from '../../components/ResultList';
import { ImageData } from '../../api/types';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { mockImageData } from '../mocks/mockImageData';
import { MockContextProvider } from '../mocks/MockContextProvider';

const mockRouter = createMemoryRouter(
  [
    {
      path: '/',
      element: <ResultList isLoading={false} />,
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

describe('Testing ResultList component', () => {
  it('renders the correct number of ResultItem components', () => {
    render(
      <MockContextProvider mockImagesData={mockImagesData}>
        <RouterProvider router={mockRouter} />
      </MockContextProvider>
    );

    const resultItems = screen.getAllByTestId('result-item');

    expect(resultItems.length).toBe(mockImagesData.length);
  });
  it('displays the appropriate message when no ResultItem is present', () => {
    render(<ResultList isLoading={false} />);
    const message = screen.getByText(/NOTHING FOUND/i);
    expect(message).toBeInTheDocument();
  });
});
