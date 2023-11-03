import { useEffect, useState } from 'react';
import { ImageData } from '../api/types';
import { ListItem } from './ListItem';

interface Props {
  imagesData: ImageData[];
  shouldThrowError: boolean;
  isLoading: boolean;
}

export function Results(props: Props) {
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    setErrorFlag(props.shouldThrowError);
  }, [props.shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');
  return (
    <div
      className={`relative mt-4 space-y-2 rounded-lg bg-white px-2 py-3 ${
        props.isLoading ? 'pointer-events-none text-transparent' : 'text-black'
      } shadow-md sm:px-4`}
    >
      {props.imagesData.map((imageData) => (
        <ListItem key={imageData.data[0].nasa_id} imageData={imageData}></ListItem>
      ))}
      <div
        className={`absolute top-2 w-full text-center font-pixelify text-2xl text-red-700 ${
          props.isLoading ? 'visible' : 'hidden'
        }`}
      >
        LOADING...
      </div>
    </div>
  );
}
