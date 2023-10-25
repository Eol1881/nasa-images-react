import React from 'react';
import { ImageData } from '../api/types';
import { trimImageName } from '../utils/trimImageName';
import { formatDate } from '../utils/formatDate';

interface Props {
  imageData: ImageData;
}

interface State {
  isHovered: boolean;
  tooltipTimer: number;
}

export class ListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isHovered: false,
      tooltipTimer: 0,
    };
  }

  mouseEnterHandler = () => {
    const newTimer = setTimeout(() => {
      this.setState({ isHovered: true });
    }, 200);
    this.setState({ tooltipTimer: newTimer });
  };

  mouseLeaveHandler = () => {
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
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
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
}
