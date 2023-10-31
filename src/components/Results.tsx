import React from 'react';
import { ImageData } from '../api/types';
import { ListItem } from './ListItem';

interface Props {
  imagesData: ImageData[];
}

interface State {
  shouldThrowError: boolean;
}

export class Results extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldThrowError: false,
    };
  }

  private throwErrorHandler = () => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) throw new Error('Fake rendering error');

    return (
      <>
        <div className="mt-4 space-y-2 rounded-lg bg-white px-2 py-3 text-black shadow-md sm:px-4">
          {this.props.imagesData.map((imageData) => (
            <ListItem
              key={imageData.data[0].nasa_id}
              imageData={imageData}
            ></ListItem>
          ))}
        </div>
        <button className="button-red mt-4" onClick={this.throwErrorHandler}>
          Throw fake error
        </button>
      </>
    );
  }
}
