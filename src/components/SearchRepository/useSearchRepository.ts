import {useState, useEffect, useContext, ISearchRepositoryProps, IUseSearchRepo} from 'react';
import { SearchContext } from '../../Contexts/SearchContext';
import { SearchActionsContext } from "../../Contexts/SearchContext";

export const useSearchRepository = (props: ISearchRepositoryProps) => {
  const {q, rowDisplay, pageDisplay} = props
  const {searchData} = useContext(SearchContext);
  const { searchGlobal } = useContext(
    SearchActionsContext
  );
  const query = `repositories?q=${q}&per_page=${rowDisplay}&page=${pageDisplay}`;

  const redirectGithub = (url: string) => {
    return window.location.href = url;
  }
  
  useEffect(() => {
    searchGlobal(query)
  }, [rowDisplay, pageDisplay])

  const searchPreviewValue: IUseSearchRepo = {
    searchData,
    redirectGithub
  }
  return searchPreviewValue;
}