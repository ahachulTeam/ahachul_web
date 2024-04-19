import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { f } from '@/src/styles';

const SVG = `
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="14" height="14" rx="1" fill="#464B57"/>
<path d="M6.86008 3.5C7.48008 3.5 8.01675 3.60333 8.47008 3.81C8.93008 4.01667 9.28341 4.31 9.53008 4.69C9.77675 5.07 9.90008 5.52 9.90008 6.04C9.90008 6.55333 9.77675 7.00333 9.53008 7.39C9.28341 7.77 8.93008 8.06333 8.47008 8.27C8.01675 8.47 7.48008 8.57 6.86008 8.57H5.45008V10.5H3.83008V3.5H6.86008ZM6.77008 7.25C7.25674 7.25 7.62674 7.14667 7.88008 6.94C8.13341 6.72667 8.26008 6.42667 8.26008 6.04C8.26008 5.64667 8.13341 5.34667 7.88008 5.14C7.62674 4.92667 7.25674 4.82 6.77008 4.82H5.45008V7.25H6.77008Z" fill="white"/>
</svg>
`;

const IconPackage: React.FC<{ onClick?: VoidFunction; css?: Interpolation<Theme> }> = ({ onClick, css }) => (
  <div css={[f.flex, css]} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconPackage;
