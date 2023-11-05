import { useEffect, useRef, useState } from 'react';
import { ImageData } from '../api/types';
import { NavLink, useSearchParams } from 'react-router-dom';
import { extractImageData } from '../utils/extractImageData';
import { Tooltip } from './Tooltip';

interface Props {
  imageData: ImageData;
}

export function ResultItem(props: Props) {
  const [searchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);
  const { imageData } = props;
  const tooltipTimer = useRef(0);

  const { imageUrl, imageTitle, nasaId, center, dateCreated } = extractImageData(imageData);

  const mouseEnterHandler = () => {
    tooltipTimer.current = window.setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const mouseLeaveHandler = () => {
    window.clearTimeout(tooltipTimer.current);
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(tooltipTimer.current);
    };
  }, []);

  return (
    <NavLink
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="search-result"
      to={{
        pathname: `details/${nasaId}`,
        search: searchParams.toString(),
      }}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {imageTitle}

      <Tooltip isHovered={isHovered} imageUrl={imageUrl} center={center} dateCreated={dateCreated}></Tooltip>
    </NavLink>
  );
}
