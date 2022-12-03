import { ISearchPages } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from './useSearch';
import { SearchRepository } from '../../components/SearchRepository/SearchRepository';
import { SearchUser } from '../../components/SearchUsers/SearchUser';
import { SearchTopic } from '../../components/SearchTopic/SearchTopic';
import { Pagination } from '../../components/Pagination/Pagination';
import { Select } from '../../components/Select/Select';
import { Text } from '../../components/Text/Text';
import { rowOption } from '../../utils/Constant';
import styles from './Search.module.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const getType:string | null = searchParams.get('type')
  const getQuery: string | null = searchParams.get('q');
  
  const {
    rowDisplay,
    pageDisplay,
    handleChangeSelectOption,
    handlePagination,
    searchDataTotal
  }: ISearchPages = useSearch();

  const renderPreview = () => {
    switch(getType){
      case "repositories" :
        return <SearchRepository q={getQuery} rowDisplay={rowDisplay} pageDisplay={pageDisplay} />
      case "users":
        return <SearchUser q={getQuery} rowDisplay={rowDisplay} pageDisplay={pageDisplay} />
      case "topics":
        return <SearchTopic q={getQuery} rowDisplay={rowDisplay} pageDisplay={pageDisplay} />
      default:
        return null;
    }
  }

  return (
    <>
      <div className={styles["search_sub_header_frame"]}>
        <div className={styles['sub_header_left']}><Text>Search for: <b>{getQuery}</b></Text></div>
        <div className={styles['sub_header_right']}>
          <Text>Rows per page</Text>
          <div className={styles['search_select_container']}>
            <Select
              option={rowOption}
              selected={(data: number) => handleChangeSelectOption(data)}
            />
          </div>
        </div>
      </div>
      {renderPreview()}
      <Pagination
        totalRecords={searchDataTotal || 100}
        pageLimit={rowDisplay}
        onPageChanged={(e, page) => handlePagination(e, Number(page))}
        currentPage={pageDisplay}
      />
    </>
  )
}

export default Search;