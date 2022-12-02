import React, { FC, CSSProperties, ReactNode } from "react";
import styles from "./Text.module.css";

export interface IText {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle"
    | "p"
    | "small"
    | "smallest";
  bold?: boolean;
  italic?: boolean;
  align?: "left" | "right" | "center" | "justify";
  style?: CSSProperties;
  children: ReactNode;
}

const defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle: "p",
  p: "p",
  small: "p",
  smallest: "small"
};

export const Text: FC<IText> = props => {
  const { variant, bold, italic, align, style, children } = props;

  const alignStyle = {
    textAlign: align
  };

  //this component need to find the type / interface var
  const Component:any = variant
    ? defaultVariantMapping[variant] || "span"
    : "p";

  return (
    <Component
      className={`
        ${styles.ds_text}
        ${variant === "subtitle" ? styles.ds_text_subtitle : ""}
        ${variant === "small" ? styles.ds_text_small : ""}
        ${italic ? styles.ds_text_italic : ""}
        ${bold ? styles.ds_text_bold : ""}
      `}
      style={{ ...alignStyle, ...style }}
    >
      {children}
    </Component>
  );
};

Text.defaultProps = {
  variant: "p",
  align: "left"
};