import {Searchbar} from '../../components/Searchbar/Searchbar';
import { Text } from '../../components/Text/Text';
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles["home_container"]}>
      <Text  variant="h2" align="center">Search Repository, Users and Topics</Text>
      <Searchbar />
    </div>
  )
}

export default Home;