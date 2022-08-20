import React from "react";
import PropTypes from 'prop-types';
import { Image, ImageItem } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ webformatURL, tags, onOpen }) => {
  return (
    <ImageItem onClick={onOpen}>
      <Image src={webformatURL} alt={tags} />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
}