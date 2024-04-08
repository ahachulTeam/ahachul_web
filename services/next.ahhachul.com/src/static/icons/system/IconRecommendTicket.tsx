import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { f } from '@/src/styles';

const SVG = `
<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 2C2.79086 2 1 3.79086 0.999999 6L0.999999 11L1.5 11C2.32843 11 3 11.6716 3 12.5C3 13.3284 2.32843 14 1.5 14L1 14L1 18C1 20.2091 2.79086 22 5 22L22 22C24.2091 22 26 20.2091 26 18L26 14L25.5 14C24.6716 14 24 13.3284 24 12.5C24 11.6716 24.6716 11 25.5 11L26 11L26 6C26 3.79086 24.2091 2 22 2L5 2ZM11.3019 15.9353L13.2495 14.8653C13.4063 14.7791 13.5936 14.7791 13.7504 14.8653L15.6981 15.9353C15.8028 15.9928 15.9228 16.0127 16.0395 15.9918C16.3324 15.9393 16.5292 15.6486 16.4789 15.3424L16.1069 13.0761C16.077 12.8936 16.1349 12.7075 16.2617 12.5783L17.8374 10.9732C17.9222 10.8869 17.9773 10.7738 17.9943 10.6514C18.0371 10.344 17.8333 10.0586 17.5391 10.0139L15.3616 9.68328C15.1863 9.65667 15.0348 9.54162 14.9564 9.37563L13.9826 7.31362C13.9302 7.20271 13.8443 7.11294 13.7381 7.0582C13.4716 6.92074 13.1489 7.0351 13.0174 7.31362L12.0435 9.37563C11.9651 9.54162 11.8136 9.65667 11.6383 9.68328L9.46078 10.0139C9.34366 10.0317 9.23541 10.0894 9.15279 10.1779C8.94533 10.4004 8.94968 10.7564 9.16252 10.9732L10.7382 12.5783C10.865 12.7075 10.9229 12.8936 10.893 13.0761L10.521 15.3424C10.501 15.4643 10.52 15.5897 10.5751 15.6992C10.7134 15.9741 11.0388 16.0798 11.3019 15.9353Z" fill="#FF5E84"/>
</svg>
`;

const IconRecommendTicket: React.FC<{ onClick?: VoidFunction; css?: Interpolation<Theme> }> = ({ onClick, css }) => (
  <div css={[f.flex, css]} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconRecommendTicket;
