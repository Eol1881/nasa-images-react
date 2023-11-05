import { useNavigation } from 'react-router-dom';

export function Loader() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-pixelify text-2xl text-red-700 ${
        isLoading ? 'visible' : 'invisible'
      }`}
    >
      LOADING...
    </div>
  );
}
