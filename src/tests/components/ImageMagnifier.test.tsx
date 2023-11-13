import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ImageMagnifier } from '../../components/ImageMagnifier';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const mockRouter = createMemoryRouter(
  [
    {
      path: '/',
      element: <ImageMagnifier imageUrl="test-url" />,
    },
  ],
  {
    initialEntries: ['/'],
    initialIndex: 0,
  }
);

describe('ImageMagnifier', () => {
  it('renders the component', () => {
    render(<RouterProvider router={mockRouter} />);
    expect(screen.getByAltText('NASA photo')).toBeInTheDocument();
  });
  it('shows the magnifier when mouse enters', () => {
    render(<RouterProvider router={mockRouter} />);
    fireEvent.mouseEnter(screen.getByAltText('NASA photo'));
    expect(screen.getByTestId('magnifier')).toBeInTheDocument();
  });
  it('hides the magnifier when mouse leaves', () => {
    render(<RouterProvider router={mockRouter} />);
    fireEvent.mouseLeave(screen.getByAltText('NASA photo'));
    expect(screen.queryByTestId('magnifier')).toBeNull();
  });
  it('follows the mouse movement', () => {
    render(<RouterProvider router={mockRouter} />);

    const moveDistance = 150;

    fireEvent.mouseEnter(screen.getByAltText('NASA photo'));

    fireEvent.mouseMove(screen.getByAltText('NASA photo'), { clientX: moveDistance, clientY: moveDistance });

    expect(screen.getByTestId('magnifier').style.left).toBe(`${moveDistance - 100}px`);
    expect(screen.getByTestId('magnifier').style.top).toBe(`${moveDistance - 100}px`);
  });
});
