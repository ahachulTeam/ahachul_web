import React from 'react';
import { f } from '@/src/styles';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#c9cedc" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

`;

const IconDndBar: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={f.flexCenterCenter} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconDndBar;
