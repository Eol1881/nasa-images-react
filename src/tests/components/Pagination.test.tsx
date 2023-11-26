import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import App from '@/pages';
import { getMockedSearchResult } from '../mocks/getMockedSearchResult';

vi.mock('next/router', () => require('next-router-mock'));

describe('Testing Pagination component', () => {
  it('updates URL query parameter when page changes', async () => {
    render(<App searchResults={getMockedSearchResult()} />);

    const nextButton = await screen.findByText('Next');
    const prevButton = await screen.findByText('Prev');

    await userEvent.click(nextButton);
    expect(mockRouter).toMatchObject({
      query: { page: '2' },
    });

    await userEvent.click(prevButton);
    expect(mockRouter).toMatchObject({
      query: {},
    });
  });
  it('does not render when there are no results', async () => {
    render(<App searchResults={getMockedSearchResult('empty')} />);

    const pagination = screen.queryByTestId('pagination');

    expect(pagination).not.toBeInTheDocument();
  });
  it('disables prev button on first page', async () => {
    render(<App searchResults={getMockedSearchResult()} />);

    const prevButton = await screen.findByText('Prev');

    expect(prevButton).toBeDisabled();
  });
  it('disables next button on last page', async () => {
    render(<App searchResults={getMockedSearchResult('single')} />);

    const nextButton = await screen.findByText('Next');

    expect(nextButton).toBeDisabled();
  });
  it('correctly displays current page index', async () => {
    render(<App searchResults={getMockedSearchResult()} />);

    const nextButton = await screen.findByText('Next');
    const prevButton = await screen.findByText('Prev');

    await within(screen.getByTestId('pagination')).findByText(/1/i);
    userEvent.click(nextButton);
    await within(screen.getByTestId('pagination')).findByText(/2/i);
    userEvent.click(nextButton);
    await within(screen.getByTestId('pagination')).findByText(/3/i);
    userEvent.click(prevButton);
    await within(screen.getByTestId('pagination')).findByText(/2/i);
  });
});
