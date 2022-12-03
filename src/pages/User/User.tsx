import { useUser } from './useUser';
import { ImageTag } from '../../components/ImageTag/ImageTag';
import { Text } from '../../components/Text/Text';
import star from '../../assets/icons/star.png';
import repo from '../../assets/icons/repo.png';
import code from '../../assets/icons/code.png';
import github from '../../assets/icons/github-logos.png';
import fork from '../../assets/icons/fork.png'
import watch from '../../assets/icons/eye.png';
import location from '../../assets/icons/location.png';
import { redirectGithub } from '../../utils/SharedFunction';
import stylesUser from './User.module.css';
import styles from '../../components/SearchRepository/SearchRepository.module.css';

const User = () => {
  const {
    userData,
    userRepos
  } = useUser();
  return (
    <div className={stylesUser["user_frame"]}>
      <div className={stylesUser["user_left"]}>
        <div className={stylesUser["user_avatar"]}>
          <ImageTag src={userData.avatar_url} alt="avatar" />
        </div>
        <div className={stylesUser["user_name"]}>
          <Text variant='h3'>{userData.name}</Text>
          <Text>@{userData.login}</Text>
        </div>
        <div className={stylesUser["user_bio"]}>
          <Text>{userData.bio}</Text>
        </div>
        <div className={stylesUser["user_github"]}>
          <a href={userData.html_url}>visit me at github <ImageTag src={github} alt='github' /></a>
        </div>
        <div className={stylesUser["user_location"]}>
          <ImageTag src={location} alt="location" />
          <Text>{userData.location}</Text>
        </div>
      </div>
      <div className={stylesUser["user_right"]}>
        <div className={stylesUser["user_public_repo_container"]}>
          <Text variant='h3'>Public Repository</Text>
          <div className={stylesUser["user_public_repo"]}>
            {userRepos.map((data: any, index:number) => (
              <div className={styles["repo_container"]} key={data.name + index}>
              <div className={styles["image_repo"]}><ImageTag src={repo} alt="repo_icon"/></div>
              <div>
                <div className={styles["repo_name_container"]} onClick={() => redirectGithub(data.html_url)}>
                  <Text><b>{data.full_name}</b></Text>
                </div>
                <div className={styles["repo_desc_container"]}>
                  <Text>{data.description}</Text>
                </div>
                <div className={styles["repo_etc_container"]}>
                  <span>
                    <ImageTag src={star} alt="star" />
                    <Text>{data.stargazers_count}</Text>
                  </span>
                  <span>
                    <ImageTag src={fork} alt="star" />
                    <Text>{data.forks_count}</Text>
                  </span>
                  <span>
                    <ImageTag src={watch} alt="star" />
                    <Text>{data.watchers_count}</Text>
                  </span>
                  <span>
                    <ImageTag src={code} alt="language" />
                    <Text>{data.language}</Text>
                  </span>
                  {!!data.license && (
                    <span>
                      <Text>{data.license.name || ''}</Text>
                    </span> 
                  )}
                  <span>
                    <Text>{data.open_issues_count|| 0} issues need help</Text>
                  </span>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;