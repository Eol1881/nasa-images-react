import App from '@/pages';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getMockedItemDetails, getMockedSearchResult } from '../mocks/getMockedSearchResult';
import { extractImageData } from '@/utils/extractImageData';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

vi.mock('next/router', () => require('next-router-mock'));

describe('Testing ResultItem component', () => {
  it('renders the relevant ResultItem data', async () => {
    render(<App searchResults={getMockedSearchResult('single')} />);

    const { imageTitle, center, dateCreated } = extractImageData(getMockedItemDetails().imageData) || {};

    const resultItem = screen.getByTestId('result-item');
    expect(resultItem).toBeInTheDocument();

    const itemTitle = within(resultItem).getByText(imageTitle);
    expect(itemTitle).toBeInTheDocument();

    const itemCenter = within(resultItem).getByText(center);
    expect(itemCenter).toBeInTheDocument();

    const itemDateCreated = within(resultItem).getByText(dateCreated);
    expect(itemDateCreated).toBeInTheDocument();

    const img = within(resultItem).getByAltText(imageTitle);
    expect(img).toBeInTheDocument();
  });
  it('opens a detailed card component on click and changes the details url query parameter', async () => {
    const { rerender } = render(<App searchResults={getMockedSearchResult('single')} />, {
      wrapper: MemoryRouterProvider,
    });

    const resultItem = await screen.findByTestId('result-item');
    expect(resultItem).toBeInTheDocument();

    await userEvent.click(resultItem);

    expect(mockRouter).toMatchObject({
      query: { details: 'test-nasa-id' },
    });

    rerender(<App searchResults={getMockedSearchResult('single')} itemDetails={getMockedItemDetails()} />);
    const resultDetails = await screen.findByTestId('result-details');
    expect(resultDetails).toBeInTheDocument();
  });
});
