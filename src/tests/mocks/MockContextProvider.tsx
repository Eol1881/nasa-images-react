import { ImageData } from '../../api/types';
import { SearchContext } from '../../context/SearchContextProvider';
import { getMockSearchContext } from './getMockSearchContext';

interface Props {
  mockImagesData: ImageData[];
  children?: React.ReactNode;
}

export const MockContextProvider: React.FC<Props> = ({ mockImagesData, children }) => {
  const mockSearchContext = getMockSearchContext(mockImagesData);

  return <SearchContext.Provider value={mockSearchContext}>{children}</SearchContext.Provider>;
};
