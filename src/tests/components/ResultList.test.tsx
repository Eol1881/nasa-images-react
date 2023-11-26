import App from '@/pages';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getMockedSearchResult } from '../mocks/getMockedSearchResult';

vi.mock('next/router', () => require('next-router-mock'));

describe('Testing ResultList component', () => {
  it('renders the correct number of ResultItem components', async () => {
    render(<App searchResults={getMockedSearchResult()} />);

    const resultItems = screen.getAllByTestId('result-item');
    expect(resultItems.length).toBe(getMockedSearchResult().imagesData.length);
  });
  it('displays the appropriate message when no ResultItem is present', async () => {
    render(<App searchResults={getMockedSearchResult('empty')} />);

    const message = screen.getByTestId('nothing-found');
    expect(message).toBeInTheDocument();
  });
});
