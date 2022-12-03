import { useEffect, useContext, ISearchRepositoryProps, IUseSearchRepoValue } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'
import { SearchContext } from '../../Contexts/SearchContext';
import { SearchActionsContext } from "../../Contexts/SearchContext";

export const useSearchRepository = (props: ISearchRepositoryProps) => {
  const {q, rowDisplay, pageDisplay} = props
  const navigate = useNavigate();
  const {searchData} = useContext(SearchContext);
  const { searchGlobal } = useContext(
    SearchActionsContext
  );
  const query = `search/repositories?q=${q}&per_page=${rowDisplay}&page=${pageDisplay}`;
  
  const searchTopic = (q: string) => {
    const paramsUrl = `?type=topics&q=${q}`;
    const topicQuery = `search/topics?q=${q}&per_page=${rowDisplay}&page=${pageDisplay}`;
    searchGlobal(topicQuery)
    navigate({
      pathname: '/search',
      search: `?${createSearchParams(paramsUrl)}`,
    });
  }

  useEffect(() => {
    searchGlobal(query)
  }, [rowDisplay, pageDisplay])

  const searchPreviewValue: IUseSearchRepoValue = {
    searchData,
    searchTopic
  }
  return searchPreviewValue;
}