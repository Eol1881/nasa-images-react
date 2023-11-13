import React from 'react';

interface Props {
  isHovered: boolean;
  imageUrl: string;
  center: string;
  dateCreated: string;
  imageTitle: string;
}

export const Tooltip: React.FC<Props> = ({ isHovered, imageUrl, center, dateCreated, imageTitle }) => {
  return (
    <div className={`tooltip ${isHovered && 'tooltip--hovered'}`}>
      <div className="p-2">
        <img src={imageUrl} alt={imageTitle} className="h-32 w-32 object-cover" />
        <p className="font-pixelify">Center: {<span>{center}</span>}</p>
        <p className="font-pixelify">{dateCreated}</p>
      </div>
    </div>
  );
};
