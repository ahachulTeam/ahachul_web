import React from 'react';
import { f } from 'shared/style';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3076 13.6923L15.1538 8.84619" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.2326 10.27C2.42568 9.86652 2.52346 8.68509 3.38572 8.41978L19.1948 3.55543C19.9621 3.31935 20.6808 4.03802 20.4447 4.8053L15.5804 20.6144C15.315 21.4767 14.1336 21.5745 13.7302 20.7675L10.38 14.0673C10.2833 13.8738 10.1264 13.7169 9.93283 13.6201L3.2326 10.27Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IconDM: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flexCenterCenter]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconDM;
