import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 15L21 21" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const SearchIcon = () => (
  <div
    css={cssUtils.flex}
    className="search-icon"
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
