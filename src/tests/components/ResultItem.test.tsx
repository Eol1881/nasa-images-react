import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ResultItem } from '../../components/ResultItem';
import { mockImageData } from '../mocks/mockImageData';
import { BrowserRouter } from 'react-router-dom';

describe('Testing ResultItem component', () => {
  it('renders the relevant ResultItem data', () => {
    render(<ResultItem imageData={mockImageData} isActive={false} />, { wrapper: BrowserRouter });

    const resultItem = screen.getByTestId('result-item');

    expect(resultItem).toBeInTheDocument();

    const initialItemImageUrl = mockImageData.links ? mockImageData.links[0].href : '';
    const initialItemTitle = mockImageData.data[0].title;
    const initialItemCenter = mockImageData.data[0].center;
    const initialItemDateCreated = mockImageData.data[0].date_created;

    const itemTitle = screen.getByText(initialItemTitle);
    expect(itemTitle).toBeInTheDocument();

    const itemCenter = screen.getByText(initialItemCenter);
    expect(itemCenter).toBeInTheDocument();

    const itemDateCreated = screen.getByText(initialItemDateCreated);
    expect(itemDateCreated).toBeInTheDocument();

    const img = screen.getByAltText(initialItemTitle);
    expect(img).toHaveAttribute('src', initialItemImageUrl);
  });
});
