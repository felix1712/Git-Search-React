import {ISearchRepositoryProps, IUseSearchRepo} from 'react';
import { Link } from 'react-router-dom'
import { Text } from '../Text/Text'
import { ImageTag } from '../ImageTag/ImageTag';
import { useSearchUser } from './useSearchUser';
import styles from './SearchUser.module.css';

export const SearchUser = (props: ISearchRepositoryProps) => {

  const {
    searchData,
  }: IUseSearchRepo = useSearchUser(props);

  return (
    <div className={styles["search_user_frame"]}>
      {searchData.map((data: any) => (
        <Link to={`/user/${data.login}`} className={styles["search_user_container"]} key={data.id}>
          <div className={styles["search_user_item"]}>
            <ImageTag src={data.avatar_url} alt="avatar" />
            <Text variant='h5'>{data.login}</Text>
          </div>
        </Link>
      ))}
    </div>
  )
}