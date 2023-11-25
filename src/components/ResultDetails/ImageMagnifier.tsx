import React, { useEffect, useState } from 'react';

interface Props {
  imageUrl?: string;
}

export const ImageMagnifier: React.FC<Props> = ({ imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMouseDown, setMouseDown] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setPosition({ x, y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top - window.scrollY });
  };

  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      data-testid="magnifier-container"
      className={`relative cursor-crosshair transition-all`}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
    >
      <img
        className="pointer-events-none mx-auto cursor-none select-none object-cover backdrop-blur-md"
        src={imageUrl || ''}
        alt="NASA photo"
      />

      {showMagnifier && (
        <div
          data-testid="magnifier"
          style={{
            left: `${cursorPosition.x - 100}px`,
            top: `${cursorPosition.y - 100}px`,
          }}
          className="pointer-events-none absolute z-30 cursor-none"
        >
          <div
            className="h-52 w-52 cursor-none border-2 border-black"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundSize: `${isMouseDown ? '400%' : '200%'}`,
              transition: 'background-size 800ms ease',
            }}
          />
        </div>
      )}
    </div>
  );
};
