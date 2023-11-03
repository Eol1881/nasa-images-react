import { useEffect, useState } from 'react';
import { ImageData } from '../api/types';
import { ListItem } from './ListItem';
import { useNavigation } from 'react-router-dom';

interface Props {
  imagesData: ImageData[];
  shouldThrowError: boolean;
}

export function Results(props: Props) {
  const [errorFlag, setErrorFlag] = useState(false);

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { imagesData } = props;

  // Throwing fake rendering error mechanism
  useEffect(() => {
    setErrorFlag(props.shouldThrowError);
  }, [props.shouldThrowError]);

  if (errorFlag) throw new Error('Fake rendering error');

  return (
    <div
      className={`relative mt-4 space-y-2 rounded-lg bg-white px-2 py-3 ${
        isLoading ? 'pointer-events-none text-transparent' : 'text-black'
      } shadow-md sm:px-4`}
    >
      {imagesData.map((imageData) => (
        <ListItem key={imageData.data[0].nasa_id} imageData={imageData}></ListItem>
      ))}

      <div
        className={`font-pixelify text-2xl text-red-700 ${
          imagesData.length !== 0 && 'invisible hidden'
        } ${isLoading && 'invisible'}`}
      >
        NOTHING FOUND
      </div>

      <div
        className={`absolute left-4 top-1 font-pixelify text-2xl text-red-700 ${
          isLoading ? 'visible' : 'invisible'
        }`}
      >
        LOADING...
      </div>
    </div>
  );
}
