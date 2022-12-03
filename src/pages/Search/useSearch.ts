import { useState, useContext, ISearchContext, ISearchPages, MouseEvent} from 'react';
import { SearchContext } from '../../Contexts/SearchContext';

export const useSearch = () => {
  const { searchDataTotal } = useContext(SearchContext);

  const [rowDisplay, setRowDisplay] = useState<number>(10);
  const [pageDisplay, setPageDisplay] = useState<number>(1);

  const handleChangeSelectOption = (data: number) => {
    setRowDisplay(Number(data));
    setPageDisplay(1)
  };

  const handlePagination = (e:MouseEvent<HTMLElement>, page: number) => {
    setPageDisplay(page)
  }

  const searchValue: ISearchPages = {
    rowDisplay,
    pageDisplay,
    handleChangeSelectOption,
    handlePagination,
    searchDataTotal
  }
  return searchValue;
}