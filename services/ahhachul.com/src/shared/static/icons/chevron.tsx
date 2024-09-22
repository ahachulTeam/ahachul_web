import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 6L9.25 11.25L14.5 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const ChevronIcon = ({ className }: { className?: string }) => (
  <div
    css={cssUtils.flex}
    className={className}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
