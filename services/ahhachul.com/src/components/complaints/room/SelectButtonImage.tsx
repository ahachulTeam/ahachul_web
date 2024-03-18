import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SelectButtonImage({ image }: { image: string }) {
  return <LazyLoadImage alt="" src={image} />;
}

export default SelectButtonImage;
