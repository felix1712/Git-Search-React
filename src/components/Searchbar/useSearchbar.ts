import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, createSearchParams } from 'react-router-dom'
import { ServiceActionsContext } from "../../Contexts/ServiceContext";
import { ToasterActionsContext } from "../../Contexts/ToasterContext";
import { SearchActionsContext } from "../../Contexts/SearchContext";

export const useSearchBar = (props: any) => {
  const signal = axios.CancelToken.source();
  const navigate = useNavigate();
  const { getAxios } = useContext(ServiceActionsContext);
  const { fillSearchData, fillSearchDataTotal } = useContext(
    SearchActionsContext
  );
  const { addToastr } = useContext(ToasterActionsContext);
  const [singleSearchInput, setSingleSearchInput] = useState<string>("");
  const [searchSuggestion, setSearchSuggestion] = useState<any>([
    {
      label: 'Repository',
      type: 'repositories'
    },
    {
      label: 'Users',
      type: 'users'
    },
    {
      label: 'Issues',
      type: 'issues'
    },
    {
      label: 'Commits',
      type: 'commits'
    },
    {
      label: 'Topics',
      type: 'topics'
    }
  ]);
  const [isSuggestion, setIsSuggestion] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSuggestionBox = (data: boolean) => {
    setIsSuggestion(data)
  }

  const onChangeSingleSearchInput = (data: string) => {
    setSingleSearchInput(data);
    handleSuggestionBox(true);
  };

  const leaveInput = () => {
    setTimeout(() => {
      handleSuggestionBox(false);
    }, 300);
  };

  const submitSearch = async (e?: React.FormEvent<HTMLFormElement>, type?: string) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    handleSuggestionBox(false);
    const query = (type ? type : 'repositories') + '?q='+singleSearchInput + '&per_page=10&page=1';
    const paramsUrl = '?type=' + (type ? type : 'repositories') + '&q=' + singleSearchInput;
    // 2 lines aboves can be improvement
    try {
      const { data } = await getAxios(query, signal.token);
      setIsLoading(false);
      fillSearchData(data.items)
      fillSearchDataTotal(data.total_count);
      navigate({
        pathname: '/search',
        search: `?${createSearchParams(paramsUrl)}`,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
      addToastr("Failed", error.response?.data.message, "danger");
      } else {
        throw error;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!singleSearchInput.length) {
      handleSuggestionBox(false);
    }
  }, [singleSearchInput]);

  const searchBarValue: any = {
    isLoading,
    submitSearch,
    singleSearchInput,
    onChangeSingleSearchInput,
    leaveInput,
    searchSuggestion,
    isSuggestion,
    handleSuggestionBox,
  };

  return searchBarValue;
};