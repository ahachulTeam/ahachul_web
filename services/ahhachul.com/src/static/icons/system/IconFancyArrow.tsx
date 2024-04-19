import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="111" height="14" viewBox="0 0 111 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 6.5C0.723858 6.5 0.5 6.72386 0.5 7C0.5 7.27614 0.723858 7.5 1 7.5L1 6.5ZM1 7.5L109 7.50001L109 6.50001L1 6.5L1 7.5Z" fill="#2EE477"/>
<path d="M103.362 1L110 7.07415L103.524 13" stroke="#2EE477" stroke-linecap="round"/>
</svg>
`;

const IconFancyArrow: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconFancyArrow;
