import {ISearchRepositoryProps, IUseSearchRepo} from 'react';
import { useSearchRepository } from './useSearchRepository';
import repo from "../../assets/icons/repo.png";
import star from "../../assets/icons/star.png";
import code from "../../assets/icons/code.png";
import { Text } from '../Text/Text';

import styles from './SearchRepository.module.css'

export const SearchRepository = (props: ISearchRepositoryProps) => {
  const {
    searchData,
    redirectGithub
  }: IUseSearchRepo = useSearchRepository(props);
  
  return (
    <div className={styles["repo_frame"]}>
      {searchData.map((data: any, index: number) => (
        <div className={styles["repo_container"]} key={data.name + index}>
          <div className={styles["image_repo"]}><img src={repo} alt="repo_icon"/></div>
          <div>
            <div className={styles["repo_name_container"]} onClick={() => redirectGithub(data.html_url)}>
              <Text><b>{data.full_name}</b></Text>
            </div>
            <div className={styles["repo_desc_container"]}>
              <Text>{data.description}</Text>
            </div>
            <div className={styles["repo_topics_container"]}>
              {data.topics?.slice(0, 5).map((items: string) => (
                <span>{items}</span>
              ))}
            </div>
            <div className={styles["repo_etc_container"]}>
              <span>
                <img src={star} alt="star" />
                <Text>{data.stargazers_count}</Text>
              </span>
              <span>
                <img src={code} alt="language" />
                <Text>{data.language}</Text>
              </span>
              
              {!!data.license && (
                <span>
                  <Text>{data.license.name || ''}</Text>
                </span> 
              )}
              <span>
                <Text>{data.open_issues|| 0} issues need help</Text>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}