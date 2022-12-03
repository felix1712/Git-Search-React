import { useContext, ISearchContext} from 'react';
import { SearchContext } from '../../Contexts/SearchContext';

export const useSearch = () => {
  const { searchDataTotal }:ISearchContext = useContext(SearchContext);

  const searchValue = {
    searchDataTotal
  }
  return searchValue;
}