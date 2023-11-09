import { useNavigation } from 'react-router-dom';

export const Loader: React.FC = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return isLoading ? (
    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-pixelify text-2xl text-red-700`}>
      LOADING...
    </div>
  ) : null;
};
