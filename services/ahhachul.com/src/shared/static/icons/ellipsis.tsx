import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 12C17.5 11.4477 17.9477 11 18.5 11C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13C17.9477 13 17.5 12.5523 17.5 12Z" fill="#BEC1CB" stroke="#BEC1CB" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5 12C11.5 11.4477 11.9477 11 12.5 11C13.0523 11 13.5 11.4477 13.5 12C13.5 12.5523 13.0523 13 12.5 13C11.9477 13 11.5 12.5523 11.5 12Z" fill="#BEC1CB" stroke="#BEC1CB" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.5 12C5.5 11.4477 5.94772 11 6.5 11C7.05228 11 7.5 11.4477 7.5 12C7.5 12.5523 7.05228 13 6.5 13C5.94772 13 5.5 12.5523 5.5 12Z" fill="#BEC1CB" stroke="#BEC1CB" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const EllipsisIcon = () => (
  <div css={[cssUtils.flex]} dangerouslySetInnerHTML={{ __html: SVG }} />
);
