import React from 'react';
import { ImageData } from '../api/types';
import { ListItem } from './ListItem';

interface Props {
  imagesData: ImageData[];
}

export class Results extends React.Component<Props> {
  render() {
    return (
      <div className="mt-4 space-y-2 rounded-lg bg-white px-2 py-3 text-black shadow-md sm:px-4">
        {this.props.imagesData.map((imageData) => (
          <ListItem
            key={imageData.data[0].nasa_id}
            imageData={imageData}
          ></ListItem>
        ))}
      </div>
    );
  }
}
