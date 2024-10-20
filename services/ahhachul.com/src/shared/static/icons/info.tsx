import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" fill="#D9D9D9" stroke="#D9D9D9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 7.33301V10.6663" stroke="#2E2E2E" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.9668 5.33301H8.03346V5.39967H7.9668V5.33301Z" stroke="#2E2E2E" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const InfoIcon = () => (
  <div css={[cssUtils.flex]} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default InfoIcon;
