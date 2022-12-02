import {ISearchRepositoryProps, IUseSearchRepo} from 'react';
import { useSearchTopic } from './useSearchTopic';
import { Text } from '../Text/Text';
import user from "../../assets/icons/user.png";
import styles from '../SearchRepository/SearchRepository.module.css'

export const SearchTopic = (props: ISearchRepositoryProps) => {
  const {
    searchData,
  }: IUseSearchRepo = useSearchTopic(props);
  
  return (
    <div className={styles["repo_frame"]}>
      {searchData.map((data: any, index: number) => (
        <div className={styles["repo_container"]} key={data.name + index}>
          <div>
            <div className={styles["repo_name_container"]}>
              <Text><b>{data.display_name || data.name}</b></Text>
            </div>
            <div className={styles["repo_desc_container"]}>
              <Text>{data.short_description}</Text>
            </div>
            <div className={styles["repo_etc_container"]}>
              {data.created_by && (
                <span>
                  <img src={user} alt="user" />
                  <Text>{data.created_by}</Text>
                </span>
              )}
              {data.released && (
                <span>
                <Text>Released <b>{data.released}</b></Text>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}