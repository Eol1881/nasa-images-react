import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from '@/components/Header/Header';
import mockRouter from 'next-router-mock';
import { QueryParams } from '@/types/general';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', () => require('next-router-mock'));

const mockQueryParameters: QueryParams = {
  search: 'example',
  page: '10',
  size: '20',
  details: 'details-id',
};

describe('Testing Header component', () => {
  it('adds SEARCH url query parameter on search submit', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

    await user.type(searchInput, 'example{enter}');
    expect(mockRouter).toMatchObject({
      query: { search: 'example' },
    });

    await user.clear(searchInput);
    await user.type(searchInput, 'example-2');
    await user.click(searchButton);
    expect(mockRouter).toMatchObject({
      query: { search: 'example-2' },
    });
  });
  it('removes SEARCH url query parameter on reset click and clears the input', async () => {
    const user = userEvent.setup();
    mockRouter.push({
      query: mockQueryParameters,
    });
    render(<Header />);

    const resetButton = screen.getByTestId('reset-button');
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

    await user.click(resetButton);

    expect(mockRouter).toMatchObject({
      query: {},
    });
    expect(searchInput.value).toBe('');
  });
  it('resets PAGE and DETAILS url query parameters on search submit', async () => {
    const user = userEvent.setup();
    mockRouter.push({
      query: mockQueryParameters,
    });
    render(<Header />);

    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

    searchInput.value = 'example';
    await user.click(searchButton);

    expect(mockRouter).toMatchObject({
      query: {
        size: '20',
        search: 'example',
      },
    });
  });
  it('updates SIZE url query parameter on page size change', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const pageSizeSelect = screen.getByTestId('page-size-select') as HTMLSelectElement;

    await user.selectOptions(pageSizeSelect, '15');

    expect(mockRouter).toMatchObject({
      query: {
        size: '15',
      },
    });
  });
  it('does not re-render or update URL query params if there is no changes', async () => {
    const user = userEvent.setup();

    const mockQueryParametersWithoutSearch = mockQueryParameters;
    delete mockQueryParametersWithoutSearch.search;
    mockRouter.push({
      query: mockQueryParametersWithoutSearch,
    });

    let renderCount = 0;
    const ParentComponent = () => {
      renderCount += 1;
      return <Header />;
    };

    const { rerender } = render(<ParentComponent />);

    const resetButton = screen.getByTestId('reset-button');
    const searchButton = screen.getByTestId('search-button');
    const pageSizeSelect = screen.getByTestId('page-size-select') as HTMLSelectElement;

    await user.selectOptions(pageSizeSelect, '20');

    expect(mockRouter).toMatchObject({
      query: mockQueryParametersWithoutSearch,
    });

    for (let i = 0; i < 5; i += 1) {
      await user.click(searchButton);
    }

    expect(mockRouter).toMatchObject({
      query: mockQueryParametersWithoutSearch,
    });

    for (let i = 0; i < 5; i += 1) {
      await user.click(resetButton);
    }

    expect(renderCount).toBe(1);
    await user.selectOptions(pageSizeSelect, '15');
    rerender(<ParentComponent />);
    expect(renderCount).toBe(2);
  });
});
