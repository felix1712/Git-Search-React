import { NavLink } from "react-router-dom";
import { Text } from "../Text/Text";
import { Searchbar } from "../Searchbar/Searchbar";
import styles from "./Header.module.css";
import { matchRoutes, useLocation } from "react-router-dom"

export const Header = () => {
  const { pathname } = useLocation();
  const renderSearchHeader = () => {
    if(pathname !== '/'){
      return <Searchbar />
    }

    return null;
  }
  return (
    <header className={styles["main-header"]}>
      <div className={styles["header-container"]}>
        <NavLink to="/home">
          <Text variant="h3">Git Search App</Text>
        </NavLink>
        <div className={styles["header-right"]}>
          <div className={styles["header-searchbar"]}>
            {renderSearchHeader()}
          </div>
        </div>
      </div>
    </header>
  );
};
