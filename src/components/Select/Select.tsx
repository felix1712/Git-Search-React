import React, { useState, useEffect, useRef } from "react";
import { Text } from "../Text/Text";
import styles from "./Select.module.css";

export const Select = (props: any) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const { option, selected } = props;

  const [selectedValue, setSelectedValue] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [options, setOptions] = useState(option || []);

  const openSelect = () => {
    setSelectOpen(!selectOpen);
  };

  const handleSelect = (event: any, data: any) => {
    const value = event.target.getAttribute("data-value");
    setSelectedValue(event.target.innerText);
    selected(value, data);
    setOptions(option);
    setSelectOpen(false);
  };

  useEffect(() => {
    setOptions(option);
  }, [props.option]);

  useEffect(() => {
    setSelectedValue(option[0].label);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <>
      <ul
        className={styles["select_frame"]}
        onClick={openSelect}
        ref={wrapperRef}
      >
        {selectOpen && (
          <div className={styles["list_container"]}>
            {options.map((data: any, index: number) => (
              <li
                className={styles["list_item"]}
                key={index}
                data-value={data.value}
                onClick={e => handleSelect(e, data)}
              >
                {data.label}
              </li>
            ))}
          </div>
        )}
        <Text>{selectedValue}</Text>
        <span className="arrow bottom"></span>
      </ul>
    </>
  );
};
