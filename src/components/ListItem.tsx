import { useState } from 'react';
import { ImageData } from '../api/types';
import { trimImageName } from '../utils/trimImageName';
import { formatDate } from '../utils/formatDate';

interface Props {
  imageData: ImageData;
}

export function ListItem(props: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { imageData } = props;
  let tooltipTimer: number;

  const imageUrl = imageData.links ? imageData.links[0].href : '';
  const imageTitle = imageData.data[0].title;
  const itemId = imageData.data[0].nasa_id;
  const center = imageData.data[0].center;
  const dateCreatedRaw = imageData.data[0].date_created;
  const dateCreatedFormatted = formatDate(new Date(dateCreatedRaw));

  const mouseEnterHandler = () => {
    tooltipTimer = setTimeout(() => {
      setIsHovered(true);
    }, 200);
  };

  const mouseLeaveHandler = () => {
    clearTimeout(tooltipTimer);
    setIsHovered(false);
  };

  return (
    <div
      key={itemId}
      data-item-id={itemId}
      className="relative cursor-pointer select-none rounded-md p-1 hover:bg-sky-200"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {trimImageName(imageTitle)}

      <div
        className={`tooltip ${
          isHovered ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <img src={imageUrl} alt="Image" className="h-32 w-32 object-cover" />
        <p className="font-pixelify">Center: {center}</p>
        <p className="font-pixelify">{dateCreatedFormatted}</p>
      </div>
    </div>
  );
}
