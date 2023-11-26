import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '@/pages';
import { getMockedItemDetails, getMockedSearchResult } from '../mocks/getMockedSearchResult';
import { extractImageData } from '@/utils/extractImageData';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

vi.mock('next/router', () => require('next-router-mock'));

describe('Testing ResultDetails component', () => {
  it('correctly displays the detailed card data', () => {
    render(<App searchResults={getMockedSearchResult('single')} itemDetails={getMockedItemDetails()} />);

    const { location, imageUrl, dateCreated, photographer } = extractImageData(getMockedItemDetails().imageData) || {};

    const resultDetails = screen.getByTestId('result-details');
    expect(resultDetails).toBeInTheDocument();

    const itemLocation = within(resultDetails).getByText(RegExp(location, 'i'));
    expect(itemLocation).toBeInTheDocument();

    const itemDateCreated = within(resultDetails).getByText(RegExp(dateCreated, 'i'));
    expect(itemDateCreated).toBeInTheDocument();

    const itemPhotographer = within(resultDetails).getByText(RegExp(photographer, 'i'));
    expect(itemPhotographer).toBeInTheDocument();

    const img = within(resultDetails).getByAltText('NASA photo');
    expect(img).toHaveAttribute('src', imageUrl);
  });
  it('mounts and unmounts correctly', async () => {
    const nasaId = getMockedItemDetails().imageData.data[0].nasa_id;

    mockRouter.push({
      query: {
        details: nasaId,
      },
    });

    const { rerender } = render(
      <App searchResults={getMockedSearchResult('single')} itemDetails={getMockedItemDetails()} />,
      { wrapper: MemoryRouterProvider }
    );

    const resultDetails = screen.getByTestId('result-details');
    const closeButton = screen.getByTestId('close-details-button');
    const overlay = screen.getByTestId('main');
    const resultItem = screen.getByTestId('result-item');

    await userEvent.click(closeButton);
    rerender(<App searchResults={getMockedSearchResult('single')} />);
    expect(mockRouter).toMatchObject({
      query: {},
    });
    expect(resultDetails).not.toBeInTheDocument();

    await userEvent.click(resultItem);
    rerender(<App searchResults={getMockedSearchResult('single')} itemDetails={getMockedItemDetails()} />);
    expect(mockRouter).toMatchObject({
      query: { details: nasaId },
    });
    expect(screen.getByTestId('result-details')).toBeInTheDocument();

    await userEvent.click(overlay);
    rerender(<App searchResults={getMockedSearchResult('single')} />);
    expect(mockRouter).toMatchObject({
      query: {},
    });
    expect(screen.queryByTestId('result-details')).not.toBeInTheDocument();
  });
});
