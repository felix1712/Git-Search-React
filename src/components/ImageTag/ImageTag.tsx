import React from "react";
import BrokenImage from "../../assets/icons/broken_image.svg";

export const ImageTag = (props: any) => {
  const { src, alt, onClick } = props;
  return (
    <img src={src !== "N/A" ? src : BrokenImage} alt={alt} onClick={onClick} />
  );
};