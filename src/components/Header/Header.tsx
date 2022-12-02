import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "../Text/Text";
import { Searchbar } from "../Searchbar/Searchbar";
import styles from "./Header.module.css";

export const Header = (props: any) => {
  return (
    <header className={styles["main-header"]}>
      <div className={styles["header-container"]}>
        <NavLink to="/home">
          <Text variant="h3">Git bitFlyer</Text>
        </NavLink>
        <div className={styles["header-right"]}>
          <div className={styles["header-searchbar"]}>
            <Searchbar />
          </div>
        </div>
      </div>
    </header>
  );
};
