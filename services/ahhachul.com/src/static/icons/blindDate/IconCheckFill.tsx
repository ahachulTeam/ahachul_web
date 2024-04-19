import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="url(#paint0_linear_5319_3132)"/>
<path d="M8 4.66602L5.33333 7.33268L4 5.99935" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_5319_3132" x1="6" y1="0" x2="6" y2="12" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4070"/>
<stop offset="1" stop-color="#FF6767"/>
</linearGradient>
</defs>
</svg>
`;

const IconCheckFill: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconCheckFill;
