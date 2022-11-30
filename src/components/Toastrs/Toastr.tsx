import React, { useEffect, useRef } from "react";
import styles from "./Toastr.module.css";

interface IToastr {
  type: string;
  header: string;
  messages: string;
  remove: () => void;
}
export const Toastr = (props: IToastr) => {
  const { type, header, messages, remove } = props;
  const removeRef = useRef<any>(null);
  removeRef.current = remove;
  const typeLower = type.toLowerCase() || type;

  useEffect(() => {
    const duration = 7000;
    const id = setTimeout(() => removeRef.current(), duration);

    return () => clearTimeout(id);
  }, []);

  return (
    <React.Fragment>
      <div className={styles["toast_subframe"]}>
        <div
          className={
            `${styles.toast_container}` +
            " " +
            `${
              typeLower === "danger"
                ? styles.container_body_danger
                : typeLower === "warning"
                ? styles.container_body_warning
                : typeLower === "success"
                ? styles.container_body_success
                : styles.container_body_default
            }`
          }
        >
          <span className={styles["close_button"]} onClick={remove}></span>
          <div className={styles["title_header"]}>
            <span className={styles["danger_icon"]}></span>
            <h5>{header}</h5>
          </div>
          <p>{messages}</p>
        </div>
      </div>
    </React.Fragment>
  );
};