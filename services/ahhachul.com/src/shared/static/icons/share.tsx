import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14" stroke="#BEC1CB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 9L20 4H15" stroke="#BEC1CB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 11L20 4" stroke="#BEC1CB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const ShareIcon = () => (
  <div
    css={[cssUtils.flexCenterCenter]}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
