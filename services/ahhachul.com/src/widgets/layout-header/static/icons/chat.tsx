import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 12C21 16.9706 16.9706 21 12 21C10.2289 21 8.57736 20.4884 7.18497 19.605L3 21L4.39499 16.815C3.51156 15.4226 3 13.7711 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 12H16.002V12.002H16V12Z" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 12H12.002V12.002H12V12Z" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12H8.002V12.002H8V12Z" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const ChatIcon = () => (
  <div css={cssUtils.flex} dangerouslySetInnerHTML={{ __html: SVG }} />
);
