import React, { useState, useContext, IChildrenOnly, ISearchContext } from "react";
import axios from 'axios';
import { ServiceActionsContext } from "../Contexts/ServiceContext";

interface ISearchActionsContext {
  fillSearchData: (data: any) => void;
  fillSearchDataTotal: (data: string) => void;
  searchGlobal: (query: string) => void;
}

export const SearchContext =  React.createContext({} as ISearchContext);
export const SearchActionsContext = React.createContext({} as ISearchActionsContext);

const SearchProvider = (props: IChildrenOnly) => {
  const { children } = props;
  const [searchData, setSearchData] = useState<any>([]);
  const [searchDataTotal, setSearchDataTotal] = useState<number>(0);
  const signal = axios.CancelToken.source();
  const { getAxios } = useContext(ServiceActionsContext);

  const fillSearchData = (data: any) => {
    if (Array.isArray(data)) {
      setSearchData(data);
      return true;
    }

    return false;
  };

  const fillSearchDataTotal = (data: string) => {
    setSearchDataTotal(parseInt(data));
  };

  const searchGlobal = async(query: string) => {
    try {
      const { data } = await getAxios(query, signal.token);
      setSearchData(data.items)
      setSearchDataTotal(data.total_count);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      } else {
        throw error;
      }
    }
    return false;
  }

  const searchValue = { searchData, searchDataTotal };

  const searchActionValue = {
    fillSearchData,
    fillSearchDataTotal,
    searchGlobal
  };

  return (
    <SearchContext.Provider value={searchValue}>
      <SearchActionsContext.Provider
        value={searchActionValue}
      >
        {children}
      </SearchActionsContext.Provider>
    </SearchContext.Provider>
  );
};

export default SearchProvider;
