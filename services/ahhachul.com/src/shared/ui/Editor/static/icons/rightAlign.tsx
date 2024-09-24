import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(196, 212, 252)" class="bi bi-text-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>
`;

export const RightAlignIcon = () => (
  <div
    className="format"
    css={cssUtils.flex}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
