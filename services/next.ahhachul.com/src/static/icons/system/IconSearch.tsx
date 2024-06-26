import React from 'react';
import { f } from '@/src/styles';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#6E7D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 15L21 21" stroke="#6E7D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IconSearch: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ className, onClick }) => (
  <div css={f.flex} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconSearch;
