import {useEffect, useContext, ISearchRepositoryProps, IUseSearchRepo} from 'react';
import { SearchContext } from '../../Contexts/SearchContext';
import { SearchActionsContext } from "../../Contexts/SearchContext";

export const useSearchUser = (props: ISearchRepositoryProps) => {
  const {q, rowDisplay, pageDisplay} = props
  const {searchData} = useContext(SearchContext);
  const { searchGlobal } = useContext(
    SearchActionsContext
  );
  const query = `search/users?q=${q}&per_page=${rowDisplay}&page=${pageDisplay}`;
  
  useEffect(() => {
    searchGlobal(query)
  }, [rowDisplay, pageDisplay])

  const searchPreviewValue: IUseSearchRepo = {
    searchData,
  }
  return searchPreviewValue;
}