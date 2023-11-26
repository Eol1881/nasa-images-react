import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import App from '@/pages';
import { getMockedSearchResult } from '../mocks/getMockedSearchResult';

describe('Testing ThrowErrorButton component', () => {
  it('renders ErrorBoundary on click', async () => {
    render(<App searchResults={getMockedSearchResult()} />, {
      wrapper: MemoryRouterProvider,
    });
    const throwErrorButton = screen.getByTestId('throw-error-button');
    await userEvent.click(throwErrorButton);
    const errorPageComponent = screen.queryByTestId('error-boundary');
    expect(errorPageComponent).toBeInTheDocument();
  });
});
