import React, { useState, IChildrenOnly } from "react";

interface ISearchContext {
  searchData: any;
  searchDataTotal: number;
}

interface ISearchActionsContext {
  fillSearchData: (data: any) => void;
  fillSearchDataTotal: (data: string) => void;
}
const IMoviesListSearchContextProperties = {
  moviesListSearch: null,
  moviesListSearchTotal: 0
};

const IMoviesListSearchActionsContextProperties = {
  fillMoviesListSearch: () => {},
  fillMoviesListSearchTotal: () => {}
};

export const SearchContext =  React.createContext({} as ISearchContext);
export const SearchActionsContext = React.createContext({} as ISearchActionsContext);

const SearchProvider = (props: IChildrenOnly) => {
  const { children } = props;
  const [searchData, setSearchData] = useState<any>([]);
  const [searchDataTotal, setSearchDataTotal] = useState<number>(0);

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

  const searchValue = { searchData, searchDataTotal };

  const searchActionValue = {
    fillSearchData,
    fillSearchDataTotal
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
