import {ISearchRepositoryProps, IUseSearchRepo} from 'react';
import { Text } from '../Text/Text'
import { useSearchUser } from './useSearchUser';
import styles from './SearchUser.module.css';

export const SearchUser = (props: ISearchRepositoryProps) => {

  const {
    searchData,
  }: IUseSearchRepo = useSearchUser(props);

  return (
    <div className={styles["search_user_frame"]}>
      {searchData.map((data: any, index: number) => (
        <div className={styles["search_user_container"]}>
          <div className={styles["search_user_item"]}>
            <img src={data.avatar_url} alt="avatar" />
            <Text variant='h5'>{data.login}</Text>
          </div>
        </div>
      ))}
    </div>
  )
}