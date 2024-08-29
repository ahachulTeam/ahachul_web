import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M16 10C16 13.3137 13.3137 16 10 16C8.81929 16 7.71824 15.659 6.78998 15.07L4 16L4.92999 13.21C4.34104 12.2818 4 11.1807 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fill="#E0E2EB"/>
</svg>
`;

export const CommentCountIcon = () => (
  <div
    css={cssUtils.flexCenterCenter}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
