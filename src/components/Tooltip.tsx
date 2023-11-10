import React from 'react';

interface Props {
  isHovered: boolean;
  imageUrl: string;
  center: string;
  dateCreated: string;
}

export const Tooltip: React.FC<Props> = ({ isHovered, imageUrl, center, dateCreated }) => {
  return (
    <div className={`tooltip ${isHovered && 'tooltip--hovered'}`}>
      <div className="p-2">
        <img src={imageUrl} alt="Image" className="h-32 w-32 object-cover" />
        <p className="font-pixelify">Center: {center}</p>
        <p className="font-pixelify">{dateCreated}</p>
      </div>
    </div>
  );
};
