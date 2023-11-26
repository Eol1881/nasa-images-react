import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ImageMagnifier } from '@/components/ResultDetails/ImageMagnifier';

describe('ImageMagnifier', () => {
  it('renders the component', () => {
    render(<ImageMagnifier />);
    expect(screen.getByAltText('NASA photo')).toBeInTheDocument();
  });
  it('shows the magnifier when mouse enters', async () => {
    render(<ImageMagnifier />);
    fireEvent.mouseEnter(screen.getByAltText('NASA photo'));
    expect(screen.getByTestId('magnifier')).toBeInTheDocument();
  });
  it('hides the magnifier when mouse leaves', () => {
    render(<ImageMagnifier />);
    fireEvent.mouseLeave(screen.getByAltText('NASA photo'));
    expect(screen.queryByTestId('magnifier')).toBeNull();
  });
  it('follows the mouse movement', () => {
    render(<ImageMagnifier />);

    const moveDistance = 150;

    fireEvent.mouseEnter(screen.getByAltText('NASA photo'));

    fireEvent.mouseMove(screen.getByAltText('NASA photo'), { clientX: moveDistance, clientY: moveDistance });

    expect(screen.getByTestId('magnifier').style.left).toBe(`${moveDistance - 100}px`);
    expect(screen.getByTestId('magnifier').style.top).toBe(`${moveDistance - 100}px`);
  });
});
