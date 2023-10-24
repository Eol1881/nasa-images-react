import React from 'react';
import { ImageData } from '../api/types';
import { trimImageName } from '../utils/trimImageName';
import { formatDate } from '../utils/formatDate';

interface Props {
  imageData: ImageData;
}

export class ListItem extends React.Component<Props> {
  state = {
    isHovered: false,
    tooltipTimer: 0,
  };

  handleMouseEnter = () => {
    const newTimer = setTimeout(() => {
      this.setState({ isHovered: true });
    }, 200);
    this.setState({ tooltipTimer: newTimer });
  };

  handleMouseLeave = () => {
    const { tooltipTimer } = this.state;
    clearTimeout(tooltipTimer);
    this.setState({ isHovered: false });
  };

  render() {
    const { imageData } = this.props;
    const { isHovered } = this.state;

    const imageUrl = imageData.links ? imageData.links[0].href : '';
    const imageTitle = imageData.data[0].title;
    const itemId = imageData.data[0].nasa_id;
    const center = imageData.data[0].center;
    const dateCreatedRaw = imageData.data[0].date_created;
    const dateCreatedFormatted = formatDate(new Date(dateCreatedRaw));

    return (
      <div
        key={itemId}
        data-item-id={itemId}
        className="relative cursor-pointer select-none rounded-md p-1 hover:bg-sky-200"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {trimImageName(imageTitle)}

        <div
          className={`tooltip absolute left-0 top-0 z-10 mt-8 cursor-auto rounded border border-gray-300 bg-white p-4 shadow-lg ${
            isHovered ? 'visible' : ''
          }`}
        >
          <img src={imageUrl} alt="Image" className="h-32 w-32 object-cover" />
          <p className="font-pixelify">Center: {center}</p>
          <p className="font-pixelify">{dateCreatedFormatted}</p>
        </div>
      </div>
    );
  }
}
